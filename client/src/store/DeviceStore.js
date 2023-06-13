import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._restaurant = []
        this._restaurantTypes = []
        this._devices = []
        this._selectedType = {}
        this._selectedFoodType = {}
        this._selectedRestaurant = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setRestaurant(restaurant) {
        this._restaurant = restaurant
    }
    setDevices(devices) {
        this._devices = devices
    }

    setRestaurantTypes(types) {
        this._restaurantTypes = types
    }

    get restaurantTypes() {
        return this._restaurantTypes
    }

    get types() {
        return this._types
    }
    get restaurant() {
        return this._restaurant
    }



}
