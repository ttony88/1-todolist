import React, {ChangeEvent, FC, useState}  from 'react'
import style from './Todolist.module.css'
import { InputUsed } from '../../components/input-used/InputUsed'
import { ButtonUsed } from '../../components/button-used/ButtonUsed'
import { TaskType, addTask } from '../../redux/tasks-reducer'
import { Task } from '../task/Task'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { FilterType, changeFilter, deleteTodolist, updateTodolist } from '../../redux/todolists-reducer'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../redux/store'

type TodoListProps = {
    todolistId: string
    filter: FilterType
}
export const Todolist:FC<TodoListProps> = (props) => {

    const titleTodolist = useAppSelector((state: AppRootStateType) => state.todolists.filter(tl => tl.id === props.todolistId)[0].title)

    const [titleTask, setTitleTask] = useState('')

    const [inputValueTitleTodolist, setInputValueTitleTodolist] = useState(titleTodolist)

    const [inputMode, setInputMode] = useState(false)

    const dispatch = useAppDispatch()

    const tasks = useAppSelector((state: any) => {
        switch(props.filter) {
            case 'active':
                return state.tasks[props.todolistId].filter((t: TaskType) => t.isDone === false)

            case 'complited':
                return state.tasks[props.todolistId].filter((t: TaskType) => t.isDone === true)

            default:
                return state.tasks[props.todolistId]
        }
        
    })

    const onClickHandlerAddButton = () => {
        dispatch(addTask(titleTask, props.todolistId))
        setTitleTask('')
    }

    const onClickHandlerDeleteButton = () => {
        dispatch(deleteTodolist(props.todolistId))
    }

    const onChangeHandlerInput = (value: string) => {
        setTitleTask(value)
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

    const onClickInputTodolistTask = () => {
        dispatch(updateTodolist(props.todolistId, inputValueTitleTodolist))
        setInputMode(false)
    }

    return(
        <div className={style.todolist}>
            <div className={style.title}>
                {inputMode ? <input type="text" autoFocus value={inputValueTitleTodolist} 
                                    onChange={onChangeTodolistTitle} onClick={onClickInputTodolistTask} /> 
                           : <span onDoubleClick={onDoubleClickHendlerTitleTodolist}>{titleTodolist}</span>}
                <IconButton onClick={onClickHandlerDeleteButton}>
                    <Delete />
                </IconButton>
            </div>
            <div className={style.inputBlock}>
                <InputUsed value={titleTask} onChange={onChangeHandlerInput} />
                <ButtonUsed textButton='+' onClick={onClickHandlerAddButton} />
            </div>
            <div className={style.tasks}>
                {tasks.map((t: TaskType) => <div key={t.id}><Task 
                                                  taskId={t.id} 
                                                  title={t.title} 
                                                  isDone={t.isDone}
                                                  todolistId={props.todolistId} /></div>)}
            </div>
            <div className={style.buttonGroup}>
                <ButtonUsed textButton="All" onClick={() => onClickHandlerButtonGroup('all')} />
                <ButtonUsed textButton="Active" onClick={() => onClickHandlerButtonGroup('active')} />
                <ButtonUsed textButton="Complited" onClick={() => onClickHandlerButtonGroup('complited')} />
            </div>
            
        </div>
    )
}