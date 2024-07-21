import React, {ChangeEvent, useCallback} from 'react';
import {changeStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/tasks-reducer";
import {EditableSpan} from "../EditableSpan";
import {TaskType} from "../AppWithRedux";
import {useDispatch} from "react-redux";


type TaskPropsType = {
	todoId: string
	task: TaskType

}
export const Task = React.memo(({todoId, task, }: TaskPropsType) => {
 const dispatch =useDispatch()

	const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeStatusAC(todoId, task.id, e.currentTarget.checked))
	}
	const calbackTaskHandler = useCallback((newTitle: string) => {
		dispatch(changeTaskTitleAC(todoId, task.id, newTitle))
	}, [dispatch, todoId, task.id])


	return (
		<div className={`li-container ${task.isDone === true ? "opacity" : ""}`}>
			<input type="checkbox"
			       checked={task.isDone}
			       onChange={changeStatusHandler}/>
			<EditableSpan title={task.title} callback={calbackTaskHandler}/>
			<button onClick={() => dispatch(removeTaskAC(todoId, task.id))}>X</button>

		</div>
	)
})

