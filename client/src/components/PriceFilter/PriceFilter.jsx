import React, { useState } from "react";
import { useDispatch } from "react-redux";

const PriceFilter = () => {
  const [priceRange, setPriceRange] = useState({});
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    if (Object.values(priceRange).length >= 1) {
      
      if(priceRange.minPrice === ''){
        delete priceRange.minPrice
      } else if(priceRange.maxPrice === ''){
        delete priceRange.maxPrice  
      }
      dispatch(addFilterParams(priceRange));
    }
  }

  function handleKeyDown(e) {
    setPriceRange({
      ...priceRange,
      [e.name]: [e.value],
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="minPrice"
        onKeyDown={handleKeyDown}
        value={minimo}
        type="number"
        placholder="minimo"
      ></input>

      <input
        name="maxPrice"
        onKeyDown={handleKeyDown}
        value={maximo}
        type="number"
        placholder="maximo"
      ></input>
      <input type="submit" value="Filter" />
    </form>
  );
};
