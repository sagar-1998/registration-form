import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import FormHeader from "../../../../components/FormHeader/FormHeader";
import FormTitle from "../../../../components/FormTitle/FormTitle";
import Input from "../../../../components/Input/Input";
import Label from "../../../../components/Label/Label";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import { countriesDetails } from "../../../../data";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
  validateEmail,
} from "../../../../utilities/HelperFunctions";
import "./SubPersonalInfo.scss";

const SubPersonalInfo = ({ formProps }) => {
  const {
    allRegistration,
    setAllRegistration,
    subStep,
    setSubStep,
    subRegistrationDetails,
    setSubRegistrationDetails,
    setIsError,
    setErrorMessage,
    setFinalFormContinue,
  } = formProps;

  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState(
    getDataFromLocalStorage("personalInfo")?.countryCode || ""
  );
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(
    getDataFromLocalStorage("personalInfo")?.number
  );
  const [isEmailError, setIsEmailError] = useState(false);
  useEffect(() => {
    setFinalFormContinue(true);
  }, []);

  const goToPreviousState = () => {
    navigate(`/RegistrationFrom/3/SubRegistrationForm/1`);
    setDataToLocalStorage("subStep", subStep - 1);
    setSubStep(subStep - 1);
    setIsError(false);
    setIsEmailError(false);
    setErrorMessage("");
  };

  // Function which will handle the Continue Button Click
  const handleFormSubmit = () => {
    if (validateEmail(email)) {
      setIsError(false);
      setIsEmailError(false);
      setErrorMessage("");
      setSubRegistrationDetails({
        ...subRegistrationDetails,
        personal_info: {
          country_code: countryCode.split(" ")[0],
          phone_code: countryCode.split(" ")[1],
          email,
          number,
        },
      });
      setAllRegistration([
        ...allRegistration,
        {
          ...subRegistrationDetails,
          personal_info: {
            country_code: countryCode.split(" ")[0],
            phone_code: countryCode.split(" ")[1],
            email,
            number,
          },
        },
      ]);
      setDataToLocalStorage("allSubRegistrationData", [
        ...allRegistration,
        {
          ...subRegistrationDetails,
          personal_info: {
            country_code: countryCode.split(" ")[0],
            phone_code: countryCode.split(" ")[1],
            email,
            number,
          },
        },
      ]);
      setDataToLocalStorage("personalInfo", {
        country_code: countryCode.split(" ")[0],
        phone_code: countryCode.split(" ")[1],
        email,
        number,
      });
      setDataToLocalStorage("subStep", subStep + 1);
      setSubStep(subStep + 1);
    } else {
      setIsError(true);
      setIsEmailError(true);
      setErrorMessage("Error");
    }
  };
  return (
    <form className="SubPersonalInfoForm">
      <FormHeader
        title={"Registration Form"}
        subTitle={"This is Example Registratino form"}
      />
      <ProgressBar currentPageState={subStep} totalSteps={4} />

      <FormTitle
        styles={{ marginBottom: "30px" }}
        titleText={"Email Information details"}
      />

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
          required={true}
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
            required={true}
            inputType="text"
            id="phoneNumber"
            placeholder={"00000-00000"}
            minLength={10}
            maxLength={10}
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
  );
};

export default SubPersonalInfo;
