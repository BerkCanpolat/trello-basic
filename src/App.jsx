import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Components/Task/Task";
import ModalCard from "./Components/Modal/ModalCard";

const getTaskLocaleStorage = localStorage.getItem("task");

function App() {
  const [task, setTask] = useState(JSON.parse(getTaskLocaleStorage) || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task])
  

  const handleRemoveTasks = (index) => {
    const itemRemove = task.filter((item, i) => i !== index);
    setTask(itemRemove);
  } 

  return (
    <div className="mainApp">

      <div className="headerApp">
      <h1>Tasks</h1>

      <button onClick={() => setIsModalOpen(true)} className="open-btn">
        Add Task
      </button>

      <ModalCard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setTask={setTask}/>
      </div>

      <main className="mainTasks">
        <Task title="To do" task={task} status="todo" handleRemoveTasks={handleRemoveTasks} />
        <Task title="Doing" task={task} status="doing" handleRemoveTasks={handleRemoveTasks} />
        <Task title="Done" task={task} status="done" handleRemoveTasks={handleRemoveTasks}/>
      </main>
    </div>
  );
}

export default App;
