import { useState, useEffect } from 'react';
import './App.css'

function App() {

  const [getTodos,setTodos] = useState([]);
  const [error,setError] = useState(false);
  useEffect(()=>{
    fetch('http://localhost:3000/todos')
    .then( response => response.json() )
    .then( todos => {
      setTodos(todos);
    } )
    .catch(error => {
      setError(true)
    });
    return () => {console.log('unmounting');}
  },[]);
  console.log(18,error,getTodos);
  if( error ) return <>Unable To Fetch Todos</>
  return (
    <div className='app'>
      <h1>TODO APPLICATION</h1>
      <table>
        <thead>
          <tr>
            <td>
              Id
            </td>
            <td>
              Todo
            </td>
            <td>
              Status
            </td>
          </tr>
        </thead>
        <tbody>
          {
            getTodos.map( (todo,index) =>  
              <tr>
                <td>{index}</td>
                <td>{todo.todo}</td>
                <td>{todo.Status}</td>
              </tr>
            )
          } 
        </tbody>
      </table>
    </div>
  );
}

export default App
