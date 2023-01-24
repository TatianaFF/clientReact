import React from 'react';
import {variables} from "../Variables";

const Requests = {
    getPhonesRequest: async () => {
        return await fetch(variables.API_URL + 'phone')
    },

    getCartsByIdUserRequest: async (idUser) => {
        try{
            return  await fetch(variables.API_URL + 'cart')
        }catch (e){
            return 'Ошибка: ' + e
        }
    },

    createCartRequest: async (cart) => {
        try {
            const response = await fetch(variables.API_URL + 'cart', {
                method: 'POST',
                body: JSON.stringify(cart),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return await response
        } catch (e) {
            return 'Ошибка: ' + e
        }
    },

    createFavoriteRequest: async (favorite) => {
        try {
            const response = await fetch(variables.API_URL + 'favorite', {
                method: 'POST',
                body: JSON.stringify(favorite),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return await response
        } catch (e) {
            return 'Ошибка: ' + e
        }
    },

    deleteCartRequest: async (idCart) => {
        try {
            const response = await fetch(variables.API_URL + 'cart' + '/' + idCart, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return await response
        } catch (e) {
            return 'Ошибка: ' + e
        }
    },

    updateCartRequest: async (_cart) => {
        try {
            const response = await fetch(variables.API_URL + 'cart', {
                method: 'PUT',
                body: JSON.stringify(_cart),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return await response
        } catch (e) {
            console.error('Ошибка: ', e)
        }
    },

    deleteFavoriteRequest: async (idFavorite) => {
        try {
            const response = await fetch(variables.API_URL + 'favorite' + '/' + idFavorite, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return await response
        } catch (e) {
            return 'Ошибка: ' + e
        }
    },

    getFavoritesByIdUserRequest: async (idUser) => {
        try{
            return  await fetch(variables.API_URL + 'favorite')
        }catch (e){
            return 'Ошибка: ' + e
        }
    },

    getPhoneByIdRequest: async (idPhone) => {
        try{
            return  await fetch(variables.API_URL + 'phone' + '/' + idPhone)
        }catch (e){
            return 'Ошибка: ' + e
        }
    },

    getCategoriesRequest: async () => {
        try{
            return  await fetch(variables.API_URL + 'category')
        }catch (e){
            return 'Ошибка: ' + e
        }
    }
}

export default Requests