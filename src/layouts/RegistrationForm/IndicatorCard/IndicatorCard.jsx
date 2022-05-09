import React from "react";
import "./IndicatorCard.scss";

const IndicatorCard = (props) => {
  const { heading } = props;

  return (
    <div className="IndicatorCard">
      <h2 className="heading">{heading}</h2>
      <div className="info-div">
        <div className="rows row-1">
          <span className="keys water-row">Water:</span>
          <span className="values">1L</span>
        </div>
        <div className="rows row-2 honey-row">
          <span className="keys">Honey:</span>
          <span className="values">200ml</span>
        </div>
        <div className="rows row-3 total-row">
          <span className="keys">Total:</span>
          <span className="values">1.2L</span>
        </div>
      </div>
    </div>
  );
};

export default IndicatorCard;
