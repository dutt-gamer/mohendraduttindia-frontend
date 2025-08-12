import React, { useState } from "react";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleTodo = () => {
    if (!todos) return;
    if (todos.includes(inputValue)) {
      alert("Same entry");
      setInputValue("");
      return;
    }
    setTodos((prev) => [...prev, inputValue]);
    setInputValue("");
  };

  const handleDeleteTodo = (value) => {
    const updatedTask = todos.filter((todo) => todo !== value);
    setTodos(updatedTask);
  };

  const handleDelete = () => {
    setTodos([]);
  };
  return (
    <div className="m-2 p-2 text-center">
      <h1 className="text-3xl m-2 p-2">To-Do List</h1>
      <div className="flex items-center justify-center">
        <input
          className="bg-amber-100 h-10 p-4 rounded-md"
          type="text"
          placeholder="Enter to-do"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-red-500 h-10 p-2 text-slate-200 mx-2 rounded-md cursor-pointer"
          onClick={handleTodo}
        >
          Add
        </button>
      </div>
      <ul className="mt-6 flex flex-col items-center space-y-4">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="w-full max-w-md flex justify-between bg-slate-200 rounded-xl p-4"
          >
            <span className="m-2">{todo}</span>
            <button
              className="bg-red-500 rounded-md text-white p-2 cursor-pointer"
              onClick={() => handleDeleteTodo(todo)}
            >
              Delete
            </button>
          </li>
        ))}
        {todos.length && <button
          className="bg-red-500 text-white m-2 p-2 rounded-md cursor-pointer"
          onClick={handleDelete}
        >
          Delete All
        </button>}
      </ul>
    </div>
  );
};

export default Todo;
