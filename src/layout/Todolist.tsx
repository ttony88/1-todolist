import React, {FC}  from 'react'
import style from './TodoList.module.css'

type TodoListProps = {
    title: string
}
export const TodoList:FC<TodoListProps> = (props) => {

    return(
        <div>
            {props.title}
        </div>
    )
}