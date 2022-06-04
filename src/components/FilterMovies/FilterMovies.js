import React from "react";
import "../FilterMovies/FilterMovies.css";

function FilterMovies(props) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          // onClick={() => {
          //   setIsShortFilms(!isShortFilms);
          // }}
          onChange={props.onFilter}
          checked={props.isShortMovie}
          name="short-movies"
          id="short-movies"
        />
        <span className="filter-checkbox__round" />
      </label>
      <p className="filter-checkbox__text">{props.filterText}</p>
    </div>
  );
}

export default FilterMovies;