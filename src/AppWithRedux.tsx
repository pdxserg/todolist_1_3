import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {addTodolistAC} from "./model/todolist-reducer";
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

	const addTodolist = useCallback((title: string) => {
		dispatch(addTodolistAC(title))
	}, [dispatch])

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
