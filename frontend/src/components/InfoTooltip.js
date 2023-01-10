import React from "react";

export function InfoTooltip({isOpen,onClose, loggedIn, successText, failureText, sucсessIcon, failureIcon}) {
    return(
        <section className={`popup popup_infoTooltip  ${isOpen ? 'popup_opened' : ''}`}
                 aria-label="попап">
            <div className={`popup__container popup__container-infoTooltip`}>
                <img src={loggedIn ? sucсessIcon : failureIcon} alt={loggedIn ? "Успех" : "Неудача"} className="popup__icon"/>
                <h3 className="popup__title popup__infoTooltip_title">{loggedIn ? successText : failureText}</h3>
                <button className="popup__close" type="button" onClick={onClose}/>
            </div>
        </section>
    )
}