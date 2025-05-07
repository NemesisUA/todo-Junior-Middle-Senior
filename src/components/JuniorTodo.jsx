import { useState } from 'react';

export const JuniorTodo = () => {
  const [todos, setTodos] = useState([{ title: 'Do something', id: 1, done: false }]);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (!text.trim()) {
      return
    }

    const newTodos = [...todos, { id: Date.now(), title: text, done: false }];
    setTodos(newTodos);
    setText('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  const toggleTodo = (id) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)
    })
  }

  return (
    <div className="section">
      <div>
        <h3>Add New Todo</h3>
        <input className='new-todo' value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleAddTodo}>Add New Todo</button>
      </div>

      <h2>Todos List:</h2>
      <ul>
        {todos?.map((todo, index) => (
          <li key={index} className='todo-item'>
            <input type='checkbox' checked={todo.done} onChange={() => toggleTodo(todo.id)} />
            <span>{todo.title}</span>
            <span className='trashkan' onClick={() => handleDeleteTodo(todo.id)}>x</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
