import React from "react";
import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const jwt = localStorage.getItem("jwt");
  const { pathname } = useLocation();
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <Link
            className={`navigation__movies navigation__movies_color_${
              pathname === "/" && jwt ? "white" : ""
            }`}
            to="/movies"
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link
            className={`navigation__saved-movies navigation__movies_color_${
              pathname === "/" && jwt ? "white" : ""
            }`}
            to="/saved-movies"
          >
            Сохраненные Фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;