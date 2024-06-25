import React, { FC, useEffect, useState }  from 'react'
import style from './App.module.css'
import { ButtonUsed } from '../components/button-used/ButtonUsed'
import { FilterType, createTodolist, getTodolists } from '../redux/todolists-reducer'
import { Todolist } from '../layout/todolist/Todolist'
import { InputUsed } from '../components/input-used/InputUsed'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { TodolistType } from '../API/todolist-api'
import { getTasks } from '../redux/tasks-reducer'
import { useFormik } from 'formik'

export const App:FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolists())
    }, [])

    const formik = useFormik({
        initialValues: {
            titleTodolist: '' 
        },
        onSubmit: (values) => {
            dispatch(createTodolist(values.titleTodolist))
            formik.resetForm()
        }
    })

    const todolists = useAppSelector((state: any) => state.todolists)

    return(
        <div className={style.app}>
            <form className={style.inputBox}
                  onSubmit={formik.handleSubmit}>
                <InputUsed type='text'
                           {...formik.getFieldProps('titleTodolist')} />
                <ButtonUsed textButton="+" />
            </form>
            <div className={style.todolists}>
                {todolists.map((t: TodolistType & {filter: FilterType}) => <div key={t.id}><Todolist 
                                                              todolistId={t.id}
                                                              filter={t.filter}/>
                                                    </div>)}
            </div>

        </div>
    )
}

