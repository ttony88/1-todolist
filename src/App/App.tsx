import React, { FC, useEffect, useState }  from 'react'
import style from './App.module.css'
import { ButtonUsed } from '../components/button-used/ButtonUsed'
import { FilterType, addTodolist, getTodolist } from '../redux/todolists-reducer'
import { v1 } from 'uuid'
import { Todolist } from '../layout/todolist/Todolist'
import { InputUsed } from '../components/input-used/InputUsed'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { TodolistType } from '../API/todolist-api'

export const App:FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolist())
    }, [])

    const[titleTask, setTitleTask] = useState('')

    const onChangeHandler = (value: string) => {setTitleTask(value)}

    const onClickHandler = () => {
        dispatch(addTodolist(titleTask,v1()))
        setTitleTask('')
    }

    const todolists = useAppSelector((state: any) => state.todolists)

    return(
        <div className={style.app}>
            <div className={style.inputBox}>
                <InputUsed value={titleTask} onChange={onChangeHandler} />
                <ButtonUsed textButton="+" onClick={onClickHandler} />
            </div>
            <div className={style.todolists}>
                {todolists.map((t: TodolistType & {filter: FilterType}) => <div key={t.id}><Todolist  
                                                              title={t.title}
                                                              todolistId={t.id}
                                                              filter={t.filter}/>
                                                    </div>)}
            </div>

        </div>
    )
}

