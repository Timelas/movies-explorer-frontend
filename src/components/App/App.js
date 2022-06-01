import React from "react";
import "./App.css";
import Header from "../Header/Header";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import mainApi from "../../utils/MainApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const history = useHistory();
  const [registrationError, setRegistrationError] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [profileError, setProfileError] = React.useState(false);
  const [isEditProfile, setIsEditProfile] = React.useState(false);

  function isLoggedCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getUser()
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo.data);
            setIsLogin(true);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setIsLogin(false);
          history.push("/signin");
        });
    }
  }

  React.useEffect(() => {
    isLoggedCheck();
  }, []);

  React.useEffect(() => {
    if (isLogin) {
      mainApi.getUser()
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogin]);

  const handleLogin = (email, password) => {
    mainApi
      .login(email, password)
      .then((data) => {
        if (data) {
          setIsLogin(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setLoginError(true);
        console.log(err);
      });
  };

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((data) => {
        if (data) {
          handleLogin(email, password);
          history.push("/signin");
        }
      })
      .catch((err) => {
        setRegistrationError(true);
        console.log(err);
      });
  }

  function handleLogout() {
    history.push("/");
    setIsLogin(false);
    localStorage.clear();
  }

  function editProfile(name, email) {
    mainApi
      .setUser(name, email)
      .then((info) => {
        setCurrentUser(info);
        setIsEditProfile(true);
        setTimeout(() => {
          setIsEditProfile(false);
        }, 3000);
      })
      .catch(() => {
        setProfileError(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
      <Switch>

        <Route path='/' exact>
            <Header bgColor="green" textColor="white" isLogin={isLogin} />
            <Main />
            <Footer />
        </Route>

        <ProtectedRoute
            path='/movies'
            component={Movies}
            isLogin={isLogin}
            currentUser={currentUser}
          />

          <ProtectedRoute
            path='/saved-movies'
            component={Movies}
            isLogin={isLogin}
            currentUser={currentUser}
          />

          <ProtectedRoute
            path='/profile'
            isLogin={isLogin}
            currentUser={currentUser}
            isEditProfile={isEditProfile}
            profileError={profileError}
            component={Profile}
            handleLogout={handleLogout}
            editProfile={editProfile}
          />

        <Route path='/signin'>
          <Login handleLogin={handleLogin} loginError={loginError} />
        </Route>

        <Route path='/signup'>
          <Register
            handleRegister={handleRegister}
            registrationError={registrationError}/>
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