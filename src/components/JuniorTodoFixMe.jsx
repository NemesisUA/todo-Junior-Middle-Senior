import { useState } from 'react';

// що робить це CSS правило?
// input[type="checkbox"]:checked + span {
//   text-decoration: line-through;
//   color: #888;
// }

export const JuniorTodoFixMe = () => {
  const [todos, setTodos] = useState([
    { title: 'Do something', id: 1, done: false },
  ]);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (!text.trim()) {
      return;
    }

    // add id field
    // notice that we don't use push
    const newTodos = [...todos, { title: text, done: false }];
    setTodos(newTodos);
    // почистити поле вводу тудушки
  };

  const handleDeleteTodo = (id) => {
    // Mutating arrays directly
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // adds extra todo. Fix
  const toggleTodo = (id) => {
    const toggledTodo = todos.filter((todo) => todo.id == id);
    setTodos((prevTodos) => [
      ...prevTodos,
      { ...toggleTodo, done: !toggleTodo.done },
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
        <button onClick={handleAddTodo}>Add New Todo</button>
      </div>

      <h2>Todos List:</h2>
      <ul>
        {/* app crash if there is no todos */}
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.title}
            {/* why it says that id is event???  (parameter) id: React.MouseEvent<HTMLSpanElement, MouseEvent> */}
            <span className="trashkan" onClick={(id) => handleDeleteTodo(id)}>
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
