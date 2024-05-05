import React, { FC, useEffect, useState }  from 'react'
import style from './App.module.css'
import { ButtonUsed } from '../components/button-used/ButtonUsed'
import { FilterType, createTodolist, getTodolists } from '../redux/todolists-reducer'
import { Todolist } from '../layout/todolist/Todolist'
import { InputUsed } from '../components/input-used/InputUsed'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { TodolistType } from '../API/todolist-api'

export const App:FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolists())
    }, [])

    const[titleTodolist, setTitleTodolist] = useState('')

    const onChangeHandler = (value: string) => {setTitleTodolist(value)}

    const onClickHandler = () => {
        dispatch(createTodolist(titleTodolist))
        setTitleTodolist('')
    }

    const todolists = useAppSelector((state: any) => state.todolists)

    return(
        <div className={style.app}>
            <div className={style.inputBox}>
                <InputUsed value={titleTodolist} onChange={onChangeHandler} />
                <ButtonUsed textButton="+" onClick={onClickHandler} />
            </div>
            <div className={style.todolists}>
                {todolists.map((t: TodolistType & {filter: FilterType}) => <div key={t.id}><Todolist 
                                                              todolistId={t.id}
                                                              filter={t.filter}/>
                                                    </div>)}
            </div>

        </div>
    )
}

