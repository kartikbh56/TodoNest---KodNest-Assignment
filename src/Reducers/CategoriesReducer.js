import { initialTasks } from "./TaskReducer";

export const colors = [
  "#734aef",
  "#dc4a4a",
  "#339b45",
  "#4d79ff",
  "#2852cd",
  "#ac791b",
]; // background colors for indicating the category for each task.

// while creating a new category, we assign a random color for that category
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// categoryEntries contains a list of all the possible categories in taskList
const categoryEntries = Array.from(
  new Set(initialTasks.taskList.map((t) => t.category))
).map((c, i) => ({
  category: c,
  color: colors[i] || getRandomColor(), // assign a random color
  id: crypto.randomUUID(),
}));


export const initialCategories = {
  categoryList: categoryEntries,
  selectedCategory: null,
  isMenuOpen: false,
};

export function categoriesReducer(categories, action) {
  switch (action.type) {
    case "updateCategoryList":
      return {
        ...categories,
        categoryList: [
          ...categories.categoryList,
          {
            category: action.newCat,
            id: crypto.randomUUID(),
            color: getRandomColor(),
          },
        ],
      };
    case "addCategory":
      return {
        ...categories,
        categoryList: [...categories.categoryList, action.category],
      };
    case "deleteCategory":
      return {
        ...categories,
        categoryList: categories.categoryList.filter((c) => c.id !== action.id),
        selectedCategory: null,
      };
    case "editCategory":
      return {
        ...categories,
        categoryList: categories.categoryList.map((c) =>
          c.id === action.id ? { ...c, category: action.category } : c
        ),
      };
    case "toggleView":
      return {
        ...categories,
        isMenuOpen: !categories.isMenuOpen,
      };
    case "selectCategory":
      return {
        ...categories,
        selectedCategory: action.selectedCategory,
      };
  }
}
