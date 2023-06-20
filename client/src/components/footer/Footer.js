import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import '../styles.css';
import {observer} from "mobx-react-lite";
import {Link, useHistory} from 'react-router-dom';
import vk  from '../../assets/img/vk.svg';
import github  from '../../assets/img/github.svg';
import tg  from '../../assets/img/telegram.svg';
import ap  from '../../assets/img/app_store.svg';
import gp  from '../../assets/img/google_play.svg';
import arrow  from '../../assets/img/arrow.svg';
import CreateEmail from "../modals/CreateEmail";
import ChangeOrderState from "../modals/ChangeOrderState";

const Footer = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()


    let scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const [emailVisible, setEmailVisible] = useState(false)

    return (
        <footer className="footer">
            <div className="container">
                    <button className="button_up" onClick={scrollToTop} >
                        <img src={arrow}/>
                    </button>

                <div className="footer_logo">
                    <Link to="/" className="logo">
                        <span className="USER">Del</span>
                        <span className="EATS">ivro</span>
                    </Link>
                </div>
                <hr className="line"/>

                    <div className="links">
                        <div className="col-lg-4 col-md-4 col-xs-7">


                            <div className="hash">
                                <span className="hash_tag">#</span>Delivro
                            </div>

                            <div className="social">
                                <a href="https://vk.com" target="_blank">
                                    <img src={vk} alt="vk"/>
                                </a>
                                <a href="https://github.com" target="_blank">
                                    <img src={github} alt="github"/>
                                </a>
                                <a href="https://web.telegram.org" target="_blank">
                                    <img src={tg} alt="telegram"/>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-xs-12">
                            <div className="center_content">
                                <p><a href="#">Об UserEats</a></p>
                                <p><a href="#" onClick={() => setEmailVisible(true)}>Станьте партнёром по доставке</a></p>
                                <p><a href="#" onClick={() => setEmailVisible(true)}>Станьте партнёром-рестораном</a></p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-3 col-xs-12">
                            <div className="right_content">
                                <p><a href="#">Цены</a></p>
                                <p><a href="#">Помощь</a></p>
                                <p><a href="#">FAQs</a></p>
                            </div>
                        </div>
                    </div>

                    <hr className="line"/>

                        <div className="download">
                            <a href="https://apple.com" target="_blank">
                                <img src={ap} alt="App Store"/>
                            </a>
                            <a href="https://play.google.com" target="_blank">
                                <img src={gp} alt="Google Play"/>
                            </a>
                        </div>

                        <hr className="line"/>

                            <div className="privacy">
                                <p><a href="#">© 2017 User Technologies Inc</a></p>
                                <p><a href="#">Обработка персональных данных</a></p>
                                <p><a href="#">Пользовательское соглашение</a></p>
                            </div>
            </div>

            <CreateEmail show={emailVisible} onHide={() => setEmailVisible(false)}/>
        </footer>

    );
});

export default Footer;
