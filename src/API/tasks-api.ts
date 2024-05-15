import axios, { AxiosResponse } from "axios"
import { TaskType } from "../redux/tasks-reducer"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': '6742bfbb-b768-4fb0-8adf-26e2c9f9bf7b'
    }
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<{item: TaskType}>, 
                             AxiosResponse<ResponseTaskType<{item: TaskType}>>,
                             {title: string}>(`/todo-lists/${todolistId}/tasks`, {title})
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseTaskType, 
                            AxiosResponse<ResponseTaskType<TaskType>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}


export type ResponseTaskType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}