import React, {ChangeEvent, KeyboardEvent, FC, useState, useEffect}  from 'react'
import style from './Todolist.module.css'
import { InputUsed } from '../../components/input-used/InputUsed'
import { ButtonUsed } from '../../components/button-used/ButtonUsed'
import { TaskType, createTasks, getTasks } from '../../redux/tasks-reducer'
import { Task } from '../task/Task'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { FilterType, changeFilter, deleteTodolist, updateTodolist } from '../../redux/todolists-reducer'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../redux/store'
import { useFormik } from 'formik'

type TodoListProps = {
    todolistId: string
    filter: FilterType
}
export const Todolist:FC<TodoListProps> = (props) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasks(props.todolistId))
    }, [])

    const titleTodolist = useAppSelector((state: AppRootStateType) => state.todolists.filter(tl => 
                                                                      tl.id === props.todolistId)[0].title)

    const [inputValueTitleTodolist, setInputValueTitleTodolist] = useState(titleTodolist)

    const [inputMode, setInputMode] = useState(false)

    const tasks = useAppSelector((state: any) => {
        switch(props.filter) {
            case 'active':
                return state.tasks[props.todolistId].filter((t: TaskType) => t.completed === false)

            case 'complited':
                return state.tasks[props.todolistId].filter((t: TaskType) => t.completed === true)

            default:
                return state.tasks[props.todolistId]
        }
        
    })

    const onClickHandlerDeleteButton = () => {
        dispatch(deleteTodolist(props.todolistId))
    }

    const onClickHandlerButtonGroup = (filter: FilterType) => {
        dispatch(changeFilter(filter, props.todolistId))
    }

    const onDoubleClickHendlerTitleTodolist = () => {
        setInputMode(true)
    } 

    const onChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValueTitleTodolist(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            dispatch(updateTodolist(props.todolistId, inputValueTitleTodolist))
            setInputMode(false)
        }
        
    }

    const formik = useFormik({
        initialValues: {
            titleTask: '' 
        },
        onSubmit: (values) => {
            dispatch(createTasks(props.todolistId, values.titleTask))
            formik.resetForm()
        }
    })

    return(
        <form className={style.todolist}
              onSubmit={formik.handleSubmit}>
            <div className={style.title}>
                {inputMode ? <input type="text" autoFocus value={inputValueTitleTodolist} 
                                    onChange={onChangeTodolistTitle} onKeyDown={onKeyDownHandler} /> 
                           : <span onDoubleClick={onDoubleClickHendlerTitleTodolist}>{titleTodolist}</span>}
                <IconButton onClick={onClickHandlerDeleteButton}>
                    <Delete />
                </IconButton>
            </div>
            <div className={style.inputBlock}>
                <InputUsed type='text' 
                           {...formik.getFieldProps('titleTask')} />
                <ButtonUsed textButton='+' type='submit' />
            </div>
            <div className={style.tasks}>
                {tasks?.map((t: TaskType) => <div key={t.id}><Task 
                                                  taskId={t.id} 
                                                  title={t.title} 
                                                  status={t.status}
                                                  todolistId={props.todolistId} /></div>)}
            </div>
            <div className={style.buttonGroup}>
                <ButtonUsed textButton="All" onClick={() => onClickHandlerButtonGroup('all')} />
                <ButtonUsed textButton="Active" onClick={() => onClickHandlerButtonGroup('active')} />
                <ButtonUsed textButton="Complited" onClick={() => onClickHandlerButtonGroup('complited')} />
            </div>
            
        </form>
    )
}