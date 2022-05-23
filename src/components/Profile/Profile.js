import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import formValidation from '../../hooks/formValidation';

function Profile(props) {
  const {email, name} = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = formValidation ({
    name: '',
    email: ''
  })

  const [hasChanges, setHasChanges] = React.useState(false);

  React.useEffect(() => {
    values.name = name;
    values.email = email;
  }, [])

  React.useEffect(() => {
    setHasChanges((values.name !== name) || (values.email !== email));
  }, [values.name, values.email, name, email]
  );

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ email: values.email || email, name: values.name || name });
  }
  return (
    <section className='profile'>
      <Header />
      <h2 className='profile__heading'>{`Привет, ${name}!`}</h2>
      <div className='profile__content'>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='profile__input-box'>
            <span className='profile__input'>Имя</span>
            <input className='profile__field' value={values.name || name} disabled={props.isLoading} onChange={handleChange} name='name' type='text' minLength='2' maxLength='40' required></input>
            {errors.name ? (<span className='profile__input_error'>{errors.name}</span>) : null}
          </div>
          <div className='profile__input-box'>
            <span className='profile__input'>E-mail</span>
            <input className='profile__field' value={values.email || email} disabled={props.isLoading} onChange={handleChange} name='email' type='email' required></input>
            {errors.email ? (<span className='profile__input_error'>{errors.email}</span>) : null}
          </div>
          <span className='profile__message'>{props.message}</span>
          <button type='submit' disabled={!hasChanges || !isValid} className={`profile__form-button
          ${!isValid || !hasChanges || props.isLoading ? 'profile__form_button_disabled' : ''}`}>
            Редактировать
          </button>
          <Link to='/' className='profile__link' onClick={props.onSignout}>
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;