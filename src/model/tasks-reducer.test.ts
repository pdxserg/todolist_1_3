import {v1} from 'uuid'
import {TasksStateType} from '../App'
import {removeTodolistAC} from "./todolist-reducer";
import {addTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

let todolistID1 = v1()
let todolistID2 = v1()

// 1. Стартовый state
const startState: TasksStateType = {
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


	const endState = tasksReducer(startState, removeTaskAC(todolistID1, '2'))
	expect(endState[todolistID1].length).toBe(2)
	expect(endState[todolistID1][1].title).toBe("ReactJS")
})
test('correct task should be added', () => {

	const endState = tasksReducer(startState, addTaskAC(todolistID2, "www"))


	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID2][2].title).toBe("www")
})
test('property with todolistId should be deleted', () => {
	const startState: TasksStateType = {
		'todolistId1': [
			{id: '1', title: 'CSS', isDone: false},
			{id: '2', title: 'JS', isDone: true},
			{id: '3', title: 'React', isDone: false}
		],
		'todolistId2': [
			{id: '1', title: 'bread', isDone: false},
			{id: '2', title: 'milk', isDone: true},
			{id: '3', title: 'tea', isDone: false}
		]
	}

	const action = removeTodolistAC('todolistId2')

	const endState = tasksReducer(startState, action)


	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeDefined()
})
