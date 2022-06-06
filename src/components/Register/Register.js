import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Form from "../Form/Form";
import logo from '../../images/logo.svg';
import CallbackValidation  from '../../hooks/Validity';

function Register({ handleRegister, registrationError }) {
  const callbackValidation = CallbackValidation();
  const { email, password, name } = callbackValidation.values;
  const { values, onFocus, handleChange, isFocused, errors } =
    callbackValidation;

  const submitHandle = (e) => {
    e.preventDefault();
    handleRegister(name, email, password);
    callbackValidation.resetForm();
  };

  return (
    <section className='register'>
      <div className='register__block'>
      <Link to="/">
        <img alt='Логотип' className="register__logo" src={logo}/>
      </Link>
        <h2 className='register__heading'>Добро пожаловать!</h2>
      </div>
      <Form
          submitText={{
            buttonText: "Зарегистрироваться",
            promt: "Уже зарегистрированы?",
            route: "/signin",
            linkText: "Войти",
          }}
          registrationError={registrationError}
          submitHandle={submitHandle}
          validation={callbackValidation}
          formName="register"
        >
          <div className='form__input'>
          <label htmlFor="name" className="form__input-name">
            Имя
          </label>
          <input
            id="name"
            name="name"
            className="form__field"
            minLength="2"
            type="text"
            required
            value={values.name || ""}
            onFocus={onFocus}
            onChange={handleChange}
          />
          <span className="form__input-error">{isFocused && errors.name}</span>
          </div>
 </Form>
    </section>
  );
}

export default Register;