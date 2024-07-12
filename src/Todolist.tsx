import React, {MouseEventHandler} from 'react';
import {TaskType} from "./App";

type TodolistPropsType = {
	tasks: Array<TaskType>
	removeTask:(id:number)=>void
}

export const Todolist = (props: TodolistPropsType) => {



	return (
		<ul>
			{props.tasks.length === 0
				? <p>Nothing hire</p>
				: props.tasks.map((t) => {
					const removeTaskHandler=(e:MouseEventHandler<HTMLButtonElement>)=> {

					}
						return (
							<li key={t.id}>
								<input type="checkbox" checked={t.isDone}/>
								{t.title}
								<button onClick={(e)=>props.removeTask(t.id)}>X</button>
							</li>
						)
					})
			}


		</ul>
	);
};

