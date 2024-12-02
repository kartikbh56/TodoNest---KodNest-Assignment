/* eslint-disable react/prop-types */
import { useState } from "react";
import { colors } from "../Reducers/CategoriesReducer";

// UI to add a new category,
export default function AddCategoryMenu({ setAddOption, addNewCategory }) {
    // local state for a controlled element to add a new category.
    // when you click on add the newCat value is added to the cateogoryList
    // until you click on add, the value is controlled by newCat and setNewCat
    const [newCat, setNewCat] = useState("");
  
    // we have an array of colors for representing each category for a better user experience.
    // while adding a new category, a random color from that array will be selected.
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    return (
      <div className="category">
        <input
          type="text"
          className="add-cat-input"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)} // controlled element
          autoFocus
        />
        <button
          className="btn add"
          onClick={() => {
            // check if newCat is not empty
            if (newCat)
              addNewCategory({
                category: newCat,
                color: randomColor,
                id: crypto.randomUUID(),
              });
            // reset the local state
            setNewCat("");
          }}
        >
          Add
        </button>
        <button className="btn cancel" onClick={() => setAddOption(false)}>
          Cancel
        </button>
      </div>
    );
  }
  