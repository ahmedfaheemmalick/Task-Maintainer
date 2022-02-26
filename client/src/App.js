import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Tasks from './Components/Tasks/Tasks';
import AddTask from './Components/AddTask/AddTask';

const App = () => {
  return (
    <div className='bg-slate-300 w-screen h-screen flex flex-col items-center'>
      <BrowserRouter>
        <Link className='text-4xl font-normal text-center pt-10' to="/">
          Task Maintainer
        </Link>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/task/create" element={<AddTask />} />
          <Route path="/task/:id/update" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
