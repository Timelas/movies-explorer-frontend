import React from "react";
import "./Header.css";
import icon from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ bgColor, textColor }) {
  const jwt = localStorage.getItem("jwt");
  const { pathname } = useLocation();
  const isLoggedOrigin = pathname === "/" && !jwt;
  const isMovies = jwt;
  const text = `${isLoggedOrigin ? "Регистрация" : "Аккаунт"}`;
  const [activeBurger, setActiveBurger] = React.useState(false);
  function handleActiveBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <header className={`header header_bg-color_${bgColor}`}>
      <div className="header__container">
        <div className="header__wrapper">
          <Link to="/">
            <img className="header__logo" src={icon} alt="Логотип" />
          </Link>
        </div>
        {isMovies && <Navigation />}
        <div
          className={`header__wrapper ${
            !isLoggedOrigin && "header__wrapper_burger"
          }`}
        >
          <Link
            className={`header__sign-text header__sign-text_color_${textColor}`}
            to={`${isLoggedOrigin ? "/signup" : "/profile"}`}
          >
            {text}
          </Link>
          {isLoggedOrigin ? (
            <Link to="/signin" className="header__btn-signin" type="button">
              Войти
            </Link>
          ) : (
            <button className="header__btn-account" type="button" />
          )}
        </div>

        {!isLoggedOrigin &&
          <>
            <div
              className={`header__burger ${
                activeBurger ? "header__burger_active" : ""
              }`}
              onClick={handleActiveBurger}>
              <div className="header__burger-line" />
              <div className="header__burger-line" />
              <div className="header__burger-line" />
            </div>
            <div
              className={`header__burger-menu-wrap ${
                activeBurger ? "header__burger-menu-wrap_active" : ""
              }`}
              onClick={handleActiveBurger}>
              <nav className="header__burger-nav">
                <ul className="header__burger-list">
                  <li className="header__burger-item">
                    <Link className="header__burger-link" to="/">
                      Главная
                    </Link>
                  </li>
                  <li className="header__burger-item">
                    <Link className="header__burger-link" to="/movies">
                      Фильмы
                    </Link>
                  </li>
                  <li className="header__burger-item">
                    <Link className="header__burger-link" to="/saved-movies">
                      Сохраненные Фильмы
                    </Link>
                  </li>
                </ul>
              </nav>
              <div
                className={`header__wrapper header__wrapper_burger-menu ${
                  isLoggedOrigin ? "header__wrapper_burger" : ""
                }`}
              >
                <Link
                  className={`header__sign-text header__sign-text_color_white`}
                  to={`${isLoggedOrigin ? "/signup" : "/profile"}`}
                >
                  {text}
                </Link>
                {isLoggedOrigin ? (
                  <Link
                    to="/signin"
                    className="header__btn-signin"
                    type="button"
                  >
                    Войти
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="header__btn-account"
                    type="button"
                  ></Link>
                )}
              </div>
            </div>
          </>
        }
      </div>
    </header>
  );
}

export default Header;