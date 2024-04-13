import React, {ChangeEvent, FC, useState}  from 'react'
import style from './App.module.css'
import { ButtonUsed } from '../components/button-used/ButtonUsed'
import { addTodolist } from '../redux/todolists-reducer'
import { v1 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { TodoList } from '../layout/todolist/Todolist'

export const App:FC = (props) => {

    const dispatch = useDispatch()

    const[titleTask, setTitleTask] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitleTask(e.target.value)}

    const onClickHandler = () => {
        dispatch(addTodolist(titleTask,v1()))
        setTitleTask('')
    }

    const todolists = useSelector((state: any) => state.todolists)

    return(
        <div>
            <div>
                <input value={titleTask} onChange={onChangeHandler} type="text" />
                <ButtonUsed textButton="+" onClick={onClickHandler} />
            </div>
            <div>
                {todolists.map((t: { id: React.Key | null | undefined; title: string }) => <TodoList key={t.id} title={t.title}/>)}
            </div>

        </div>
    )
}

