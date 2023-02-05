import {useEffect, useState, useCallback} from 'react';
import {Header} from "./Header";
import {Main} from "./Main";
import {Footer} from "./Footer";
import {ImagePopup} from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {ConfirmPopup} from "./ConfirmPopup";
import {Login} from "./Login.js";
import {Register} from "./Register";
import {Route, Switch, Redirect, Link, useHistory} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import {InfoTooltip} from "./InfoTooltip";
import * as Auth from '../utils/Auth.js';
import sucсessIcon from "../images/sucсess.svg"
import failureIcon from "../images/failure.svg"


function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [cards, setCards] = useState([])
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''})
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        username: "", email: ""
    })

    const history = useHistory();

    // useEffect(() => {
    //     Promise.all([api.getDefaultCards(), api.getUserInfo()])
    //         .then(([data, dataUser]) => {
    //             setCards(data);
    //             setCurrentUser(dataUser)
    //         })
    //         .catch((err) => {
    //             console.log(`Ошибка ${err}`)
    //         })
    // }, [checkToken]);

       useEffect(() => {
           if(loggedIn){
               Promise.all([api.getDefaultCards(), api.getUserInfo()])
                   .then(([data, dataUser]) => {
                       {
                           setCards(data);
                           setCurrentUser(dataUser)
                       }
                   })
                   .catch((err) => {
                       console.log(`Ошибка ${err}`)
                   })
           }
    }, [loggedIn, history]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleConfirmClick() {
        setIsConfirmPopupOpen(true)
    }

    function handleImagePopupClick() {
        setIsImagePopupOpen(true)
    }

    function closeAllPopups() {
        setIsConfirmPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsImagePopupOpen(false)
        setSelectedCard({name: '', link: ''})
        setIsInfoTooltipPopupOpen(false)
    }

    function handleUpdateUser({name, about}) {
        api.patchUserInfo({name, about})
            .then(data => {
                setCurrentUser(data)
                closeAllPopups()
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    function handleUpdateAvatar(avatar) {
        api.patchAvatar(avatar)
            .then(data => {
                setCurrentUser(data)
                closeAllPopups()
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => (i._id === currentUser._id) || (i === currentUser._id));

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => (c._id === card._id) ? newCard : c));
        }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    function handleCardDelete(card) {
        api.deleteMyCard(card._id).then(() => {
            setCards(cards => cards.filter((c) => c._id !== card._id));
            closeAllPopups()
        }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    function handleAddPlaceSubmit({name, link}) {
        api.postCard({name, link})
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    const authenticate = useCallback((data) => {
        setLoggedIn(true)
        setCurrentUser(data)
    }, [setLoggedIn]);

    const register = useCallback(async ({password, email}) => {
        try {
            const res = await Auth.register({password, email});
            authenticate(res);
            setIsInfoTooltipPopupOpen(true)
            setUserData({password, email})
            return res;
        } catch {
            setIsInfoTooltipPopupOpen(true)
        }
    }, [[authenticate]]);

    const login = useCallback(async ({password, email}) => {
            try {
                const data = await Auth.authorize({password, email});
                if (!data) {
                    setIsInfoTooltipPopupOpen(true)
                }
                setUserData({password, email})
                setLoggedIn(true)
            } catch {
                setIsInfoTooltipPopupOpen(true)
                console.log("Неверное имя или пароль")
            }
        }
        //,[history]
    )

    const checkToken = useCallback(async () => {
        try {
            const user = await Auth.getContent()
            if (user) {
                setLoggedIn(true)
                setCurrentUser(user)
                setUserData(user);
                history.push('/')
            }
        } catch {
        } finally {
            setIsInfoTooltipPopupOpen(false)
        }
    }, [history, loggedIn]);

    // useEffect(() => {
    //     checkToken()
    // }, [checkToken])

    // const checkToken = useCallback(async () => {
    //     try {
    //         const user = await Auth.getContent()
    //         if (user) {
    //             setLoggedIn(true)
    //             setUserData(user);
    //             setCurrentUser(user)
    //             history.push('/')
    //         }
    //     } catch {
    //     } finally {
    //         setIsInfoTooltipPopupOpen(false)
    //     }
    // }, [history]);

    // useEffect(() => {
    //     checkToken()
    // }, [checkToken])

    function logOut() {
        Auth.logOut()
            .then((res) => {
                setLoggedIn(false)
                history.push('/sign-in')
            })
        setLoggedIn(false);
        setUserData({username: "", email: ""});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header loggedIn={loggedIn}
                        userData={userData}
                        logOut={logOut}
                />
                <Switch>
                    <ProtectedRoute
                        path="/mesto-react"
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onConfirmClick={handleConfirmClick}
                        onImageClick={handleImagePopupClick}
                        onCardClick={setSelectedCard}
                        cards={cards}
                        onCardLike={handleCardLike}
                        component={Main}
                    />
                    <Route path="/sign-in">
                        <Login isLoggedId={loggedIn}
                               onLogin={login}
                               onInfoTooltip={setIsInfoTooltipPopupOpen}
                        />
                    </Route>
                    <Route path="/sign-up">
                        <Register isLoggedId={loggedIn} onRegister={register}
                                  onInfoTooltip={setIsInfoTooltipPopupOpen}/>
                    </Route>
                    <Route>
                        {loggedIn ? <Redirect to="/mesto-react"/> : <Redirect to="/sign-up"/>}
                    </Route>
                </Switch>
                <Footer/>

                <ImagePopup
                    isOpen={isImagePopupOpen}
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                               onAddPlace={handleAddPlaceSubmit}/>

                <ConfirmPopup
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onConfirm={handleCardDelete}
                    card={selectedCard}
                />

                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    loggedIn={loggedIn}
                    successText="Вы успешно зарегистрировались!"
                    failureText="Что-то пошло не так! Попробуйте ещё раз."
                    sucсessIcon={sucсessIcon}
                    failureIcon={failureIcon}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
