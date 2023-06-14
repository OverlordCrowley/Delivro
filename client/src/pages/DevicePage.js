import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {
    createBasketCard,
    fetchBasketCards,
    fetchRestaurantAllTypesById,
    fetchRestaurantTypesById
} from "../http/deviceAPI";
import {fetchOneRestaurant} from "../http/restaurantAPI";
import {Context} from "../index";
import jwt_decode from "jwt-decode";

const DevicePage = () => {
    const [restaurant, setRestaurant] = useState([]);
    const {id} = useParams()
    const {user} = useContext(Context)
    let [types, setTypes] = useState();
    let [allFoodTypes, setAllFoodTypes] = useState();
    let [header, setHeader] = useState([]);
    let [selectedType, setSelectedType] = useState({});


    useEffect(() => {
        fetchOneRestaurant(id).then(data => {
            setRestaurant(data);
        })
        fetchRestaurantTypesById(id).then(data => setTypes(data))
        fetchRestaurantAllTypesById(id).then(data => setAllFoodTypes(data))
    }, [])

    useEffect(()=>{
        let arr = [];

        for (let allFoodTypesKey in allFoodTypes) {
            if(!arr.includes(allFoodTypes[allFoodTypesKey].foodType.name)){
                arr.push({name: allFoodTypes[allFoodTypesKey].foodType.name,
                    id: allFoodTypes[allFoodTypesKey].foodType.id
                });
            }
        }
        setHeader(arr)
        setSelectedType([...arr][0])

    }, [allFoodTypes])


    return (
        <Container className="mt-3">

                <section className="lending">
                    <div className="container">
                        <img src={restaurant.img ? process.env.REACT_APP_API_URL + restaurant['img'] : ""}  className='restaurantMainImage'/>
                        <div className="row">
                            <div className="col-lg-4 col-md-7 col-xs-12">
                                <div className="card_inn">
                                    <div className="name">{restaurant ? restaurant['name'] : ""}</div>

                                    <div className="second" id="snack_container">
                                        <div className="price_european">₸₸₸ {types ? types.map(el=>(
                                            " • " + el.name
                                            )
                                        ) : ''}</div>
                                        <div className="time_delivery">{restaurant ? restaurant.time : ""} мин</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <nav className="nav_menu" id="nav_menu">
                    <div className="container">
                        <div className="row col-lg-8 col-md-12 col-xs-0 main_menu">
                            {[...header].map(el=>(
                                <button className={"headerMap" +  " " + (selectedType.id === el.id ? 'green': '')} onClick={(e)=>{
                                    setSelectedType(el)
                                }}>{el.name}</button>
                            ))}
                        </div>
                    </div>
                </nav>

                <main className="main_list">
                    <div className="container">
                        {allFoodTypes ? allFoodTypes.map(el=>(
                            el && selectedType && el.foodType.id === selectedType.id ?
                               <>
                                   <h2 className="main_title">{selectedType ? selectedType.name : ''}</h2>
                                   <div className="row">
                                       <div className="col-lg-6 col-md-12 col-xs-12" >
                                           <div className="card_main" id="myBtn_1"
                                                onClick={(e)=>{
                                                    if(user.isAuth){
                                                        createBasketCard({'userId': jwt_decode(localStorage.getItem('token')).id, 'deviceId': el.id})
                                                            .then((basketCard) => {
                                                            })

                                                    }
                                                    else{
                                                        alert('Необходимо авторизоваться')
                                                    }

                                                }}
                                           >
                                               <div className="left_card">
                                                   <p id='card_main' className="card_title">{el.name}</p>
                                                   <p className="card_description">
                                                       {el.composition}
                                                   </p>
                                                   <p className="card_price">
                                                       <span className="grams">{el.weight} г |</span>
                                                       {el['discount_price'] ? <span className="past_price">{el.price} Тг</span> : ''}
                                                       {el['discount_price']} Тг
                                                   </p>
                                               </div>

                                               <div className="right_card">
                                                   <img src={process.env.REACT_APP_API_URL + el.img}
                                                        alt={el.name}/>
                                               </div>
                                           </div>


                                       </div>

                                   </div>
                           </>
                               : ''
                        )) : ''}


                    </div>
                </main>

        </Container>
    );
};

export default DevicePage;
