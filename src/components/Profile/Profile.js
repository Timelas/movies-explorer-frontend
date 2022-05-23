import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';

function Profile() {
  return (
    <section className='profile'>
      <Header />
      <h2 className='profile__heading'>Привет, Виталий!</h2>
      <div className='profile__content'>
        <form className='profile__form'>
          <div className='profile__input-box'>
            <span className='profile__input'>Имя</span>
            <input className='profile__field' placeholder='Виталий' name='name' type='text' minLength='2' maxLength='40' required></input>
          </div>
          <div className='profile__input-box'>
            <span className='profile__input'>E-mail</span>
            <input className='profile__field' placeholder='pochta@yandex.ru' name='email' type='email' required></input>
          </div>
          <button type='submit' className='profile__form-button'>
            Редактировать
          </button>
          <Link to='/' className='profile__link'>
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;