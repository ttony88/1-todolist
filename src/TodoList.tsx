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
    filter: FilterValuesType
}

export const TodoList : FC<TodoListPropsType> = ({
        title, 
        tasksForTodoList,
        remuveTask,
        filterTasks,
        filter
    }) => {
    const tasksList: JSX.Element = tasksForTodoList.length

    ? <ul>
        {tasksForTodoList.map(task => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone} /> 
                    <span>{task.title}</span>
                    <Button onClickHandler={() => {remuveTask(task.id)}} textButton="x" />
                </li>
        )
    })}
    </ul>
    : filter === "active" 
        ? <span>активных задач нет</span>
        : filter === "completed"
            ? <span>завершенных задач нет</span>
            : <span>задач нет</span>
      
    

    return (
      <div className="todoList">
        <h3>{title}</h3>
        <div>
          <input />
          <Button onClickHandler={() => {}} textButton="+" />
        </div>
        {tasksList}
        <div>
            <Button onClickHandler={() => filterTasks("all")} textButton="All" />
            <Button onClickHandler={() => filterTasks("active")} textButton="Active" />
            <Button onClickHandler={() => filterTasks("completed")} textButton="Completed" />
        </div>
      </div>
    );
}