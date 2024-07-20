import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model/todolist-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodolistWithredux} from "./TodolistWithRedux";


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type TasksStateType = {
	[key: string]: Array<TaskType>
}
export type TodolistType = {
	id: string
	title: string
	filter: FilterType
}
export type FilterType = "All" | "Active" | "Completed"

function AppWithRedux() {
	console.log("AppWithRedux")

	const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
	const dispatch = useDispatch()
	const removeTask = (todolistID: string, id: string) => {
		dispatch(removeTaskAC(todolistID, id))
	}
	const addTask = (todolistID: string, title: string) => {
		dispatch(addTaskAC(todolistID, title))
	}
	const filtered = (todolistId: string, filter: FilterType) => {
		dispatch(changeTodolistFilterAC(todolistId, filter))
	}
	const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
		dispatch(changeStatusAC(todolistID, taskId, isDone))
	}
	const removeTodolist = (todolistId: string) => {
		dispatch(removeTodolistAC(todolistId))
	}
	const addTodolist =useCallback ((title: string) => {
		dispatch( addTodolistAC(title))
	},[])
	const changeTodolistTitle = (todolistID: string, newTitle: string) => {
		dispatch(changeTodolistTitleAC(todolistID, newTitle))
	}
	const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
		dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
	}
	return (
		<div className="App">
			<AddItemForm addTitle={addTodolist}/>
			{todolists.map(todol => {
				return (
					<TodolistWithredux
						key={todol.id}
						todolist={todol}
					/>
				)
			})}

		</div>
	);
}

export default AppWithRedux;
