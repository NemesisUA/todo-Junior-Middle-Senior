import './App.css';
//import { JuniorTodo } from './components/JuniorTodo';
//import { JuniorTodoFixMe } from './components/JuniorTodoFixMe';
import { MiddleTodo } from './components/MiddleTodo';

function App() {
  return (
    <div className="app">
      <h1>Todo list in Junior, Middle and Senior style</h1>

      <MiddleTodo />
    </div>
  );
}

export default App;
