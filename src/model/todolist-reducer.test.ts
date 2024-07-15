import { v1 } from 'uuid'
import { TodolistType } from '../App'
import {action, addTodolist, changeTodolistFilter, changeTodolistTitle, todolistsReducer} from "./todolist-reducer";

test('correct todolist should be removed', () => {
	let todolistId1 = "todolistID1"
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TodolistType[] = [
		{ id: todolistId1, title: 'What to learn', filter: 'All' },
		{ id: todolistId2, title: 'What to buy', filter: 'All' },
	]

	const endState = todolistsReducer(startState, action)

	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
	// в массиве останется один тудулист
	expect(endState.length).toBe(1)
	// удалится нужный тудулист, а не любой
	expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TodolistType[] = [
		{ id: todolistId1, title: 'What to learn', filter: 'All' },
		{ id: todolistId2, title: 'What to buy', filter: 'All' },
	]

	const endState = todolistsReducer(startState, addTodolist)

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

	const endState = todolistsReducer(startState, changeTodolistTitle)

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

	const endState = todolistsReducer(startState, changeTodolistFilter)

	expect(endState.length).toBe(2)
	 expect(endState[1].filter).toBe("Active")
})