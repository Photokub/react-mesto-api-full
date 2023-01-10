import React from "react";
import {Link, Redirect} from "react-router-dom";
import {useState} from 'react';

export function Register({isLoggedId, onRegister}) {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        let {password, email} = userData;
        e.preventDefault();
        onRegister({password, email})
    }

    if (isLoggedId) {
        return <Redirect to="/"/>;
    }

    return (
        <main className="main">
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input type="email" className="login__form_input register__form_type_email" name="email"
                           placeholder="Email" required value={userData.email} onChange={handleChange}/>
                    <input type="password" className="login__form_input register__form_type_password" name="password"
                           placeholder="Пароль" minLength="5" required value={userData.password}
                           onChange={handleChange}/>
                    <button className="login__submit-btn">Зарегистрироваться</button>
                </form>
                <span className="register__subtitle">Уже зарегистрированы? <Link className="register__link"
                                                                                 to="/sign-in">Войти</Link></span>
            </section>
        </main>
    )
}