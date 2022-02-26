import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AddTask = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState({
        success: "",
        error: ""
    })
    const [task, setTask] = useState({
        name: "",
        desc: "",
        completed: false
    })

    useEffect(() => {
        let isMounted = true;

        if (id) {
            setIsLoading(true)
            axios.get(`/api/task/${id}`)
                .then(res => {
                    if (isMounted) {
                        setIsLoading(false)
                        setTask(res.data)
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    setMsg({ error: err.msg })
                })
        }

        return () => {
            isMounted = false;
        }
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (id) {
            axios.patch(`/api/task/${id}`, task)
                .then(res => {
                    setIsLoading(false)
                    setMsg({ success: res.data.msg })
                    setTask({
                        name: "",
                        desc: "",
                        completed: false
                    })
                })
                .catch(err => {
                    setIsLoading(false)
                    setMsg({ error: err.msg })
                })
        } else {
            axios.post('/api/task', task)
                .then(res => {
                    setIsLoading(false)
                    setMsg({ success: res.data.msg })
                    setTask({
                        name: "",
                        desc: "",
                        completed: false
                    })
                })
                .catch(err => {
                    setIsLoading(false)
                    setMsg({ error: err.msg })
                })
        }
    }

    return (
        <>
            {isLoading ?
                <div className="flex items-center justify-center my-10">
                    <span className="animate-ping absolute inline-flex h-11 w-11 rounded-full bg-black"></span>
                    <span className="relative inline-flex rounded-full h-10 w-10 bg-black"></span>
                </div> :
                <form className="w-1/4 my-4" onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="w-full text-xl" htmlFor="name">Task Name: </label>
                        <br />
                        <input
                            className="w-full h-10 border-2 border-black px-2 outline-none"
                            type="text"
                            placeholder='Task Name'
                            value={task.name}
                            onChange={(e) => setTask((prevState) => ({ ...prevState, name: e.target.value }))}
                        />
                    </div>
                    <div className="my-3">
                        <label className="w-full text-xl" htmlFor="desc">Task Description: </label>
                        <br />
                        <input
                            className="w-full h-10 border-2 border-black px-2 outline-none"
                            type="text"
                            placeholder='Task Description'
                            value={task.desc}
                            onChange={(e) => setTask((prevState) => ({ ...prevState, desc: e.target.value }))}
                        />
                    </div>
                    <div className="my-3">
                        <label className="text-xl" htmlFor="completed">Task Status:</label>
                        <input
                            className="mx-2"
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) => setTask((prevState) => ({ ...prevState, completed: e.target.checked }))}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button className='border-2 border-black rounded-lg py-1 px-20 text-xl font-semibold text-center'>
                            {id ? "Edit Task" : "Add Task"}
                        </button>
                    </div>
                    {msg.error && <p className="text-red-900 text-xl text-center">{msg.error}</p>}
                    {msg.success && <p className="text-green-900 text-xl text-center">{msg.success}</p>}
                </form>}
        </>
    )
}

export default AddTask