import { useState } from 'react';
import './MiddleTodo.css';

const TodoItem = ({ todo: { id, text, done }, onDelete, onToggle }) => {
  return (
    <li className="todo-item" role="listitem">
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
        aria-label={`Mark ${text} as ${done ? 'incomplete' : 'complete'}`}
      />
      <span className={done ? 'todo-text completed' : 'todo-text'}>{text}</span>
      <button
        className="delete-btn"
        onClick={() => onDelete(id)}
        aria-label={`Delete todo: ${text}`}
      >
        ×
      </button>
    </li>
  );
};

export const MiddleTodo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Todo cannot be empty');
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: text.trim(), done: false },
    ]);
    setText('');
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo(e);
    }
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => [...prevTodos.filter((todo) => todo.id !== id)]);
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => [
      ...prevTodos.map((todo) =>
        todo.id !== id ? todo : { ...todo, done: !todo.done }
      ),
    ]);
  };

  return (
    <div className="todo-container">
      <form onSubmit={handleAddTodo} className="todo-form">
        <h2>Todo List</h2>
        <div className="input-group">
          <input
            className="new-todo"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyPress}
            placeholder="Add a new todo..."
            aria-label="New todo text"
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="todos-section">
        <h3>Your Todos</h3>
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add one above!</p>
        ) : (
          <ul className="todo-list" role="list">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onToggle={toggleTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
