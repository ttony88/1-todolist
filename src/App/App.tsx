import React, {ChangeEvent, FC, useState}  from 'react'
import style from './App.module.css'
import { ButtonUsed } from '../components/button-used/ButtonUsed'
import { TodolistType, addTodolist } from '../redux/todolists-reducer'
import { v1 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { Todolist } from '../layout/todolist/Todolist'
import { InputUsed } from '../components/input-used/InputUsed'

export const App:FC = (props) => {

    const dispatch = useDispatch()

    const[titleTask, setTitleTask] = useState('')

    const onChangeHandler = (value: string) => {setTitleTask(value)}

    const onClickHandler = () => {
        dispatch(addTodolist(titleTask,v1()))
        setTitleTask('')
    }

    const todolists = useSelector((state: any) => state.todolists)

    return(
        <div className={style.app}>
            <div className={style.inputBox}>
                <InputUsed value={titleTask} onChange={onChangeHandler} />
                <ButtonUsed textButton="+" onClick={onClickHandler} />
            </div>
            <div className={style.todolists}>
                {todolists.map((t: TodolistType) => <div key={t.id}><Todolist  
                                                              title={t.title}
                                                              todolistId={t.id}/></div>)}
            </div>

        </div>
    )
}

