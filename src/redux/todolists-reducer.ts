export type StateTodolistType = TodolistType[]

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'complited'

type ActionTododlistType = AddTodolistActionType | DeleteTodolistActionType | ChangeFilterActionType

export type AddTodolistActionType = ReturnType<typeof addTodolist>

type DeleteTodolistActionType = ReturnType<typeof deleteTodolist>

type ChangeFilterActionType = ReturnType<typeof changeFilter>

const initialState: StateTodolistType = [] 

export const todolistsReducer = (state: StateTodolistType=initialState, action: ActionTododlistType): StateTodolistType => {
    switch(action.type) {
        case "ADD-TODOLIST":
            const todolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [todolist, ...state]
        
        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistId)

        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
            
        default: 
            return state
    }
}

export const addTodolist = (title: string, todolistId: string) => ({type: "ADD-TODOLIST",
                                                                                    payload: {title, todolistId}} as const)

export const deleteTodolist = (todolistId: string) => ({type: "DELETE-TODOLIST",
                                                                                payload: {todolistId}} as const) 

export const changeFilter = (filter: FilterType, todolistId: string) => ({type: "CHANGE-FILTER", 
                                                                                                  payload: {filter,
                                                                                                            todolistId
                                                                                                  }} as const)                                                                                