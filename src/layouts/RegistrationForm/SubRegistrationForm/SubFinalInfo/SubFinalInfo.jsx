import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import FormHeader from "../../../../components/FormHeader/FormHeader";
import FormTitle from "../../../../components/FormTitle/FormTitle";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import {
  removeDataFromLocalStorage,
  setDataToLocalStorage,
} from "../../../../utilities/HelperFunctions";
import "./SubFinalInfo.scss";
import avatarImg from "../../../../assets/svgs/avatar-img.svg";
import { v4 as uuidv4 } from "uuid";
const SubFinalInfo = ({ formProps }) => {
  const {
    allRegistration,
    step,
    subStep,
    setSubStep,
    isError,
    setIsError,
    setErrorMessage,
    setFinalFormContinue,
  } = formProps;
  const navigate = useNavigate();

  const handleAddUser = () => {
    setDataToLocalStorage("subStep", 1);
    setSubStep(1);
    removeDataFromLocalStorage("basicInfo");
    removeDataFromLocalStorage("personalInfo");
  };

  const goToPreviousState = () => {
    setDataToLocalStorage("subStep", subStep - 1);
    setSubStep(subStep - 1);
    setIsError(false);
    setErrorMessage("");
  };

  const handleFormSubmit = () => {
    setSubStep(1);
    setDataToLocalStorage("subStep", 1);
    setFinalFormContinue(false);
    removeDataFromLocalStorage("subStep");
    navigate(`/RegistrationForm/${step}`);
  };
  return (
    <div className="SubFinalInfoForm">
      <div className="form-header-div">
        <FormHeader
          title={"Registration Form"}
          subTitle={
            "This is Sub Registration form and if you want to add more Click to the Add more"
          }
        />
      </div>
      <ProgressBar currentPageState={subStep} totalSteps={4} />

      <FormTitle
        styles={{ marginBottom: "30px" }}
        titleText="Confirmation of the Details"
      />
      <div className="person-details-container">
        <div className="person-container">
          {allRegistration.map((el) => (
            <div className="img-name" key={el + uuidv4()}>
              <img className="avatar-img" src={avatarImg} alt="" />
              <p className="person-name">{el?.basic_info?.fullName}</p>
            </div>
          ))}
        </div>
        <div className="add-more-container">
          <Button
            btnText={"+"}
            styles={{
              fontSize: "20px",
              borderRadius: "rounded",
              width: "30px",
              height: "30px",
              padding: "0px",
              margin: "0px",
            }}
            handleButtonClick={handleAddUser}
          />
          <p>Add More</p>
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
        <div>
          <Button
            btnText={"Previous"}
            styles={{ alignSelf: "end" }}
            outline={true}
            isDisabled={false}
            handleButtonClick={goToPreviousState}
          />
        </div>

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

export default SubFinalInfo;
