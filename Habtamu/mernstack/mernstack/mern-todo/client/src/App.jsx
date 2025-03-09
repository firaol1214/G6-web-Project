import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await axios.get('/api/todos')
      setTodos(res.data)
    } catch (err) {
      console.error('Error fetching todos:', err)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/todos', { text })
      setTodos([...todos, res.data])
      setText('')
    } catch (err) {
      console.error('Error adding todo:', err)
    }
  }

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t._id === id)
      const res = await axios.put(`/api/todos/${id}`, {
        completed: !todo.completed
      })
      setTodos(todos.map(t => t._id === id ? res.data : t))
    } catch (err) {
      console.error('Error toggling todo:', err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`)
      setTodos(todos.filter(t => t._id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
    }
  }

  return (
    <div className="app">
      <h1>MERN Todo List</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new todo"
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo._id)}
              className="todo-text"
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App