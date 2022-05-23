class MoviesApi {
  constructor (options) {
    this._moviesUrl = options.moviesUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this._moviesUrl}`)
    // ,
    // {
    //   method: 'GET',
    //   headers: this._headers,
    //   credentials: 'include',
    // })
    .then((res) => this._getResponseData(res))
    .then(data => data);
  };
};

const moviesApi = new MoviesApi({
  moviesUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default moviesApi;