import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const fetchRestaurant = async () => {
    const {data} = await $host.get('api/restaurant', )
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (restaurant) => {
    const {data} = await $host.get('api/device', {params: {
            restaurant
        }})
    return data
}

export const createRestaurantType = async ({name, restaurantId}) => {
    const {data} = await $authHost.post('api/restaurantType', {name, restaurantId})
    return data
}

export const fetchRestaurantTypes = async () => {
    const {data} = await $host.get('api/restaurantType')
    return data
}

export const fetchRestaurantTypesById = async (id) => {
    const {data} = await $host.get('api/restaurantType/'+id)
    return data
}

export const fetchRestaurantAllTypesById = async (id) => {
    const {data} = await $host.get('api/restaurantType/alltype/'+id)
    return data
}


export const createBasketCard = async ({userId, deviceId}) => {

    try{
        const {data} = await $authHost.post('api/basket', {userId, deviceId})
        return data
    }
    catch (e){
        alert("Товар уже был добавлен в корзину ранее")
    }
}

export const fetchBasketCards = async ({userId}) => {
        const {data} = await $host.post('api/basket/user', {userId})
        return data
}


