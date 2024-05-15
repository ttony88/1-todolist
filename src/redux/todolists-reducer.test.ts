// import { v1 } from "uuid"
// import { StateTodolistType, addTodolist, removeTodolist, todolistsReducer } from "./todolists-reducer"

// let todolistId1 = v1()
// let todolistId2 = v1()
// let startState: StateTodolistType 

// beforeEach(() => {
//     startState = [
//         {id: todolistId1, title: "tools", addedDate: '', order:0, filter: 'all'},
//         {id: todolistId2, title: "skills", addedDate: '', order:0, filter: 'all'},
//     ]
// })

// test("the todolist must be added correctly", () => {
//     const id = v1()
//     const todolist = {id, title: "purchases", addedDate: '', order: 0}
//     const endState = todolistsReducer(startState, addTodolist(todolist))
//     expect(endState.length).toBe(3)
//     expect(endState[0].title).toBe("purchases")
// })

// test("one of the todolists is being deleted correctly", () => {
//     const endState = todolistsReducer(startState, removeTodolist(todolistId1))
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todolistId2)
// })
export {}
