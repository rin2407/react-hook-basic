import React, { useState, useEffect } from "react";
import "./App.scss";
// import ColorBox from './components/ColorBox';
import TodoList from "./components/ToDoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "mootj" },
    { id: 2, title: "hai" },
    { id: 3, title: "ba" },
  ]);
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl ="http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data } = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPostList();
  }, []);
  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }
  function handleFormSubmit(formValue) {
    console.log("gia tri nhap", formValue);
    const newTodo = {
      id: todoList.length + 1,
      ...formValue,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }
  return (
    <div className="app">
      <h1>React to do list</h1>
      {/* <ColorBox/> */}
      <TodoForm onSubmit={handleFormSubmit}></TodoForm>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}></TodoList>
      <h1>React post list call api</h1>
      <PostList posts={postList}></PostList>
    </div>
  );
}

export default App;
