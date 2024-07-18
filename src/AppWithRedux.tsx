import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from "./model/todolist-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


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

	// let todolistID1 = v1()
	// let todolistID2 = v1()
	//
	// let [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
	// 	{id: todolistID1, title: 'What to learn', filter: 'All'},
	// 	{id: todolistID2, title: 'What to buy', filter: 'All'},
	// ])
	//
	// const [tasks, dispatchTasks] = useReducer(tasksReducer,
	// 	{
	// 		[todolistID1]: [
	// 			{id: v1(), title: 'HTML&CSS', isDone: true},
	// 			{id: v1(), title: 'JS', isDone: true},
	// 			{id: v1(), title: 'ReactJS', isDone: false},
	// 		],
	// 		[todolistID2]: [
	// 			{id: v1(), title: 'Rest API', isDone: true},
	// 			{id: v1(), title: 'GraphQL', isDone: false},
	// 		],
	// 	}
	// )
const todolists =useSelector<AppRootStateType, TodolistType[]>(state=>state.todolists)
	const tasks =useSelector<AppRootStateType, TasksStateType>(state => state.task)
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
	const addTodolist = (title: string) => {
		// const newId= v1()
		const action = addTodolistAC(title)
		dispatch(action)


	}
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

				let filteredTasks = tasks[todol.id]
				if (todol.filter === "Active") {
					filteredTasks = filteredTasks.filter((t) => t.isDone === false)
				}
				if (todol.filter === "Completed") {
					filteredTasks = filteredTasks.filter((t) => t.isDone === true)
				}

				return (
					<Todolist
						key={todol.id}
						todolistId={todol.id}
						title={todol.title}
						tasks={filteredTasks}
						removeTask={removeTask}
						filtered={filtered}
						addTask={addTask}
						changeStatus={changeStatus}
						filter={todol.filter}
						removeTodolist={removeTodolist}
						changeTodolistTitle={changeTodolistTitle}
						changeTaskTitle={changeTaskTitle}
					/>
				)
			})}

		</div>
	);
}

export default AppWithRedux;
