import { useContext } from "react";
import { CategoriesContext } from "./context";
export default function TaskCategories() {
  // retrieving categoryList, selectedCategory (id of selected category) and dispatch function from Categories context
  const {
    categories: { categoryList, selectedCategory },
    dispatchCategories,
  } = useContext(CategoriesContext);
  return (
    <div className="tab-list">
      <button
        className={`tab ${selectedCategory || "active"}`} // if selectedCategory is null then the "All" tab is active 
        onClick={() =>
          dispatchCategories({
            type: "selectCategory",
            selectedCategory: null,
          }) // When you click on "All" tab, all the tasks from all the categories are diplayed, so selectedCategory will have null which means no filtering of tasks is done based on category.
        }
      >
        All
      </button>
      {categoryList.map((b) => (
        <button
          className={`tab ${b.id === selectedCategory ? "active" : ""}`} // if current category's id is equal to selectedCategory then that's the active tab
          key={b.id}
          onClick={() =>
            dispatchCategories({
              type: "selectCategory",
              selectedCategory: b.id, // when you click on a tab, then the selectedCategory will be the id of that tab 
            })
          }
        >
          {b.category}
        </button>
      ))}
      <button
        className="tab manage-categories"
        onClick={() => dispatchCategories({ type: "toggleView" })} // display the manage category window
      >
        <img src="icons/pencil.png" />
        Manage categories
      </button>
    </div>
  );
}
