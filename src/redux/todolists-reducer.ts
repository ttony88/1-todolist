import { Dispatch } from "redux"
import { TodolistType, todolistAPI } from "../API/todolist-api"

export type StateTodolistType = Array<TodolistType & {filter: FilterType}>


export type FilterType = 'all' | 'active' | 'complited'

type ActionTododlistType = AddTodolistActionType | DeleteTodolistActionType | ChangeFilterActionType | SetTodolistActionType

export type AddTodolistActionType = ReturnType<typeof addTodolist>

type DeleteTodolistActionType = ReturnType<typeof deleteTodolist>

type ChangeFilterActionType = ReturnType<typeof changeFilter>

export type SetTodolistActionType = ReturnType<typeof setTodolist>

const initialState: StateTodolistType = [] 

export const todolistsReducer = (state: StateTodolistType=initialState, action: ActionTododlistType): StateTodolistType => {
    switch(action.type) {
        // case "ADD-TODOLIST":
        //     const todolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title}
        //     return [todolist, ...state]
        
        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistId)

        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)

        case "SET-TODOLIST":
            return action.payload.todolists.map(t => ({...t, filter: 'all'}))
            
        default: 
            return state
    }
}

export const addTodolist = (title: string, todolistId: string) => ({type: "ADD-TODOLIST",
                                                                                    payload: {title, todolistId}} as const)

export const deleteTodolist = (todolistId: string) => ({type: "DELETE-TODOLIST",
                                                                                payload: {todolistId}} as const) 

export const changeFilter = (filter: FilterType, todolistId: string) => {
    return {type: "CHANGE-FILTER", payload: {filter, todolistId}} as const
}
export const setTodolist = (todolists: TodolistType[]) => ({type: "SET-TODOLIST", payload: {todolists}} as const)  

export const getTodolist = () => {
    return (dispatch: Dispatch<ActionTododlistType>) => {
        todolistAPI.getTodolist().then(res => dispatch(setTodolist(res.data)))
    }
}