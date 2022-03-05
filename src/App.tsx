import React, { useEffect, ChangeEvent, FormEvent, useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoTable from './components/TodoTable';
import './App.css';
interface ITask {
  id: string,
  taskName: string;
  deadline: number;
  isComplete: boolean;
}
const App: React.FC = () => {
  const [task, setTask] = useState<string>('')
  const [deadline, setDeadline] = useState<number>(0)
  const [todoList, setTodoList] = useState<ITask[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") {
      setTask(e.target.value);
    } else {
      setDeadline(Number(e.target.value));
    }
  };


  const handleSubmit = (e: FormEvent): void => {
    const { v4: uuidv4 } = require('uuid');
    e.preventDefault()
    const newTask = { id: uuidv4(), taskName: task, deadline: deadline, isComplete: false };
    setTodoList([...todoList, newTask]);
    localStorage.setItem('todos', JSON.stringify([...todoList, newTask]))
    setTask("")
    setDeadline(0)
  }


  const deleteTodo = (id: string) => {
    const updatedTodo = todoList.filter(todo => todo.id !== id)
    setTodoList(updatedTodo)
    localStorage.setItem('todos', JSON.stringify(updatedTodo))
  }


  const handleIsComplete = (id: string) => {
    const updatedTodo = todoList.map((todo) => {
      if (todo.id === id) {
        const newTodo = { id: todo.id, isComplete: !todo.isComplete, taskName: todo.taskName, deadline: todo.deadline }
        return newTodo
      }
      return todo
    })
    setTodoList(updatedTodo)
    localStorage.setItem('todos', JSON.stringify(updatedTodo))
  }


  useEffect(() => {
    let man: any = localStorage.getItem('todos')
    let data = JSON.parse(man)
    if (data) {
      setTodoList(data)
    }
  }, [])

  return (
    <div className="App">
      <h1>TODO APP USING REACT & TYPESCRIPT</h1>
      <div className='todo-main'>
        <div className='heading'>
          <AddTodo
            task={task}
            deadline={deadline}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className='todo-list'>
        <h2>Todos</h2>
        <TodoTable
          todoList={todoList}
          handleIsComplete={handleIsComplete}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
