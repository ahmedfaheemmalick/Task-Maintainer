import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Task from "../Task/Task"

const Tasks = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const [msg, setMsg] = useState({
        success: "",
        error: ""
    });

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true)

        axios.get('/api/tasks')
            .then(res => {
                if (isMounted) {
                    setIsLoading(false)
                    setTasks(res.data)
                }
            })
    }, [])

    const deleteTask = (id) => {
        axios.delete(`/api/task/${id}`)
            .then(res => {
                setMsg({ success: res.msg })
                axios.get('/api/tasks')
                    .then(res => setTasks(res.data))
            })
            .catch(err => setMsg({ error: err.msg }));
    }

    return (
        <div className="flex flex-col items-center my-4 w-4/12">
            {isLoading ?
                <div className="flex items-center justify-center my-10">
                    <span className="animate-ping absolute inline-flex h-11 w-11 rounded-full bg-black"></span>
                    <span className="relative inline-flex rounded-full h-10 w-10 bg-black"></span>
                </div>
                :
                tasks.map(task => (
                    <Task
                        key={task._id}
                        task={task}
                        deleteTask={deleteTask}
                    />
                ))
            }
            <Link className="border-2 border-black rounded-lg py-1 px-20 text-xl font-semibold" to="/task/create">Add Task</Link>
            {msg.error && <p className="text-red-900 text-xl text-center">{msg.error}</p>}
            {msg.success && <p className="text-green-900 text-xl text-center">{msg.success}</p>}
        </div>
    )
}

export default Tasks