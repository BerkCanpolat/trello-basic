import { useState } from "react";
import Tag from "../Tag/Tag";
import "./AddForm.css";
import CustomSelect from "../Select/Select";

const AddForm = ({ setTask, onClose }) => {
    const statusOptions = ["todo", "doing", "done"];
    const [taskData, setTaskData] = useState({
        task: "",
        status: "todo",
        tags: [],
        date: ""
    });

    const handleCheckTags = (tag) => {
        return taskData.tags.some(myTag => myTag === tag)
    }

    const handleSelectedTag = (tag) => {
        if(taskData.tags.some(myTag => myTag === tag)) {
            const filterTag = taskData.tags.filter(myFilterTag => myFilterTag !== tag);
            setTaskData(prev => {
                return {...prev, tags: filterTag}
            })
        } else {
            setTaskData(prev => {
                return {...prev, tags: [...prev.tags, tag]}
            })
        }
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target;

        setTaskData(prev => {
            return {...prev, [name]: value}
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const today = new Date();
  const formattedDate = today.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
        setTask(prev => {
            return [...prev, {...taskData, date: formattedDate}]
        });
        setTaskData({
            task: "",
            status: "todo",
            tags: [],
            date: ""
        });
        console.log(taskData);
        console.log(taskData.status);

        console.log("Eklenen görev:", taskData.task);
  console.log("Tarih:", formattedDate);
    }

  return (
    <header className="headerForm">
        <form onSubmit={handleSubmit}>
          <input value={taskData.task} type="text" placeholder='Add Task' onChange={handleOnChange} name="task" />

          <div className="task-wrapper">
          <div className="task-tags">
            <Tag tagName="Code" handleSelectedTag={handleSelectedTag} handleCheckTags={handleCheckTags("Code")}/>
            <Tag tagName="Life" handleSelectedTag={handleSelectedTag} handleCheckTags={handleCheckTags("Life")}/>
            <Tag tagName="Sports" handleSelectedTag={handleSelectedTag} handleCheckTags={handleCheckTags("Sports")}/>
            <Tag tagName="Exam" handleSelectedTag={handleSelectedTag} handleCheckTags={handleCheckTags("Exam")}/>
          </div>

          <div className="task-status">
            <CustomSelect options={statusOptions} value={taskData.status} onChange={(val) => setTaskData(prev => ({...prev, status: val}))}/>
            <button onClick={onClose} type='submit'>Add</button>
          </div>

          </div>

        </form>
      </header>
  )
}

export default AddForm