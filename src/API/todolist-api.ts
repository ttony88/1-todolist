import axios, { AxiosResponse } from "axios"

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseTodolistType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('/todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{ item: TodolistType }>, 
                             AxiosResponse<ResponseTodolistType<{ item: TodolistType }>>,
                             { title: string }>('todo-lists', {title});
    },

    deleteTodolist(id: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${id}`)
    }, 

    updateTitleTodolist(id: string, title: string) {
        return instance.put<ResponseTodolistType, 
                            AxiosResponse<ResponseTodolistType>, 
                            { title: string }>(`todo-lists/${id}`, {title})
    }
}