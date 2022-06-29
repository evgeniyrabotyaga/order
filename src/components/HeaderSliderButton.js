import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const HeaderSliderButton = (props) => {
  return (
    <button
      onClick={props.onMove}
      className={
        props.direction === "left"
          ? "slider__btn slider__btn--left"
          : "slider__btn slider__btn--right"
      }
    >
      {props.direction === "left" ? (
        <FontAwesomeIcon icon={faAnglesLeft} />
      ) : (
        <FontAwesomeIcon icon={faAnglesRight} />
      )}
    </button>
  );
};

export default HeaderSliderButton;
