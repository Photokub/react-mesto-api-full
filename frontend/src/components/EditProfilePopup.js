import React, {useEffect, useState, useContext} from 'react';
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {PopupWithForm} from "./PopupWithForm";
import {App} from "./App";

export function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleJobChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            btnText="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input className="form__input form__input_type_name" type="text"
                       name="user_name_field"
                       value={name || ''}
                       required minLength="2" maxLength="40"
                       onChange={handleNameChange}
                />
                <span className="form__input-error" id="user_name_field-error"></span>
            </label>
            <label className="form__field">
                <input className="form__input form__input_type_job" type="text" name="user_job_field"
                       value={description || ''}
                       required
                       minLength="2" maxLength="200"
                       onChange={handleJobChange}
                />
                <span className="form__input-error" id="user_job_field-error"></span>
            </label>
        </PopupWithForm>
    )
}


