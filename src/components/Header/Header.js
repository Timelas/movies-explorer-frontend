import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import closeButton from '../../images/closeButton.svg';
import profileIcon from '../../images/profileIcon.svg';
import { Link, useLocation } from "react-router-dom";


function Header({loggedIn}) {
  const { pathname } = useLocation();;
  const isColor = pathname === '/' ? '' : 'header_color';
  const isTablet = window.matchMedia('(max-width: 1023px)').matches;
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);

  function handleOpenBurger() {
    setIsBurgerMenuOpened(true);
  }

  function handleCloseBurger() {
    setIsBurgerMenuOpened(false);
  }

  return (
    <header className={`header ${isColor}`}>
      <div className='header__section'>
      <Link to="/">
        <img alt='Логотип' className="header__logo" src={logo}/>
      </Link>
      {!loggedIn ? (
        <div className='header__navigation'>
          <Link to='/signup' className='header__link'>
            Регистрация
          </Link>
          <button className='header__button'>
            <Link to='/signin' className='header__button_link'>
              Войти
            </Link>
          </button>
        </div>
      ) : (
        <div className='header__navigation'>
          {isTablet ? (
            <button onClick={handleOpenBurger} className='header__btn-burger'>
              <img src={burger} alt='кнопка открытия меню'/>
            </button>
          ) : (
            <>
              <Link to='/movies' className='header__link_movies'>
                Фильмы
              </Link>
              <Link to='/saved-movies' className='header__link_movies'>
                Сохранённые фильмы
              </Link>
              <div>
                <Link to='/profile' className='header__link_profile'>
                <div className='header__profile-button'>
                  <img className='header__button-image' src={profileIcon} alt='значок аккаунта' />
                  <p className='header__button-title'>Аккаунт</p>
                </div>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
      </div>
      <div className={`burger__overlay ${isBurgerMenuOpened ? '_showed' : ''}`}>
        <div className={`burger-menu ${isBurgerMenuOpened ? 'burger-menu_opened' : ''}`}>
          <button className='burger__close-button' onClick={handleCloseBurger}>
            <img src={closeButton} alt='кнопка закрытия скрытого меню' />
          </button>
          <div className='burger-menu__links'>
            <nav className='burder-menu__navigation'>
              <Link to='/' className='burger-menu__link'>
                Главная
              </Link>
              <Link to='/movies' className='burger-menu__link burger-menu__link_active'>
                Фильмы
              </Link>
              <Link to='/saved-movies' className='burger-menu__link'>
                Сохранённые фильмы
              </Link>
            </nav>
            <Link to='/profile' className='burger-menu__link_profile'>
              <div className='burger-menu__button'>
                <img className='burger-menu__button-image' src={profileIcon} alt='значок аккаунта' />
                <p className='burger-menu__button-title'>Аккаунт</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
   </header>
  );
}

export default Header;