import axios, { AxiosResponse } from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1'
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TaskType[]>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<{item: TaskType}>, 
                             AxiosResponse<ResponseTaskType<{item: TaskType}>>,
                             {title: string}>(`/todo-lists/${todolistId}/tasks`, {title})
    },

    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTaskType, 
                            AxiosResponse<ResponseTaskType>, 
                            {title: string}>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type TaskType = {
    title: string
}

export type ResponseTaskType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}