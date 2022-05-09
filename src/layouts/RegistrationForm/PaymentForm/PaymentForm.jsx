import { useState } from "react";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import FormHeader from "../../../components/FormHeader/FormHeader";
import FormTitle from "../../../components/FormTitle/FormTitle";
import Input from "../../../components/Input/Input";
import Label from "../../../components/Label/Label";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "../../../utilities/HelperFunctions";
import IndicatorCard from "../IndicatorCard/IndicatorCard";
import "./PaymentForm.scss";

const PaymentForm = ({ formProps }) => {
  const { step, setStep, isError, setIsError, setErrorMessage } = formProps;

  const personInfo = getDataFromLocalStorage("basicInfo");
  const durationInfo = getDataFromLocalStorage("durationInfo");
  const [nameOnCard, setNameOnCard] = useState(personInfo?.fullName);
  const [nameError, setNameError] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardError, setCardError] = useState(false);
  const [expirationDateMonth, setExpirationDateMonth] = useState("");
  const [expirationDateYear, setExpirationDateYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [promo, setPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const goToPreviousState = () => {
    setDataToLocalStorage("step", step - 1);
    setStep(step - 1);
    setIsError(false);
    setErrorMessage("");
  };

  const handleFormSubmit = () => {
    validateCardNumber();
    validateName();

    const monthError = !(expirationDateMonth < 12 && expirationDateMonth > 0);
    const year = new Date().getFullYear().toString().slice(-2);
    const month = new Date().getMonth() + 1;
    setDataToLocalStorage("step", step + 1);
    setStep(step + 1);

    if (
      !cardError &&
      !nameError &&
      !monthError &&
      expirationDateYear >= year &&
      expirationDateMonth >= month
    ) {
      // Should not store it in localStorage
      setDataToLocalStorage("paymentInfo", {
        name_on_card: nameOnCard,
        card_number: cardNumber,
        expiry_date: `${expirationDateMonth} / ${expirationDateYear}`,
        cvv: cvv,
        promo_code: promoCode,
      });
    }
  };

  const validateName = () => {
    nameOnCard.trim() === "" ? setNameError(true) : setNameError(false);
  };

  const validateCardNumber = () => {
    const regex = new RegExp(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
    );
    if (regex.test(cardNumber.replaceAll(" ", ""))) {
      setCardError(false);
    } else {
      setCardError(true);
    }
  };

  const handleCardInput = (e) => {
    let target = e.target,
      position = target.selectionEnd,
      length = target.value.length;

    target.value = target.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    target.selectionEnd = position +=
      target.value.charAt(position - 1) === " " &&
      target.value.charAt(length - 1) === " " &&
      length !== target.value.length
        ? 1
        : 0;
  };
  return (
    <div className="payment-form-outer-container">
      <div className="PaymentForm">
        <FormHeader
          title={"Registration Form"}
          subTitle={"This is Example Registratino form"}
        />
        <ProgressBar currentPageState={step} totalSteps={6} />

        <div className="form-container">
          <FormTitle
            styles={{ marginBottom: "20px" }}
            titleText="Method Prefer"
          />
          <div className="input-container">
            <Label
              labelFor={"nameOnCard"}
              labelText={"Name"}
              styles={{ paddingBottom: "5px" }}
            />
            <Input
              isError={nameError}
              defaultValue={personInfo.fullName}
              errorMessage={"Please enter the name"}
              inputType="text"
              id="phoneNumber"
              placeholder={"Enter name on card"}
              setValue={setNameOnCard}
            />
            <Label
              labelFor={"cardNumber"}
              labelText={"Card Number"}
              styles={{ paddingBottom: "5px" }}
            />
            <Input
              isError={cardError}
              maxLength={19}
              handleOnInput={handleCardInput}
              errorMessage={"Please enter valid card number"}
              inputType="text"
              id="cardNumber"
              placeholder={"0000 0000 0000 0000"}
              setValue={setCardNumber}
            />
            <div className="expiration-and-cvv-input">
              <div className="outer-expiry-date-container">
                <Label
                  labelText={"Expiration Date"}
                  styles={{ paddingBottom: "5px" }}
                />
                <div
                  className={`expiration-date-container ${
                    cardError ? "invalid" : ""
                  }`}
                >
                  <Input
                    maxLength={2}
                    max={12}
                    styles={{ width: "20%" }}
                    inputType="text"
                    id="expiration-date-month"
                    placeholder={"00"}
                    setValue={setExpirationDateMonth}
                  />
                  <span> / </span>
                  <Input
                    maxLength={2}
                    inputType="text"
                    id="expiration-date-year"
                    placeholder={"00"}
                    setValue={setExpirationDateYear}
                  />
                </div>
                <ErrorMessage showError={cardError} message={"Invalid"} />
              </div>
              <div className="cvv-container">
                <Label
                  labelFor={"cvv"}
                  labelText={"Enter CVV "}
                  styles={{ paddingBottom: "5px" }}
                />
                <Input
                  isError={cardError}
                  maxLength={3}
                  errorMessage={"Invalid"}
                  inputType="text"
                  id="cvv"
                  placeholder={"000"}
                  setValue={setCvv}
                />
              </div>
            </div>
          </div>

          <div className="promo-container">
            {!promo && (
              <button className="sub-form-link" onClick={() => setPromo(true)}>
                PROMO?
              </button>
            )}
            {promo && (
              <div className="input-container">
                <Label
                  labelFor={"promo-code"}
                  labelText={"Promo code"}
                  styles={{ paddingBottom: "5px" }}
                />
                <Input
                  inputType="text"
                  id="promo-code"
                  placeholder={"PROMO50"}
                  setValue={setPromoCode}
                />
              </div>
            )}
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
      <IndicatorCard heading={durationInfo?.duration} />
    </div>
  );
};

export default PaymentForm;
