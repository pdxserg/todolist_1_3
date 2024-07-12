import React, {MouseEventHandler} from 'react';
import {FilterType, TaskType} from "./App";

type TodolistPropsType = {
	tasks: Array<TaskType>
	removeTask:(id:number)=>void
	filtered:(filter: FilterType)=>void
}

export const Todolist = (props: TodolistPropsType) => {



	return (
		<div>
			<ul>
				{props.tasks.length === 0
					? <p>Nothing hire</p>
					: props.tasks.map((t) => {
						const removeTaskHandler = (e: MouseEventHandler<HTMLButtonElement>) => {

						}
						return (
							<li key={t.id}>
								<input type="checkbox" checked={t.isDone}/>
								{t.title}
								<button onClick={() => props.removeTask(t.id)}>X</button>
							</li>
						)
					})
				}


			</ul>
			<div>
				<button onClick={()=>props.filtered("All")}>All</button>
				<button onClick={()=>props.filtered("Active")}>Active</button>
				<button onClick={()=>props.filtered("Completed")}>Completed</button>
			</div>
		</div>

	);
};

