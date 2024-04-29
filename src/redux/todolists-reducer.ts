import { Dispatch } from "redux"
import { TodolistType, todolistAPI } from "../API/todolist-api"

export type StateTodolistType = Array<TodolistWithFilterType>

type TodolistWithFilterType = TodolistType & {filter: FilterType}

export type FilterType = 'all' | 'active' | 'complited'

type ActionTododlistType = AddTodolistActionType | DeleteTodolistActionType | ChangeFilterActionType | SetTodolistActionType

export type AddTodolistActionType = ReturnType<typeof addTodolist>

type DeleteTodolistActionType = ReturnType<typeof removeTodolist>

type ChangeFilterActionType = ReturnType<typeof changeFilter>

export type SetTodolistActionType = ReturnType<typeof setTodolist>

const initialState: StateTodolistType = [] 

export const todolistsReducer = (state: StateTodolistType=initialState, action: ActionTododlistType): StateTodolistType => {
    switch(action.type) {
        case "ADD-TODOLIST":
            return [{...action.payload.todolist, filter: 'all'}, ...state]
        
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistId)

        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)

        case "SET-TODOLIST":
            return action.payload.todolists.map((t: TodolistType) => ({...t, filter: 'all'}))
            
        default: 
            return state
    }
}

const addTodolist = (todolist: TodolistType) => ({type: "ADD-TODOLIST", payload: {todolist}} as const)

const removeTodolist = (todolistId: string) => ({type: "REMOVE-TODOLIST", payload: {todolistId}} as const) 

export const changeFilter = (filter: FilterType, todolistId: string) => {
    return {type: "CHANGE-FILTER", payload: {filter, todolistId}} as const
}
const setTodolist = (todolists: TodolistType[]) => ({type: "SET-TODOLIST", payload: {todolists}} as const)  

export const getTodolist = () => {
    return (dispatch: Dispatch<ActionTododlistType>) => {
        todolistAPI.getTodolist().then(res => dispatch(setTodolist(res.data)))
    }
}
export const createTodolist = (title: string) => {
    return (dispatch: Dispatch<ActionTododlistType>) => {
        todolistAPI.createTodolist(title).then(res => dispatch(addTodolist(res.data.data.item))) 
    }
}
export const deleteTodolist = (id: string) => {
    return (dispatch: Dispatch<ActionTododlistType>) => {
        todolistAPI.deleteTodolist(id).then(res => dispatch(removeTodolist(id)))
    }
}