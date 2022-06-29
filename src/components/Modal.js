import React from "react";
import ReactDOM from "react-dom";

const ModalWindow = (props) => {
  return <div className="modal">{props.children}</div>;
};

const Overlay = (props) => {
  return <div onClick={props.onClose} className="overlay"></div>;
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Overlay onClose={props.onClose} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <ModalWindow>{props.children}</ModalWindow>,
        document.getElementById("modal")
      )}
    </React.Fragment>
  );
};

export default Modal;
