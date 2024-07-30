import React, {ChangeEvent, KeyboardEvent, FC, useState, useEffect}  from 'react'
import style from './Todolist.module.css'
import { InputUsed } from '../../components/input-used/InputUsed'
import { ButtonUsed } from '../../components/button-used/ButtonUsed'
import { TaskType, tasksThunks } from '../../redux/tasks-reducer'
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
export const Todolist = ({todolistId, filter}:TodoListProps) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(tasksThunks.getTasks(todolistId))
    }, [])

    const titleTodolist = useAppSelector((state) => state.todolists.filter(tl => tl.id === todolistId)[0].title)

    const [inputValueTitleTodolist, setInputValueTitleTodolist] = useState(titleTodolist)

    const [inputMode, setInputMode] = useState(false)

    const tasks = useAppSelector((state) => {
        switch(filter) {
            case 'active':
                return state.tasks[todolistId].filter((t: TaskType) => t.status === 0)

            case 'complited':
                return state.tasks[todolistId].filter((t: TaskType) => t.status === 2)

            default:
                return state.tasks[todolistId]
        }
        
    })

    const onClickHandlerDeleteButton = () => {
        dispatch(deleteTodolist(todolistId))
    }

    const onClickHandlerButtonGroup = (filter: FilterType) => {
        dispatch(changeFilter({filter, todolistId}))
    }

    const onDoubleClickHendlerTitleTodolist = () => {
        setInputMode(true)
    } 

    const onChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValueTitleTodolist(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            dispatch(updateTodolist(todolistId, inputValueTitleTodolist))
            setInputMode(false)
        }
        
    }

    const formik = useFormik({
        initialValues: {
            titleTask: '' 
        },
        onSubmit: (values) => {
            const {titleTask} = values
            dispatch(tasksThunks.createTask({todolistId, title: titleTask}))
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
                                                  todolistId={todolistId} /></div>)}
            </div>
            <div className={style.buttonGroup}>
                <ButtonUsed textButton="All" onClick={() => onClickHandlerButtonGroup('all')} />
                <ButtonUsed textButton="Active" onClick={() => onClickHandlerButtonGroup('active')} />
                <ButtonUsed textButton="Complited" onClick={() => onClickHandlerButtonGroup('complited')} />
            </div>
            
        </form>
    )
}