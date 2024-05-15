// import { TasksStateType, addTask, changeStatusTask, deleteTask, tasksReducer } from "./tasks-reducer";

// let startState: TasksStateType

// beforeEach(() => {
//     startState = {
//         "todolistId1": [
//                         {id: "1", title: "React", isDone: false},
//                         {id: "2", title: "Redux", isDone: false},
//                        ],
//         "todolistId2": [
//                         {id: "1", title: "HTML", isDone: false},
//                         {id: "2", title: "CSS", isDone: false},
//                        ],
//     }
// })

// test("the task must be added correctly", () => {
//     const endState = tasksReducer(startState, addTask("SCSS", "todolistId2"))
//     expect(endState["todolistId2"].length).toBe(3)
// })

// test("correct deletion of the task", () => {
//     const action = deleteTask("todolistId1", "1")
//     const endState = tasksReducer(startState, action)
//     expect(endState["todolistId1"].length).toBe(1)
// })

// test("correct status change", () => {
//     const action = changeStatusTask("todolistId1", "1", false)
//     const endState = tasksReducer(startState, action)
//     expect(endState["todolistId1"][1].isDone).toBe(false)
// })
export {}