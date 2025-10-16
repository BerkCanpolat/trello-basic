import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Components/Task/Task";
import ModalCard from "./Components/Modal/ModalCard";

const getTaskLocaleStorage = localStorage.getItem("task");

function App() {
  const [task, setTask] = useState(JSON.parse(getTaskLocaleStorage) || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCard, setactiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  const handleRemoveTasks = (index) => {
    const itemRemove = task.filter((item, i) => i !== index);
    setTask(itemRemove);
  };

  const onDrop = (status, position) => {

    if (activeCard == null || activeCard === undefined) return;

    const taskToMove = task[activeCard];
    const updatedTasks = task.filter((task, index) => index !== activeCard);

    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    setTask(updatedTasks);
  };

  return (
    <div className="mainApp">
      <div className="headerApp">
        <h1>Tasks</h1>

        <button onClick={() => setIsModalOpen(true)} className="open-btn">
          Add Task
        </button>

        <ModalCard
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setTask={setTask}
        />
      </div>

      <main className="mainTasks">
        <Task
          title="To do"
          task={task}
          status="todo"
          handleRemoveTasks={handleRemoveTasks}
          setActiveCard={setactiveCard}
          onDrop={onDrop}
        />
        <Task
          title="Doing"
          task={task}
          status="doing"
          handleRemoveTasks={handleRemoveTasks}
          setActiveCard={setactiveCard}
          onDrop={onDrop}
        />
        <Task
          title="Done"
          task={task}
          status="done"
          handleRemoveTasks={handleRemoveTasks}
          setActiveCard={setactiveCard}
          onDrop={onDrop}
        />
      </main>
    </div>
  );
}

export default App;
