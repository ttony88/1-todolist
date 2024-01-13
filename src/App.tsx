import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';

const tasks: Array<TaskType> = [
    {id: 1, title: "HTML&CSS", isDone: false},
    {id: 2, title: "JS", isDone: false},
    {id: 3, title: "React", isDone: true},
]

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const[tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: false},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: true},
    ])

    const remuveTask = (taskId: number) => {
        const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const tasksForTodoList:Array<TaskType> = filter === "active"
        ? tasks.filter(task => !task.isDone)
        : filter === "completed"
            ? tasks.filter(task => task.isDone)
            : tasks

    const filterTasks = (filter:FilterValuesType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <TodoList title="What to learn"  
                      remuveTask={remuveTask}
                      tasksForTodoList={tasksForTodoList}
                      filterTasks={filterTasks}
                      filter={filter}
                      />
        </div>
    );
}

export default App;
