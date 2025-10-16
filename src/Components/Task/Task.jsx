import './Task.css';
import TaskCard from './TaskCard';
import { FaClipboardList } from 'react-icons/fa6';

const Task = ({ title, task, status, handleRemoveTasks }) => {
const filteredTasks = task.filter((t) => t.status === status);

  return (
    <section className="task-column">
      <h2>{title}</h2>
      {
        filteredTasks.length == 0 ? <p className='empty-message'> <FaClipboardList className='empty-icon' color='white' size={200}/> Henüz birşey eklemedin..</p> : (
            <div>
                {
                  task.map((tasks, index) => tasks.status === status && (
                      <TaskCard key={index} title={tasks.task} tags={tasks.tags} date={tasks.date} handleRemoveTasks={handleRemoveTasks} index={index}/>
                  ))
                }
            </div>

        )
      }
    </section>
  );
};

export default Task;
