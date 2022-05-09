import React from "react";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import FormHeader from "../../../components/FormHeader/FormHeader";
import Input from "../../../components/Input/Input";
import "./ConfirmationForm.scss";

const ConfirmationForm = (props) => {
  const { setUserInput, handleVerification, isError } = props;

  return (
    <div className="ConfirmationForm">
      <FormHeader
        title={"Enter email verification"}
        subTitle={"Please enter verification"}
      />
      <div className="input-container">
        <div className="input-with-error-message">
          <Input
            required
            isError={isError}
            inputType="number"
            id="number"
            placeholder={"Enter your code"}
            setValue={setUserInput}
          />
          <ErrorMessage
            showError={isError}
            message={"Entered value not matched"}
            styles={{ alignSelf: "start" }}
          />
        </div>
        <Button
          btnText={"Continue"}
          outline={false}
          isDisabled={false}
          handleButtonClick={handleVerification}
        />
      </div>
    </div>
  );
};

export default ConfirmationForm;
