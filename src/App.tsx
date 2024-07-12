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
const removeTask =()=>{

}
	return (
		<div className="App">
			<Todolist tasks={tasks}

			/>
		</div>
	);
}

export default App;
