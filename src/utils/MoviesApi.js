import { BASE_URL } from "../utils/config";

class MoviesApi{
  constructor({ adress, headers }) {
      this._adress = adress;
      this._headers = headers;
  }

  getMovies() {
      return fetch(`${this._adress}`, {
          headers: this._headers})
          .then(this._checkStatus)
  }

  _checkStatus(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json();
    }
}

const moviesApi = new MoviesApi({
  adress: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default moviesApi;