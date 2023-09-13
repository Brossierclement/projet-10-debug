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

  useEffect(() => {
    const timer = setInterval(() => {
      setSliderPosition((prevIndex) =>
        prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [sliderItems]);

  const goToSlide = (slideIndex) => {
    setSliderPosition(slideIndex);
  };
  return (
    <div className="SlideCardList">
      {sliderItems?.map((element) => (
        <div key={element.id}>
          <div
            className={`SlideCard SlideCard--${
              element.id === sliderPosition ? "display" : "hide"
            }`}
          >
            <img src={element.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <div>{getMonth(new Date(element.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {sliderItems.map((item) => (
                <input
                  key={item.id}
                  type="radio"
                  name="radio-button"
                  checked={item.id === sliderPosition}
                  onChange={() => goToSlide(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
