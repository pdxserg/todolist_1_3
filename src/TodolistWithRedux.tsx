import React, {ChangeEvent, useCallback} from 'react';
import {TodolistType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model/todolist-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";
import {FilterButtons} from "./components/FilterButtons";

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

	const onClickAllHandler= useCallback (() =>{
		dispatch(changeTodolistFilterAC(id, "All"))
	} ,[dispatch,id])
	const onClickActiveHandler = useCallback(() => {
		dispatch(changeTodolistFilterAC(id, "Active"))
	} ,[dispatch,id])
	const onClickCompletedHandler= useCallback(() => {
		dispatch(changeTodolistFilterAC(id, "Completed"))
	} ,[dispatch,id])

	return (
		<div className="todolistcontayner">
			<button className="remove-todolist"
			        onClick={() => dispatch(removeTodolistAC(id))}>x
			</button>
			<h2>Redux<EditableSpan title={title} callback={calbackTodoHandler}/></h2>

			<div>
				<AddItemForm addTitle={addTitle}/>
			</div>
			<ul className="tasks-container">
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
							<li className={`li-container ${t.isDone === true ? "opacity" : ""}`}
							 // className={t.isDone === true ? "opacity" : ""}
							    key={t.id}>
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
			<FilterButtons filter={filter}
			               onClickAllHandler={onClickAllHandler}
			               onClickActiveHandler={onClickActiveHandler}
			               onClickCompletedHandler={onClickCompletedHandler}  />
		</div>

	);
})

