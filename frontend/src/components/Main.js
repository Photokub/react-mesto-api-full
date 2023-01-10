import React, {useContext} from 'react';
import {Card} from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function Main(props) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                    <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}/>
                </div>
                <button className="profile__add-btn" type="button" onClick={props.onAddPlace}>+</button>
            </section>
            <section className="elements" aria-label="галерея">
                {props.cards.map((card) => (
                    <Card key={card._id}
                          card={card}
                          onCardClick={props.onCardClick}
                          onCardLike={props.onCardLike}
                          onConfirmClick={props.onConfirmClick}
                          onImageClick={props.onImageClick}
                    />
                ))}
            </section>
        </main>
    )
}