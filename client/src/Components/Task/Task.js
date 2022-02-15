import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Task = () => {
    const [task, setTask] = useState({
        name: "",
        desc: "",
        completed: false,
        createdAt: ""
    })

    const { id } = useParams();


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/task/${id}`)
            .then(res => setTask(res.data))
            .catch(err => console.log(err))
    }, [id])

    return <div>

    </div>
};

export default Task;
