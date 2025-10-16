import React from 'react';
import './Task.css';
import TaskCard from './TaskCard';
import { FaClipboardList } from 'react-icons/fa6';
import DropArea from '../Drop/DropArea';

const Task = ({ title, task, status, handleRemoveTasks, setActiveCard, onDrop, searchTerm }) => {
// const filteredTasks = task.filter((t) => t.status === status);
const filteredTasks = task.filter((t) =>t.status === status && t.task.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <section className="task-column">
      <h2>{title}</h2>
      <DropArea onDrop={() => onDrop(status,0)}/>
      {
        filteredTasks.length == 0 ? <p className='empty-message'> <FaClipboardList className='empty-icon' color='white' size={200}/> You haven't added anything yet.</p> : (
            <div>
                {
                  task.map((tasks, index) => tasks.status === status && (
                    <React.Fragment key={index}>
                      <TaskCard title={tasks.task} tags={tasks.tags} date={tasks.date} handleRemoveTasks={handleRemoveTasks} index={index} setActiveCard={setActiveCard}/>
                      <DropArea onDrop={() => onDrop(status,index + 1)}/>
                    </React.Fragment>
                  ))
                }
            </div>

        )
      }
    </section>
  );
};

export default Task;
