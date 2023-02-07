 class Api {
     constructor(setting) {
         this._adress = setting.baseUrl;
         this._headers = setting.headers;
     }

     _request(url, options) {
         return fetch(url, options).then(this.handleResp)
     }

     handleResp(res) {
         if (!res.ok) {
             return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
         }
         return res.json();
     }

     getUserInfo() {
         return this._request(`${this._adress}/users/me`, {
             method: "GET",
             credentials: 'include',
             headers: this._headers,
         })
     }

     patchUserInfo({name, about}) {
         return this._request(`${this._adress}/users/me`, {
             method: 'PATCH',
             credentials: 'include',
             headers: this._headers,
             body: JSON.stringify({
                 name: name,
                 about: about,
             })
         })
     }

     getDefaultCards() {
         return this._request(`${this._adress}/cards`, {
             method: "GET",
             credentials: 'include',
             headers: this._headers,
         })
     }

     postCard({name, link}) {
         return this._request(`${this._adress}/cards`, {
             method: "POST",
             credentials: 'include',
             headers: this._headers,
             body: JSON.stringify({
                 name: name,
                 link: link,
             })
         })
     }

     changeLikeCardStatus(id, like) {
         return this._request(`${this._adress}/cards/${id}/likes`, {
             method: like ? "PUT" : "DELETE",
             credentials: 'include',
             headers: this._headers,
         })
     }

     deleteMyCard(id) {
         return this._request(`${this._adress}/cards/${id}`, {
             method: "DELETE",
             credentials: 'include',
             headers: this._headers,
         })
     }

     patchAvatar(avatar) {
         return this._request(`${this._adress}/users/me/avatar`, {
             method: "PATCH",
             credentials: 'include',
             headers: this._headers,
             body: JSON.stringify({
                 avatar,
             })
         })
     }
 }

 export const api = new Api({
     credentials: 'include',
     //TODO//baseUrl: 'http://localhost:3000',
     baseUrl: 'https://api.photokub.domainname.nomoredomains.club',
     headers: {
         "content-type": "application/json",
         'Accept': 'application/json',
     }
 })


