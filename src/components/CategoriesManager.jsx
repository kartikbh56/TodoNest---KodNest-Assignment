import { useContext, useState } from "react";
import { CategoriesContext, TasksContext } from "./context";
import Category from "./Category.jsx";
import AddCategoryMenu from "./AddCategoryMenu.jsx";

export default function CategoriesManager() {
  // retrieve categoryList and dispatch function from CategoryContext
  const {
    categories: { categoryList },
    dispatchCategories,
  } = useContext(CategoriesContext);

  // retrieve dispatch function of tasks
  const { dispatchTasks } = useContext(TasksContext);

  // local state for toggling view for adding new category
  const [addOption, setAddOption] = useState(false);

  function onDeleteCategory(id) {
    // when a category is deleted, that category is deleted from category list
    dispatchCategories({ type: "deleteCategory", id: id });

    // The tasks which are under that category will have the category property set to null
    const categoryTobeDeleted = categoryList.find((c) => c.id === id)?.category;
    dispatchTasks({
      type: "setTasks",
      categoryTobeDeleted: categoryTobeDeleted,
    });
  }

  function onEdit(e, id) {
    // category name before editing it
    const previousCategory = categoryList.find((c) => c.id === id)?.category;

    // When you edit a category, that category will have a new name set from e.target.value
    dispatchCategories({
      type: "editCategory",
      id: id,
      category: e.target.value,
    });

    // when you edit a category, that category name has to be updated to the tasks which are under that category
    dispatchTasks({
      type: "updateTasks",
      previousCategory: previousCategory,
      updatedCategory: e.target.value,
    });
  }

  function addNewCategory(category) {
    // before adding a new category, check if it already exists
    const categoryAlreadyExist = categoryList.find(
      (c) => c.category === category.category
    );

    // alert the user if the category already exists, if not you can add a new category
    if (categoryAlreadyExist) window.alert("Category Already Exists!!");
    else dispatchCategories({ type: "addCategory", category: category });
  }

  // The modal overlay or backdrop (in this case its modalView) is the semi-transparent background that appears behind a modal window.
  //Its purpose is to dim the underlying content, helping users focus on the modal while signaling that the main page is temporarily inactive.
  return (
    <div
      className="modalview"
      onClick={() => dispatchCategories({ type: "toggleView" })} // clicking outside the menu will close it.
    >
      <div
        className="categories-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Manage Categories</h2>
        {categoryList.map((c) => (
          <Category
            category={c.category}
            onDelete={() => onDeleteCategory(c.id)}
            onEdit={(e) => onEdit(e, c.id)}
            key={c.id}
          />
        ))}
        {addOption ? ( // if you click on add category, "AddCategoryMenu" will appear for adding a new category else the "add category" button will appear
          <AddCategoryMenu
            setAddOption={setAddOption}
            addNewCategory={addNewCategory}
          />
        ) : (
          <div className="add-task" onClick={() => setAddOption(true)}>
            + Add Category
          </div>
        )}
      </div>
    </div>
  );
}
