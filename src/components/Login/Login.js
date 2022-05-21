import React from 'react';
import './Login.css';
import { Link, useRouteMatch } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
  let path = useRouteMatch();
  return (
    <section className='login'>
      <div className='login__block'>
      <Link to="/">
        <img alt='Логотип' className="login__logo" src={logo}/>
      </Link>
        <h2 className='login__heading'>Рады видеть</h2>
      </div>
      <form className='login__form'>
        <div className='login__input'>
          <span className='login__input-name'>E-mail</span>
          <input className='login__field' name='email' type='email' required></input>
          {/* <span className='login__input_error'>Неверно заполнено поле 'E-mail'</span> */}
        </div>
        <div className='login__input'>
          <span className='login__input-name'>Пароль</span>
          <input className='login__field login__field_password' name='password' type='password' required minLength='8'></input>
          {/* <span className='login__input_error'>Неверный пароль</span> */}
        </div>
        <button type='submit' className='login__form_button'>
          Войти
        </button>
        <div className='login__signin'>
          <p className='login__link-title'>Ещё не зарегистрированы?</p>
          <Link to="/signup" className='login__register-link'>
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;