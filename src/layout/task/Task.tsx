import React, {ChangeEvent, FC, useState}  from 'react'
import style from './Task.module.css'
import { useDispatch } from 'react-redux'
import { changeStatusTask, deleteTask } from '../../redux/tasks-reducer'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'

type TaskProps = {
    taskId: string
    title: string
    isDone: boolean
    todolistId: string
}
export const Task:FC<TaskProps> = (props) => {
    const dispatch = useDispatch()

    const onChangeHandlerCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusTask(props.todolistId, props.taskId, props.isDone))
    }

    const onClickHandlerButtonDeleteTask = () => {
        dispatch(deleteTask(props.todolistId, props.taskId))
    }
console.log(props.isDone)

    return(
        <div className={style.task}> 
            <Checkbox checked={props.isDone}
                        defaultChecked={false}
                      onChange={onChangeHandlerCheckBox}
            />
            <div className={style.title}>
                {props.title}
            </div>
            <IconButton onClick={onClickHandlerButtonDeleteTask}>
                <Delete />
            </IconButton>
        </div>
    )
}