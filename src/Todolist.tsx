import React, {MouseEventHandler} from 'react';
import {TaskType} from "./App";

type TodolistPropsType = {
	tasks: Array<TaskType>
	removeTask:(id:number)=>void
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
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>

	);
};

