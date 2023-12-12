"use client"

import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [mainTask, setMainTask] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priority, setPriority] = useState('low');

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc, priority, done: false}]);
    setTitle('');
    setDesc('');
    setPriority('low'); 
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const toggleDone = (i) => {
    let copyTask = [...mainTask];
    copyTask[i].done = !copyTask[i].done;
    setMainTask(copyTask);
  };
  const filteredTasks = mainTask.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let renderTask = <h2 className='font-bold text-center'>No Task Pending</h2>;
  if (mainTask.length > 0) {
    renderTask = filteredTasks.map((t, i) => (
      <li key={i} className={`flex items-center justify-between mb-5 ${t.done ? 'line-through' : ''}`}>
        <div className='w-2/3'>
          <h5 className='text-xl font-semibold'>{t.title}</h5>
          <h6 className={`text-lg font-medium ${t.done ? 'line-through' : ''}`}> {t.desc}</h6>
        </div>
        <button
          onClick={() => {
            deleteHandler(i);
          }}
          className='bg-red-400 text-white px-4 py-2 rounded font-bold'
        >
          Delete
        </button>
        <button
            onClick={() => {
              toggleDone(i);
            }}
            className={`bg-${t.done ? 'green' : 'blue'}-400 bg-red-400 text-white px-4 py-2 rounded font-bold mr-2`}
          >
            {t.done ? 'Undo' : 'Mark as Done'}
          </button>
          <button
            className={`bg-red-400 text-white px-4 py-2 rounded font-bold mr-2`}
          >
            {t.priority}
          </button>
          
      </li>
    ));
  }

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>Todolist</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
          placeholder='Enter task here'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
          placeholder='Enter Description here'
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <select
          className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
        <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>Add task</button>
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search here'
        />
      </form>
      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
