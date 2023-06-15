import React, {useContext, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchBasketCards, fetchRestaurant, fetchTypes} from "../http/deviceAPI";
import jwt_decode from "jwt-decode";
import BasketCard from "../components/basketCard/BasketCard";

const Basket = observer(() => {
    const {restaurant} = useContext(Context)
    const {user} = useContext(Context)
    let [cards, setCard] = useState([]);
    let [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        fetchBasketCards({'userId': jwt_decode(localStorage.getItem('token')).id}).then(data => {
            setCard(data)

            console.log(data)

        })
            .catch((error)=>{
                console.log(error)
            })
    }, [])

    return (
        <Container className="mt-3">
            <nav className="nav_menu" id="nav_menu">
                <div className="container">
                    <div className="row col-lg-8 col-md-12 col-xs-0 main_menu">
                        {cards && cards.length > 0 ?
                        <>
                            <table>
                                <thead>
                                <tr>
                                    <th className='green'>Изображение</th>
                                    <th className='green'>Название</th>
                                    <th className='green'>Количество</th>
                                    <th className='green'>Цена за 1шт</th>
                                    <th className='green'>Цена</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cards.map(el=>(
                                    <BasketCard device={el}/>
                                ))}
                                </tbody>
                            </table>
                            <button className={"headerMap green"} onClick={(e)=>{
                            }}>Перейти к оформлению</button>
                        </>
                            :
                            <p style={{color: '#fff', fontSize: 26}}>У вас нет товаров в корзине</p>
                        }


                    </div>
                </div>
            </nav>
        </Container>
            );
});

export default Basket;
