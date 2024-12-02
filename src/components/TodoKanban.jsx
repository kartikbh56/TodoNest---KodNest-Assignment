import { useContext } from "react";
import { DateContext, TasksContext, CategoriesContext } from "./context";

import KanbanColumn from "./KanbanColumn"

/* A To-Do List Kanban Board is a visual project management tool 
designed to organize tasks into categories based on their progress.
It uses a board divided into columns representing different stages of task completion,
such as Not Started, In Progress, and Done. 
Tasks are represented as individual cards that can be moved across the columns to reflect their current status. */

export default function TodoKanbanBoard() {
  // retrieve taskList (an array inside the tasks object) from TasksContext to display tasks
  const {
    tasks: { taskList },
  } = useContext(TasksContext);

  // retrieve currentDate object from DateContext
  const {
    day: { currentDate },
  } = useContext(DateContext);

  // retrieve categoryList, selectedCategory (id of the selected category) from categoriesContext
  const {
    categories: { categoryList, selectedCategory },
  } = useContext(CategoriesContext);

  // name of the category selected
  const categorySelected = categoryList.find(
    (c) => c.id === selectedCategory
  )?.category;

  // tasks filtered out on the selected date and selected category
  const currentDayTasksOnSelectedCategory = taskList.filter((t) => {
    // if a category is selected, then filter out tasks based on the currently selected date and currently selected category
    if (selectedCategory)
      return (
        new Date(t.createdAt).toDateString() === new Date(currentDate).toDateString() &&
        t.category === categorySelected
      );
    // if category is not selected (which means "all" tab is active) filter out tasks only based on the current selected date
    return new Date(t.createdAt).toDateString() === new Date(currentDate).toDateString();
  });

  // tasks which have status === "Not Started" will be in "Not Started" column of Kanban board
  const tasksToBeDone = currentDayTasksOnSelectedCategory.filter(
    (t) => t.status === "Not Started"
  );

  // tasks which have status === "In Progress" will be in "In Progress" column of Kanban board
  const tasksInProgress = currentDayTasksOnSelectedCategory.filter(
    (t) => t.status === "In Progress"
  );

  // tasks which have status === "Done" will be in "Done" column of Kanban board
  const tasksDone = currentDayTasksOnSelectedCategory.filter(
    (t) => t.status === "Done"
  );

  // kanban board will have 3 columns with their respective tasks to be displayed and different colors for visual enhancements.
  const columns = [
    { type: "Not Started", color: "red", tasks: tasksToBeDone },
    { type: "In Progress", color: "blue", tasks: tasksInProgress },
    { type: "Done", color: "green", tasks: tasksDone },
  ];

  // 3 columns (Not Started,In Progress, Done) with their repsective data passed through "column" prop
  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <KanbanColumn key={column.type} column={column} />
      ))}
    </div>
  );
}