import './App.css';
//import { SeniorTodo } from './components/SeniorTodo';
import { UseReducerTodo } from './components/UseReducerTodo';
//import { JuniorTodo } from './components/JuniorTodo';
//import { JuniorTodoFixMe } from './components/JuniorTodoFixMe';
//import { MiddleTodo } from './components/MiddleTodo';

function App() {
  return (
    <div className="app">
      <h1>Todo list in Junior, Middle and Senior style</h1>

      <UseReducerTodo />
    </div>
  );
}

export default App;
