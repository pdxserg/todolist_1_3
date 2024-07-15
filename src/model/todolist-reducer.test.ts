import { v1 } from 'uuid'
import { TodolistType } from '../App'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from "./todolist-reducer";

test('correct todolist should be removed', () => {
	let todolistID1 = v1()
	let todolistID2 = v1()

	// 1. Стартовый state
	const startState: TodolistType[] = [
		{ id: todolistID1, title: 'What to learn', filter: 'All' },
		{ id: todolistID2, title: 'What to buy', filter: 'All' },
	]
const thisId = todolistID1
	const endState = todolistsReducer(startState, removeTodolistAC(thisId))

	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
	// в массиве останется один тудулист
	expect(endState.length).toBe(1)
	// удалится нужный тудулист, а не любой
	expect(endState[0].id).toBe(todolistID2)
})
test('correct todolist should be added', () => {
	let todolistID1 = v1()
	let todolistID2 = v1()

	// 1. Стартовый state
	const startState: TodolistType[] = [
		{ id: todolistID1, title: 'What to learn', filter: 'All' },
		{ id: todolistID2, title: 'What to buy', filter: 'All' },
	]

	const endState = todolistsReducer(startState, addTodolistAC("New title"))

	expect(endState.length).toBe(3)
	 expect(endState[0].title).toBe("New title")
})
test('correct todolist should be update title', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TodolistType[] = [
		{ id: "1", title: 'What to learn', filter: 'All' },
		{ id: "2", title: 'What to buy', filter: 'All' },
	]

	const endState = todolistsReducer(startState, changeTodolistTitleAC)

	expect(endState.length).toBe(2)
	 expect(endState[0].title).toBe("Wierd")
})
test('correct todolist filter', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TodolistType[] = [
		{ id: "1", title: 'What to learn', filter: 'All' },
		{ id: "2", title: 'What to buy', filter: 'All' },
	]

	const endState = todolistsReducer(startState, changeTodolistFilterAC)

	expect(endState.length).toBe(2)
	 expect(endState[1].filter).toBe("Active")
})