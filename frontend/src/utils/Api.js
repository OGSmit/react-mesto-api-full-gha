const configForApi = {
  url: 'https://api.ogsmit.nomoredomains.monster',
 // url: 'https://api.ogsmit.nomoredomains.monster', 
  headers: {
    'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getInitialCard() {
    return fetch(`${this.url}/cards`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`, // перенес сюда так как фиксил баг https://disk.yandex.ru/i/0qzw9jcS5dOBhQ
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse)
  }

  getProfile() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`, // перенес сюда так как фиксил баг https://disk.yandex.ru/i/0qzw9jcS5dOBhQ
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse)
  }

  removeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this._checkResponse)
  }

  addCard(objectFromInputs) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: objectFromInputs.name,
        link: objectFromInputs.link 
      })
    }).then(this._checkResponse)
  }

  editAvatar(objectFromInputs) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: objectFromInputs.avatar
      })
    }).then(this._checkResponse)
  };

  editProfile(objectFromInputs) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: objectFromInputs.name,
        about: objectFromInputs.about
      })
    }).then(this._checkResponse)
  }

  addlikeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    }).then(this._checkResponse)
  }

  removelikeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this._checkResponse)
  }

  addComment(cardId, commentText) {
    return fetch(`${this.url}/cards/${cardId}/comments`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ text: commentText })
    }).then(this._checkResponse);
  }

  deleteComment(cardId, commentId) {
    return fetch(`${this.url}/cards/${cardId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this._checkResponse);
  }

  getCommentsByCardId(cardId) {
    return fetch(`${this.url}/cards/${cardId}/comments`, {
      headers: this.headers
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}





const api = new Api(configForApi);

export default api;