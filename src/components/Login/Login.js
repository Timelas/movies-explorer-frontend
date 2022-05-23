import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import formValidation from '../../hooks/formValidation';

function Login(props) {
  const {values, handleChange, resetForm, errors, isValid} = formValidation();

	React.useEffect(() => {
		resetForm({});
	}, [resetForm]);

	function handleSubmit(e) {
		e.preventDefault();
		if (!values.email || !values.password) {
			return;
		}
		const {email, password} = values;
		props.onLogin({email, password});
	}
  return (
    <section className='login'>
      <div className='login__block'>
      <Link to="/">
        <img alt='Логотип' className="login__logo" src={logo}/>
      </Link>
        <h2 className='login__heading'>Рады видеть</h2>
      </div>
      <form className='login__form' onSubmit={ handleSubmit } noValidate>
        <div className='login__input'>
          <span className='login__input-name'>E-mail</span>
          <input className='login__field'
          name='email'
          type='email'
          required
          autoComplete='new-email'
					onChange={ handleChange }
					id='email-login'
					value={ values.email || '' }></input>
          { errors.email ? (<span className='register__input_error'>{ errors.email }</span>) : null }
        </div>
        <div className='login__input'>
          <span className='login__input-name'>Пароль</span>
          <input className='login__field login__field_password'
          name='password'
          type='password'
          required
          minLength='8'
          autoComplete='new-password'
					onChange={ handleChange }
					id='password-login'
          value={ values.password || '' }></input>
         { errors.password ? (<span className='register__input_error'>{ errors.password }</span>) : null }
        </div>
        <button type='submit'className={ `login__form_button ${ !isValid || props.isLoading ? 'login__form_button_disabled' : '' } ` }>
          Войти
        </button>
        <span className='login__message'>{ props.message }</span>
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