import {v1} from "uuid";
import {TodolistType} from "../App";


type AddTodolistType = {
	type: 'ADD-TODOLIST'
	title:string
}
type RemoveTodolist = {
	type: 'REMOVE-TODOLIST',
		id: string
}
type ChangeTodolistTitleType={
	type: 'CHANGE-TITLE',
	id:string
	title: string
}
type ChangeTodolistFilterType={
	type: 'CHANGE-TOD0-FILTER',
	id:string,
	filter:string
}
type ActionsType=AddTodolistType|RemoveTodolist|ChangeTodolistTitleType|ChangeTodolistFilterType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState = <TodolistType[]>([
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'},
])

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(t => t.id !== action.id)
		}
		case 'ADD-TODOLIST': {
			const newTodolist:TodolistType ={id: "newId", title:action.title, filter: 'All'}
			return [newTodolist, ...state, ]
		}
		case 'CHANGE-TITLE':{
			return 	state.map(t=>t.id === action.id?{...t, title:action.title} :t )
		}
		case 'CHANGE-TOD0-FILTER':{
			return state.map(t => t.id === action.id ? {...t, filter:action.filter} : t)
		}
		default:return state

	}
}

 export const removeTodolist = {
	type: 'REMOVE-TODOLIST',
		id: "todolistID1",
}as const
 export const addTodolist = {
	type: 'ADD-TODOLIST',
		title: "New title",
} as const

export const changeTodolistTitle={
	type: 'CHANGE-TITLE',
	id: "1",
	title: "Wierd"
}as const


export const changeTodolistFilter={
	type: 'CHANGE-TOD0-FILTER',
	id:'2',
	filter:"Active"
}as const
