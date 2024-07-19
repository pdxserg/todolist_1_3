import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistType, RemoveTodolistType} from "./todolist-reducer";


type ActionsType =
	RemoveTaskACType
	| AddTaskACType
	| AddTodolistType
	| ChangeStatusACType
	| ChangeTaskTitleACType
	| RemoveTodolistType

let todolistID1 = v1()
let todolistID2 = v1()

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.id)}
		}
		case 'ADD-TASK': {
			const newTask = {id: v1(), title: action.title, isDone: false}
			return {...state, [action.todolistID]: [...state[action.todolistID], newTask]}
		}
		case "ADD-TODOLIST": {
			return {...state, [action.newId]: []}
		}
		case "CHANGE-STATUS": {
			return {...state,
				[action.todolistID]: state[action.todolistID].map(el => el.id === action.id
					? {...el, isDone: action.isDone} : el)
			}
		}
		case "CHANGE-TASK-TITLE": {
			return {
				...state, [action.todolistID]: state[action.todolistID].map(el => el.id === action.id
					? {...el, title: action.title} : el)
			}
		}
		case "REMOVE-TODOLIST": {
			const copyState = {...state}
			delete copyState[action.id]
			return copyState

		}
		default:
			return state

	}
}

type RemoveTaskACType = {
	type: "REMOVE-TASK",
	todolistID: string
	id: string
}

export const removeTaskAC = (todolistID: string, id: string): RemoveTaskACType => {
	return {
		type: "REMOVE-TASK",
		todolistID,
		id
	} as const
}
type AddTaskACType = {
	type: 'ADD-TASK',
	todolistID: string
	title: string
}
export const addTaskAC = (todolistID: string, title: string): AddTaskACType => {
	return {
		type: 'ADD-TASK',
		todolistID,
		title
	} as const
}
type ChangeStatusACType = {
	type: 'CHANGE-STATUS',
	todolistID: string
	id: string
	isDone: boolean
}
export const changeStatusAC = (todolistID: string, id: string, isDone: boolean): ChangeStatusACType => {
	return {
		type: 'CHANGE-STATUS',
		todolistID,
		id,
		isDone
	} as const
}

type ChangeTaskTitleACType = {
	type: 'CHANGE-TASK-TITLE',
	todolistID: string,
	id: string,
	title: string
}
export const changeTaskTitleAC = (todolistID: string, id: string, title: string): ChangeTaskTitleACType => {
	return {
		type: 'CHANGE-TASK-TITLE',
		todolistID,
		id,
		title
	} as const
}