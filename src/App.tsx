import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TaskType = {
	id: number
	title: string
	isDone: boolean
}
// type TasksType = {
// 	tasks: Array<TaskType>
// }
export type FilterType= "All"|"Active"|"Completed"
function App() {

	const [tasks, setTasks]= useState([
			{id: 1, title: "HTML", isDone: true},
			{id: 2, title: "CSS", isDone: false},
			{id: 3, title: "React", isDone: true}
		])
	const [filter, setFilter]=useState<FilterType>("All")
	const removeTask =(id:number)=>{
		setTasks(tasks.filter((t)=> t.id !== id))
}

const filtered =(filter: FilterType)=>{
		setFilter(filter)
}

let filteredTasks = tasks
	if (filter === "Active"){
		filteredTasks=tasks.filter((t)=>t.isDone === false )
	}if (filter === "Completed"){
		filteredTasks=tasks.filter((t)=>t.isDone === true )
	}

	return (
		<div className="App">
			<Todolist tasks={filteredTasks}
			          removeTask={removeTask}
			          filtered={filtered}

			/>
		</div>
	);
}

export default App;
