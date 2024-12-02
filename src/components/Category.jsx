/* eslint-disable react/prop-types */
// each category will have option to edit or delete it
export default function Category({ category, onDelete, onEdit }) {
    return (
      <div className="category">
        <input type="text" value={category} onChange={onEdit} />
        <button className="btn delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    );
  }