import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
// type TasksType = {
// 	tasks: Array<TaskType>
// }
type TodolistType = {
	id: string
	title: string
	filter: FilterType
}
export type FilterType = "All" | "Active" | "Completed"

function App() {



		const [todolists, setTodolists] = useState<TodolistType[]>([
			{id: v1(), title: 'What to learn?', filter: 'All'},
			{id: v1(), title: 'What to buy', filter: 'All'},
		])

		const [tasks, setTasks] = useState([
			{id: v1(), title: "HTML", isDone: true},
			{id: v1(), title: "CSS", isDone: false},
			{id: v1(), title: "React", isDone: true}
		])
		const [filter, setFilter] = useState<FilterType>("All")
		const removeTask = (id: string) => {
			setTasks(tasks.filter((t) => t.id !== id))
		}
		const addTask = (title: string) => {
			const newTask = {id: v1(), title: title, isDone: false}
			setTasks([newTask, ...tasks])
		}
		const filtered = (filter: FilterType) => {
			setFilter(filter)
		}
		const changeStatus = (id: string, isDone: boolean) => {
			setTasks(tasks.map(t => t.id === id ? {...t, isDone} : t))

		}
		let filteredTasks = tasks
		if (filter === "Active") {
			filteredTasks = tasks.filter((t) => t.isDone === false)
		}
		if (filter === "Completed") {
			filteredTasks = tasks.filter((t) => t.isDone === true)
		}

		return (
			<div className="App">
				<Todolist
					title={todolists[0].title}
					tasks={filteredTasks}
					removeTask={removeTask}
					filtered={filtered}
					addTask={addTask}
					changeStatus={changeStatus}
					filter={filter}


				/>
			</div>
		);
	}

	export default App;
