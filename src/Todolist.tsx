import React from 'react';
import {TaskType} from "./App";

type TodolistPropsType = {
	tasks: Array<TaskType>
}

export const Todolist = (props: TodolistPropsType) => {
	return (
		<ul>
			{props.tasks.length === 0
				? <p>Nothing hire</p>
				: props.tasks.map((t) => {
						return (
							<li key={t.id}>
								<input type="checkbox" checked={t.isDone}/>
								{t.title}
								<button>X</button>
							</li>
						)
					})
			}


		</ul>
	);
};

