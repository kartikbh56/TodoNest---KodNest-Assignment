/* eslint-disable react/prop-types */

import { useState } from "react";
import AddTaskMenu from "./AddTaskMenu";
// Add task button
export default function AddTask({ type }) {
    // type is to identify in which column the task is being added
    const [addOption, setAddOption] = useState(false); // toggling the window
    return (
      <>
        {addOption ? (
          <AddTaskMenu setAddOption={setAddOption} type={type} />
        ) : (
          <div className="new-task" onClick={() => setAddOption(true)}>
            + New task
          </div>
        )}
      </>
    );
  }