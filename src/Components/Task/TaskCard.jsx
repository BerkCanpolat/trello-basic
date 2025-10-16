import Tag from "../Tag/Tag"


const TaskCard = ({ title, tags, date, index, handleRemoveTasks, setActiveCard }) => {
  return (
    <div className="task-card"
    draggable
    onDragStart={() => setActiveCard(index)}
    onDragEnd={() => setActiveCard(null)}>
        <p>{title}</p>
        <div className="task-card-bottom">
          <div className="bottom-tags">
            {
                tags.map(((t, index) => (
                    <Tag tagName={t} key={index} handleCheckTags={true}/>
                )))
            }
          </div>
          <div className="bottom-del">
            <button onClick={() => handleRemoveTasks(index)}>-</button>
          </div>
        </div>
        <div className="task-date">
            <small>{date}</small>
        </div>
      </div>
  )
}

export default TaskCard