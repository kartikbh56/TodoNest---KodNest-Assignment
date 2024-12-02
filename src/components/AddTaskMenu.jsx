/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { DateContext,CategoriesContext,TasksContext } from "./context";
export default function AddTaskMenu({ setAddOption, type }) {
    // placeholders for different types of columns where AddTaskMenu will be displayed
    const placeholders = {
      "Not Started": "What do you want to work on?",
      "In Progress": "What are you working on?",
      Done: "What have you done?",
    };
    const placeholder = placeholders[type];
  
    const [newTask, setNewTask] = useState(""); // local state
    const [newCat, setNewCat] = useState(""); // local state
  
    const {
      categories: { categoryList, selectedCategory },
      dispatchCategories,
    } = useContext(CategoriesContext);
  
    const {
      day: { currentDate },
    } = useContext(DateContext);
  
    // to check in which category the new task is being added
    const categorySelected = categoryList.find(
      (c) => c.id === selectedCategory
    )?.category;
  
    const { dispatchTasks } = useContext(TasksContext);
  
    function addTask() {
      const newTaskObj = {
        task: newTask,
        status: type,
        createdAt: new Date(currentDate),
        // if the task being added when a category is selected, then that task will be under that category
        // if none of the category is selected, then the input box accepts the category in which the task is to be added.
        // if the user does not enter anything in the category (local state) of the new task, then the category wil be null for the new task.
        category: categorySelected || newCat || null,
        id: crypto.randomUUID(),
      };
      dispatchTasks({ type: "addTask", newTask: newTaskObj });
  
      // update the category list if there is a new category which does not exist in categoryList. also make sure the local state cat is non empty
      if (!categoryList.map((c) => c.category).includes(newCat) && newCat)
        dispatchCategories({ type: "updateCategoryList", newCat: newCat });
  
      setAddOption(false); // close the window
    }
  
    return (
      <div
        className="add-task-menu-container"
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      >
        <input
          className="menu-container-header-input"
          placeholder={placeholder}
          autoFocus={true}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // controlled element
        />
        {!categorySelected && (
          <input
            className="menu-container-header-input"
            placeholder="category"
            value={newCat}
            key={categorySelected}
            onChange={(e) => setNewCat(e.target.value)} // controlled element
          />
        )}
        <div className="form-actions" style={{ flexDirection: "row-reverse" }}>
          <div>
            <button
              type="button"
              className="btn cancel"
              onClick={() => setAddOption(false)} // controlled element
            >
              Cancel
            </button>
            <button className="btn add" onClick={addTask}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }