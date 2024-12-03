/* eslint-disable react/prop-types */
import Task from "./Task";
import AddTask from "./AddTask"
import { useDroppable } from "@dnd-kit/core";
export default function KanbanColumn({ column }) { // columns : Not Started, In progress, Done
  const {setNodeRef} = useDroppable({
    id:column.type,
  })
  const { type, color, tasks } = column;
  return (
    <div className="column" ref={setNodeRef}>
      <div className={`badge ${color}`}>
        <span className={`dot ${color}`}></span>
        {type}
      </div>
      {tasks.map((t) => (
        <Task
          content={t.task}
          category={t.category}
          key={t.id}
          id={t.id}
          type={type}
          createdAt={t.createdAt}
        />
      ))}
      <AddTask type={type} />
    </div>
  );
}
