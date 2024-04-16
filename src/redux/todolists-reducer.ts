export type StateTodolistType = TodolistType[]

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'complited'

type ActionTododlistType = AddTodolistActionType | DeleteTodolistActionType | ChangeFilterActionType

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    payload: AddTodolistPayload 
}

type AddTodolistPayload = {
    title: string
    todolistId: string
}

type DeleteTodolistActionType = {
    type: "DELETE-TODOLIST"
    payload: DeleteTodolistPayload
}

type DeleteTodolistPayload = {
    todolistId: string
} 

type ChangeFilterActionType = {
    type: "CHANGE-FILTER"
    payload: ChangeFilterPayload
}

type ChangeFilterPayload = {
    filter: FilterType
    todolistId: string
}

const initialState: StateTodolistType = [] 

export const todolistsReducer = (state: StateTodolistType=initialState, action: ActionTododlistType ) => {
    switch(action.type) {
        case "ADD-TODOLIST":
            const todolist = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [todolist, ...state]
        
        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistId)

        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
            
        default: 
            return state
    }
}

export const addTodolist = (title: string, todolistId: string): AddTodolistActionType => ({type: "ADD-TODOLIST",
                                                                                    payload: {title, todolistId}} as const)

export const deleteTodolist = (todolistId: string): DeleteTodolistActionType => ({type: "DELETE-TODOLIST",
                                                                                payload: {todolistId}} as const) 

export const changeFilter = (filter: FilterType, todolistId: string): ChangeFilterActionType => ({type: "CHANGE-FILTER", 
                                                                                                  payload: {filter,
                                                                                                            todolistId
                                                                                                  }} as const)                                                                                