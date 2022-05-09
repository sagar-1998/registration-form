import { useState } from "react";
import Button from "../../../components/Button/Button";
import Dropdown from "../../../components/Dropdown/Dropdown";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormTitle from "../../../components/FormTitle/FormTitle";
import Input from "../../../components/Input/Input";
import Label from "../../../components/Label/Label";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { countryList } from "../../../data";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "../../../utilities/HelperFunctions";
import "./BasicInfo.scss";

const BasicInfo = ({ formProps }) => {
  const {
    step,
    setStep,
    registrationDetails,
    setRegistrationDetails,
    isError,
    setIsError,
    errorMessage,
    setErrorMessage,
  } = formProps;
  const personDetails = {
    country: "India",
    fullName: "John Doe",
    number: "1-1111-1111",
  };
  const [country, setCountry] = useState(
    getDataFromLocalStorage("basicInfo")?.country || ""
  );
  const [number, setNumber] = useState("");
  const [fullName, setFullName] = useState(
    getDataFromLocalStorage("basicInfo")?.fullName || personDetails?.fullName
  );
  const [showName, setShowName] = useState(false);

  const goToPreviousState = () => {
    setShowName(false);
    setIsError(false);
    setErrorMessage("");
  };

  const handleFormSubmit = () => {
    if (number === personDetails.number) {
      setShowName(true);
      setIsError(false);
      setErrorMessage("");
      if (showName) {
        setRegistrationDetails([
          ...registrationDetails,
          {
            country: country || countryList[0],
            number,
            fullName,
          },
        ]);
        setDataToLocalStorage("basicInfo", {
          country: country || countryList[0],
          number,
          fullName,
        });
        setDataToLocalStorage("step", step + 1);
        setStep(step + 1);
      }
    } else {
      setShowName(false);
      setIsError(true);
      setErrorMessage("Input not matched");
    }
  };
  return (
    <div className="BasicInfoForm">
      <FormHeader
        title={"Registration Form"}
        subTitle={"This is Example Registratino form"}
      />
      <ProgressBar currentPageState={step} totalSteps={6} />

      <FormTitle
        styles={{ marginBottom: "30px" }}
        titleText="Basic Info"
        message={showName && "Information Fetched"}
      />
      <div className="input-container ">
        <Label
          labelFor={"dropdown"}
          labelText={"Country"}
          styles={{ paddingBottom: "5px" }}
        />
        <Dropdown
          name="countries"
          options={countryList}
          defaultValue={
            getDataFromLocalStorage("basicInfo")?.country && country
          }
          setValue={setCountry}
        />
      </div>

      <div className="input-container form1-input-container">
        <Label
          labelFor={"phoneNumber"}
          labelText={"Number"}
          styles={{ paddingBottom: "5px" }}
        />
        <Input
          isError={isError}
          errorMessage={errorMessage}
          inputType="text"
          id="phoneNumber"
          placeholder={"0-0000-0000"}
          pattern={`[0-9]-[0-9]{4}-[0-9]{4}`}
          setValue={setNumber}
        />
        {/* <ErrorMessage showError={isError} message={errorMessage} /> */}
      </div>
      {showName && (
        <div className="input-container form1-input-container">
          <Label
            labelFor={"name"}
            labelText={"Name"}
            styles={{ paddingBottom: "5px" }}
          />
          <Input
            isError={isError}
            defaultValue={personDetails.fullName}
            errorMessage={errorMessage}
            inputType="text"
            id="phoneNumber"
            placeholder={"0-0000-0000"}
            pattern={`[0-9]-[0-9]{4}-[0-9]{4}`}
            setValue={setFullName}
          />
          {/* <ErrorMessage showError={isError} message={errorMessage} /> */}
        </div>
      )}
      <div
        className="button-container"
        style={{
          display: showName && "flex",
          width: showName && "100%",
          justifyContent: showName && "space-between",
          alignItems: showName && "center",
        }}
      >
        {showName && (
          <Button
            btnText={"Previous"}
            styles={{ alignSelf: "end" }}
            outline={true}
            isDisabled={false}
            handleButtonClick={goToPreviousState}
          />
        )}
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
  );
};

export default BasicInfo;
