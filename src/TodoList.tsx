import React, {FC} from "react";
import { Button } from "./Button";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    remuveTask: (taskId: number) => void
    tasksForTodoList: Array<TaskType>
    filterTasks: (filter:FilterValuesType) => void
}

export const TodoList : FC<TodoListPropsType> = ({
    title, 
    tasksForTodoList,
    remuveTask,
    filterTasks
}) => {

    {/*const tasksList: Array<JSX.Element> = []
    for (let i = 0; i < tasks.length; i++) {
        const task: JSX.Element = <li>
            <input type="checkbox" checked={tasks[i].isDone} /> 
            <span>{tasks[i].title}</span>
           </li>
        tasksList.push(task)
    }*/}

    const tasksList: JSX.Element = tasksForTodoList.length

    ? <ul>
        {tasksForTodoList.map(task => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone} /> 
                    <span>{task.title}</span>
                    <button onClick={() => {remuveTask(task.id)}}>x</button>
                </li>
        )
    })}
    </ul>
    : <span>задач нет</span>
    

    return (
      <div className="todoList">
        <h3>{title}</h3>
        <div>
          <input />
          <Button filterTasks={filterTasks} filterValue="all" textButton="+" />
        </div>
        {tasksList}
        <div>
            <Button filterTasks={filterTasks} filterValue="all" textButton="All" />
            <Button filterTasks={filterTasks} filterValue="active" textButton="Active" />
            <Button filterTasks={filterTasks} filterValue="completed" textButton="Completed" />
        </div>
      </div>
    );
}