import React from "react";
import "../FilterMovies/FilterMovies.css";

function FilterMovies({ filterText, setIsShortFilms, isShortFilms }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          onClick={() => {
            setIsShortFilms(isShortFilms);
          }}
        />
        <span className="filter-checkbox__round" />
      </label>
      <p className="filter-checkbox__text">{filterText}</p>
    </div>
  );
}

export default FilterMovies;