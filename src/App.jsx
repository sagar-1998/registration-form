import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Header from "./layouts/Header/Header";
import RegistrationForm from "./layouts/RegistrationForm/RegistrationForm";
import SubRegistrationForm from "./layouts/RegistrationForm/SubRegistrationForm/SubRegistrationForm";
import { getDataFromLocalStorage } from "./utilities/HelperFunctions";

function App() {
  const navigate = useNavigate();
  const [registrationDetails, setRegistrationDetails] = useState(
    getDataFromLocalStorage("registrationDetails") || []
  );
  const [allRegistration, setAllRegistration] = useState(
    getDataFromLocalStorage("allRegistration") || []
  );
  const [subRegistrationDetails, setSubRegistrationDetails] = useState({});
  const [step, setStep] = useState(getDataFromLocalStorage("step") ?? 1);
  const [subStep, setSubStep] = useState(
    getDataFromLocalStorage("subStep") ?? 1
  );
  const [finalFormContinue, setFinalFormContinue] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function init() {
    setAllRegistration(getDataFromLocalStorage("allData") || []);
  }
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    navigate(`/RegistrationForm/${step}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
  useEffect(() => {
    if (subStep >= 1 && step === 3 && finalFormContinue) {
      navigate(`/RegistrationForm/${step}/SubRegistrationForm/${subStep}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subStep]);

  return (
    <div className="App">
      {/* <ToggleButton /> */}
      <Header />
      {
        <div className="form-container">
          <Routes>
            <Route
              path={`/RegistrationForm/${step}`}
              element={
                <RegistrationForm
                  setFinalFormContinue={setFinalFormContinue}
                  subStep={subStep}
                  setSubStep={setSubStep}
                  showSuccess={showSuccess}
                  setShowSuccess={setShowSuccess}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  isError={isError}
                  setIsError={setIsError}
                  step={step}
                  setStep={setStep}
                  registrationDetails={registrationDetails}
                  setRegistrationDetails={setRegistrationDetails}
                />
              }
            />
            <Route
              path={`/RegistrationForm/${step}/SubRegistrationForm/${subStep}`}
              element={
                <SubRegistrationForm
                  setFinalFormContinue={setFinalFormContinue}
                  allRegistration={allRegistration}
                  setAllRegistration={setAllRegistration}
                  subRegistrationDetails={subRegistrationDetails}
                  setSubRegistrationDetails={setSubRegistrationDetails}
                  subStep={subStep}
                  setSubStep={setSubStep}
                  showSuccess={showSuccess}
                  setShowSuccess={setShowSuccess}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  isError={isError}
                  setIsError={setIsError}
                  step={step}
                  setStep={setStep}
                  registrationDetails={registrationDetails}
                  setRegistrationDetails={setRegistrationDetails}
                />
              }
            />
          </Routes>
        </div>
      }
    </div>
  );
}

export default App;
