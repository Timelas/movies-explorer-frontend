class MainApi {
  constructor({ adress, headers }) {
      this._adress = adress;
      this._headers = headers;
  }

  getUser(token) {
      return fetch(`${this._adress}/api/users/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
          .then(res => this._checkStatus(res))
  }

  setUser(name, email) {
      return fetch(`${this._adress}/api/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name, email
          })
      })
      .then(res => this._checkStatus(res))
  }

  register(name, email, password) {
      return fetch(`${this._adress}/api/signup`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
              email,
              password,
              name
          })
      })
      .then((res) => this._checkStatus(res))
  }

  login(email, password) {
      return fetch(`${this._adress}/api/signin`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({email, password})
      })
      .then(res => this._checkStatus(res))
      .then(data => {
          if (data.token) {
              localStorage.setItem('jwt', data.token);
              this.updateHeaders();
              return data;
          } return Promise.reject(new Error(`Ошибка: ${data.status}`))
      })
  }

  logout() {
      return fetch(`${this._adress}/api/signout`, {
          method: 'POST',
          headers: this._headers,
      }).then(res => this._checkStatus(res))
  }

  updateHeaders() {
      this._headers = {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
  }

  getSavedMovies() {
      return fetch(`${this._adress}/api/movies`, {headers: this._headers})
      .then((response) => this._checkStatus(response))
  }

  addMovie(movie) {
      return fetch(`${this._adress}/api/movies`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
              country:  movie.country,
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: `https://api.nomoreparties.co${movie.image.url}`,
              trailer: movie.trailerLink,
              movieId: movie.id,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
              thumbnail: `https://api.nomoreparties.co${movie.image.url}`
          })
      }).then(res => this._checkStatus(res))
  }

  removeMovie(id) {
      return fetch(`${this._adress}/api/movies/${id}`, {
          method: 'DELETE',
          headers: this._headers
      })
      .then(res => this._checkStatus(res))
  }


  _checkStatus(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json();
    }

}

const mainApi = new MainApi({
  //adress: 'http://localhost:3000',
  adress: 'https://api.moviessave.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  },
  credentials: 'include'
})

export default mainApi;