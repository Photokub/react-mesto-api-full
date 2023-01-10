import logo from "../images/logo.svg";
import {Link, Route, Switch} from "react-router-dom";


export function Header({logOut, userData}) {

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="лого Mesto"/>
                <Route  path="/mesto-react">
                    <div className="header__container">
                        <p className="header__userData">{userData.email}</p>
                        <Link className="header__link" to="/sign-up" onClick={logOut}>Выйти</Link>
                    </div>
                </Route>
                <Route  path="/sign-up">
                    <Link className="header__link" to="/sign-in">Войти</Link>
                </Route>
                <Route   path="/sign-in">
                    <Link className="header__link" to="/sign-up">Регистрация</Link>
                </Route>
        </header>
    )
}
