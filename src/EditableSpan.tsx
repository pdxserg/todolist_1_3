import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanTypeProps = {
	title: string
	callback: (newTitle: string) => void
}
export const EditableSpan = React.memo (({title, callback}: EditableSpanTypeProps) => {
	console.log("editSpan")
	const [isEditing, setIsEditing] = useState(false)
	const [newTitle, setNewTitle] = useState(title)
	const [error, setError] = useState<string|null >(null)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const newTitle =e.currentTarget.value
		setNewTitle(newTitle)
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if(error !== null){
			setError(null)
		}

		if (e.key === "Enter") {
			onBlureHandle()
		}
	}
	const onBlureHandle = () => {
		if(newTitle.trim() !== ""){
			setIsEditing(false)
			callback(newTitle.trim())
		}else {
			setError("Title requred!")
		}

	}

	return (
		<div>
			{isEditing ?
				(
					<input className={error ? 'error' : ''}
						type="text"
					       value={newTitle}
					       onChange={onChangeHandler}
					       onBlur={onBlureHandle}
					       onKeyDown={onKeyDownHandler}
					       autoFocus
					/>

				) : (
					<span onDoubleClick={() => setIsEditing(true)}>{title}</span>
				)}

			{error && <div className={'error-message'}>{error}</div>}
		</div>
	);
})

