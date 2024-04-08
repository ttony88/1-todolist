import { v1 } from "uuid"
import { StateTodolistType, addTodolist, deleteTodolist, todolistsReducer } from "./todolists-reducer"

let todolistId1 = v1()
let todolistId2 = v1()
let startState: StateTodolistType 

beforeEach(() => {
    startState = [
        {id: todolistId1, title: "tools"},
        {id: todolistId2, title: "skills"},
    ]
})

test("the todolist must be added correctly", () => {
    const id = v1()
    const endState = todolistsReducer(startState, addTodolist("purchases", id))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("purchases")
})

test("one of the todolists is being deleted correctly", () => {
    const endState = todolistsReducer(startState, deleteTodolist(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})