import { useReducer, useState } from 'react';
import '../App.css';

const initialTodos = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), title: action.payload, done: false }];

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
}

export const UseReducerTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (!text.trim()) {
      return;
    }
    dispatch({ type: "ADD_TODO", payload: text.trim() });
    setText('');
  };

  const toggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
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
