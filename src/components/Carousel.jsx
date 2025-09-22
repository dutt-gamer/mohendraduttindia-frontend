import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

import Moh from "../assets/Moh.png";
import Moh1 from "../assets/Moh1.png";
import Moh2 from "../assets/Moh2.png";
import Moh3 from "../assets/Moh3.png";
import { Link } from "react-router-dom";

const Carousel = () => {
  const images = [Moh, Moh1, Moh2, Moh3];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const goToSlide = (index) => setCurrentIndex(index);

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div
      {...handlers}
      className="w-full h-full overflow-hidden relative bg-gray-900"
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 flex justify-center items-center"
          >
            {i === 0 ? (
              <div className="relative w-full h-full flex justify-center items-center">
                <img
                  src={img}
                  alt={`Slide ${i + 1}`}
                  className="w-[90vw] max-h-[90vh] object-contain"
                  draggable={false}
                />
                <Link
                  to="/about"
                  className="absolute bottom-10 bg-black/70 text-white px-4 py-2 rounded-md hover:bg-black/90 transition"
                >
                  Learn More
                </Link>
              </div>
            ) : (
              <img
                src={img}
                alt={`Slide ${i + 1}`}
                className="w-[90vw] max-h-[90vh] object-contain"
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 hover:bg-gray-600/60 transition-colors ease-out text-gray-400 p-1 md:p-3 rounded-full z-10"
      >
        &#8592;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 hover:bg-gray-600/60 transition-colors ease-out text-gray-400 p-1 md:p-3 rounded-full z-10"
      >
        &#8594;
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full hover:bg-gray-400 opacity-60 transition-colors ease-in duration-100 cursor-pointer ${
              currentIndex === i ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
