import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Task from "./Components/Task/Task";
import edit from "./Images/edit.svg";
import trash from "./Images/trash.svg";

const App = () => {
  const [status, setStatus] = useState("Creating")
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({
    name: "",
    desc: "",
    completed: false,
    createdAt: ""
  })

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks`)
        .then(res => setTasks(res.data))
    }

    return () => {
      isMounted = false;
    }
  }, [])

  const addTask = (e) => {
    e.preventDefault();
    if (task.name && task.desc && task.completed) {
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/task`, {
        ...task, createdAt: new Date().toISOString()
      })
        .then(res => console.log(res))
    }
  }

  const deleteTask = (id) => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/task/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const updateTask = (e, id) => {
    e.preventDefault();
    axios.patch(`${process.env.REACT_APP_API_BASE_URL}/task/${id}`, {
      ...task, createdAt: new Date().toISOString()
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <BrowserRouter>
      <div className='bg-slate-300 w-screen	h-screen'>
        <h1 className='text-4xl font-normal text-center pt-10'>
          Task Maintainer
        </h1>
        {tasks.map((task) => (
          <Link to={`/task/${task._id}`} key={task._id} className="flex justify-between w-1/4">
            <div>
              <p className='text-xl font-normal tracking-wide'>
                {task.name}
              </p>
              <p className='text-xl font-normal tracking-wide'>
                {task.completed ? "Completed" : "Not Completed"}
              </p>
              <p className='text-xl font-normal tracking-wide'>
                {new Date(task.createdAt).toLocaleDateString("en-US")}
              </p>
            </div>
            <div className='flex flex-col justify-around'>
              <button className='w-6 mx-2 cursor-pointer' onClick={() => {
                setTask(task)
                setStatus("Editing")
              }}>
                <img src={edit} alt="Edit Task" />
              </button>
              <button className='w-6 mx-2 cursor-pointer' onClick={deleteTask}>
                <img src={trash} alt="Delete Task" />
              </button>
            </div>
          </Link>
        ))}
        <form onSubmit={(e) => status === "Creating" ? addTask() : updateTask(e, task._id)}>
          <div>
            <label htmlFor="name">Task Name: </label>
            <input
              type="text"
              placeholder='Task Name'
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="desc">Task Description: </label>
            <input
              type="text"
              placeholder='Task Description'
              value={task.desc}
              onChange={(e) => setTask({ ...task, desc: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="completed">Task Status:</label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => setTask({ ...task, completed: e.target.checked })}
            />
          </div>
          <div>
            <button>{status === "Creating" ? "Add Task" : "Edit Task"}</button>
          </div>
        </form>
      </div>
      <Routes>
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
