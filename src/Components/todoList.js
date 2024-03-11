import React, { useState, useEffect } from 'react';

const TodoItem = ({ todo, toggleTodo, removeTodo }) => {
  return (
    <div>
      <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo)} />
      {todo.todo}
      <button onClick={() => removeTodo(todo)}>Удалить</button>
    </div>
  );
};
const Url = `./dataBase.json`
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');


  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(Url);
      const todos = await response.json();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const addTodo = () => {
    const todoToAdd = { todo: newTodo, done: false };
    setTodos([...todos, todoToAdd]);
    setNewTodo('');
  };

  const toggleTodo = (todoToToggle) => {
    setTodos(
      todos.map((todo) =>
        todo === todoToToggle ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (todoToRemove) => {
    setTodos(todos.filter((todo) => todo !== todoToRemove));
  };

  return (
    <div>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>Добавить</button>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
      ))}
    </div>
  );
};

export default TodoList;
