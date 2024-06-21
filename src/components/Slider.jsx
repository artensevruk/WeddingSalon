import { getData, addBasket } from "../api";
import { useQuery } from "react-query";
import { isUserAuth } from "../utils";

import React, { useState } from 'react';
const ElementSlider = ({ products , isAuth  }) => {

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
      <h2 className="newCollection">Новая коллекция</h2>
      <div className={`sliderPosition ${isSliding ? 'slide-out' : 'slide-in'}`}>
        <h3>{products[currentSlide].name}</h3>
        <img className="productName" src={`/${products[currentSlide].image}`} />
        
       
      </div>
      <div className="buttonsNavigation">
        <img className="navigation" onClick={prevSlide} src="/image/arowLeft.png" alt="Previous"></img>
       <p className="navigationText">Найди для себя свой идеал</p>
        <img className="navigation" onClick={nextSlide} src="/image/arow.png" alt="Next"></img>
      </div>
      
    </div>
  );
};
export const SliderMenu = () => {
  const query = useQuery("product",() => getData());
  
  return (
    <div>
    <div className="sliderContainer">
      {query.data && <ElementSlider isAuth ={isUserAuth()} products={query.data} />}
    </div>
    
    </div>
  );
};