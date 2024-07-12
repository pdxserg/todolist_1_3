import React, {ChangeEvent, MouseEventHandler,KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodolistPropsType = {
	tasks: Array<TaskType>
	removeTask:(id:number)=>void
	filtered:(filter: FilterType)=>void
	addTask:(title:string)=>void
}

export const Todolist = (props: TodolistPropsType) => {
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
		props.addTask(value.trim())
		setValue("")
}
	return (
		<div className="todolistcontayner">
			<div>
				<input type="text" value={value} onChange={onchangeHandler} onKeyUp={onKeyUpHandler}/>
				<button onClick={addTaskHandler}>+</button>
			</div>
			<ul>
				{props.tasks.length === 0
					? <p>Nothing hire</p>
					: props.tasks.map((t) => {
						// const removeTaskHandler = (e: MouseEventHandler<HTMLButtonElement>) => {
						//
						// }
						return (
							<li key={t.id}>
								<input type="checkbox" checked={t.isDone} />
								{t.title}
								<button onClick={() => props.removeTask(t.id)}>X</button>
							</li>
						)
					})
				}


			</ul>
			<div>
				<button onClick={()=>props.filtered("All")}>All</button>
				<button onClick={()=>props.filtered("Active")}>Active</button>
				<button onClick={()=>props.filtered("Completed")}>Completed</button>
			</div>
		</div>

	);
};

