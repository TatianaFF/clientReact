import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Image, List, Rate} from "antd";
import {DeleteOutlined, HeartOutlined} from "@ant-design/icons";
import FormatPrice from "../../utils/FormatPrice";
import Requests from "../../API/Requests";

const phonesArray = []

function transformPhone(idFavorite, idPhone, title, price, rating, cpu, camera, memory, ram, img, isDisabledButtonBuy, textButton, idUser) {
    return {
        idFavorite, idPhone, title, price, rating, cpu, camera, memory, ram, img, isDisabledButtonBuy, textButton, idUser
    }
}

function json_parse_phone_imgs(str) {
    return JSON.parse(str)
}

const Favorite = (props) => {
    const [favoritePhones, setFavoritePhones] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        updateStateFavorites()
    }, [])

    const fetchCartsByIdUser = async (idUser) => {
        const response = await Requests.getCartsByIdUserRequest(idUser)
        return await response.json()
    }

    const fetchFavoritesByIdUser = async (idUser) => {
        const response = await Requests.getFavoritesByIdUserRequest(idUser)
        return await response.json()
    }

    const createCart = async (cart) => {
        const response = await Requests.createCartRequest(cart)
        updateStateFavorites()
        return await response.json()
    }

    const deleteFavorite = async (idFavorite) => {
        const response = await Requests.deleteFavoriteRequest(idFavorite)
        updateStateFavorites()
        return await response.json()
    }

    const updateStateFavorites = () => {
        Promise.all([fetchCartsByIdUser(), fetchFavoritesByIdUser()])
            .then(([carts, favorites]) => {
                const favoritesArray = []
                favorites.map(d => {
                    let isDisabledButtonBuy = false
                    let textButton = "Купить"
                    let idUser = 100
                    carts.forEach(cartPhone => {
                        if (cartPhone.Phone.Id === d.Phone.Id) {
                            isDisabledButtonBuy = true
                            textButton = "В корзине"
                        }
                    })
                    const Images = json_parse_phone_imgs(d.Phone.Images)
                    favoritesArray.push(transformPhone(d.Favorite.Id, d.Phone.Id, d.Phone.Title, d.Phone.Price, d.Phone.Rating,
                        d.Phone.Cpu, d.Phone.Camera, d.Phone.Memory, d.Phone.Ram, Images[0], isDisabledButtonBuy, textButton, idUser))
                })
                setFavoritePhones(favoritesArray)
            })
    }

    const onClickBasket = (idFavorite) => {
        deleteFavorite(idFavorite)

    }

    const onClickBuyPhone = (item) => {
        const newCart = {
            IdUser: item.idUser,
            IdPhone: item.idPhone
        }
        createCart(newCart)

    }


    const onClickTitlePhone = (idPhone) => {
        navigate("/detail", {state: {idPhone: idPhone}})
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
                dataSource={favoritePhones}
                renderItem={(item) => (
                    <List.Item key={item.title}
                               style={{background: '#ffffff', textAlign: "left", borderRadius: 5, padding: 15}}>
                        <div>
                            <a>
                                <Image
                                    style={{padding: 5}}
                                    width={150}
                                    alt="logo"
                                    src={item.img}/>
                            </a>

                            <a onClick={e => onClickTitlePhone(item.idPhone)}
                               style={{width: 500, display: 'inline-block', padding: 15,}}>
                                <a style={{
                                    textDecoration: 'none'
                                }}>
                                    {item.title}, {item.cpu}, {item.camera}, {item.memory}, {item.ram}
                                </a>
                                <br/>
                                <Rate defaultValue={item.rating} disabled/>
                            </a>

                            <a style={{display: 'inline-block', textAlign: 'center', fontSize: 15}}>
                                <b>
                                    {FormatPrice.formatPrice(item.price)} р.
                                </b>
                                <br/>
                                <Button disabled={item.isDisabledButtonBuy} type="primary" size={'large'} style={{margin: 5}}
                                        onClick={d => onClickBuyPhone(item)}>
                                    {item.textButton}
                                </Button>
                            </a>
                            <a style={{marginLeft: 100}}>
                                <Button type="primary" icon={<DeleteOutlined/>} size={'large'} style={{margin: 5}}
                                        onClick={c => onClickBasket(item.idFavorite)}/>
                            </a>
                        </div>
                    </List.Item>
                )}
            />

        </div>
    )

}

export default Favorite