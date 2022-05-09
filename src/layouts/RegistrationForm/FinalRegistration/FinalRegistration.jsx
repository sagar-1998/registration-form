import { useState } from "react";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormTitle from "../../../components/FormTitle/FormTitle";
import Input from "../../../components/Input/Input";
import Label from "../../../components/Label/Label";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import successImage from "../../../assets/svgs/successimagefinal.svg";

import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
  validateEmail,
  validatePassword,
} from "../../../utilities/HelperFunctions";
import SuccessPage from "../Success/SuccessPage";
import "./FinalRegistration.scss";

const FinalRegistration = ({ formProps }) => {
  const { step, setStep, isError, setIsError, errorMessage, setErrorMessage } =
    formProps;
  const personDetails = {
    fullName: getDataFromLocalStorage("basicInfo").fullName,
    email: getDataFromLocalStorage("personalInfo").email,
  };
  const [userName, setUserName] = useState(personDetails?.fullName);
  const [userNameError, setUserNameError] = useState(false);
  const [userEmail, setUserEmail] = useState(personDetails?.email);
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [showSuccess, setShowSuccess] = useState();
  const goToPreviousState = () => {
    setDataToLocalStorage("step", step - 1);
    setStep(step - 1);
    setIsError(false);
    setErrorMessage("");
  };

  const handleFormSubmit = () => {
    validatePassword(userPassword)
      ? setUserPasswordError(false)
      : setUserPasswordError(true);

    userName !== "" ? setUserNameError(false) : setUserNameError(true);
    validateEmail(userEmail)
      ? setUserEmailError(false)
      : setUserEmailError(true);

    // We should not store the password in LocalStorage but as the project requirement I am storing it in local storage
    // Not encrypting the password because bcrypt is having issue with the html
    // Password is stored after second "f"
    if (
      validatePassword(userPassword) &&
      userName !== "" &&
      validateEmail(userEmail)
    ) {
      setDataToLocalStorage("finalInfo", {
        fullName: userName,
        email: userEmail,
        password: `$fkeajrh2hkrjhsf${userPassword}$07803247324`,
      });
      setShowSuccess(true);
    }
  };
  return !showSuccess ? (
    <div className="FinalRegistration">
      <FormHeader
        title={"Registration Form"}
        subTitle={"This is Registration form"}
      />
      <ProgressBar currentPageState={step} totalSteps={6} />

      <FormTitle
        styles={{ marginBottom: "30px", marginTop: "15px" }}
        titleText="Just on the Show"
      />

      <div className="input-container form1-input-container">
        <Label
          labelFor={"user-name"}
          labelText={"Name"}
          styles={{ paddingBottom: "5px" }}
        />
        <Input
          isError={userNameError}
          errorMessage={errorMessage}
          inputType="text"
          defaultValue={personDetails.fullName && userName}
          id="user-name"
          placeholder={"Enter your name"}
          setValue={setUserName}
        />
        {/* <ErrorMessage showError={isError} message={errorMessage} /> */}
      </div>
      <div className="input-container form1-input-container">
        <Label
          labelFor={"user-email"}
          labelText={"Email"}
          styles={{ paddingBottom: "5px" }}
        />
        <Input
          isError={userEmailError}
          errorMessage={errorMessage}
          defaultValue={personDetails.email && userEmail}
          inputType="email"
          id="user-email"
          placeholder={"example@mail.com"}
          setValue={setUserEmail}
        />
        {/* <ErrorMessage showError={isError} message={errorMessage} /> */}
      </div>
      <div className="input-container form1-input-container">
        <Label
          labelFor={"user-passsword"}
          labelText={"Password"}
          styles={{ paddingBottom: "5px" }}
        />
        <Input
          isError={userPasswordError}
          errorMessage={
            "At least one capital Letter, one small and one number and 8 digits minimum required."
          }
          inputType="password"
          minLength={8}
          id="phoneNumber"
          placeholder={"Enter Password"}
          setValue={setUserPassword}
        />
      </div>

      <div
        className="button-container"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          btnText={"Previous"}
          styles={{ alignSelf: "end" }}
          outline={true}
          isDisabled={false}
          handleButtonClick={goToPreviousState}
        />

        <div>
          <Button
            btnText={"Continue"}
            styles={{ alignSelf: "end" }}
            outline={false}
            isDisabled={false}
            handleButtonClick={handleFormSubmit}
          />
          <ErrorMessage
            styles={{ textAlign: "center" }}
            showError={isError}
            normalError={true}
            message={"Please resolve the error"}
          />
        </div>
      </div>
    </div>
  ) : (
    <SuccessPage
      image={successImage}
      heading={"Done Yeah"}
      subHeading={"You are done here!"}
      info={false}
      showButton={false}
      // handleContinueClick={handleSuccessPageContinueClick}
    />
  );
};

export default FinalRegistration;
