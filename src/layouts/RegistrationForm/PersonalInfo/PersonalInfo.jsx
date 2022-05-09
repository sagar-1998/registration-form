import { useState } from "react";
import Button from "../../../components/Button/Button";
import Dropdown from "../../../components/Dropdown/Dropdown";
import FormTitle from "../../../components/FormTitle/FormTitle";
import Input from "../../../components/Input/Input";
import Label from "../../../components/Label/Label";
import { countriesDetails } from "../../../data";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "../../../utilities/HelperFunctions";
import SuccessPage from "../Success/SuccessPage";
import "./PersonalInfo.scss";
import successImage from "../../../assets/svgs/successImage.svg";
import FormHeader from "../../../components/FormHeader/FormHeader";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import ConfirmationForm from "../ConfirmationForm/ConfirmationForm";

const PersonalInfo = ({ formProps }) => {
  const {
    showSuccess,
    setShowSuccess,
    step,
    setStep,
    registrationDetails,
    setRegistrationDetails,
    isError,
    setIsError,
    setErrorMessage,
  } = formProps;

  const [countryCode, setCountryCode] = useState(
    getDataFromLocalStorage("personalInfo")?.country_code
  );
  const [email, setEmail] = useState(
    getDataFromLocalStorage("personalInfo")?.email
  );
  const [number, setNumber] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isNumberError, setIsNumberError] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [userInput, setUserInput] = useState("");
  const verificationCode = "9898";

  const verificationDetails = {
    email: "test@admin.com",
    country_code: "IN",
    phone_code: "+91",
    number: "11111-11111",
  };
  const goToPreviousState = () => {
    setDataToLocalStorage("step", step - 1);
    setStep(step - 1);
  };

  // Function for the Success page continue button click
  const handleSuccessPageContinueClick = () => {
    if (showSuccess) {
      setShowSuccess(false);
      setShowVerificationForm(true);
    }
  };

  const handleVerification = () => {
    if (verificationCode.toString() === userInput) {
      setShowVerificationForm(false);
      setUserInput("");
      setDataToLocalStorage("step", step + 1);
      setStep(step + 1);
    } else {
      setIsError(true);
    }
  };
  // Function which will handle the Continue Button Click
  const handleFormSubmit = () => {
    setIsEmailError(email !== verificationDetails.email);
    setIsNumberError(
      number !== verificationDetails.number ||
        countryCode.split(" ")[0] !== verificationDetails.country_code ||
        countryCode.split(" ")[1] !== verificationDetails.phone_code
    );

    if (
      email === verificationDetails.email &&
      number === verificationDetails.number &&
      countryCode.split(" ")[0] === verificationDetails.country_code &&
      countryCode.split(" ")[1] === verificationDetails.phone_code
    ) {
      setIsError(false);
      setIsEmailError(false);
      setIsNumberError(false);
      setErrorMessage("");
      setRegistrationDetails([
        ...registrationDetails,
        {
          country_code: countryCode.split(" ")[0],
          phone_code: countryCode.split(" ")[1],
          email,
          number,
        },
      ]);

      setShowSuccess(true);
    } else {
      setIsError(true);
      setErrorMessage("Input not matched");
    }
  };
  return showVerificationForm ? (
    <ConfirmationForm
      isError={isError}
      handleVerification={handleVerification}
      setUserInput={setUserInput}
    />
  ) : !showSuccess ? (
    <form className="PersonalInfoForm">
      <FormHeader
        title={"Registration Form"}
        subTitle={"This is Example Registratino form"}
      />
      <ProgressBar currentPageState={step} totalSteps={6} />

      <FormTitle styles={{ marginBottom: "30px" }} titleText={"Information"} />

      <div
        className="input-container form1-input-container"
        style={{ width: "100%" }}
      >
        <Label
          labelFor={"email"}
          labelText={"Email Address"}
          styles={{ paddingBottom: "5px" }}
        />
        <Input
          required
          isError={isEmailError}
          errorMessage={"Please enter the valid email address"}
          inputType="email"
          id="email"
          placeholder={"abc@example.com"}
          setValue={setEmail}
        />
        {/* <ErrorMessage showError={isError} message={errorMessage} /> */}
      </div>

      <div
        className="input-container dropdown-input-container"
        style={{ width: "100%" }}
      >
        <div className="input-div" style={{ width: "40%" }}>
          <Label
            labelFor={"countries_code"}
            labelText={"Code"}
            styles={{ paddingBottom: "5px" }}
          />
          <Dropdown
            name="countries_code"
            hideArrow={true}
            styles={{ color: "#49b8ad" }}
            options={countriesDetails.map((el) => `${el.code} ${el.dial_code}`)}
            setValue={setCountryCode}
          />
        </div>
        <div className="input-div" styles={{ width: "100%" }}>
          <Label
            labelFor={"contact"}
            labelText={"Contact"}
            styles={{ paddingBottom: "5px" }}
          />
          <Input
            isError={isNumberError}
            errorMessage={"Invalid country code or number"}
            inputType="text"
            id="phoneNumber"
            placeholder={"00000-00000"}
            pattern={`[0-9]{5}-[0-9]{5}`}
            title={'Please enter the value in format - "00000-00000" '}
            setValue={setNumber}
          />
        </div>
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

        <Button
          btnText={"Continue"}
          styles={{ alignSelf: "end" }}
          outline={false}
          isDisabled={false}
          handleButtonClick={handleFormSubmit}
        />
      </div>
    </form>
  ) : (
    <SuccessPage
      image={successImage}
      heading={"Done"}
      subHeading={"Its Done"}
      handleContinueClick={handleSuccessPageContinueClick}
    />
  );
};

export default PersonalInfo;
