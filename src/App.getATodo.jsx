import { useState, useEffect, useMemo } from 'react';
import './App.css'

function App() {
    const [getTodoId,setTodoId] = useState('');
    const [{todo,Status},setTodo] =useState({todo:'',Status:''})

    const getTodoById = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/todo/${getTodoId}`)
        .then(response => response.json())
        .then(todo => {setTodo(todo)})
        setTodoId('');
    }

    const registerChange = (event) => {
        event.preventDefault();
        setTodoId(event.target.value);
    }

  return (
    <div className='app'>
      <h1>TODO APPLICATION</h1>
      <form onSubmit={getTodoById}>
        <input type="text" onChange={registerChange} value={getTodoId} placeholder='todo id'/>
      </form>
      <p>{todo} {Status}</p>
    </div>

  );
}

export default App
