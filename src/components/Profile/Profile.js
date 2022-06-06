import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import CallbackValidation from '../../hooks/Validity';

function Profile({
  handleLogout,
  editProfile,
  loggedIn,
  profileError,
  isEditProfile,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const validation = CallbackValidation();
  const { name, email } = validation.values;

  React.useEffect(() => {
    validation.setValues({ email: currentUser.email, name: currentUser.name });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.email, currentUser.name]);

  const submitProfile = (e) => {
    e.preventDefault();
    editProfile(name, email);
  };

  return (
    <section className='profile'>
      <Header bgColor="grey" textColor="white" loggedIn={loggedIn}/>
      <h2 className='profile__heading'>Привет, {currentUser && currentUser.name}</h2>
      <div className='profile__content'>
        <form className='profile__form' onSubmit={submitProfile}>
        <label htmlFor="name" className="profile__input">
              Имя
              <input
                onChange={validation.handleChange}
                value={name || ""}
                className="profile__field"
                name="name"
                id="name"
              ></input>
            </label>
            <label htmlFor="email" className="profile__input">
              Почта
              <input
                className="profile__field"
                onChange={validation.handleChange}
                value={email || ""}
                name="email"
                id="email"
              ></input>
            </label>

            <p className="profile__form-error">
              {validation.errors.name || validation.errors.email}
            </p>

            {profileError && (
              <p className="profile__form-error">Ошибка обновления данных</p>
            )}

            {isEditProfile && (
              <p className="profile__form-edit">Данные успешно обновлены</p>
            )}
                        <button
              className="profile__form-button"
              type="submit"
              disabled={
                (currentUser &&
                  name === currentUser.name &&
                  email === currentUser.email) ||
                !validation.isValid
              }
            >
              Редактировать
            </button>

            <button className="profile__link" onClick={handleLogout}>
              Выйти из аккаунта
            </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;