import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
type AddItemFormTypeProps={
	addTitle:(title: string)=>void
}
export const AddItemForm =React.memo (({ addTitle}:AddItemFormTypeProps) => {
	console.log("aitem form")
	const [value, setValue] = useState("")
	const [error, setError] = useState<null | string>(null)
	const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if(error !== null){
			setError(null)
		} else if  (e.key === "Enter") {
			addTitleHandler()
		}
	}
	const addTitleHandler = () => {
		if (value.trim() !== "") {
			addTitle( value.trim())
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

