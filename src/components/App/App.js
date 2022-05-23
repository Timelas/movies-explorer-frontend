import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('loggedIn'));
  const [initialCards, setInitialCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearchedSavedMovie, setIsSearchedSavedMovie] = React.useState(false);
  const [isShortSavedMovie, setIsShortSavedMovie] = React.useState(false);
  const [isSearched, setIsSearched] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const [isShortMovieButton, setIsShortMovieButton] = React.useState(
    localStorage.getItem('isShortMovieButton')
      ? JSON.parse(localStorage.getItem('isShortMovieButton'))
      : false);

  const [isShortSavedMovieButton, setIsShortSavedMovieButton] = React.useState(
    localStorage.getItem('isShortSavedMovieButton')
      ? JSON.parse(localStorage.getItem('isShortSavedMovieButton'))
      : false);

  let initialCardsValue;
  if (JSON.parse(localStorage.getItem('isShortMovieButton'))) {
    if (localStorage.getItem('searchedCards')) {
      initialCardsValue = JSON.parse(localStorage.getItem('searchedCards')).filter((item) => item.duration < 40)
    } else {
      initialCardsValue = [];}
  } else {
    if (localStorage.getItem('searchedCards')) {
      initialCardsValue = JSON.parse(localStorage.getItem('searchedCards'))
    } else {
      initialCardsValue = [];}
  }

  const [cards, setCards] = React.useState(initialCardsValue);

  let initialSavedCardsValue;

  if (JSON.parse(localStorage.getItem('isShortSavedMovieButton'))) {
    if (localStorage.getItem('savedMovies')) {
      initialSavedCardsValue = JSON.parse(localStorage.getItem('savedMovies')).filter((item) => item.duration < 40)
    } else {
      initialSavedCardsValue = [];}
  } else {
    if (localStorage.getItem('savedMovies')) {
      initialSavedCardsValue = JSON.parse(localStorage.getItem('savedMovies'))
    } else {
      initialSavedCardsValue = [];}
  }

  const [savedMovies, setSavedMovies] = React.useState(initialSavedCardsValue);

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });

  const checkToken = React.useCallback(() => {
    auth
      .checkToken()
      .then((data) => {
        setEmail(data.email);
        localStorage.setItem('loggedIn', 'true');
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [loggedIn, history]);

  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([mainApi.getUserInfo()])
        .then((result) => {
          setCurrentUser(result[0]);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  function showMessage(message) {
    setMessage(message);
    setTimeout(() => setMessage(''), 10000);
  }

  function handleRegister(data) {
    setIsLoading(true);
    auth
      .register(data)
      .then(() => {
        handleLogin(data);
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          return showMessage('Внесены неверные данные');
        } else if (err === 'Ошибка: 409') {
          return showMessage('Пользователь с таким email уже существует');
        } else if (err === 'Ошибка: 500') {
          return showMessage('Сервер не отвечает');
        }
        console.log(err);
      })
      .finally(() =>
        setIsLoading(false));
  }

  function handleLogin(data) {
    setIsLoading(true);
    auth
      .authorize(data)
      .then(() => {
        checkToken();
      })
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          return showMessage('Внесены неверные данные');
        } else if (err === 'Ошибка: 401') {
          return showMessage('Ошибка аутентификации');
        } else if (err === 'Ошибка: 500') {
          return showMessage('Сервер не отвечает');
        }
        console.log(err);
      })
      .finally(() =>
        setIsLoading(false));
  }

  function handleLogout() {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({
          name: '',
          email: '',
        });
        window.localStorage.clear();
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser({ email, name }) {
    setIsLoading(true);
    mainApi
      .editUserInfo({ email, name })
      .then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        setCurrentUser(res);
        showMessage('Изменения сохранены');
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          return showMessage('Сервер не отвечает');
        } else if (err === 'Ошибка: 400') {
          showMessage('Внесены неверные данные');
        } else if (err === 'Ошибка: 409') {
          return showMessage('Пользователь с таким email уже существует');
        }
        console.log(err);
      })
      .finally(() =>
        setIsLoading(false));
  }

  function handleSaveMovie(card) {
    mainApi
      .saveMovie(card)
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify([res, ...savedMovies]));
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteMovie(card) {
    const movie = savedMovies.filter((item) => item.nameRU.toLowerCase() === card.nameRU.toLowerCase());
    mainApi
      .deleteMovieFromSaved(movie[0]._id)
      .then(() => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter((i) => i._id !== movie[0]._id)));
        setSavedMovies(savedMovies.filter((i) => i._id !== movie[0]._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSubmit(searchValue, isSaved) {
    if (!isSearched) {
      setIsLoading(true);
      new Promise(() => {
        moviesApi
          .getMovies()
          .then((data) => {
            if (isSaved === true) {
              isShortSavedMovie
                ? setSavedMovies(
                  JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
                    return item.duration < 40 && item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                  })
                )
                : setSavedMovies(
                  JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
                    return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                  })
                );
            } else {
              localStorage.setItem('searchedCards', JSON.stringify(data.filter((item) => {
                    return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                  })
                )
              );
              setCards(
                data.filter((item) => {
                  return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
                })
              );
            }
            setInitialCards(data);
          })
          .finally(() => setIsLoading(false));
      }).catch((err) => {
        if (err === 'Ошибка: 500') {
          showMessage('Сервер не отвечает');
        }
        console.log(err);
      });
    }

    setIsSearchedSavedMovie(searchValue);

    if (isSaved === true) {
      isShortSavedMovie
        ? setSavedMovies(
          JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
            return item.duration < 40 && item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
          })
        )
        : setSavedMovies(
          JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
            return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
          })
        );
    } else {
      localStorage.setItem('searchedCards', JSON.stringify(initialCards.filter((item) => {
            return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
          })
        )
      );
      setCards(
        initialCards.filter((item) => {
          return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
        })
      );
    }
    setIsSearched(true);
  }

  function isShortMovie(value, isSaved) {

    if (isSaved) {
      setIsShortSavedMovieButton(value);
      localStorage.setItem('isShortSavedMovieButton', value);
    } else {
      setIsShortMovieButton(value);
      localStorage.setItem('isShortMovieButton', value);
    }

    setIsShortSavedMovie(value);
    if (isSaved === true) {
      if (isSearchedSavedMovie) {
        value
          ? setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration < 40 && item.nameRU.toLowerCase().includes(isSearchedSavedMovie)))
          : setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration > 0 && item.nameRU.toLowerCase().includes(isSearchedSavedMovie)));
      } else {
        value ? setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration < 40)) : setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration > 0));
      }
    } else {
      value ? setCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration < 40)) : setCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration > 0));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
`      <Switch>
        <Route path='/' exact>
          <Main loggedIn={loggedIn}/>
        </Route>
        <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            cards={cards}
            handleSubmit={handleSubmit}
            isShortMovie={isShortMovie}
            handleSaveMovie={handleSaveMovie}
            deleteMovie={deleteMovie}
            isSearched={isSearched}
            isShortMovieButton={isShortMovieButton}
            savedMovies={savedMovies}
          />

          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            isSearched={isSearched}
            handleSubmit={handleSubmit}
            isShortMovie={isShortMovie}
            deleteMovie={deleteMovie}
            isShortSavedMovieButton={isShortSavedMovieButton}
            savedMovies={savedMovies}
          />

          <ProtectedRoute
            path='/profile'
            component={Profile}
            isLoading={isLoading}
            onUpdateUser={handleUpdateUser}
            loggedIn={loggedIn}
            message={message}
            onSignout={handleLogout}
          />
 <Route
            path='/signup'>
            {!loggedIn
              ? <Register
                message={message}
                isLoading={isLoading}
                onRegister={handleRegister} />
              : <Redirect
                to='/movies' />}
          </Route>

          <Route
            path='/signin'>
            {!loggedIn
              ? <Login
                onLogin={handleLogin}
                isLoading={isLoading}
                message={message} />
              : <Redirect
                to='/movies' />}
          </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>`
    </CurrentUserContext.Provider>
  );
}

export default App;