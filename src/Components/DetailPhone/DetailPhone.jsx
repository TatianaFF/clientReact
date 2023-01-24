import React, {useEffect, useState} from 'react';
import {Button, Carousel, Descriptions, Image, Rate} from 'antd';
import {useLocation} from "react-router-dom";
import {HeartOutlined} from "@ant-design/icons";
import Requests from "../../API/Requests";

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
}

function transformPhone(idPhone, title, price, rating, cpu, camera, memory, ram, img, isDisabledButtonBuy, textButtonBuy, isDisabledFavorite, idUser) {
    return {
        idPhone,
        title,
        price,
        rating,
        cpu,
        camera,
        memory,
        ram,
        img,
        isDisabledButtonBuy,
        textButtonBuy,
        isDisabledFavorite,
        idUser
    }
}

function json_parse_phone_imgs(str) {
    return JSON.parse(str)
}

const DetailPhone = () => {
    let location = useLocation();
    const {idPhone} = location.state
    const [phoneState, setPhoneState] = useState(0)

    useEffect(() => {
        updateStatePhone()
        console.log('idPhone',idPhone)
    }, [])

    const fetchPhoneById = async (idPhone) => {
        const response = await Requests.getPhoneByIdRequest(idPhone)
        return await response.json()
    }

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
        updateStatePhone()
        return await response.json()
    }

    const createCart = async (cart) => {
        const response = await Requests.createCartRequest(cart)
        updateStatePhone()
        return await response.json()
    }

    const updateStatePhone = () => {
        Promise.all([fetchCartsByIdUser(), fetchPhoneById(idPhone), fetchFavoritesByIdUser()])
            .then(([carts, phone, favorites]) => {
                let isDisabledButtonBuy = false
                let isDisabledFavorite = false
                let textButtonBuy = "Купить"
                let idUser = 100
                const Images = json_parse_phone_imgs(phone.Images)
                carts.forEach(cartPhone => {
                    if (cartPhone.Phone.Id === idPhone) {
                        isDisabledButtonBuy = true
                        textButtonBuy = "В корзине"
                    }
                })
                favorites.forEach(favorite => {
                    if (favorite.Phone.Id === idPhone) {
                        isDisabledFavorite = true
                    }
                })
                const _phone = transformPhone(idPhone, phone.Title, phone.Price, phone.Rating, phone.Cpu, phone.Camera,
                    phone.Memory, phone.Ram, Images[0], isDisabledButtonBuy, textButtonBuy, isDisabledFavorite, idUser)

                console.log('_phone', _phone)

                setPhoneState(_phone)
            })
    }

    const onClickAddInFavoritePhone = () => {
        const newFavorite = {
            IdUser: phoneState.idUser,
            IdPhone: phoneState.idPhone
        }
        createFavorite(newFavorite)
    }

    const onClickBuyPhone = () => {
        const newCart = {
            IdUser: phoneState.idUser,
            IdPhone: phoneState.idPhone
        }
        createCart(newCart)
    }

    return (
        <div className="container_detail"
             style={{
                 background: '#ffffff',
                 borderRadius: 5,
                 margin: 15,
                 padding: 50,
                 textAlign: 'left',
                 minHeight: 690
             }}>
            <a style={{display: 'inline-block'}}>
                <Carousel dotPosition={"left"}
                          style={{
                              width: 200,
                              background: '#c6e2ff',
                              borderRadius: 5,
                              textAlign: 'center',
                              marginRight: 30
                          }}>
                    <div>
                        <Image
                            width={150}
                            alt="img"
                            style={contentStyle}
                            src={phoneState.img}
                        />

                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                </Carousel>
            </a>

            <a style={{display: 'inline-block', verticalAlign: 'top'}}>
                <a>
                    {phoneState.title}
                </a>
                <br/>
                <br/>
                <Rate defaultValue={phoneState.rating} disabled/>
            </a>

            <a style={{marginLeft: 50}}>
                <Button disabled={phoneState.isDisabledFavorite} type="primary" icon={<HeartOutlined/>} size={'large'}
                        style={{margin: 5}}
                        onClick={d => onClickAddInFavoritePhone()}/>
            </a>

            <a style={{display: 'inline-block', textAlign: 'center'}}>
                <b>
                    {phoneState.price} р.
                </b>
                <br/>
                <Button disabled={phoneState.isDisabledButtonBuy} type="primary" size={'large'} style={{margin: 5}}
                onClick={d => onClickBuyPhone()}>
                    {phoneState.textButtonBuy}
                </Button>
            </a>

            <div style={{marginTop: 50}}>
                <Descriptions title="Характеристики" column={{xxl: 2}}>
                    <Descriptions.Item>Модель процессора</Descriptions.Item>
                    <Descriptions.Item>{phoneState.cpu}</Descriptions.Item>

                    <Descriptions.Item>Камера</Descriptions.Item>
                    <Descriptions.Item>{phoneState.camera}</Descriptions.Item>

                    <Descriptions.Item>Оперативная память</Descriptions.Item>
                    <Descriptions.Item>{phoneState.ram}</Descriptions.Item>

                    <Descriptions.Item>Встроенная память</Descriptions.Item>
                    <Descriptions.Item>{phoneState.memory}</Descriptions.Item>
                </Descriptions>
            </div>

        </div>
    )
}

export default DetailPhone
