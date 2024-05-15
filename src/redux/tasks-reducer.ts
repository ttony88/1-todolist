import { Dispatch } from 'redux';
import { AddTodolistActionType, SetTodolistActionType } from "./todolists-reducer"
import { tasksAPI } from '../API/tasks-api';
import { AppRootStateType } from './store';

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    // id: string
    // title: string
    // isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type UpdateDomeinTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

type AddTaskActionType = ReturnType<typeof addTask>

type RamoveTaskActionType = ReturnType<typeof removeTask>

type SetTasks = ReturnType<typeof setTasks>

type ChangeTask = ReturnType<typeof changeTask>

type ActionTaskType = AddTodolistActionType | AddTaskActionType | RamoveTaskActionType | SetTodolistActionType | 
SetTasks | ChangeTask

const initialState:TasksStateType = {}

export const tasksReducer = (state: TasksStateType=initialState, action: ActionTaskType):TasksStateType => {
    
    switch(action.type) {
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        case "SET-TASKS":
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]] 
            }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case "CHANGE-TASK": 
            return {
                ...state,
                [action.payload.todolistId] : state[action.payload.todolistId].map(t => {
                    if(t.id === action.payload.taskId) {
                        return {...t, ...action.payload.model}
                    }
                    return t
                })
            }
        case "SET-TODOLISTS":
            const copyState = {...state}
            action.payload.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState

        default:
            return state    
    }
}

export const addTask = (task: TaskType) => ({type: "ADD-TASK", 
                                      payload: {task}} as const)

export const removeTask = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK",
                                                                    payload: {todolistId, taskId}} as const)

export const setTasks = (todolistId: string, tasks: TaskType[]) => ({type: "SET-TASKS",
                                                              payload: {todolistId, tasks}} as const)

export const changeTask = (todolistId: string, taskId: string, model: UpdateDomeinTaskModelType) => ({type: "CHANGE-TASK",
                                                                   payload: {todolistId, taskId, model}} as const)



export const getTasks = (todolistId: string) => {
    return (dispatch: Dispatch<ActionTaskType>) => {
        tasksAPI.getTasks(todolistId).then(res => {
            const tasks = res.data.items
            return dispatch(setTasks(todolistId, tasks))
        })
    }
}

export const createTasks = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionTaskType>) => {
        tasksAPI.createTask(todolistId, title).then(res => {
            const task = res.data.data.item
            dispatch(addTask(task))
        })
    }
}

export const deleteTask = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionTaskType>) => {
        tasksAPI.deleteTask(todolistId, taskId).then(res => {
            dispatch(removeTask(todolistId, taskId))
        })
    }
}

export const updateTask = (todolistId: string, taskId: string, domeinModel: UpdateDomeinTaskModelType) => {
    return (dispatch: Dispatch<ActionTaskType>, getState: () => AppRootStateType) => {
        const state = getState()

        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if(!task){
            console.warn('no tasks')
            return
        }

        const apiModel = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status, 
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domeinModel
        }
        tasksAPI.updateTask(todolistId, taskId, apiModel).then(res => {
            dispatch(changeTask(todolistId, taskId, domeinModel))
        })
    }
}