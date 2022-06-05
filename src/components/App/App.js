import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import { Route, Switch, useHistory, Redirect, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { MAX_SHORT_MOVIE_DORATION } from "../../utils/config";

function App() {
  const [registrationError, setRegistrationError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [profileError, setProfileError] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = React.useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [message, setMessage] = useState("");
  const [moviesMessage, setMoviesMessage] = useState("");
  const history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      mainApi
        .getUser()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
            setCurrentUser(res.data);
            history.push(path);
          }
        })
        .catch((err) => {
          console.log(`Переданный токен некорректен: ${err}`);
          setLoggedIn(false);
          localStorage.removeItem("jwt");
          history.push("/signin");
        });
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUser()
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo.data);

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((data) => {
        if (data) {
          setMessage("");
          handleLogin(email, password);
          setLoggedIn(true);
          setCurrentUser(data);
          setMoviesMessage("Введите слово для поиска");
          history.push("/signin");
        }
      })
      .catch((err) => {
        if (err === 409) {
          setMessage("Пользователь с таким email уже существует");
        } else {
          setMessage("При регистрации пользователя произошла ошибка");
        }
        setRegistrationError(true);
      });
  }

  function handleLogin (email, password) {
    mainApi
      .login(email, password)
      .then((data) => {
        if (!data) {
          setMessage("Что-то пошло не так");
          return false;
        } if (data) {
          localStorage.setItem("jwt", data);
          setMessage("");
          setLoggedIn(true);
          getCurrentUser();
          history.push("/movies");
          return loggedIn;
        }
      })
      .catch((err) => {
        setMessage("При авторизации произошла ошибка");
        if (err === 401) {
          setMessage("Пользователь с таким email не найден");
        }
        if (err === 400) {
          setMessage("Неверный email или пароль");
        }
        setLoginError(true);
        localStorage.removeItem("jwt");
      });
  };

  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userMovies");
    localStorage.removeItem("movies");
    localStorage.removeItem("sortedMovies");
    localStorage.removeItem("currentUser");
    setUserMovies([]);
    setSortedMovies([]);
    setCurrentUser({});
    setLoggedIn(false);
    setMessage("");
    history.push("/");
  }

  function editProfile(name, email) {
    mainApi
      .setUser(name, email)
      .then((info) => {
        setCurrentUser(info);
        setMessage("Данные профиля обновлены");
        setIsEditProfile(true);
        setTimeout(() => {
          setIsEditProfile(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        if (err.status === 409) {
          setMessage("Пользователь с таким email уже существует");
        } else {
          setMessage("При изменении данных профиля произошла ошибка");
        }
        setProfileError(true);
      });
  }

  function handleGetMovies(keyword) {
    setMoviesMessage("");
    const key = new RegExp(keyword, "gi");
    const findedMovies = movies.filter(
      (item) => key.test(item.nameRU) || key.test(item.nameEN)
    );
    if (findedMovies.length === 0) {
      setMoviesMessage("Таких фильмов в подборке нет");
    } else {
      setMoviesMessage("");
      const checkedLikes = findedMovies.map((movie) => {
        movie.isSaved = userMovies.some(
          (userMovie) => userMovie.movieId === movie.id
        );
        return movie;
      });
      setSortedMovies(checkedLikes);
      localStorage.setItem("sortedMovies", JSON.stringify(checkedLikes));
    }
	}

	function handleLikeChange(movie) {
    const clickedMovie = movie.isSaved;
    console.log(clickedMovie)
    if (clickedMovie) {
      handleDislikeClick(movie);
    } else {
      handleLikeClick(movie);
    }
  }

  function handleLikeClick(movie) {
    mainApi
      .addMovie(movie)
      .then((newMovie) => {
        if (!newMovie) {
          throw new Error("При добавлении фильма произошла ошибка");
        } else {
          localStorage.setItem(
            "userMovies",
            JSON.stringify((newMovie = [newMovie.movie, ...userMovies]))
          );
          setUserMovies(newMovie);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

	function handleDislikeClick(movie) {
    const movieId = movie.id || movie.movieId;
    const selectedMovie = userMovies.find((item) => item.movieId === movieId);
    mainApi
      .removeMovie(selectedMovie._id)
      .then((deletedMovie) => {
        if (!deletedMovie) {
          throw new Error("При удалении фильма произошла ошибка");
        } else {
          const newMoviesList = userMovies.filter((c) => c.movieId !== movieId);
          setUserMovies(newMoviesList);
        }
      })
      .catch((err) => console.log(`При удалении фильма: ${err}`));
  }

  function handleMovieDeleteButton(movie) {
    handleDislikeClick(movie);
  }

  function handleGetSavedMovies(keyword) {
    setMoviesMessage("");
    const key = new RegExp(keyword, "gi");
    const findedMovies = userMovies.filter(
      (item) => key.test(item.nameRU) || key.test(item.nameEN)
    );
    if (findedMovies.length === 0) {
      setMoviesMessage("Ничего не найдено");
    } else {
      setMoviesMessage("");
      setUserMovies(findedMovies);
    }
  }

  function handleCheckBox() {
    setShortMovies(!shortMovies);
  }

  function filterShortMovies(arr) {
    if (arr.length !== 0 || arr !== "undefind") {
      return arr.filter((movie) =>
        shortMovies ? movie.duration <= MAX_SHORT_MOVIE_DORATION : true
      );
    }
	}

	function checkSavedMovie(movie) {
    return (movie.isSaved = userMovies.some(
      (userMovie) =>
     userMovie.movieId === movie.id
    ));
  }

  function getCurrentUser() {
    mainApi
      .getUser()
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData.data);
          localStorage.setItem("currentUser", JSON.stringify(userData));
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("jwt");
        localStorage.removeItem("currentUser");
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      Promise.all([mainApi.getUser(), mainApi.getSavedMovies()])
        .then(([userData, savedMovies]) => {
          localStorage.setItem("currentUser", JSON.stringify(userData));
          setCurrentUser(userData);

          const savedMoviesList = savedMovies.filter(
            (item) => item.owner._id === userData._id
          );
          localStorage.setItem("userMovies", JSON.stringify(savedMoviesList));
          setUserMovies(savedMoviesList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    checkSavedMovie(sortedMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMovies]);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((allMovies) => {
        setMovies(allMovies);
        localStorage.setItem("movies", JSON.stringify(allMovies));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        localStorage.removeItem("movies");
      });
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
      <Switch>

        <Route path='/' exact>
            <Header bgColor="green" textColor="white" loggedIn={loggedIn} />
            <Main />
            <Footer />
        </Route>

        <ProtectedRoute
            path='/movies'
            component={Movies}
            movies={filterShortMovies(sortedMovies)}
            onGetMovies={handleGetMovies}
            loggedIn={loggedIn}
            onAddMovie={handleLikeChange}
            onFilter={handleCheckBox}
            isShortMovie={shortMovies}
            message={moviesMessage}
            savedMovies={userMovies}
            onSignOut={handleLogout}
            likedMovies={checkSavedMovie}
          />

          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            currentUser={currentUser}
            movies={filterShortMovies(userMovies)}
            onGetMovies={handleGetSavedMovies}
            loggedIn={loggedIn}
            onDelete={handleMovieDeleteButton}
            isShortMovie={shortMovies}
            onFilter={handleCheckBox}
            message={moviesMessage}
            isSavedMovies={true}
            onSignOut={handleLogout}
          />

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            currentUser={currentUser}
            isEditProfile={isEditProfile}
            profileError={profileError}
            component={Profile}
            handleLogout={handleLogout}
            editProfile={editProfile}
          />

        <Route path='/signin'>
          {!loggedIn
            ? <Login handleLogin={handleLogin} loginError={loginError} />
            : <Redirect to="/" />
          }
        </Route>

        <Route path='/signup'>
        {!loggedIn
          ? <Register
            handleRegister={handleRegister}
            registrationError={registrationError}/>
            : <Redirect to="/" />
            }
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;