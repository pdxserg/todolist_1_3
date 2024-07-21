import React, {ChangeEvent, useCallback} from 'react';
import {TodolistType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model/todolist-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";

type TodolistPropsType = {
	todolist: TodolistType
}

export const TodolistWithredux = React.memo (({todolist}: TodolistPropsType) => {
	console.log("todolist")

	const {id, title, filter} = todolist

	let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
	const dispatch = useDispatch()
	const addTitle =useCallback( (title: string) => {
		dispatch(addTaskAC(todolist.id, title))
	},[dispatch,todolist.id])
	const calbackTodoHandler = (newTitle: string) => {
		dispatch(changeTodolistTitleAC(id, newTitle))
	}

	if (filter === "Active") {
		tasks = tasks.filter((t) => t.isDone === false)
	}
	if (filter === "Completed") {
		tasks = tasks.filter((t) => t.isDone === true)
	}

	const onClickAllHandler= () => dispatch(changeTodolistFilterAC(id, "All"))
	const onClickActiveHandler =() => dispatch(changeTodolistFilterAC(id, "Active"))
	const onClickCompletedHandler=() => dispatch(changeTodolistFilterAC(id, "Completed"))

	return (
		<div className="todolistcontayner">
			<button className="remove-todolist"
			        onClick={() => dispatch(removeTodolistAC(id))}>x
			</button>
			<h2>Redux<EditableSpan title={title} callback={calbackTodoHandler}/></h2>

			<div>
				<AddItemForm addTitle={addTitle}/>
			</div>
			<ul>
				{tasks.length === 0
					? <p>Nothing hire</p>
					: tasks.map((t) => {
						const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							dispatch(changeStatusAC(id, t.id, e.currentTarget.checked))
						}
						const calbackTaskHandler = (newTitle: string) => {
							dispatch(changeTaskTitleAC(id, t.id, newTitle))
						}

						return (
							<li className={t.isDone === true ? "opacity" : ""} key={t.id}>
								<input type="checkbox"
								       checked={t.isDone}
								       onChange={changeStatusHandler}/>
								<EditableSpan title={t.title} callback={calbackTaskHandler}/>
								<button onClick={() => dispatch(removeTaskAC(id, t.id))}>X</button>
							</li>
						)
					})
				}


			</ul>
			<div className="foter-buttons">
				<button className={filter === "All" ? "activeButton" : ""}
				        onClick={onClickAllHandler}>All
				</button>

				<button className={filter === "Active" ? "activeButton" : ""}
				        onClick={onClickActiveHandler}>Active
				</button>

				<button className={filter === "Completed" ? "activeButton" : ""}
				        onClick={onClickCompletedHandler}>Completed
				</button>
			</div>
		</div>

	);
})

