import React, {ChangeEvent, FC, useState}  from 'react'
import style from './Task.module.css'
import { deleteTask, updateTask } from '../../redux/tasks-reducer'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete, Input } from '@mui/icons-material'
import { useAppDispatch } from '../../redux/store'

type TaskProps = {
    taskId: string
    title: string
    status: number
    todolistId: string
}
export const Task:FC<TaskProps> = (props) => {

    const [titleValue, setTitleValue] = useState(props.title)

    const [editMode, setEditMode] = useState(false)
    
    const dispatch = useAppDispatch()

    const onChangeHandlerCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(props.todolistId, props.taskId, {status: 2}))
    }

    const onClickHandlerButtonDeleteTask = () => {
        dispatch(deleteTask(props.todolistId, props.taskId))
    }

    const onClickTitleInputHendler = () => {
        dispatch(updateTask(props.todolistId, props.taskId, {title: titleValue}))
        setEditMode(false)
    }

    const onChangeInputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }

    const onDoubleClickTitleHandler = () => {
        setEditMode(true)
    }

    return(
        <div className={style.task}> 
            <Checkbox checked={props.status === 2}
                      defaultChecked={false}
                      onChange={onChangeHandlerCheckBox}
            />
            <div className={style.title} onDoubleClick={onDoubleClickTitleHandler}>
                {editMode ? <input type='text' 
                                   value={titleValue} 
                                   onChange={onChangeInputTitleHandler}
                                   onClick={onClickTitleInputHendler}
                                   autoFocus/> : props.title}
            </div>
            <IconButton onClick={onClickHandlerButtonDeleteTask}>
                <Delete />
            </IconButton>
        </div>
    )
}