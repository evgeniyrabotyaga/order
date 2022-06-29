import { useRef } from "react";

const Input = (props) => {
  const inputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5 ||
      enteredAmount.trim().length === 0
    )
      return;
    props.onAmount(enteredAmountNumber);
  };

  return (
    <form onSubmit={submitHandler} className="input">
      <div className="input__left">
        <label htmlFor={props.id}>Amount</label>
        <input ref={inputRef} id={props.id} {...props.input}></input>
      </div>
      <button type="submit">+Add</button>
    </form>
  );
};

export default Input;
