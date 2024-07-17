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

function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
		{id: todolistID1, title: 'What to learn', filter: 'All'},
		{id: todolistID2, title: 'What to buy', filter: 'All'},
	])

	const [tasks, dispatchTasks] = useReducer(tasksReducer,
		{
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
	)

	const removeTask = (todolistID: string, id: string) => {
		dispatchTasks(removeTaskAC(todolistID, id))
	}
	const addTask = (todolistID: string, title: string) => {
		dispatchTasks(addTaskAC(todolistID, title))
	}
	const filtered = (todolistId: string, filter: FilterType) => {
		dispatchTodolist(changeTodolistFilterAC(todolistId, filter))
	}
	const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
		dispatchTasks(changeStatusAC(todolistID, taskId, isDone))
	}
	const removeTodolist = (todolistId: string) => {
		dispatchTodolist(removeTodolistAC(todolistId))
		delete tasks[todolistId]
	}
	const addTodolist = (title: string) => {
		// const newId= v1()
		const action = addTodolistAC(title)
		dispatchTodolist(action)
		dispatchTasks(action)

	}
	const changeTodolistTitle = (todolistID: string, newTitle: string) => {
		dispatchTodolist(changeTodolistTitleAC(todolistID, newTitle))
	}
	const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
		dispatchTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
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

export default App;
