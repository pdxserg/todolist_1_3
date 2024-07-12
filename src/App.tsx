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

function App() {
	const [tasks, setTasks]= useState([
			{id: 1, title: "HTML", isDone: true},
			{id: 2, title: "CSS", isDone: false},
			{id: 3, title: "React", isDone: true}
		])
const removeTask =(id:number)=>{
		setTasks(tasks.filter((t)=> t.id !== id))
}
	return (
		<div className="App">
			<Todolist tasks={tasks}
			          removeTask={removeTask}
			/>
		</div>
	);
}

export default App;
