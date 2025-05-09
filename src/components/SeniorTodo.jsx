import { useState, useEffect } from "react"
import '../App.css'

export const SeniorTodo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('Todo text cannot be empty');
      return;
    }

    setTodos(prevTodos =>
      [...prevTodos, {
        id: Date.now(),
        title: text.trim(),
        done: false,
        createdAt: new Date().toISOString()
      }]);
    setText('');
  }

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== id)
    );
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo(e);
    }
  }

  return (
    <div className="section" role="region" aria-label="Todo List">
      <div className="todo-form">
        <h3>Add New Todo</h3>
        <form onSubmit={handleAddTodo}>
          <div className="input-group">
            <input
              className="new-todo"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your todo"
              aria-label="New todo text"
            />
            <button
              type="submit"
              aria-label="Add todo"
            >
              Add
            </button>
          </div>
          {error && <p className="error-message" role="alert">{error}</p>}
        </form>
      </div>

      <h2>Todos List:</h2>
      {todos.length === 0 ? (
        <p className="empty-state">No todos yet. Add one above!</p>
      ) : (
        <ul className="todo-list" role="list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              {...todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

const TodoItem = ({ id, title, done, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${done ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id)}
          aria-label={`Mark ${title} as ${done ? 'incomplete' : 'complete'}`}
        />
        <span className={done ? 'completed-text' : ''}>{title}</span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="delete-button"
        aria-label={`Delete todo: ${title}`}
      >
        ×
      </button>
    </li>
  )
}