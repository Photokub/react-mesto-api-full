import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';


export function Login({isLoggedId, onLogin}) {

    const [userData, setUserData] = useState({
        password: "",
        email: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(userData)
    }

    if (isLoggedId) {
        return <Redirect to="/"/>;
    }

    return (
        <main className="main">
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" method="post">
                    <input type="email" className="login__form_input login__form_type_email" name="email"
                           defaultValue="" placeholder="Email" required onChange={handleChange}/>
                    <input type="password" className="login__form_input login__form_type_password" name="password"
                           defaultValue="" placeholder="Пароль" minLength="5" required onChange={handleChange}/>
                    <button className="login__submit-btn" onClick={handleSubmit}>Войти</button>
                </form>
            </section>
        </main>
    )
}