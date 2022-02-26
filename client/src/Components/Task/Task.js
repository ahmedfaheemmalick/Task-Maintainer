import { Link } from "react-router-dom";
import edit from "../../Images/edit.svg";
import trash from "../../Images/trash.svg";

const Task = ({ task, deleteTask }) => {
    return (
        <div key={task._id} className="flex justify-between w-full my-2">
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
                <Link to={`task/${task._id}/update`} className='w-6 mx-2 cursor-pointer'>
                    <img src={edit} alt="Edit Task" />
                </Link>
                <button className='w-6 mx-2 cursor-pointer' onClick={() => deleteTask()}>
                    <img src={trash} alt="Delete Task" />
                </button>
            </div>
        </div>
    )
};

export default Task;
