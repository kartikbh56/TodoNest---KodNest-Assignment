// import DaySelector from "./components/DaySelector";
import Navbar from "./components/Navbar";
import TaskCategories from "./components/taskCategories";
import CategoriesManager from "./components/CategoriesManager";
import Progress from "./components/Progress"
import { useReducer } from "react";
import {
  categoriesReducer,
  initialCategories,
} from "./Reducers/CategoriesReducer";

import {
  CategoriesContext,
  DateContext,
  TasksContext,
} from "./components/context";
import TodoKanbanBoard from "./components/TodoKanban";
import { dateReducer, initialDate } from "./Reducers/DateReducer";
import DaySelector from "./components/DaySelector";
import { initialTasks, tasksReducer } from "./Reducers/TaskReducer";

export default function App() {
  const [categories, dispatchCategories] = useReducer(
    categoriesReducer,
    initialCategories
  );
  const [day, dispatchDate] = useReducer(dateReducer, initialDate);
  const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks);
  
  return (
    <div className="app">
      <CategoriesContext.Provider value={{ categories, dispatchCategories }}>
        <DateContext.Provider value={{ day, dispatchDate }}>
          <TasksContext.Provider value={{ tasks, dispatchTasks }}>
          <Navbar>
            <DaySelector />
            <Progress/>
          </Navbar>
            <TaskCategories />
            {categories.isMenuOpen && <CategoriesManager />}
            <TodoKanbanBoard />
          </TasksContext.Provider>
        </DateContext.Provider>
      </CategoriesContext.Provider>
    </div>
  );
}
