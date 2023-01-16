//export const BASE_URL = 'https://auth.nomoreparties.co/';
export const BASE_URL = 'http://localhost:3001/';


export const register = ({email, password}) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        credentials: 'include',
        mode: "cors",
        //headers: this._headers,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
};

export const authorize = ({password, email}) => {
    return fetch(`${BASE_URL}signin`, {
        method: 'POST',
        credentials: 'include',
        mode: "cors",
       // headers: this._headers,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
};

// export const getContent = (token) => {
//     return fetch(`${BASE_URL}users/me`, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         }
//     })
//         .then(checkResponse)
// }

export const getContent = () => {
    return fetch(`${BASE_URL}users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JmZjIzMWE5NTBmNGM5Y2U0YTVlNjIiLCJpYXQiOjE2NzM1MzQ5ODgsImV4cCI6MTY3NDEzOTc4OH0.z_JT0ARBKf7YgtlW7Z82rtrUmHe8Ts4h7JjvB8GomQo',
            //'Authorization': `Bearer ${token}`,
        }
    })
        .then(checkResponse)
}


const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`)

// checkTokenValidity = () => {
//     return fetch(`${BASE_URL}/users/me`, {
//         credentials: 'include',
//         headers: this._headers,
//     }).then((res) => this.handleResponse(res));
// }