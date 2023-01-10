import React from "react";

export function ImagePopup({isOpen, card, onClose}) {
    return (
        <section
            className={`popup popup_full-size-image  ${isOpen  ? 'popup_opened' : ''}`}
            aria-label="попап полноразмерного изображения"
        >
            <div className="popup__container-full-size-image">
                <button className="popup__close popup__close_full-size-image" type="button" onClick={onClose}></button>
                <figure className="popup__fullsize-img-figure">
                    <img className="popup__fullsize-img-picture" src={card.link} alt={card.name}/>
                    <figcaption className="popup__fullsize-img-caption">{card.name}</figcaption>
                </figure>
            </div>
        </section>
    )
}

