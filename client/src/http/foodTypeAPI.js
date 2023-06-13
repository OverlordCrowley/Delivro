import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";



export const createFoodType = async (formdata) => {
    const {data} = await $authHost.post('api/foodType', formdata)
    return data
}

export const fetchFoodTypes = async (id) => {
    if(id){
        const {data} = await $host.get('api/foodType'  + id)
        return data
    }
    else{
        const {data} = await $host.get('api/foodType')
        return data
    }
}

