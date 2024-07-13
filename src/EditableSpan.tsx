import React from 'react';
type EditableSpanTypeProps={
	title: string
}
export const EditableSpan = ({title}:EditableSpanTypeProps) => {
	return (
		<div>
			<span>{title}</span>
		</div>
	);
};

