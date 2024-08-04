import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {AddItemForm, AddItemFormTypeProps} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'TODOLIST/AddItemForm',
	component: AddItemForm,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {addTitle: fn()},
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {};

const AddItemFormWithError = React.memo(({addTitle}: AddItemFormTypeProps) => {
	console.log("aitem form")
	const [value, setValue] = useState("")
	const [error, setError] = useState<null | string>("Title is required!")
	const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null)
		} else if (e.key === "Enter") {
			addTitleHandler()
		}
	}
	const addTitleHandler = () => {
		if (value.trim() !== "") {
			addTitle(value.trim())
			setValue("")

		} else {
			setError("Title is required!")
		}

	}
	return (
		<div>
			<input className={error ? 'error' : ''}
			       type="text"
			       value={value}
			       onChange={onchangeHandler}
			       onKeyDown={onKeyDownHandler}/>
			<button className={error ? 'error' : ''} onClick={addTitleHandler}>+</button>
			{/*<p className={error ? "error-message" : ""}>{error}</p>*/}
			{error && <div className={'error-message'}>{error}</div>}
		</div>
	);
})
export const AddItemFormWithErrorStory: Story = {
	render: (args)=><AddItemFormWithError addTitle={args.addTitle}/>
}
