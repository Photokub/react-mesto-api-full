import {PopupWithForm} from "./PopupWithForm";

export function ConfirmPopup({isOpen, onClose, onConfirm, card}){

    const handleDeleteClick =(e) => {
        e.preventDefault();
        onConfirm(card)
    }

    return(
        <PopupWithForm
            name="confirm-delete"
            title="Вы уверены?"
            isOpen={isOpen}
            onClose={onClose}
            onChange
            onSubmit={handleDeleteClick}
            btnText="Да"
        />
    )
}