import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
  return (
    <div className="App">
      <Todolist title ={"Html"}  isDone = {true} />
      <Todolist />
      <Todolist />
    </div>
  );
}

export default App;
