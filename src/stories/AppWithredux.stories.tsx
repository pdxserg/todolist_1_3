import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../components/Task";
import {Provider} from "react-redux";
import {store} from "../store/store";




// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'TODOLIST/Task',
	component: Task,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// args:{
	// 	todoId: "string",
	// 	task: {id:"sss",title:"JS", isDone: false}
	//
	// }

} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/arg
export const TaskIsNotDoneStory:Story= {
	render: ()=><Provider store={store}><Task task={{id:"swsss",title:"JS", isDone: false}} todoId={"sss"}   /></Provider>
}