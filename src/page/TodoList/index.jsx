import React, { useState } from 'react';

const Index = () => {
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([
    'Walk the dog', 
    'Water the plants', 
    'Wash the dishes'
  ]);
  const addNewTask = () => {
    if (newTask !== '') {
      setTaskList(taskList.concat(newTask));
      setNewTask('');
    }
  }
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          aria-label="Add a new task"
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e)=>setNewTask(e.target.value.trim())}
        />
        <button onClick={addNewTask}>Submit</button>
      </div>
      
      <ul>
        {
          taskList.map(item => (
            <li key={item}>
              <span>{item}</span>
              <button
                onClick={()=>setTaskList(taskList.filter(task => task !== item))}
              >
                Delete
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Index;