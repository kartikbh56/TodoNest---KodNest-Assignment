/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { CategoriesContext, TasksContext } from "./context";
import EditTaskmenu from "./EditTaskMenu";
import TaskIcons from "./TaskIcons";
import { useDraggable } from "@dnd-kit/core";
export default function Task({ content, category, createdAt, type, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
  // To edit a task, hover on it and click on ✏️ to edit it.
  //  edit menu gets displayed
  const [editTaskMenu, setEditTaskMenu] = useState(false);

  // To delete a task, hover on it and click on 🗑️ to delete it.
  function onDeleteTask() {
    dispatchTasks({ type: "deleteTask", id: id });
  }

  // retrieve dispatch function from TaskContext
  const { dispatchTasks } = useContext(TasksContext);

  // retrieve categoryList from CategoriesContext
  const {
    categories: { categoryList },
  } = useContext(CategoriesContext);

  // find the color of the category of the current task to represent the task with its category and the the color associated with it.
  const color = categoryList.find((c) => c.category === category)?.color;

  return (
    // if the user has clicked on edit task then display EditTaskmenu
    // else display the Task contents
    <div>
      {editTaskMenu ? (
        <EditTaskmenu
          setEditTaskMenu={setEditTaskMenu}
          content={content}
          category={category}
          createdAt={createdAt}
          type={type}
          id={id}
        />
      ) : (
        <div className="task" ref={setNodeRef} {...attributes} style={style}>
          {/* task icons ✏️(edit) 🗑️(delete) appear when you hover on a task */}
          <TaskIcons
            onDeleteTask={onDeleteTask}
            setEditTaskMenu={setEditTaskMenu}
          />
          <div {...listeners} className="draggable">
            {content}
            {category && (
              <div className="task-category" style={{ backgroundColor: color }}>
                {category}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
