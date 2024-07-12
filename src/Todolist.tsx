import React from 'react';

type TodolistPropsType = {
	title?: string
	isDone?: boolean
}

export const Todolist = (props: TodolistPropsType) => {
	return (
		<ul>
			<li><input type="checkbox" checked={props.isDone}/> {props.title} <button>X</button></li>
			<li><input type="checkbox" checked={false}/> CSS <button>X</button></li>
			<li><input type="checkbox" checked={false}/> React <button>X</button></li>

		</ul>
	);
};

