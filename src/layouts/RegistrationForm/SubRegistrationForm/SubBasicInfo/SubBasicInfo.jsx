import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import FormHeader from "../../../../components/FormHeader/FormHeader";
import FormTitle from "../../../../components/FormTitle/FormTitle";
import Input from "../../../../components/Input/Input";
import Label from "../../../../components/Label/Label";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import { countryList } from "../../../../data";
import { setDataToLocalStorage } from "../../../../utilities/HelperFunctions";
import "./SubBasicInfo.scss";

const SubBasicInfo = ({ formProps }) => {
  const {
    subStep,
    setSubStep,
    setSubRegistrationDetails,
    subRegistrationDetails,
    registrationDetails,
    setRegistrationDetails,
    isError,
    setIsError,
    errorMessage,
    setErrorMessage,
    setFinalFormContinue,
  } = formProps;
  const personDetails = {
    country: "India",
    fullName: "John Doe",
    number: "1-1111-1111",
  };
  const [country, setCountry] = useState("");
  const [number, setNumber] = useState("");
  const [fullName, setFullName] = useState(personDetails?.fullName);
  const [showName, setShowName] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  useEffect(() => {
    setFinalFormContinue(true);
  }, []);

  const goToPreviousState = () => {
    setIsConfirm(false);
    if (!isConfirm) {
      setShowName(false);
    }
    setIsError(false);

    setErrorMessage("");
  };

  const handleFormSubmit = () => {
    const fullNameValue = document.getElementById("fullName")?.value;

    if (number === personDetails.number) {
      setShowName(true);
      setIsError(false);
      setErrorMessage("");
      if (showName) {
        setIsConfirm(true);
        if (isConfirm) {
          setRegistrationDetails([
            ...registrationDetails,
            {
              country: country || countryList[0],
              number,
              fullName: fullName || fullNameValue,
            },
          ]);
          setSubRegistrationDetails({
            ...subRegistrationDetails,
            basic_info: {
              country: country || countryList[0],
              number,
              fullName: fullName || fullNameValue,
            },
          });
          setDataToLocalStorage("basicInfo", {
            country: country || countryList[0],
            number,
            fullName: fullName || fullNameValue,
          });
          setDataToLocalStorage("subStep", subStep + 1);
          setSubStep(subStep + 1);
        }
      }
    } else {
      setIsConfirm(false);
      setShowName(false);
      setIsError(true);
      setErrorMessage("Input not matched");
    }
  };
  return (
    <div className="SubBasicInfoForm">
      <FormHeader
        title={"Registration Form"}
        subTitle={"This is Sub Registration form"}
      />
      <ProgressBar currentPageState={subStep} totalSteps={4} />

      <div className="form-title-div">
        <FormTitle
          styles={{ marginBottom: "30px" }}
          titleText="Contact Info"
          isWarning={true}
          message={
            isConfirm &&
            "Please verify details before processing further and do verify that numbers name names are correct."
          }
        />
      </div>
      <div className="input-container ">
        <Label
          labelFor={"dropdown"}
          labelText={"Country"}
          styles={{ paddingBottom: "5px" }}
        />
        <Dropdown
          name="countries"
          options={countryList}
          setValue={setCountry}
          disabled={isConfirm}
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
          disabled={isConfirm}
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
            disabled={isConfirm}
            isError={isError}
            defaultValue={personDetails.fullName}
            errorMessage={errorMessage}
            inputType="text"
            id="fullName"
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

export default SubBasicInfo;
