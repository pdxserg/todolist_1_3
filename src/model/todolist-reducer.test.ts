import { v1 } from 'uuid'
import { TodolistType } from '../App'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from "./todolist-reducer";

let todolistID1 = v1()
let todolistID2 = v1()

// 1. Стартовый state
const startState: TodolistType[] = [
	{ id: todolistID1, title: 'What to learn', filter: 'All' },
	{ id: todolistID2, title: 'What to buy', filter: 'All' },
]
test('correct todolist should be removed', () => {

	const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))
	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistID2)
})
test('correct todolist should be added', () => {

	const endState = todolistsReducer(startState, addTodolistAC("New title"))

	expect(endState.length).toBe(3)
	 expect(endState[0].title).toBe("New title")
})
test('correct todolist should be update title', () => {

	const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID1, "Wierd"))

	expect(endState.length).toBe(2)
	 expect(endState[0].title).toBe("Wierd")
})
test('correct todolist filter', () => {

	const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, "Active"))

	expect(endState.length).toBe(2)
	 expect(endState[1].filter).toBe("Active")
})