import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { ThunkDispatch, thunk } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
//@ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
 
export type AppRootStateType = ReturnType<typeof rootReducer>
 
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
 
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector