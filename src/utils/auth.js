export const BASE_URL = 'https://api.moviessave.nomoredomains.work';


export const checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({name, email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({name, email, password})
    })
    .then(checkResponse)
  };

export const authorize = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email, password})
    })
    .then(checkResponse)
};

export const checkToken = () => {
return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    credentials: 'include',
})
  .then(checkResponse)
}

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  })
  .then(checkResponse)
}