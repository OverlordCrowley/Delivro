import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createRestaurant = async (type) => {
    const {data} = await $authHost.post('api/restaurant', type)
    return data
}

export const fetchRestaurant = async (text) => {
    if(text !== ""){
            const {data} = await $host.get('api/restaurant?name=' + text )
        return data
    }
    else{
        const {data} = await $host.get('api/restaurant')
        return data
    }
}


export const fetchOneRestaurant = async (id) => {
    try {
        const {data} = await $host.get('api/restaurant/' + id)
        return data
    }
   catch (e){
       console.log(e)
   }
}

export const createOrder = async ({phone, userId}) => {
    const {data} = await $authHost.post('api/order', {phone, userId})
    return data
}







