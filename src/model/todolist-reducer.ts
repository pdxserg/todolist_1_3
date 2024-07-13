import {v1} from "uuid";
import {TodolistType} from "../App";


type AddTodolistType = {
	type: string
	payload: any
}
type ActionsType=AddTodolistType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState = <TodolistType[]>([
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'},
])

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(t => t.id !== action.payload.id)

			// setTodolists(todolists.filter(t => t.id !== todolistId))
		}
		case 'ADD-TODOLIST': {
			const newTodolist:TodolistType ={id: "newId", title:action.payload.title, filter: 'All'}
			return [newTodolist, ...state, ]

			// const newTodolist:TodolistType ={id: newId, title, filter: 'All'}
			// setTodolists([newTodolist, ...todolists])
		}
		default:return state

	}
}

 export const addTodolist = {
	type: 'ADD-TODOLIST',
	payload: {
		title: "New title",
	},
}
