import { useState } from "react";
import HeaderSliderButton from "./HeaderSliderButton";

const HeaderSlider = () => {
  const IMAGES = [
    {
      id: "image1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: "image2",
      text: "Facere consequuntur eaque ratione, qui, eligendi cum corporis itaque perspiciatis non ad nesciunt.",
    },
    {
      id: "image3",
      text: "Expedita, undealiquid ducimus, ad, quia excepturi iste vero modi?",
    },
    {
      id: "image4",
      text: "Quis quam minus dolorem eaque.",
    },
    {
      id: "image5",
      text: "In ipsum voluptatum. Suscipit delectus ea distinctio vel.",
    },
  ];

  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== IMAGES.length) setSlideIndex(slideIndex + 1);
    if (slideIndex === IMAGES.length) setSlideIndex(1);
  };

  const prevSlide = () => {
    if (slideIndex !== 1) setSlideIndex(slideIndex - 1);
    if (slideIndex === 1) setSlideIndex(IMAGES.length);
  };

  return (
    <div className="slider">
      {IMAGES.map((image, index) => {
        return (
          <div
            key={image.id}
            className={
              slideIndex === index + 1
                ? "slider__slide slider__slide--active"
                : "slider__slide"
            }
          >
            <img
              alt="ReactMeals"
              src={process.env.PUBLIC_URL + `/images/slide-${index + 1}.avif`}
            ></img>
            <p className="slider__text">{image.text}</p>
          </div>
        );
      })}
      <HeaderSliderButton onMove={prevSlide} direction="left" />
      <HeaderSliderButton onMove={nextSlide} direction="right" />
    </div>
  );
};

export default HeaderSlider;
