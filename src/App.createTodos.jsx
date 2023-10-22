import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [getTodo,setTodo] = useState('');
  const postTodo = (event) => {
    event.preventDefault();
    console.log(getTodo);
    fetch('http://localhost:3000/todo',{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":true
      },
      body: JSON.stringify({
        todo:getTodo
      })
    })
    .then(response => response.json())
    .then(todo => alert(`your todo is successfully submited ${todo.id}`))
    setTodo('');
  }
  const registerChangeInTodoInput = (event) => {
    event.preventDefault();
    setTodo ( event.target.value );
  }
  return (
    <div className='app'>
      <h1>TODO APPLICATION</h1>
      <form onSubmit={postTodo}>
        <input type="text" name="todo" id="todo-id" placeholder='id' onChange={registerChangeInTodoInput} value={getTodo}/>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default App
