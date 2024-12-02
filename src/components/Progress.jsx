/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CategoriesContext, DateContext, TasksContext } from "./context";
import TaskProgress from "./TaskProgress";

export default function Progress() {
  // we need taskList to calculate the progress of tasks by their current status (Not Started/In Progress/Done)
  const {
    tasks: { taskList },
  } = useContext(TasksContext);

  // we need currentDate (currently selected date) to calculate the progress of tasks on that particular date
  const {
    day: { currentDate },
  } = useContext(DateContext);

  // we need categoryList to calculate the progress of tasks based on their category.
  // selectedCategory is the id which represents the currently selected category
  const {
    categories: { categoryList, selectedCategory },
  } = useContext(CategoriesContext);

  // we need to the selectedCategoryObj to get the selected category's name and the color assigned to it.
  // If you have clicked on All in the categories tab, that means selectedCategory is set to null. so we need to check if the selectedCategory exists or not before accessing the selectedCategory object.
  const selectedCategoryObj =
    selectedCategory && categoryList.find((c) => c.id === selectedCategory);

  // Name and color of the category selected
  const selectedCategoryName = selectedCategoryObj?.category;
  const color = selectedCategoryObj?.color;

  // filtering out all the tasks on the selected date.
  const totalTasksOnSelectedDay = taskList.filter(
    (t) => t.createdAt.toDateString() === currentDate.toDateString()
  );

  // total number of tasks on the selected date
  const totalTasksOnSelectedDayCount = totalTasksOnSelectedDay.length;

  // total number of completed tasks on the selected date (for calculating the %)
  // completed tasks have "status" property set to "Done"
  const completedTasks = totalTasksOnSelectedDay.filter(
    (task) => task.status === "Done"
  ).length;

  // % of tasks completed on the selected date.
  // make sure you don't divide by zero to avaod NaN.
  const overallProgressPercentage =
    totalTasksOnSelectedDayCount > 0
      ? (completedTasks / totalTasksOnSelectedDayCount) * 100
      : 0; // Handle division by zero

  // tasks under selected category on selected date
  const selectedCategoryTasks = totalTasksOnSelectedDay.filter(
    (task) => task.category === selectedCategoryName
  );

  // total number of tasks under selected category on selected date
  const selectedCategoryTasksCount = selectedCategoryTasks.length;

  // completed tasks in selected category
  const completedTasksOnSelectedCategory = selectedCategoryTasks.filter(
    (t) => t.status === "Done"
  );

  // total number of completed tasks in selected category
  const completedTasksOnSelectedCategoryCount =
    completedTasksOnSelectedCategory.length;

  // % of tasks completed in selected category
  // make sure you don't divide by 0 to avoid NaN
  const selectedCategoryTasksProgress =
    selectedCategoryTasksCount > 0
      ? (completedTasksOnSelectedCategoryCount / selectedCategoryTasksCount) *
        100
      : 0; // Handle division by zero

  return (
    <>
      <TaskProgress percentage={overallProgressPercentage} />
      {selectedCategoryName && (
        <TaskProgress
          percentage={selectedCategoryTasksProgress}
          progressType={selectedCategoryName}
          color={color}
        />
      )}
    </>
  );
}
