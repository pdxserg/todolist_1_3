import React, {ChangeEvent, useCallback} from 'react';
import {changeStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/tasks-reducer";
import {EditableSpan} from "../EditableSpan";
import {TaskType} from "../AppWithRedux";


type TaskPropsType = {
	id: string
	t: TaskType
	dispatch: any
}
export const Task = React.memo(({id, t, dispatch}: TaskPropsType) => {


	const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeStatusAC(id, t.id, e.currentTarget.checked))
	}
	const calbackTaskHandler = useCallback((newTitle: string) => {
		dispatch(changeTaskTitleAC(id, t.id, newTitle))
	}, [dispatch, id, t.id])


	return (
		<div className={`li-container ${t.isDone === true ? "opacity" : ""}`}>
			<input type="checkbox"
			       checked={t.isDone}
			       onChange={changeStatusHandler}/>
			<EditableSpan title={t.title} callback={calbackTaskHandler}/>
			<button onClick={() => dispatch(removeTaskAC(id, t.id))}>X</button>

		</div>
	)
})

