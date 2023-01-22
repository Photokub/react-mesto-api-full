export const BASE_URL = 'http://api.photokub.domainname.nomoredomains.club/';

export const register = ({email, password}) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        mode: "no-cors",
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
        mode: "no-cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
};

export const getContent = () => {
    return fetch(`${BASE_URL}users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(checkResponse)
}

export const logOut =() => {
    return fetch(`${BASE_URL}signout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(checkResponse)
}

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`)
