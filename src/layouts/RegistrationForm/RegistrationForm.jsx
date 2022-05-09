import BasicInfo from "./BasicInfo/BasicInfo";
import DurationInfo from "./DurationInfo/DurationInfo";
import FinalRegistration from "./FinalRegistration/FinalRegistration";
import PaymentForm from "./PaymentForm/PaymentForm";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import "./RegistrationForm.scss";

const RegistrationForm = (props) => {
  const { step } = props;

  switch (step) {
    case 1:
      return <BasicInfo formProps={props} />;
    case 2:
      return <PersonalInfo formProps={props} />;
    case 3:
      return <DurationInfo formProps={props} />;
    case 4:
      return <PaymentForm formProps={props} />;
    case 5:
      return <FinalRegistration formProps={props} />;
    default:
      return;
  }

  // return <div className="RegistrationForm"></div>;
};

export default RegistrationForm;
