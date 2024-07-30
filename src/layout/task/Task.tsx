import React, {ChangeEvent, FC, useState}  from 'react'
import style from './Task.module.css'
import { tasksThunks, updateTask } from '../../redux/tasks-reducer'
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
export const Task:FC<TaskProps> = ({taskId, title, status,todolistId}) => {

    const [titleValue, setTitleValue] = useState(title)

    const [editMode, setEditMode] = useState(false)
    
    const dispatch = useAppDispatch()

    const onChangeHandlerCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 2 : 0
        dispatch(updateTask(todolistId, taskId, {status}))
    }

    const onClickHandlerButtonDeleteTask = () => {
        dispatch(tasksThunks.deleteTask({todolistId, taskId}))
    }

    const onClickTitleInputHendler = () => {
        dispatch(updateTask(todolistId, taskId, {title: titleValue}))
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
            <Checkbox checked={status === 2}
                      onChange={onChangeHandlerCheckBox}
            />
            <div className={style.title} onDoubleClick={onDoubleClickTitleHandler}>
                {editMode ? <input type='text' 
                                   value={titleValue} 
                                   onChange={onChangeInputTitleHandler}
                                   onClick={onClickTitleInputHendler}
                                   autoFocus/> : title}
            </div>
            <IconButton onClick={onClickHandlerButtonDeleteTask}>
                <Delete />
            </IconButton>
        </div>
    )
}