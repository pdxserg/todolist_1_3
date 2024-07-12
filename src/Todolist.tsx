import React, {ChangeEvent, MouseEventHandler, KeyboardEvent, useState} from 'react';
import {FilterType, TasksStateType, TaskType} from "./App";

type TodolistPropsType = {
	tasks:TasksStateType
	removeTask: (id: string) => void
	filtered: (todolistId: string, filter: FilterType) => void
	addTask: (todolistId: string, title: string) => void
	changeStatus: (todolistId:string, id: string, isDone: boolean) => void
	filter: FilterType
	title: string
	todolistId:string
}

export const Todolist = ({tasks, addTask, removeTask, changeStatus, filtered, filter, title, todolistId}: TodolistPropsType) => {
	const [value, setValue] = useState("")
	const [error, setError] = useState<null | string>(null)
	const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.key === "Enter") {
			addTaskHandler()
		}
	}
	const addTaskHandler = () => {
		if (value.trim() !== "") {
			addTask(todolistId, value.trim())
			setValue("")

		} else {
			setError("Title is required!")
		}

	}
	return (
		<div className="todolistcontayner">
			<h2>{title}</h2>
			<div>
				<input className={error ? 'error' : ''}
				       type="text"
				       value={value}
				       onChange={onchangeHandler}
				       onKeyUp={onKeyUpHandler}/>
				<button className={error ? 'error' : ''} onClick={addTaskHandler}>+</button>
				{/*<p className={error ? "error-message" : ""}>{error}</p>*/}
				{error && <div className={'error-message'}>{error}</div>}
			</div>
			<ul>
				{tasks[todolistId].length === 0
					? <p>Nothing hire</p>
					: tasks[todolistId].map((t) => {

						// const removeTaskHandler = (e: MouseEventHandler<HTMLButtonElement>) => {
						//
						// }
						return (
							<li className={t.isDone === true ? "opacity" : ""} key={t.id}>
								<input type="checkbox" checked={t.isDone}
								       onChange={(e) => changeStatus(todolistId,t.id, e.currentTarget.checked)}/>
								{t.title}
								<button onClick={() => removeTask(t.id)}>X</button>
							</li>
						)
					})
				}


			</ul>
			<div>
				<button className={filter === "All" ? "activeButton" : ""}
				        onClick={() => filtered(todolistId,"All")}>All
				</button>

				<button className={filter === "Active" ? "activeButton" : ""}
				        onClick={() => filtered(todolistId,"Active")}>Active
				</button>

				<button className={filter === "Completed" ? "activeButton" : ""}
				        onClick={() => filtered(todolistId,"Completed")}>Completed
				</button>
			</div>
		</div>

	);
};

