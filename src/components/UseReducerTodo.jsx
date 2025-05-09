import { useState } from 'react';
import '../App.css';

export const SeniorTodo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (!text.trim()) {
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), title: text.trim(), done: false },
    ]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="section">
      <div>
        <h3>Add New Todo</h3>
        <div className="input-group">
          <input
            className="new-todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </div>

      <h2>Todos List:</h2>
      {todos.length === 0 ? (
        <p className="empty-state">No todos yet. Add one above!</p>
      ) : (
        <ul className="todo-list" role="list">
          {todos.map((todo) => (
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
  );
};

const TodoItem = ({ id, title, done, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${done ? 'completed' : ''}`}>
      <div>
        <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
        <span className={done ? 'completed-text' : ''}>{title}</span>
      </div>
      <button onClick={() => onDelete(id)}>X</button>
    </li>
  );
};
