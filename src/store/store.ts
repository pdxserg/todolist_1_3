import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../model/tasks-reducer";
import {todolistsReducer} from "../model/todolist-reducer";


const rootReducer= combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer
})
export const store = createStore(rootReducer)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
 window.store = store