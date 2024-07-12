import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type TasksStateType = {
	[key: string]: Array<TaskType>
}
type TodolistType = {
	id: string
	title: string
	filter: FilterType
}
export type FilterType = "All" | "Active" | "Completed"

function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'All' },
		{ id: todolistID2, title: 'What to buy', filter: 'All' },
	])

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})
	console.log(todolists)
	console.log(tasks)
		const removeTask = (todolistID:string, id: string) => {
			setTasks({...tasks, [todolistID]:tasks[todolistID].filter((t) => t.id !== id)})
		}
		const addTask = (todolistID:string, title: string) => {
			 const newTask = {id: v1(), title: title, isDone: false}
			 setTasks({...tasks, [todolistID]:[...tasks[todolistID], newTask]})
		}
		const filtered = (todolistId:string,filter: FilterType) => {
			setTodolists(todolists.map(t=>t.id === todolistId ?{...t, filter } :t))
		}
		const changeStatus = (todolistID:string, taskId: string, isDone: boolean) => {
			 setTasks({...tasks,
				 [todolistID]: tasks[todolistID].map(task=>task.id ===taskId?{...task, isDone} :task)})
		}
		const removeTodolist =(todolistId:string)=>{
		setTodolists( todolists.filter(t=>t.id !== todolistId))
			delete tasks[todolistId]
		}

		return (
			<div className="App">
				{todolists.map(todol=>{

					let filteredTasks = tasks
					// if (todol.filter === "Active") {
					// 	filteredTasks = tasks[todol.id].filter((t) => t.isDone === false)
					// }
					// if (todol.filter === "Completed") {
					// 	filteredTasks = tasks[todol.id].filter((t) => t.isDone === true)
					// }

					return(
						<Todolist
							key = {todol.id}
							todolistId={todol.id}
							title={todol.title}
							tasks={filteredTasks}
							removeTask={removeTask}
							filtered={filtered}
							addTask={addTask}
							changeStatus={changeStatus}
							filter={todol.filter}
							removeTodolist={removeTodolist}
						/>
					)
				})}

			</div>
		);
	}

	export default App;
