import {PopupWithForm} from "./PopupWithForm";
import {useEffect, useRef} from "react";

export function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const cardNameRef = useRef()
    const cardLinkRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
                name: cardNameRef.current.value,
                link: cardLinkRef.current.value
            }
        )
    }

    useEffect(() => {
        cardNameRef.current.value = ('')
        cardLinkRef.current.value = ('')
    }, [onClose])

    return (
        <PopupWithForm
            name="add-new-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            btnText="Cоздать"
        >
            <label className="form__field">
                <input className="form__input form__input_type_title" type="text" name="name"
                       defaultValue=""
                       ref={cardNameRef}
                       placeholder="Название" required minLength="2" maxLength="30"/>
                <span className="form__input-error" id="name-error"></span>
            </label>
            <label className="form__field">
                <input className="form__input form__input_type_link" type="url" name="link" defaultValue=""
                       ref={cardLinkRef}
                       placeholder="Ссылка на картинку" required/>
                <span className="form__input-error" id="link-error"></span>
            </label>
        </PopupWithForm>
    )
}