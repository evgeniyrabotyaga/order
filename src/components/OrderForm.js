import { useState } from "react";
import useInput from "../hooks/input-hook";

const OrderForm = (props) => {
  const {
    value: enteredName,
    valid: nameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((name) => name.trim().length > 2);

  const {
    value: enteredEmail,
    valid: emailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((email) =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  );

  const {
    value: enteredStreet,
    valid: streetIsValid,
    hasError: streetInputHasError,
    inputChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: resetStreetInput,
  } = useInput((street) => street.trim().length > 5);

  let formIsValid = false;
  if (nameIsValid && emailIsValid && streetIsValid) formIsValid = true;

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    props.onConfirm({
      name: enteredName,
      email: enteredEmail,
      street: enteredStreet,
    });
    resetStreetInput();
    resetNameInput();
    resetEmailInput();
  };

  const inputClass = {
    name: nameInputHasError ? "invalid" : "",
    email: emailInputHasError ? "invalid" : "",
    street: streetInputHasError ? "invalid" : "",
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <div className="form__container">
        <label htmlFor="name">Your Name</label>
        <input
          className={inputClass.name}
          onBlur={nameInputBlurHandler}
          onChange={nameInputChangeHandler}
          type="text"
          id="name"
          value={enteredName}
        ></input>
        {nameInputHasError && (
          <p className="form__error-message">
            Name must be at least 3 characters
          </p>
        )}
      </div>
      <div className="form__container">
        <label htmlFor="email">Email</label>
        <input
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          className={inputClass.email}
          value={enteredEmail}
          type="email"
          id="email"
        ></input>
        {emailInputHasError && (
          <p className="form__error-message">Email input is invalid.</p>
        )}
      </div>
      <div className="form__container">
        <label htmlFor="street">Street</label>
        <input
          onChange={streetInputChangeHandler}
          className={inputClass.street}
          onBlur={streetInputBlurHandler}
          value={enteredStreet}
          type="text"
          id="street"
        ></input>
        {streetInputHasError && (
          <p className="form__error-message">
            Street input must be at least 6 characters.
          </p>
        )}
      </div>
      <div className="cart__action">
        <button onClick={props.onClose} type="button" className="cart__btn">
          Close
        </button>
        <button disabled={!formIsValid} type="submit" className="cart__btn">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
