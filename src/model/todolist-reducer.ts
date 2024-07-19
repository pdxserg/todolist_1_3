import {v1} from "uuid";
import {FilterType, TodolistType} from "../App";


export type AddTodolistType = {
	type: 'ADD-TODOLIST'
	newId:string
	title: string
}
export type RemoveTodolistType = {
	type: 'REMOVE-TODOLIST',
	id: string
}
type ChangeTodolistTitleType = {
	type: 'CHANGE-TITLE',
	id: string
	title: string
}
type ChangeTodolistFilterType = {
	type: 'CHANGE-TOD0-FILTER',
	id: string,
	filter: FilterType
}
type ActionsType = AddTodolistType | RemoveTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState:TodolistType[] =[]

export const todolistsReducer = (state = initialState, action: ActionsType):TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(t => t.id !== action.id)
		}
		case 'ADD-TODOLIST': {
			const newTodolist: TodolistType = {id: action.newId, title: action.title, filter: 'All'}
			return [newTodolist, ...state,]
		}
		case 'CHANGE-TITLE': {
			return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
		}
		case 'CHANGE-TOD0-FILTER': {
			return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
		}
		default:
			return state

	}
}

export const removeTodolistAC = (id: string): RemoveTodolistType => {
	return {
		type: 'REMOVE-TODOLIST',
		id
	} as const
}
export const addTodolistAC = ( title: string): AddTodolistType => {
	return {
		type: 'ADD-TODOLIST',
		newId:v1(),
		title,

	} as const
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
	return {
		type: 'CHANGE-TITLE',
		id,
		title
	} as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterType => {
	return {
		type: 'CHANGE-TOD0-FILTER',
		id,
		filter

	} as const
}