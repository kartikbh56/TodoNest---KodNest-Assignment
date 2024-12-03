export const initialTasks = {
  taskList: JSON.parse(localStorage.getItem("taskList")) || [],
};

export function tasksReducer(tasks, action) {
  switch (action.type) {
    case "addTask": {
      localStorage.setItem(
        "taskList",
        JSON.stringify([...tasks.taskList, action.newTask])
      );
      return {
        ...tasks,
        taskList: [...tasks.taskList, action.newTask],
      };
    }
    case "deleteTask": {
      const newTasks = tasks.taskList.filter((t) => t.id !== action.id);
      localStorage.setItem("taskList", JSON.stringify(newTasks));
      console.log("deleting task");
      return {
        ...tasks,
        taskList: newTasks,
      };
    }
    case "modifyTask": {
      const newTasks = tasks.taskList.map((t) =>
        t.id === action.id ? action.modifiedTask : t
      );
      localStorage.setItem("taskList", JSON.stringify(newTasks));
      return {
        ...tasks,
        taskList: newTasks,
      };
    }
    case "updateTasks": {
      console.log("updating tasks");
      const newTasks = tasks.taskList.map((t) =>
        t.category === action.previousCategory
          ? { ...t, category: action.updatedCategory }
          : t
      );
      localStorage.setItem("taskList", JSON.stringify(newTasks));
      return {
        ...tasks,
        taskList: newTasks,
      };
    }
    case "setTasks": {
      console.log("setting tasks");
      const newTasks = tasks.taskList.map((task) =>
        task.category === action.categoryTobeDeleted
          ? { ...task, category: null }
          : task
      );
      localStorage.setItem("taskList", JSON.stringify(newTasks));
      return {
        ...tasks,
        taskList: newTasks,
      };
    }
    
    case "updateTaskList":{
      const newTasks = action.newTasks
      localStorage.setItem("taskList", JSON.stringify(newTasks));
      return {
        ...tasks,
        taskList: newTasks,
      };
    }

  }
}
