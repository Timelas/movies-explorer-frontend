import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Form from "../Form/Form";
import CallbackValidation from '../../hooks/Validity';

function Login({ handleLogin, loginError }) {
  const callbackValidation = CallbackValidation();
  const { email, password } = callbackValidation.values;

  const submitHandle = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    callbackValidation.resetForm();
  };

  return (
    <section className='login'>
      <div className='login__block'>
      <Link to="/">
        <img alt='Логотип' className="login__logo" src={logo}/>
      </Link>
        <h2 className='login__heading'>Рады видеть</h2>
      </div>
      <Form
          submitText={{
            buttonText: "Войти",
            promt: "Ещё не зарегистрированы?",
            route: "/signup",
            linkText: "Регистрация",
          }}
          submitHandle={submitHandle}
          validation={callbackValidation}
          formName="login"
          loginError={loginError}
        />
    </section>
  );
}

export default Login;