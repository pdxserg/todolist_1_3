import React, {ChangeEvent} from 'react';
import {TodolistType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TasksStateType, TaskType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model/todolist-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";

type TodolistPropsType = {
	todolist: TodolistType


}

export const TodolistWithredux = ({todolist}: TodolistPropsType) => {

	const{id, title, filter }=todolist

	let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
	const dispatch = useDispatch()
	const addTitle = (title: string) => {
		dispatch(addTaskAC(todolist.id, title))
	}
	const calbackTodoHandler = (newTitle: string) => {
		dispatch(changeTodolistTitleAC(id, newTitle))
	}

	if (filter === "Active") {
		tasks = tasks.filter((t) => t.isDone === false)
	}
	if (filter === "Completed") {
		tasks = tasks.filter((t) => t.isDone === true)
	}
	return (
		<div className="todolistcontayner">
			<button className="remove-todolist"
			        onClick={() => dispatch(removeTodolistAC( id))}>x
			</button>
			<h2>iii<EditableSpan title={title} callback={calbackTodoHandler}/></h2>

			<div>
				<AddItemForm addTitle={addTitle}/>
			</div>
			<ul>
				{tasks.length === 0
					? <p>Nothing hire</p>
					: tasks.map((t) => {
						const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							dispatch(changeStatusAC( id, t.id, e.currentTarget.checked))
						}
						const calbackTaskHandler = (newTitle: string) => {
							dispatch(changeTaskTitleAC( id, t.id, newTitle))
						}

						return (
							<li className={t.isDone === true ? "opacity" : ""} key={t.id}>
								<input type="checkbox"
								       checked={t.isDone}
								       onChange={changeStatusHandler}/>
								<EditableSpan title={t.title} callback={calbackTaskHandler}/>
								<button onClick={() => dispatch(removeTaskAC( id, t.id))}>X</button>
							</li>
						)
					})
				}


			</ul>
			<div className="foter-buttons">
				<button className={filter === "All" ? "activeButton" : ""}
				        onClick={() => dispatch(changeTodolistFilterAC( id, "All"))}>All
				</button>

				<button className={filter === "Active" ? "activeButton" : ""}
				        onClick={() => dispatch(changeTodolistFilterAC( id, "Active"))}>Active
				</button>

				<button className={filter === "Completed" ? "activeButton" : ""}
				        onClick={() => dispatch(changeTodolistFilterAC( id, "Completed"))}>Completed
				</button>
			</div>
		</div>

	);
};

