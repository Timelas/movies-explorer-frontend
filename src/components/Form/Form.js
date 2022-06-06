import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";

function Form({
  formName,
  submitText,
  children,
  registrationError,
  submitHandle,
  validation,
}) {
  const { values, handleChange, errors, isValid, onFocus, isFocused } =
    validation;

  return (
  <form className='form' onSubmit={ submitHandle } noValidate name={`${formName}-form`}>
    {children}
        <div className='form__input'>
          <span className='form__input-name' htmlFor="email">E-mail</span>
          <input className='form__field'
          name='email'
          type='email'
          required
					onChange={ handleChange }
					id='email'
          onFocus={onFocus}></input>
          <span className='form__input-error'>{isFocused && errors.email}</span>
        </div>
        <div className='form__input'>
          <span className='form__input-name'>Пароль</span>
          <input className='form__field form__field_password'
          name='password'
          type='password'
          required
          minLength='8'
					onChange={ handleChange }
					id='password'
          onFocus={onFocus}
          value={ values.password || '' }></input>
         <span className="form__input-error">{isFocused && errors.password}</span>
        </div>
        <button className="form__button" type="submit" disabled={!isValid}>
        {submitText.buttonText}
      </button>
      {registrationError && (
        <p className="form__input-error">Произошла ошибка при регистрации</p>
      )}
      <p className="form__promt">
        {`${submitText.promt} `}
        <Link className="form__link" to={submitText.route}>
          {submitText.linkText}
        </Link>
      </p>
    </form>
      );}
export default Form;