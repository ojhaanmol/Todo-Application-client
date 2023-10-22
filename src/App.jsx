import { useState, useEffect } from 'react';
import './App.css'

function App() {

  const [getTodos,setTodos] = useState([]);
  const [error,setError] = useState(false);
  const [completedList, updatecompletedList] = useState([]);
  
  const [getATodo,setTodo] = useState('');
  const postTodo = (event) => {
    event.preventDefault();
    console.log(getATodo);
    fetch('http://localhost:3000/todo',{
      method: "POST",
      header:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":true
      },
      body:{
        todo:getATodo
      }
    })
    .then(response => response.json())
    .then(todo => alert(`your todo is successfully submited ${todo.id}`))
    setTodo('');
  }
  const registerChangeInTodoInput = (event) => {
    event.preventDefault();
    setTodo ( event.target.value );
  }

  const draggingHandler = (event) => {
    event.dataTransfer.setData('text/plain', event.target.firstChild.data);
    const index = event.target.id.split('-').pop();
    fetch(`http://localhost:3000/todo/${index}`,{method:'PUT'})
    .then(response=>response.json())
    .then(data => console.log('done'))
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const text = event.dataTransfer.getData('text/plain');
    updatecompletedList([...completedList,text]);
    [...getTodos].map( todo => todo.Status = todo.todo === text ? 'Done': todo.Status );
  }

  useEffect(()=>{
    fetch('http://localhost:3000/todos')
    .then( response => response.json() )
    .then( todos => {
      setTodos(todos);
    })
    .catch(error => {
      setError(true)
    });
    return () => {console.log('unmounting');}
  },[]);

  if( error ) return <>Unable To Fetch Todos</>

  return (
    <div className='app'>
      <h1>TODO APPLICATION</h1>
      <form onSubmit={postTodo}>
        <input type="text" name="todo" id="todo-id" placeholder='id' onChange={registerChangeInTodoInput} value={getATodo}/>
        <button type="submit">SUBMIT</button>
      </form>
      <div className='todo-buffer'>
          <h3>TASK LIST</h3>
          <ul>
            {
                getTodos.map( (todo,index) => {
                    if(todo.Status.toLocaleUpperCase() === 'PENDING')
                    return (<li key={'task-list-todo-key-'+(index+1)}draggable onDragStart={draggingHandler} id={'task-list-todo-id-'+(index+1)}>{todo.todo}</li>);
                    return;
                } )
            }
          </ul>
      </div>
      <div className='todo-completed' onDragOver={handleDragOver} onDrop={handleDrop}>
          <h3>COMPLETED TASK</h3> 
            <ul>
                {
                    getTodos.map( (todo,index) => {
                        if(todo.Status.toLocaleUpperCase() !== 'PENDING')
                        return (<li key={'completed-list-key-'+index} draggable onDragStart={draggingHandler} id={'completed-list-todo-id-'+(index+1)}>{todo.todo}</li>);
                        return;
                    })
                }
            </ul>
        </div>
    </div>
  );
}

export default App
