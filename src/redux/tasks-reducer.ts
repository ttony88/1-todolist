import { v1 } from "uuid"
import { AddTodolistActionType, SetTodolistActionType } from "./todolists-reducer"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type AddTaskActionType = ReturnType<typeof addTask>



type DeleteTaskActionType = ReturnType<typeof deleteTask>

type ChangeStatusTaskActionType = ReturnType<typeof changeStatusTask>

type ChangeStatusTaskActionPayloadType = {
    todolistId: string
    taskId: string
    isDone: boolean 
}

type ActionTaskType = AddTodolistActionType | AddTaskActionType | DeleteTaskActionType | ChangeStatusTaskActionType |
SetTodolistActionType

const initialState:TasksStateType = {}

export const tasksReducer = (state: TasksStateType=initialState, action: ActionTaskType):TasksStateType => {
    
    switch(action.type) {
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        case "ADD-TASK":
            const task = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [task, ...state[action.payload.todolistId]] 
            }
        case "DELETE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case "CHANGE-STATUS-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => {
                    if(t.id === action.payload.taskId) {
                        return {
                            ...t,
                            isDone: !action.payload.isDone
                        }
                    }
                    return t
                })
            }
        case "SET-TODOLIST":
            const copyState = {...state}
            action.payload.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState

        default:
            return state    
    }
}

export const addTask = (title: string, todolistId: string) => ({type: "ADD-TASK", 
                                                                                payload: {title, todolistId}} as const)

export const deleteTask = (todolistId: string, taskId: string) => ({type: "DELETE-TASK",
                                                                                payload: {todolistId, taskId}} as const)  
                                                                                
export const changeStatusTask = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: "CHANGE-STATUS-TASK", payload: {todolistId, taskId, isDone}} as const
} 