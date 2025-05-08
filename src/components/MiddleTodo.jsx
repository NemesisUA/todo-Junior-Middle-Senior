import { useState } from 'react';

const TodoItem = ({ todo: { id, text, done }, onDelete, onToggle }) => {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
      />
      <span>{text}</span>
      <span className="trashkan" onClick={() => onDelete(id)}>
        X
      </span>
    </li>
  );
};

export const MiddleTodo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (!text.trim()) {
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: text, done: false },
    ]);
    setText("");
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
    <div className="section">
      <div>
        <h3>Add New Todo</h3>
        <input
          className="new-todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <h3>Todos List:</h3>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </ul>
    </div>
  );
};
