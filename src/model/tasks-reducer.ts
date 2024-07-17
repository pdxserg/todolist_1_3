import {v1} from "uuid";
import {FilterType, TasksStateType, TodolistType} from "../App";
import {useState} from "react";
import {AddTodolistType} from "./todolist-reducer";


  type ActionsType =RemoveTaskACType|AddTaskACType|AddTodolistType|ChangeStatusACType

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

export const tasksReducer = (state:TasksStateType = initialState, action: ActionsType):TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			return {...state, [action.todolistID]:state[action.todolistID].filter(el=>el.id !== action.id)}
		}
		case 'ADD-TASK': {
const newTask ={id: v1(), title: action.title, isDone: false}
			return  {...state, [action.todolistID]:[...state[action.todolistID], newTask]}
		}
		case "ADD-TODOLIST":{
			return {...state, [action.newId]:[]}
		}
		case "CHANGE-STATUS":{
			return {...state, [action.todolistID]:state[action.todolistID].map(el=> el.id === action.id
					?{...el, isDone:action.isDone} :el)}
		}
		// case 'CHANGE-STATUS': {
		// 	return state
		// }
		// case 'CHANGE-TASK-TITLE': {
		// 	return state
		// }
		default:
			return state

	}
}

type RemoveTaskACType={
	type: "REMOVE-TASK",
	todolistID:string
	id:string
}

 export const removeTaskAC=(todolistID:string, id:string): RemoveTaskACType=> {
	return {
	type: "REMOVE-TASK",
		todolistID,
		id
}as  const
}
type AddTaskACType={
	type:'ADD-TASK',
	todolistID:string
	title: string
}
export const addTaskAC= (todolistID: string, title:string):AddTaskACType =>{
return{
	type:'ADD-TASK',
	todolistID,
	title
} as const
}
 type ChangeStatusACType ={
	 type: 'CHANGE-STATUS',
	 todolistID:string
	 id:string
	 isDone: boolean
 }
export const  changeStatusAC =(todolistID:string, id:string,isDone: boolean):ChangeStatusACType=>{
	  return{
		  type: 'CHANGE-STATUS',
		  todolistID,
		  id,
		  isDone
	  } as const
}