import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function Card({
                         card,
                         onCardClick,
                         onCardLike,
                         onConfirmClick,
                         onImageClick
                     }) {
    const currentUser = React.useContext(CurrentUserContext)

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardDeleteButtonClassName = (
        `element__remove-btn ${isOwn ? 'element__remove-btn' : 'element__remove-btn_hidden'}`
    );
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );
    const handleCardClick = () => {
        onImageClick(card)
        onCardClick(card)
    };

    const handleLikeClick = () => {
        onCardLike(card)
    };

    const handleConfirmClick = () => {
        onConfirmClick(card)
        onCardClick(card)
    }

    return (
        <div className="element">
            <button className={cardDeleteButtonClassName}
                    type="button"
                    onClick={handleConfirmClick}></button>
            <img className="element__image"
                 src={card.link}
                 alt={card.name}
                 onClick={handleCardClick}/>
            <h2 className="element__title">{card.name}</h2>
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <span className="element__like-counter">{card.likes.length}</span>
        </div>
    )
}

