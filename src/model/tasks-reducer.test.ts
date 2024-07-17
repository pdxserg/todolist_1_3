import { v1 } from 'uuid'
import {TasksStateType, TodolistType} from '../App'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

let todolistID1 = v1()
let todolistID2 = v1()

// 1. Стартовый state
const  startState:TasksStateType ={
	[todolistID1]: [
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: "2", title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	],
	[todolistID2]: [
		{id: v1(), title: 'Rest API', isDone: true},
		{id: v1(), title: 'GraphQL', isDone: false},
	],
}
test('correct task should be removed', () => {

	const action={
		type: "REMOVE-TASK",
			todoID:todolistID1,
			id:"2"
	}

	const endState = tasksReducer(startState, action)
	expect(endState[todolistID1].length).toBe(2)
	expect(endState[todolistID1][1].title).toBe("ReactJS")
})
// test('correct todolist should be added', () => {
//
// 	const endState = todolistsReducer(startState, addTodolistAC("New title"))
//
// 	expect(endState.length).toBe(3)
// 	 expect(endState[0].title).toBe("New title")
// })
// test('correct todolist should be update title', () => {
//
// 	const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID1, "Wierd"))
//
// 	expect(endState.length).toBe(2)
// 	 expect(endState[0].title).toBe("Wierd")
// })
// test('correct todolist filter', () => {
//
// 	const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, "Active"))
//
// 	expect(endState.length).toBe(2)
// 	 expect(endState[1].filter).toBe("Active")
// })