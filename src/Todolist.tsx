import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
	tasks: TaskType[]
	removeTask: (todolistID: string, id: string) => void
	filtered: (todolistId: string, filter: FilterType) => void
	addTask: (todolistId: string, title: string) => void
	changeStatus: (todolistId: string, id: string, isDone: boolean) => void
	filter: FilterType
	title: string
	todolistId: string
	removeTodolist: (todolistId: string) => void
	changeTodolistTitle: (todolistId: string, newTitle: string) => void
	changeTaskTitle: (todolistId: string,taskId:string, newTitle: string) => void
}

export const Todolist = ({
	                         tasks,
	                         addTask,
	                         removeTask,
	                         changeStatus,
	                         filtered,
	                         filter,
	                         title,
	                         todolistId,
	                         removeTodolist,
	                         changeTodolistTitle,
	                         changeTaskTitle
                         }: TodolistPropsType) => {


	const addTitle = (title: string) => {
		addTask(todolistId, title)
	}
	const calbackTodoHandler = (newTitle: string) => {
		changeTodolistTitle(todolistId, newTitle)
	}

	return (
		<div className="todolistcontayner">
			<button className="remove-todolist"
			        onClick={() => removeTodolist(todolistId)}>x
			</button>
			<h2><EditableSpan title={title} callback={calbackTodoHandler}/></h2>

			<div>
				<AddItemForm addTitle={addTitle}/>
			</div>
			<ul>
				{tasks.length === 0
					? <p>Nothing hire</p>
					: tasks.map((t) => {
						const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							changeStatus(todolistId, t.id, e.currentTarget.checked)
						}
						const calbackTaskHandler=(newTitle: string)=>{
							changeTaskTitle(todolistId,t.id,newTitle)
						}

						return (
							<li className={t.isDone === true ? "opacity" : ""} key={t.id}>
								<input type="checkbox" checked={t.isDone}
								       onChange={changeStatusHandler}/>
								<EditableSpan title={t.title} callback={calbackTaskHandler}/>
								<button onClick={() => removeTask(todolistId, t.id)}>X</button>
							</li>
						)
					})
				}


			</ul>
			<div>
				<button className={filter === "All" ? "activeButton" : ""}
				        onClick={() => filtered(todolistId, "All")}>All
				</button>

				<button className={filter === "Active" ? "activeButton" : ""}
				        onClick={() => filtered(todolistId, "Active")}>Active
				</button>

				<button className={filter === "Completed" ? "activeButton" : ""}
				        onClick={() => filtered(todolistId, "Completed")}>Completed
				</button>
			</div>
		</div>

	);
};

