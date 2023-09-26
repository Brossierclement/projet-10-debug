import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderItems = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const [spaceBarPressed, setSpaceBarPressed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!spaceBarPressed) {
        setSliderPosition((prevIndex) =>
          prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
        );
      }
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [sliderItems, spaceBarPressed]);

  const goToSlide = (slideIndex) => {
    setSliderPosition(slideIndex);
  };

  const handleSpaceBarDown = () => {
    setSpaceBarPressed(true);
  };

  const handleSpaceBarUp = () => {
    setSpaceBarPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpaceBarDown);
    window.addEventListener("keyup", handleSpaceBarUp);

    return () => {
      window.removeEventListener("keydown", handleSpaceBarDown);
      window.removeEventListener("keyup", handleSpaceBarUp);
    };
  }, []);
  return (
    <div className="SlideCardList">
      {sliderItems?.map((element) => (
        <div key={element.id}>
          <div
            className={`SlideCard SlideCard--${
              element.id === sliderPosition ? "display" : "hide"
            }`}
            data-testid={`slide-${element.id}`}
          >
            <img src={element.cover} alt={element.alt} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <div>{getMonth(new Date(element.date))}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Je sors la pagination de la boucle sinon 3x3 input au lieu de 3x1 */}
      {sliderItems && (
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {sliderItems.map((item, index) => (
              <input
                key={item.id}
                type="radio"
                name="radio-button"
                value={index}
                checked={item.id === sliderPosition}
                onChange={() => goToSlide(item.id)}
                className="custom-radio-input"
                data-testid={`radio-button-${index}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
