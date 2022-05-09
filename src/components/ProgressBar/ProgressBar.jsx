import React from "react";
import "./ProgressBar.scss";
const ProgressBar = (props) => {
  const { currentPageState = 1, totalSteps, styles } = props;
  const visitedArray = [...Array(currentPageState).keys()];
  const setPercentage = (pageNumber) => pageNumber * (100 / totalSteps);
  return (
    <div className="outer-container" style={{ ...styles }}>
      <div
        className="current-state"
        style={{ left: `${setPercentage(currentPageState)}%` }}
      >
        {currentPageState}
      </div>
      {visitedArray.map((el) => {
        if (el === 0) return;
        return (
          <div
            key={el + Math.random()}
            className="visited-state"
            style={{ left: `${setPercentage(el)}%` }}
          >
            {el}
          </div>
        );
      })}
      <div
        className="inner-container"
        style={{ width: `${setPercentage(currentPageState)}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
