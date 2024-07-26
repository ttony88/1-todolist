import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { todolistAPI, TodolistType } from "../API/todolist-api";


export type StateTodolistType = TodolistWithFilterType[]

export type TodolistWithFilterType = TodolistType & {filter: FilterType}

export type FilterType = 'all' | 'active' | 'complited'


const initialState: StateTodolistType = [] 

const slice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        setTodolists: (state, action: PayloadAction<{todolists: TodolistType[]}>) => {
            action.payload.todolists.forEach(tl => {
                state.push({...tl, filter: 'all'})
            })
        },
        addTodolist: (state, action: PayloadAction<{todolist: TodolistType}>) => {
            state.push({...action.payload.todolist, filter: 'all'})
        },
        removeTodolist: (state, action: PayloadAction<{todolistId: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if(index !== -1){
                state.splice(index, 1)
            }
            
        },
        changeFilter: (state, action: PayloadAction<{filter: FilterType, todolistId: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if(index !== -1){
                state[index].filter === action.payload.filter 
            }
        },
        changeTodolist: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if(index !== -1){
                state[index].title === action.payload.title
            }
        }
    }
})

export const getTodolists = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist().then(res => dispatch(setTodolists({todolists: res.data})))
    }
}
export const createTodolist = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title).then(res => dispatch(addTodolist({todolist: res.data.data.item}))) 
    }
}
export const deleteTodolist = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(id).then(res => dispatch(removeTodolist({todolistId: id})))
    }
}
export const updateTodolist = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTitleTodolist(id, title).then(res => dispatch(changeTodolist({todolistId: id, title})))
    }
}

export const todolistsReducer = slice.reducer

export const {setTodolists, addTodolist, removeTodolist, changeFilter, changeTodolist} = slice.actions
 
export const todolistsActions = slice.actions


















// import { Dispatch } from "redux"
// import { TodolistType, todolistAPI } from "../API/todolist-api"

// export type StateTodolistType = Array<TodolistWithFilterType>

// type TodolistWithFilterType = TodolistType & {filter: FilterType}

// export type FilterType = 'all' | 'active' | 'complited'

// type ActionTododlistType = AddTodolistActionType | DeleteTodolistActionType | ChangeFilterActionType | SetTodolistActionType 
// | ChangeTodolistActionType

// export type AddTodolistActionType = ReturnType<typeof addTodolist>

// type DeleteTodolistActionType = ReturnType<typeof removeTodolist>

// type ChangeFilterActionType = ReturnType<typeof changeFilter>

// export type SetTodolistActionType = ReturnType<typeof setTodolists>

// type ChangeTodolistActionType = ReturnType<typeof changeTodolist>

// const initialState: StateTodolistType = [] 

// export const todolistsReducer = (state: StateTodolistType=initialState, action: ActionTododlistType): StateTodolistType => {
//     switch(action.type) {
//         case "ADD-TODOLIST":
//             return [{...action.payload.todolist, filter: 'all'}, ...state]
        
//         case "REMOVE-TODOLIST":
//             return state.filter(tl => tl.id !== action.payload.todolistId)

//         case "CHANGE-FILTER":
//             return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)

//         case "SET-TODOLISTS":
//             return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))

//         case "CHANGE-TODOLIST":
//             return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
            
//         default: 
//             return state
//     }
// }

// export const addTodolist = (todolist: TodolistType) => ({type: "ADD-TODOLIST", payload: {todolist}} as const)

// export const removeTodolist = (todolistId: string) => ({type: "REMOVE-TODOLIST", payload: {todolistId}} as const) 

// export const changeFilter = (filter: FilterType, todolistId: string) => {
//     return {type: "CHANGE-FILTER", payload: {filter, todolistId}} as const
// }
// const setTodolists = (todolists: TodolistType[]) => ({type: "SET-TODOLISTS", payload: {todolists}} as const) 

// const changeTodolist = (todolistId: string, title: string) => ({type: "CHANGE-TODOLIST", payload: {todolistId, title}} as const)

// export const getTodolists = () => {
//     return (dispatch: Dispatch<ActionTododlistType>) => {
//         todolistAPI.getTodolist().then(res => dispatch(setTodolists(res.data)))
//     }
// }
// export const createTodolist = (title: string) => {
//     return (dispatch: Dispatch<ActionTododlistType>) => {
//         todolistAPI.createTodolist(title).then(res => dispatch(addTodolist(res.data.data.item))) 
//     }
// }
// export const deleteTodolist = (id: string) => {
//     return (dispatch: Dispatch<ActionTododlistType>) => {
//         todolistAPI.deleteTodolist(id).then(res => dispatch(removeTodolist(id)))
//     }
// }
// export const updateTodolist = (id: string, title: string) => {
//     return (dispatch: Dispatch<ActionTododlistType>) => {
//         todolistAPI.updateTitleTodolist(id, title).then(res => dispatch(changeTodolist(id, title)))
//     }
// }