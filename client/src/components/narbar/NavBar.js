import React, {useContext} from 'react';
import {Context} from "../../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {Button} from "react-bootstrap";
import '../styles.css';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="white" variant="white">



                <header className="header">
                    <div className="container">
                        <div className="header_body">
                            <div className="header_logo">
                                <NavLink to='/' className="logo">
                                    <span className="USER">Delivro</span>
                                </NavLink>
                            </div>

                            <div className="header_items">
                                <div className="header_login">
                                    {user.isAuth ?
                                        <>
                                            <button className="login_button" id="myBtn_Admin" onClick={() => history.push(ADMIN_ROUTE)}>Админ панель
                                            </button>
                                            <button className="login_button" id="myBtn_Admin" onClick={() => logOut()}>Выход
                                            </button>
                                            <button className="header_basket" id="myBtn_card" onClick={() => history.push(BASKET_ROUTE)}>
                                                <i className='bx bxs-shopping-bag bx-sm'></i>
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button className="login_button" id="myBtn_registration" onClick={() => history.push(REGISTRATION_ROUTE)}>Регистрация <i
                                                className='bx bx-user-plus bx-sx'></i></button>
                                            <button className="login_button" id="myBtn_login" onClick={() => history.push(LOGIN_ROUTE)}>Авторизация <i
                                                className='bx bxs-user-check bx-sx'></i></button>
                                        </>
                                    }


                                </div>


                                <div id="myModal_registration" className="modal registration">
                                    <div className="modal-content">
                                        <div className="modal-header registration">
                                            <span className="close_registration">&times;</span>
                                            <h2>Регистрация</h2>
                                        </div>

                                        <div className="modal-body">
                                            <form>
                                                <input type="email" placeholder="E-mail" required/>
                                                    <input type="tel" placeholder="Телефон" required/>
                                                        <input type="text" placeholder="Логин" required/>
                                                            <input type="password" placeholder="Пароль" required/>
                                                                <input type="password" placeholder="Повторите пароль"
                                                                       required />
                                                                    <button>Зарегистрироваться</button>
                                            </form>
                                        </div>

                                        <div className="modal-footer registration">
                                            <span>Есть аккаунт?</span> <a href="javascript:login();">Авторизация</a><i
                                            className='bx bx-right-arrow-alt'></i>
                                        </div>
                                    </div>
                                </div>


                                <div id="myModal_login" className="modal login">
                                    <div className="modal-content">
                                        <div className="modal-header login">
                                            <span className="close_login">&times;</span>
                                            <h2>Авторизация</h2>
                                        </div>

                                        <div className="modal-body">
                                            <form>
                                                <input type="text" placeholder="Логин" required/>
                                                    <input type="password" placeholder="Пароль" required/>
                                                        <button>Войти</button>
                                            </form>
                                        </div>

                                        <div className="modal-footer login">
                                            <span>Нет аккаунта?</span> <a
                                            href="javascript:registration();">Регистрация</a><i
                                            className='bx bx-right-arrow-alt'></i>
                                        </div>
                                    </div>
                                </div>

                                <div className="header_basket" id="myBtn_card">

                                </div>

                                <div id="myModal_card" class="modal card">
                                    <div class="modal-content card">
                                        <div class="modal-header card">
                                            <span class="close_card">&times;</span>
                                            <h2>Ваши товары</h2>
                                        </div>

                                        <div class="modal-body">
                                            <div class="products">
                                                <img src="assets/img/hotter/french_omelette.png" alt="Французский омлет"/>
                                                <h5>Французский омлет</h5>

                                            </div>
                                        </div>

                                        <div class="modal-footer card">

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </header>





        </Navbar>

    );
});

export default NavBar;
