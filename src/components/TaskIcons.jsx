/* eslint-disable react/prop-types */
export default function TaskIcons({ onDeleteTask, setEditTaskMenu }) {
    return (
      <div className="task-icons">
        <span
          className="icon edit-icon"
          onClick={() => setEditTaskMenu(true)} // edit mode on => display EditTaskmenu
          title="Edit task"
        >
          ✏️
        </span>
        <span
          className="icon delete-icon"
          onClick={onDeleteTask} // delete the task
          title="Delete task"
        >
          🗑️
        </span>
      </div>
    );
  }