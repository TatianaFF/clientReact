import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Image, InputNumber, List} from "antd";
import {HeartOutlined, DeleteOutlined} from "@ant-design/icons";
import FormatPrice from "../../utils/FormatPrice";
import Requests from "../../API/Requests";

const transformPhone = (idCart, idPhone, idUser, title, price, rating, cpu, camera, memory, ram, img, count, isDisabledFavorite) => {
    return {
        idCart, idPhone, idUser, title, price, rating, cpu, camera, memory, ram, img, count, isDisabledFavorite
    }
}

function json_parse_phone_imgs(str) {
    return JSON.parse(str)
}

const Cart = () => {
    const [cartPhones, setCartPhones] = useState([])
    const [finalSum, setFinalSum] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        updateStateCarts()
    }, [])

    const fetchCartsByIdUser = async (idUser) => {
        const response = await Requests.getCartsByIdUserRequest(idUser)
        return await response.json()
    }

    const fetchFavoritesByIdUser = async (idUser) => {
        const response = await Requests.getFavoritesByIdUserRequest(idUser)
        return await response.json()
    }

    const createFavorite = async (favorite) => {
        const response = await Requests.createFavoriteRequest(favorite)
        updateStateCarts()
        return await response.json()
    }

    const updateCart = async (_cart) => {
        const response = await Requests.updateCartRequest(_cart)
        updateStateCarts()
        return await response.json()
    }

    const deleteCart = async (idCart) => {
        const response = await Requests.deleteCartRequest(idCart)
        updateStateCarts()
        return await response.json()
    }

    const updateStateCarts = () => {
        Promise.all([fetchCartsByIdUser(), fetchFavoritesByIdUser()])
            .then(([carts, favorites]) =>{
                const cartsArray = []
                carts.map(d => {
                    let isDisabledFavorite = false
                    let idUser = 100
                    favorites.forEach(favorite => {
                        if(favorite.Phone.Id === d.Phone.Id) {
                            isDisabledFavorite = true
                        }
                    })
                    const Images = json_parse_phone_imgs(d.Phone.Images)
                    cartsArray.push(transformPhone(d.Cart.Id, d.Phone.Id, idUser, d.Phone.Title, d.Phone.Price, d.Phone.Rating,
                        d.Phone.Cpu, d.Phone.Camera, d.Phone.Memory, d.Phone.Ram, Images[0], d.Cart.Count, isDisabledFavorite))
                })
                setCartPhones(cartsArray)
                updateStateFinalSum(carts)
            })
    }

    const updateStateFinalSum = (crt) => {
        let sum = 0
        crt.forEach((cartPhone) => {
            sum += cartPhone.Cart.Count * cartPhone.Phone.Price
        })
        setFinalSum(sum)
    }

    const onClickAddInFavoritePhone = (item) => {
        const newFavorite = {
            IdUser: item.idUser,
            IdPhone: item.idPhone
        }
        createFavorite(newFavorite)
    }

    const onClickTitlePhone = (idPhone) => {
        navigate("/detail", {state: {idPhone: idPhone}})
    }

    const onChangeInputCountPhone = (item, newCount) => {
        const newCartToUpdate = {
            Id: item.idCart,
            IdUser: item.idUser,
            IdPhone: item.idPhone,
            Count: newCount
        }
        updateCart(newCartToUpdate)
    }

    const onClickBasket = async (idCart) => {
        deleteCart(idCart)
    }


    return (
        <div style={{
            margin: 15,
        }}>
            <List
                grid={{
                    gutter: 16,
                    column: 1,
                }}
                dataSource={cartPhones}
                renderItem={(item) => (
                    <List.Item key={item.title}
                               style={{background: '#ffffff', textAlign: "left", borderRadius: 5, padding: 15}}>
                        <div style={{verticalAlign: 'center'}}>
                            <a>
                                <Image
                                    style={{padding: 5}}
                                    width={150}
                                    alt="logo"
                                    src={item.img}/>
                            </a>

                            <a onClick={e => onClickTitlePhone(item.idPhone)}
                               style={{width: 500, display: 'inline-block', padding: 15, textDecoration: 'none',}}>
                                {item.title}, {item.cpu}, {item.camera}, {item.memory}, {item.ram}
                            </a>


                            <a style={{marginLeft: 50}}>
                                <Button disabled={item.isDisabledFavorite} type="primary" icon={<HeartOutlined/>} size={'large'} style={{margin: 5}}
                                        onClick={d => onClickAddInFavoritePhone(item)}/>

                            </a>

                            <a style={{marginLeft: 50, textAlign: 'center'}}>
                                <InputNumber min={1} defaultValue={item.count}
                                             onChange={(count) => onChangeInputCountPhone(item, count)} size={'large'}/>
                            </a>

                            <b style={{marginLeft: 50, textAlign: 'center', fontSize: 15}}>
                                {FormatPrice.formatPrice(item.price * item.count)} р.
                            </b>

                            <a style={{marginLeft: 100}}>
                                <Button type="primary" icon={<DeleteOutlined/>} size={'large'} style={{margin: 5}}
                                        onClick={c => onClickBasket(item.idCart)}/>
                            </a>
                        </div>
                    </List.Item>
                )}
            />

            <div style={{textAlign: 'left', marginTop: 20, marginBottom: 100}}>
                <b style={{fontSize: 30}}>
                    Итого: {FormatPrice.formatPrice(finalSum)} р.
                </b>
                <div>
                    <Button type="primary" size={'large'} style={{marginTop: 15}}>
                        Перейти к оформлению
                    </Button>
                </div>
            </div>

        </div>
    )

}

export default Cart