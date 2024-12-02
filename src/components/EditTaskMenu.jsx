/* eslint-disable react/prop-types */
import { useState } from "react";
import { TasksContext, CategoriesContext } from "./context";
import { useContext } from "react";
export default function EditTaskmenu({
    setEditTaskMenu, // to close the edit taskMenu
    id, // id of the task to modify the target task
    content, // current value of the task
    category, // current category of the task
    createdAt, // date at which the task was created
    type, // column of the kanban board.
    //why do we need type ? Answer: based on the type of column the task is in, we can decide which column the task can be moved to.
  }) {
    const [task, setTask] = useState(content); // local state controlled by input field to edit task
    const [cat, setCat] = useState(category); // local state controlled by input fields to edit category
  
    //The toDateString() method returns a string in the format "Day Month Date Year",
    //but the <input type="date"> expects the date in the ISO 8601 format (YYYY-MM-DD).
    // You need to convert createdAt to a string in the required format (YYYY-MM-DD) before setting it as the value of the input[type="date"].
    // createdAt.toISOString(): This converts the Date object to a string in the format YYYY-MM-DDTHH:mm:ss.sssZ.
    // .split('T')[0]: Splits the ISO string at the T and takes the first part, which is the date in the required format YYYY-MM-DD.
    const formattedDate = new Date(createdAt).toISOString().split("T")[0];
    const [day, setDay] = useState(formattedDate);
  
    const buttons = {
      "Not Started": [
        // If the task is in "Not Started" column, it either move to "In Progress" or "Done"
        // so we will have two buttons "Start" and "Done" to move them to possible states
        { btn: "Start", color: "blue", title: "Mark as In Progress" },
        { btn: "Done", color: "green", title: "Mark as Done" },
      ],
      "In Progress": [
        // If the task is in "In Progress" column, it either move to "Not Started" or "Done"
        // so we will have two buttons "Stop" and "Done" to move them to possible states
        { btn: "Stop", color: "red", title: "Mark as Not Started" },
        { btn: "Done", color: "green", title: "Mark as Done" },
      ],
      Done: [
        // If the task is in "Done" column, it either move to "In Progress" or "Not Started"
        // so we will have two buttons "Restart" and "Undone" to move them to possible states
        { btn: "Restart", color: "blue", title: "Mark as In progress" },
        { btn: "Undone", color: "red", title: "Mark as Not Started" },
      ],
    };
  
    // taskList to find the current task and dispatch function to modify tasklist
    const {
      tasks: { taskList },
      dispatchTasks,
    } = useContext(TasksContext);
  
    // categoryList to check the new category already exists or not and dispatch function to update categoryList if there's a new category
    const {
      categories: { categoryList },
      dispatchCategories,
    } = useContext(CategoriesContext);
  
    // task object from taskList to be modified
    const taskToBeModified = taskList.find((t) => t.id === id);
  
    // when you click on save
    function handleSave() {
      setEditTaskMenu(false); // close the edit window
      const modifiedTask = {
        ...taskToBeModified,
        task: task,
        createdAt: new Date(day),
        category: cat,
      }; // modified task will have the values updated in local states
  
      dispatchTasks({ type: "modifyTask", id: id, modifiedTask: modifiedTask }); // taskList is updated with the target task modified
  
      // update the category list if there is a new category which does not exist in categoryList. also make sure the local state cat is non empty
      if (!categoryList.map((c) => c.category).includes(cat) && cat)
        dispatchCategories({ type: "updateCategoryList", newCat: cat });
    }
  
    // update the status of the task
    function handleSetStatus(btn) {
      setEditTaskMenu(false);
      if (btn === "Start" || btn === "Restart") {
        // move to "In progress" column
        const modifiedTask = {
          ...taskToBeModified,
          status: "In Progress",
        };
        dispatchTasks({ type: "modifyTask", id: id, modifiedTask: modifiedTask });
      }
  
      if (btn === "Done") {
        // move to "Done" column
        const modifiedTask = {
          ...taskToBeModified,
          status: "Done",
        };
        dispatchTasks({ type: "modifyTask", id: id, modifiedTask: modifiedTask });
      }
  
      if (btn === "Undone" || btn === "Stop") {
        // move to "Not Started" column
        const modifiedTask = {
          ...taskToBeModified,
          status: "Not Started",
        };
        dispatchTasks({ type: "modifyTask", id: id, modifiedTask: modifiedTask });
      }
    }
  
    const setStatusButtons = buttons[type]; // buttons to update the status of tasks to their valid states.
  
    return (
      <div className="task">
        <div style={{ marginBottom: "10px", textAlign: "center" }}>✏️ Edit </div>
        <input
          className="menu-container-header-input edit-task"
          value={task}
          onChange={(e) => setTask(e.target.value)} // update the local state "task"
          autoFocus
        />
        <input
          type="text"
          className="menu-container-header-input edit-task"
          value={cat}
          onChange={(e) => setCat(e.target.value)} // update the local state "category"
        />
        <input
          type="date"
          value={day}
          className="menu-container-header-input edit-task"
          onChange={(e) => setDay(e.target.value)} // update the local state "date"
        />
  
        <div className="buttons">
          {setStatusButtons.map((b) => (
            <button
              key={b.color}
              title={b.title}
              className={`set-status-badge ${b.color}`} // visual enhancement with colors
              onClick={() => handleSetStatus(b.btn)}
            >
              {/* // visual enhancement with colors */}
              <span className={`dot ${b.color}`}></span>
              {b.btn}
            </button>
          ))}
  
          <button onClick={handleSave} className="save">
            save
          </button>
          <button onClick={() => setEditTaskMenu(false)} className="close">
            close
          </button>
        </div>
      </div>
    );
  }