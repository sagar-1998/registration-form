import React from "react";
import Button from "../../../components/Button/Button";
import FormHeader from "../../../components/FormHeader/FormHeader";
import "./SuccessPage.scss";
const SuccessPage = (props) => {
  const {
    styles,
    image,
    heading,
    subHeading,
    handleContinueClick,
    info = true,
    showButton = true,
  } = props;
  return (
    <div className="SuccessPage" style={{ ...styles }}>
      <FormHeader title={heading} subTitle={subHeading} />
      <div className="image-container">
        {info && (
          <p>
            Form is completed! <span>Please find your entry soon.</span>
          </p>
        )}
        <img className="success-image" src={image} alt="" />
        {info && <p>Thank you!</p>}
      </div>

      {showButton && (
        <Button
          btnText={"Continue"}
          outline={false}
          isDisabled={false}
          handleButtonClick={handleContinueClick}
        />
      )}
    </div>
  );
};

export default SuccessPage;
