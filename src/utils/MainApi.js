class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
  })
  .then((res) => this._getResponseData(res));
  }

  editUserInfo({ email, name }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        name,
      }),
    })
  .then((res) => this._getResponseData(res));
  }

  deleteMovieFromSaved(cardId) {
      return fetch(`${this._baseUrl}/movies/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include'
      })
      .then((res) => this._getResponseData(res));
  }

  saveMovie(data) {
    const movieURL = 'https://api.nomoreparties.co';
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: data.country || ' ',
        director: data.director || ' ',
        duration: data.duration || ' ',
        year: data.year || ' ',
        description: data.description || ' ',
        image: `${movieURL}${data.image.url}` || ' ',
        trailerLink: data.trailerLink || ' ',
        thumbnail: `${movieURL}${data.image.formats.thumbnail.url}` || ' ',
        movieId: data.id || ' ',
        nameRU: data.nameRU || ' ',
        nameEN: data.nameEN || ' ',
      }),
    })
    .then((res) => this._getResponseData(res));
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res));
  }
}

const mainApi = new MainApi({
  //baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.krylov.nomoredomains.xyz',
  headers: {
  'Content-Type': 'application/json'
  },
  credentials: 'include'
})

export default mainApi;