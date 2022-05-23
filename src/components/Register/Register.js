import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import formValidation from '../../hooks/formValidation';

function Register(props) {
  const { values, handleChange, resetForm, errors, isValid } = formValidation();

  React.useEffect(() => {
    resetForm({});
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    const { name, email, password } = values;
    props.onRegister({ name, email, password });
  }
  return (
    <section className='register'>
      <div className='register__block'>
      <Link to="/">
        <img alt='Логотип' className="register__logo" src={logo}/>
      </Link>
        <h2 className='register__heading'>Добро пожаловать!</h2>
      </div>
      <form className='register__form' onSubmit={handleSubmit} noValidate>
        <div className='register__input'>
          <span className='register__input-name'>Имя</span>
          <input className='register__field' disabled={props.isLoading} autoComplete='new-name' onChange={handleChange} id='name' name='name' type='text' minLength='2' maxLength='40' required value={values.name || '' } />
        {errors.name ? (<span className='register__input_error'>{errors.name}</span>) : null}
        </div>
        <div className='register__input'>
          <span className='register__input-name'>E-mail</span>
          <input className='register__field' disabled={props.isLoading}
          autoComplete='new-email'
          onChange={handleChange}
          id='email' name='email'
          type='email'
          required
          value={values.email || ''}
        />
        {errors.email ? (<span className='register__input_error'>{errors.email}</span>) : null}

        </div>
        <div className='register__input'>
          <span className='register__input-name'>Пароль</span>
          <input className='register__field register__field_password'  disabled={props.isLoading}
          autoComplete='new-password'
          onChange={handleChange}
          id='password'
          name='password'
          type='password'
          required
          minLength='10'
          value={values.password || ''}
        />
        {errors.password ? (<span className='register__input_error'>{errors.password}</span>) : null}
        <span className='register__message'>{props.message}</span>
        </div>
        <button type='submit' className={`register__form_button ${!isValid || props.isLoading ? 'register__form_button_disabled' : ''} `}>
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