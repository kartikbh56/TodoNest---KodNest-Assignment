/* eslint-disable react/prop-types */
export default function TaskProgress({
    percentage,
    progressType = "Overall", // default value
    color = "rgb(0, 0, 45)", // default color
  }) {
    return (
      <div>
        <div className="progress-percent">
          {progressType} progress: {percentage.toFixed(0)}%
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          ></div>
        </div>
      </div>
    );
  }