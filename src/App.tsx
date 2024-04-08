import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const[tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")



    const remuveTask = (taskId: string) => {
        const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const toggleIsDone = (taskId: string) => {
        const task = tasks.find(task => task.id === taskId)
        if (task){
            task.isDone = !task.isDone
        }
        setTasks([...tasks])
    }

    const getFilterTasks = (filter: FilterValuesType, tasks: Array<TaskType>) => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    const filterTasks = (filter:FilterValuesType) => setFilter(filter)    

    const tasksForTodoList:Array<TaskType> = getFilterTasks(filter, tasks)

    

    return (
        <div className="App">
            <TodoList title="What to learn"  
                      remuveTask={remuveTask}
                      addTask={addTask}
                      tasksForTodoList={tasksForTodoList}
                      filterTasks={filterTasks}
                      toggleIsDone={toggleIsDone}
                      filter={filter}
                      getFilterTasks={getFilterTasks}
                      />
        </div>
    );
}

export default App;


