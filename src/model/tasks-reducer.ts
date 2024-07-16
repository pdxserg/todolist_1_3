import {v1} from "uuid";
import {FilterType, TasksStateType, TodolistType} from "../App";
import {useState} from "react";


type ActionsType = AddTodolistType | RemoveTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

let todolistID1 = v1()
let todolistID2 = v1()

let  initialState:TasksStateType ={
	[todolistID1]: [
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	],
	[todolistID2]: [
		{id: v1(), title: 'Rest API', isDone: true},
		{id: v1(), title: 'GraphQL', isDone: false},
	],
}

export const tasksReducer = (state:TasksStateType = initialState, action: any):TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			return state
		}
		case 'ADD-TASK': {

			return  state
		}
		case 'CHANGE-STATUS': {
			return state
		}
		case 'CHANGE-TASK-TITLE': {
			return state
		}
		default:
			return state

	}
}

