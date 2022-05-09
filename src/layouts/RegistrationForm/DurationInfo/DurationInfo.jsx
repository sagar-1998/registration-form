import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Dropdown from "../../../components/Dropdown/Dropdown";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormTitle from "../../../components/FormTitle/FormTitle";
import Label from "../../../components/Label/Label";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import Text from "../../../components/Text/Text";
import { setDataToLocalStorage } from "../../../utilities/HelperFunctions";
import IndicatorCard from "../IndicatorCard/IndicatorCard";
import "./DurationInfo.scss";

const DurationInfo = ({ formProps }) => {
  const {
    subStep,
    step,
    setStep,
    isError,
    setIsError,
    setErrorMessage,
    setFinalFormContinue,
  } = formProps;
  const [duration, setDuration] = useState("Daily");

  const goToPreviousState = () => {
    setDataToLocalStorage("step", step - 1);
    setStep(step - 1);
    setIsError(false);
    setErrorMessage("");
  };

  const handleFormSubmit = () => {
    setDataToLocalStorage("durationInfo", {
      duration,
    });
    setDataToLocalStorage("step", step + 1);
    setStep(step + 1);
  };
  return (
    <div className="duration-form-outer-container">
      <div className="DurationInfoForm">
        <FormHeader
          title={"Registration Form"}
          subTitle={"This is Example Registratino form"}
        />
        <ProgressBar currentPageState={step} totalSteps={6} />

        <FormTitle
          styles={{ marginBottom: "30px" }}
          titleText="Select the duration"
        />
        <div className="input-container ">
          <Label
            labelFor={"duration"}
            labelText={"Duration"}
            styles={{ paddingBottom: "5px" }}
          />
          <Dropdown
            name="countries"
            options={["Daily", "Monthly", "Weekly"]}
            setValue={setDuration}
          />
        </div>

        <div className="input-container form1-input-container">
          <Text
            text={
              "Please select one one from these to check your cyccle of the recurecnce."
            }
            styles={{ paddingBottom: "5px" }}
          />
          <Link
            className="sub-form-link"
            to={`/RegistrationForm/${step}/SubRegistrationForm/${subStep}`}
          >
            Questions?
          </Link>
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
      {duration !== "" && <IndicatorCard heading={duration} />}
    </div>
  );
};

export default DurationInfo;
