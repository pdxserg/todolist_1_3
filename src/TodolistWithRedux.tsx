import React, {useCallback} from 'react';
import {TodolistType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model/todolist-reducer";
import {addTaskAC} from "./model/tasks-reducer";
import {FilterButtons} from "./components/FilterButtons";
import {Task} from "./components/Task";

type TodolistPropsType = {
	todolist: TodolistType
}

export const TodolistWithredux = React.memo(({todolist}: TodolistPropsType) => {
	console.log("todolist")

	const {id, title, filter} = todolist

	let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
	// debugger
	const dispatch = useDispatch()

	const addTitle = useCallback((title: string) => {
		dispatch(addTaskAC(todolist.id, title))
	}, [dispatch, todolist.id])

	const calbackTodoHandler = useCallback((newTitle: string) => {
		dispatch(changeTodolistTitleAC(id, newTitle))
	}, [dispatch, id])

	if (filter === "Active") {
		tasks = tasks.filter((t) => t.isDone === false)
	}
	if (filter === "Completed") {
		tasks = tasks.filter((t) => t.isDone === true)
	}

	const onClickAllHandler = useCallback(() => {
		dispatch(changeTodolistFilterAC(id, "All"))
	}, [dispatch, id])
	const onClickActiveHandler = useCallback(() => {
		dispatch(changeTodolistFilterAC(id, "Active"))
	}, [dispatch, id])
	const onClickCompletedHandler = useCallback(() => {
		dispatch(changeTodolistFilterAC(id, "Completed"))
	}, [dispatch, id])

	return (
		<div className="todolistcontayner">
			<button className="remove-todolist"
			        onClick={() => dispatch(removeTodolistAC(id))}>x
			</button>
			<h2>Redux<EditableSpan title={title} callback={calbackTodoHandler}/></h2>

			<div>
				<AddItemForm addTitle={addTitle}/>
			</div>
			<div className="tasks-container">
				{tasks.length === 0
					? <p>Nothing hire</p>
					: tasks.map((task) => {
						return <Task
							key={task.id}
							todoId={id}
							task={task}

						/>
					})
				}


			</div>
			<FilterButtons filter={filter}
			               onClickAllHandler={onClickAllHandler}
			               onClickActiveHandler={onClickActiveHandler}
			               onClickCompletedHandler={onClickCompletedHandler}/>
		</div>

	);
})

