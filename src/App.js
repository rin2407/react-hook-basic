import React, { useState } from 'react';
import './App.scss';
// import ColorBox from './components/ColorBox';
import TodoList from './components/ToDoList';
function App() {
  const [todoList,setTodoList]= useState([
    {id:1,title:"mootj"},
    {id:2,title:"hai"},
    {id:3,title:"ba"}
  ])
function handleTodoClick(todo){
    const index= todoList.findIndex(x => x.id === todo.id);
    if(index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index,1);
    setTodoList(newTodoList);
}
  return (
    <div className="app">
       <h1>React to do list</h1>
       {/* <ColorBox/> */}
       <TodoList todos={todoList} onTodoClick={handleTodoClick}></TodoList>
    </div>
  );
}

export default App;
