import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    remuveTask: (taskId: string) => void
    addTask: (task: string) => void
    tasksForTodoList: Array<TaskType>
    filterTasks: (filter:FilterValuesType) => void
    toggleIsDone: (taskId: string) => void
    filter: FilterValuesType
    getFilterTasks: (filter: FilterValuesType, tasks: Array<TaskType>) => Array<TaskType>
}

export const TodoList:FC<TodoListPropsType> = ({
        title, 
        tasksForTodoList,
        remuveTask,
        filterTasks,
        addTask,
        toggleIsDone,
        filter,
        getFilterTasks
    }) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const [isColapsetTodoList, setIsColapsetTodoList] = useState(true)



    const tasksList:JSX.Element = tasksForTodoList.length

        ? <ul>
            {tasksForTodoList.map(task => {

                const onClickHandlerRemuveTask = () => {remuveTask(task.id)}

                const onChangeHandlerToggleIsDone = () => {toggleIsDone(task.id)}

                return (
                    <li key={task.id}>
                        <input type="checkbox" 
                               checked={task.isDone}
                               className={error ? "task-input-error" : ""}
                               onChange={onChangeHandlerToggleIsDone} /> 
                        <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                        <Button onClickHandler={onClickHandlerRemuveTask} textButton="x" />
                    </li>
            )
        })}
        </ul>

        : filter === "active" 
            ? <span>активных задач нет</span>
            : filter === "completed"
                ? <span>завершенных задач нет</span>
                : <span>задач нет</span>



        
    const onClickHandlerAddTask = () => {
        if(taskTitle.trim()){
            addTask(taskTitle)
            setTaskTitle('')

        }
        else{
            setError(true)
        }
        
    }

    const onClickHandlerCreatorFilterTask = (filter:FilterValuesType) => {
        return () => filterTasks(filter) 
    }

    const onChangeInputHandler =  (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" ? onClickHandlerAddTask() : null

    const onClickHandlerColapset = () => setIsColapsetTodoList(!isColapsetTodoList)

    const countActiveTaskForHidenList = getFilterTasks("active", tasksForTodoList).length

    

    return (
      <div className="todoList">
        <h3>{title}</h3>
        {isColapsetTodoList && <div>{`у вас ${countActiveTaskForHidenList} активные задачи`}</div>}
        <Button textButton={isColapsetTodoList ? "Развернуть" : "Свернуть"}
                onClickHandler={onClickHandlerColapset}/>
        {!isColapsetTodoList && <>
            <div>
            <input type="text" value={taskTitle} 
                    className={error ? "task-input-error" : ""}
                    onChange={onChangeInputHandler} 
                    onKeyDown={onKeyDownHandler}/>
            <Button onClickHandler={onClickHandlerAddTask} textButton="+" isDisabled={!taskTitle} />
            {error && <div className="error">введите текст задачи</div>}
            {taskTitle.length > 15 && <div className="error">рекомендуем название задачи короче</div>}
            </div>
            {tasksList}
            <div>
                <Button onClickHandler={onClickHandlerCreatorFilterTask("all")} 
                        textButton="All" 
                        classes={filter === "all" ? "btn-filter-active" : "btn-filter"}/>
                <Button onClickHandler={onClickHandlerCreatorFilterTask("active")} 
                        textButton="Active"
                        classes={filter === "active" ? "btn-filter-active" : "btn-filter"} />
                <Button onClickHandler={onClickHandlerCreatorFilterTask("completed")} 
                        textButton="Completed" 
                        classes={filter === "completed" ? "btn-filter-active" : "btn-filter"}/>
            </div>
        </>}
    </div>
    );
}