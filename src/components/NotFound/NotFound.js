import React from 'react';
import './NotFound.css';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <div className='not-found'>
      <h3 className='not-found__title'>404</h3>
      <p className='not-found__message'>Страница не найдена</p>
        <button to='/' className='not-found__link' onClick={goBack}>
        Назад
      </button>
    </div>
  );
}

export default NotFound;