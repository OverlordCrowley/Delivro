import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { observer } from 'mobx-react-lite';
import { fetchBasketCards, fetchRestaurant, fetchTypes } from '../http/deviceAPI';
import jwt_decode from 'jwt-decode';
import BasketCard from '../components/basketCard/BasketCard';
import CreateOrder from "../components/modals/CreateOrder";

const Basket = observer(() => {
    const [cards, setCard] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderVisible, setOrderVisible] = useState(false)


    const updateTotalPrice = (price) => {
        setTotalPrice((prevTotal) => prevTotal + Number(price));
    };

    const updateTotalPriceMinus = (price) => {
        setTotalPrice((prevTotal) => prevTotal - Number(price));
    };


    useEffect(() => {
        fetchBasketCards({ userId: jwt_decode(localStorage.getItem('token')).id }).then((data) => {
            setCard(data);
        });
    }, []);

    useEffect(()=>{
            let arr = cards.reduce((sum, el) => {
            if (el.device.discount_price < el.device.price) {
                return sum + el.device.discount_price * el.count;
            } else {
                return sum + el.device.price * el.count;
            }
        }, 0);
        setTotalPrice(arr);
    }, [cards])

    return (
        <Container className="mt-3">
            <nav className="nav_menu" id="nav_menu">
                <div className="container">
                    <div className="row col-lg-8 col-md-12 col-xs-0 main_menu">
                        {cards && cards.length > 0 ? (
                            <>
                                <table>
                                    <thead>
                                    <tr>
                                        <th className="green">Изображение</th>
                                        <th className="green">Название</th>
                                        <th className="green">Количество</th>
                                        <th className="green">Цена за 1шт</th>
                                        <th className="green">Цена</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cards.map((el) => (
                                        <BasketCard
                                            key={el.id}
                                            id={el.id}
                                            count={el.count}
                                            device={el.device}
                                            updateTotalPricePlus={updateTotalPrice}
                                            updateTotalPriceMinus={updateTotalPriceMinus}
                                            devicePrice={el.device.price > el.device.discount_price ? el.count * el.device.discount_price : el.count * el.device.price}
                                        />
                                    ))}
                                    </tbody>
                                </table>

                                <p className="TotalPrice">Итоговая цена: {totalPrice}</p>
                                <br />
                                <button className="headerMap green OrderBtn" onClick={(e) => {
                                    setOrderVisible(true)
                                }}>
                                    Перейти к оформлению
                                </button>
                            </>
                        ) : (
                            <p style={{ color: '#fff', fontSize: 26 }}>У вас нет товаров в корзине</p>
                        )}
                    </div>
                </div>
            </nav>
            <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)}/>
        </Container>
    );
});

export default Basket;
