import { getData, addBasket } from "../api";
import { useQuery } from "react-query";

import React, { useState } from 'react';
const ElementSlider = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = products.length;
  const [isSliding, setIsSliding] = useState(false);

  const nextSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentSlide((currentSlide + 1) % totalSlides);
      setIsSliding(false);
    }, 500);
  };

  const prevSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
      setIsSliding(false);
    }, 500);
  };

  const addBasketProducts = (product) => {
    addBasket(product);
  };

  return (
    <div className="slider">
      <h2 className="newCollection">Новая колекция</h2>
      <div className={`sliderPosition ${isSliding ? 'slide-out' : 'slide-in'}`}>
        <h3>{products[currentSlide].name}</h3>
        <img src={`/${products[currentSlide].image}`} />
        
        <p>
          <select className="select">
            {products[currentSlide].sizes.map((element) => (
              <option key={element.size}>{element.size}</option>
            ))}
          </select>
        </p>
        <p>
          <select className="select">
            {products[currentSlide].colors.map((element) => (
              <option key={element.color}>{element.color}</option>
            ))}
          </select>
        </p>
        <p>{products[currentSlide].price} руб</p>
      </div>
      <div className="buttonsNavigation">
        <img className="navigation" onClick={prevSlide} src="/image/arowLeft.png" alt="Previous"></img>
        <button onClick={() => addBasketProducts(products[currentSlide])} className="bay2">
          Добавить в корзину
        </button>
        <img className="navigation" onClick={nextSlide} src="/image/arow.png" alt="Next"></img>
      </div>
    </div>
  );
};
export const SliderMenu = () => {
  const query = useQuery("product",() => getData());
  
  return (
    <div className="sliderContainer">
      {query.data && <ElementSlider products={query.data} />}
    </div>
  );
};