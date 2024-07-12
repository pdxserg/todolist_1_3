import React, {ChangeEvent, MouseEventHandler, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodolistPropsType = {
	tasks: Array<TaskType>
	removeTask: (id: string) => void
	filtered: (filter: FilterType) => void
	addTask: (title: string) => void
	changeStatus: (id: string, isDone: boolean) => void
	filter: FilterType
	title: string
}

export const Todolist = ({tasks, addTask, removeTask, changeStatus, filtered, filter, title}: TodolistPropsType) => {
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
			addTask(value.trim())
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
				{tasks.length === 0
					? <p>Nothing hire</p>
					: tasks.map((t) => {

						// const removeTaskHandler = (e: MouseEventHandler<HTMLButtonElement>) => {
						//
						// }
						return (
							<li className={t.isDone === true ? "opacity" : ""} key={t.id}>
								<input type="checkbox" checked={t.isDone}
								       onChange={(e) => changeStatus(t.id, e.currentTarget.checked)}/>
								{t.title}
								<button onClick={() => removeTask(t.id)}>X</button>
							</li>
						)
					})
				}


			</ul>
			<div>
				<button className={filter === "All" ? "activeButton" : ""} onClick={() => filtered("All")}>All</button>
				<button className={filter === "Active" ? "activeButton" : ""}
				        onClick={() => filtered("Active")}>Active
				</button>
				<button className={filter === "Completed" ? "activeButton" : ""}
				        onClick={() => filtered("Completed")}>Completed
				</button>
			</div>
		</div>

	);
};

