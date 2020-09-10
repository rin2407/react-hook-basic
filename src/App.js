import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import "./App.scss";
// import ColorBox from './components/ColorBox';
import TodoList from "./components/ToDoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFillterForm from "./components/PostFillterForm";
import Clock from "./components/Clock";
import MagicBox from "./components/MagicBox";
function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "mootj" },
    { id: 2, title: "hai" },
    { id: 3, title: "ba" },
  ]);
  const [postList, setPostList] = useState([]);
  const [paginaton,setPagination]= useState({
    _page:1,
    _limit:10,
    _totalRows:1
  })
  const [fillter,setFillter]= useState({
    _limit:10,
    _page:1
  })
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString= queryString.stringify(fillter)
        const requestUrl =`http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data,pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) { 
        console.log(error.message);
      }
    }
    fetchPostList();
  }, [fillter]);
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
  function handlePageChange(newPage){
    setFillter({
      ...fillter,
      _page:newPage
    })
  }
  function handleFillterChange(newFillter){
    console.log("new fillter",newFillter)
    setFillter({
      ...fillter,
      _page:1,
      title_like: newFillter.searchTerm
    })
  }
  return (
    <div className="app">
      <h1>React to do list</h1>
      {/* <ColorBox/> */}
      <TodoForm onSubmit={handleFormSubmit}></TodoForm>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}></TodoList>
      <h1>React post list call api</h1>
      <PostFillterForm onSubmit={handleFillterChange}></PostFillterForm>
      <PostList posts={postList}></PostList>
      <Pagination 
         pagination={paginaton}
         onPageChange={handlePageChange}
      ></Pagination>
      <h2>Clock</h2>
      <Clock/>
      <h3>Magic box</h3>
      <MagicBox/>
    </div>
  );
}

export default App;
