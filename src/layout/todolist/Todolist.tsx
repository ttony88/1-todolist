import React, {FC, useState}  from 'react'
import style from './Todolist.module.css'
import { InputUsed } from '../../components/input-used/InputUsed'
import { ButtonUsed } from '../../components/button-used/ButtonUsed'
import { useDispatch, useSelector } from 'react-redux'
import { TaskType, addTask } from '../../redux/tasks-reducer'
import { Task } from '../task/Task'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { FilterType, changeFilter, deleteTodolist } from '../../redux/todolists-reducer'

type TodoListProps = {
    title: string
    todolistId: string
}
export const Todolist:FC<TodoListProps> = (props) => {

    const [titleTask, setTitleTask] = useState('')

    const dispatch = useDispatch()

    const tasks = useSelector((state: any) => state.tasks[props.todolistId])

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

    return(
        <div className={style.todolist}>
            <div className={style.title}>
                {props.title}
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
            <ButtonUsed textButton="All" onClick={() => onClickHandlerButtonGroup('all')} />
            <ButtonUsed textButton="Active" onClick={() => onClickHandlerButtonGroup('active')} />
            <ButtonUsed textButton="Complited" onClick={() => onClickHandlerButtonGroup('complited')} />
        </div>
    )
}