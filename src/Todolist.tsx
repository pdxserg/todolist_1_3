import React, {ChangeEvent, MouseEventHandler,KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodolistPropsType = {
	tasks: Array<TaskType>
	removeTask:(id:number)=>void
	filtered:(filter: FilterType)=>void
	addTask:(title:string)=>void
	changeStatus:(id:number, isDone:boolean)=>void
	filter:FilterType
}

export const Todolist = ({tasks, addTask, removeTask, changeStatus, filtered, filter}: TodolistPropsType) => {
const [value, setValue]= useState("")
const onchangeHandler=(e: ChangeEvent<HTMLInputElement> )=>{
	setValue(e.currentTarget.value)
}

const onKeyUpHandler =(e:KeyboardEvent<HTMLInputElement>)=>{
	if(e.key === "Enter"   ){
		addTaskHandler()
	}}
	const addTaskHandler =()=>{
	if(value.length === 0){
		<p>wrong</p>
	}
		 addTask(value.trim())
		setValue("")
}
	return (
		<div className="todolistcontayner">
			<div>
				<input type="text" value={value} onChange={onchangeHandler} onKeyUp={onKeyUpHandler}/>
				<button onClick={addTaskHandler}>+</button>
			</div>
			<ul>
				{ tasks.length === 0
					? <p>Nothing hire</p>
					:  tasks.map((t) => {

						// const removeTaskHandler = (e: MouseEventHandler<HTMLButtonElement>) => {
						//
						// }
						return (
							<li className={t.isDone===true?"opacity":""} key={t.id}>
								<input type="checkbox" checked={t.isDone} onChange={(e)=> changeStatus(t.id,e.currentTarget.checked)}/>
								{t.title}
								<button onClick={() =>  removeTask(t.id)}>X</button>
							</li>
						)
					})
				}


			</ul>
			<div>
				<button className={filter === "All"?"activeButton":""} onClick={()=> filtered("All")}>All</button>
				<button className={filter === "Active"?"activeButton":""} onClick={()=> filtered("Active")}>Active</button>
				<button className={filter === "Completed"?"activeButton":""} onClick={()=> filtered("Completed")}>Completed</button>
			</div>
		</div>

	);
};

