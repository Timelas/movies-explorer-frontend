import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <section className='register'>
      <div className='register__block'>
      <Link to="/">
        <img alt='Логотип' className="register__logo" src={logo}/>
      </Link>
        <h2 className='register__heading'>Добро пожаловать!</h2>
      </div>
      <form className='register__form'>
        <div className='register__input'>
          <span className='register__input-name'>Имя</span>
          <input className='register__field' name='name' type='text' minLength='2' maxLength='40' required></input>
          {/* <span className='register__input_error'>Неверно заполнено поле 'Имя'</span> */}
        </div>
        <div className='register__input'>
          <span className='register__input-name'>E-mail</span>
          <input className='register__field' name='email' type='email' required></input>
          {/* <span className='register__input_error'>Неверно заполнено поле 'E-mail'</span> */}
        </div>
        <div className='register__input'>
          <span className='register__input-name'>Пароль</span>
          <input className='register__field register__field_password' name='password' type='password' required minLength='8'></input>
          <span className='register__input_error'>Неверный пароль</span>
        </div>
        <button type='submit' className='register__form_button'>
          Зарегистрироваться
        </button>
        <div className='register__signin'>
          <p className='register__link-title'>Уже зарегистрированы?</p>
          <Link to='/signin' className='register__login-link'>
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;