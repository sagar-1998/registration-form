import SubBasicInfo from "./SubBasicInfo/SubBasicInfo";
import SubPersonalInfo from "./SubPersonInfo/SubPersonalInfo";
import "./SubRegistrationForm.scss";
import SubFinalInfo from "./SubFinalInfo/SubFinalInfo";
const SubRegistrationForm = (props) => {
  const { subStep } = props;

  switch (subStep) {
    case 1:
      return <SubBasicInfo formProps={props} />;
    case 2:
      return <SubPersonalInfo formProps={props} />;
    case 3:
      return <SubFinalInfo formProps={props} />;
    default:
      return;
  }
};

export default SubRegistrationForm;
