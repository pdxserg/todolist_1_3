import React from 'react';
import {FilterType} from "../AppWithRedux";


type FilterButtonsType = {
	filter: FilterType
	onClickAllHandler:()=>void
	onClickActiveHandler:()=>void
	onClickCompletedHandler:()=>void
}
export const FilterButtons =React.memo (({
	                              filter,
	                              onClickAllHandler,
	                              onClickActiveHandler,
	                              onClickCompletedHandler
                              }: FilterButtonsType) => {
	return (
		<div className="foter-buttons">
			<button className={filter === "All" ? "activeButton" : ""}
			        onClick={onClickAllHandler}>All
			</button>

			<button className={filter === "Active" ? "activeButton" : ""}
			        onClick={onClickActiveHandler}>Active
			</button>

			<button className={filter === "Completed" ? "activeButton" : ""}
			        onClick={onClickCompletedHandler}>Completed
			</button>
		</div>
	);
})

