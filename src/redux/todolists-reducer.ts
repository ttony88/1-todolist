import { v1 } from "uuid"

export type StateTodolistType = Todolist[]

type Todolist = {
    id: string
    title: string
}

type ActionTododlistType = AddTodolistActionType | DeleteTodolistActionType 

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

const initialState: StateTodolistType = [] 

export const todolistsReducer = (state: StateTodolistType=initialState, action: ActionTododlistType ) => {
    switch(action.type) {
        case "ADD-TODOLIST":
            const todolist = {id: action.payload.todolistId, title: action.payload.title}
            return [todolist, ...state]
        
        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistId)
        default: 
            return state
    }
}

export const addTodolist = (title: string, todolistId: string): AddTodolistActionType => ({type: "ADD-TODOLIST",
                                                                                    payload: {title, todolistId}} as const)

export const deleteTodolist = (todolistId: string): DeleteTodolistActionType => ({type: "DELETE-TODOLIST",
                                                                                payload: {todolistId}} as const) 