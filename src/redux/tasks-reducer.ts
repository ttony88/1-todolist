import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsActions } from "./todolists-reducer";
import { Dispatch } from 'redux';
import { AddTaskArgType, tasksAPI, UpdateTaskModelType } from '../API/tasks-api';
import { AppRootStateType } from './store';

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateDomeinTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

const getTasks = createAsyncThunk<{tasks: TaskType[], todolistId: string}, string>('tasks/getTasks', 
    async (todolistId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try{
            const res = await tasksAPI.getTasks(todolistId)
            const tasks = res.data.items
            return {todolistId, tasks}
        } catch(error: any) {
            return rejectWithValue(error)
        }
        
    }
) 

const createTask = createAsyncThunk<{ task: TaskType }, AddTaskArgType>('tasks/createTask',
    async({todolistId, title}, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try{
            const res = await tasksAPI.createTask(todolistId, title)
            const task = res.data.data.item
            return { task }
        } catch(error: any){
            return rejectWithValue(null)
        }
    }
)

const deleteTask = createAsyncThunk<{todolistId: string, taskId: string}, {todolistId: string, taskId: string}>(
    'tasks/deleteTask', async({todolistId, taskId}, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try{
            await tasksAPI.deleteTask(todolistId, taskId)
            return {todolistId, taskId}

        } catch(error: any){
            return rejectWithValue(null)
        }
    }
)

// const updateTask_ = createAsyncThunk<{todolistId: string, taskId: string, domeinModel: UpdateDomeinTaskModelType}, {todolistId: string, taskId: string, domeinModel: UpdateTaskModelType}>(
//     'tasks/updateTask', async({todolistId, taskId, domeinModel}, thunkAPI) => {
//         const {rejectWithValue, getState} = thunkAPI
//         const state = getState()
//         const task = state.tasks[todolistId].find(t => t.id === taskId)

//         if(!task){
//             console.warn('no tasks')
//             return
//         }

//         const apiModel = {
//             title: task.title,
//             description: task.description,
//             completed: task.completed,
//             status: task.status, 
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             ...domeinModel
//         }
//         try{
//             await tasksAPI.updateTask(todolistId, taskId, domeinModel)
//         }
//     }
// )

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks', 
    initialState,
    reducers: {
        changeTask: (state, action: PayloadAction<{todolistId: string, taskId: string, model: UpdateDomeinTaskModelType}>) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if(index !== -1){
                Object.assign(state[action.payload.todolistId][index], action.payload.model)
            }
        }
    },
    extraReducers: builder => builder
        .addCase(todolistsActions.setTodolists, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
        .addCase(todolistsActions.addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        .addCase(todolistsActions.removeTodolist, (state, action) => {
            delete state[action.payload.todolistId]
        })
        .addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId].push(...action.payload.tasks)
        })
        .addCase(createTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.task.todoListId];
            tasks.unshift(action.payload.task);
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if(index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        })
}) 

export const updateTask = (todolistId: string, taskId: string, domeinModel: UpdateDomeinTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()

        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if(!task){
            console.warn('no tasks')
            return
        }

        const apiModel = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status, 
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domeinModel
        }
        tasksAPI.updateTask(todolistId, taskId, apiModel).then(res => {
            dispatch(changeTask({todolistId, taskId, model: domeinModel}))
        })
    }
}


export const tasksReducer = slice.reducer

export const { changeTask } = slice.actions

export const tasksThunks = { getTasks, createTask, deleteTask }


























// import { Dispatch } from 'redux';
// import { AddTodolistActionType, SetTodolistActionType } from "./todolists-reducer"
// import { tasksAPI } from '../API/tasks-api';
// import { AppRootStateType } from './store';

// export type TaskType = {
//     description: string
//     title: string
//     completed: boolean
//     status: number
//     priority: number
//     startDate: string
//     deadline: string
//     id: string
//     todoListId: string
//     order: number
//     addedDate: string
//     // id: string
//     // title: string
//     // isDone: boolean
// }

// export type TasksStateType = {
//     [key: string]: TaskType[]
// }

// export type UpdateDomeinTaskModelType = {
//     title?: string
//     description?: string
//     completed?: boolean
//     status?: number
//     priority?: number
//     startDate?: string
//     deadline?: string
// }

// type AddTaskActionType = ReturnType<typeof addTask>

// type RamoveTaskActionType = ReturnType<typeof removeTask>

// type SetTasks = ReturnType<typeof setTasks>

// type ChangeTask = ReturnType<typeof changeTask>

// type ActionTaskType = AddTodolistActionType | AddTaskActionType | RamoveTaskActionType | SetTodolistActionType | 
// SetTasks | ChangeTask

// const initialState:TasksStateType = {}

// export const tasksReducer = (state: TasksStateType=initialState, action: ActionTaskType):TasksStateType => {
    
//     switch(action.type) {
//         case "ADD-TODOLIST":
//             return {
//                 ...state,
//                 [action.payload.todolist.id]: []
//             }
//         case "SET-TASKS":
//             return {
//                 ...state,
//                 [action.payload.todolistId]: action.payload.tasks
//             }
//         case "ADD-TASK":
//             return {
//                 ...state,
//                 [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]] 
//             }
//         case "REMOVE-TASK":
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
//             }
//         case "CHANGE-TASK": 
//             return {
//                 ...state,
//                 [action.payload.todolistId] : state[action.payload.todolistId].map(t => {
//                     if(t.id === action.payload.taskId) {
//                         return {...t, ...action.payload.model}
//                     }
//                     return t
//                 })
//             }
//         case "SET-TODOLISTS":
//             const copyState = {...state}
//             action.payload.todolists.forEach(tl => {
//                 copyState[tl.id] = []
//             })
//             return copyState

//         default:
//             return state    
//     }
// }

// export const addTask = (task: TaskType) => ({type: "ADD-TASK", 
//                                       payload: {task}} as const)

// export const removeTask = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK",
//                                                                     payload: {todolistId, taskId}} as const)

// export const setTasks = (todolistId: string, tasks: TaskType[]) => ({type: "SET-TASKS",
//                                                               payload: {todolistId, tasks}} as const)

// export const changeTask = (todolistId: string, taskId: string, model: UpdateDomeinTaskModelType) => ({type: "CHANGE-TASK",
//                                                                    payload: {todolistId, taskId, model}} as const)



// export const getTasks = (todolistId: string) => {
//     return (dispatch: Dispatch<ActionTaskType>) => {
//         tasksAPI.getTasks(todolistId).then(res => {
//             const tasks = res.data.items
//             return dispatch(setTasks(todolistId, tasks))
//         })
//     }
// }

// export const createTasks = (todolistId: string, title: string) => {
//     return (dispatch: Dispatch<ActionTaskType>) => {
//         tasksAPI.createTask(todolistId, title).then(res => {
//             const task = res.data.data.item
//             dispatch(addTask(task))
//         })
//     }
// }

// export const deleteTask = (todolistId: string, taskId: string) => {
//     return (dispatch: Dispatch<ActionTaskType>) => {
//         tasksAPI.deleteTask(todolistId, taskId).then(res => {
//             dispatch(removeTask(todolistId, taskId))
//         })
//     }
// }

// export const updateTask = (todolistId: string, taskId: string, domeinModel: UpdateDomeinTaskModelType) => {
//     return (dispatch: Dispatch<ActionTaskType>, getState: () => AppRootStateType) => {
//         const state = getState()

//         const task = state.tasks[todolistId].find(t => t.id === taskId)

//         if(!task){
//             console.warn('no tasks')
//             return
//         }

//         const apiModel = {
//             title: task.title,
//             description: task.description,
//             completed: task.completed,
//             status: task.status, 
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             ...domeinModel
//         }
//         tasksAPI.updateTask(todolistId, taskId, apiModel).then(res => {
//             dispatch(changeTask(todolistId, taskId, domeinModel))
//         })
//     }
// }

