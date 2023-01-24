import React, {useEffect, useState} from 'react';
import {Button, Image, List, Rate} from "antd";
import {HeartOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import FormatPrice from "../../utils/FormatPrice";
import Requests from "../../API/Requests";

function transformPhone(idPhone, title, price, rating, cpu, camera, memory, ram, img, isDisabledButton, textButton, idUser, isDisabledFavorite) {
    return {
        idPhone, title, price, rating, cpu, camera, memory, ram, img, isDisabledButton, textButton, idUser, isDisabledFavorite
    }
}

function json_parse_phone_imgs(str) {
    return JSON.parse(str)
}


const Phones = () => {
    const [phones, setPhones] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        updateStatePhones()

    }, [])

    const fetchPhones = async () => {
        const response = await Requests.getPhonesRequest()
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

    const createCart = async (cart) => {
        const response = await Requests.createCartRequest(cart)
        updateStatePhones()
        return await response.json()
    }

    const createFavorite = async (favorite) => {
        const response = await Requests.createFavoriteRequest(favorite)
        updateStatePhones()
        return await response.json()
    }

    const onClickBuyPhone = (item) => {
        const newCart = {
            IdUser: item.idUser,
            IdPhone: item.id,
            // Count: 1
        }
        createCart(newCart)
    }

    const onClickAddInFavoritePhone = (item) => {
        const newFavorite = {
            IdUser: item.idUser,
            IdPhone: item.id
        }
        createFavorite(newFavorite)
    }

    const onClickTitlePhone = (idPhone) => {
        console.log('click Detail ', idPhone)
        navigate("/detail", {state: {idPhone: idPhone}})
    }

    const updateStatePhones = () => {
        Promise.all([fetchCartsByIdUser(), fetchPhones(), fetchFavoritesByIdUser()])
            .then(([carts, phones, favorites]) =>{
                const phonesArray = []
                phones.map(d => {
                    let isDisabledButton = false
                    let isDisabledFavorite = false
                    let textButton = "Купить"
                    let idUser = 100
                    carts.forEach(cartPhone => {
                        if(cartPhone.Phone.Id === d.Id) {
                            isDisabledButton = true
                            textButton = "В корзине"
                        }
                    })
                    favorites.forEach(favorite => {
                        if(favorite.Phone.Id === d.Id) {
                            console.log(favorite)
                            isDisabledFavorite = true
                        }
                    })
                    const Images = json_parse_phone_imgs(d.Images)
                    phonesArray.push(transformPhone(d.Id, d.Title, d.Price, d.Rating, d.Cpu, d.Camera, d.Memory, d.Ram, Images[0], isDisabledButton, textButton, idUser, isDisabledFavorite))
                })
                console.log('phonesArray', phonesArray)
                setPhones(phonesArray)
            })
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
                dataSource={phones}
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
                                <br/>
                                <Rate defaultValue={item.rating} disabled/>
                            </a>


                            <a style={{marginLeft: 50}}>
                                <Button disabled={item.isDisabledFavorite} type="primary" icon={<HeartOutlined/>} size={'large'} style={{margin: 5}}
                                onClick={d => onClickAddInFavoritePhone(item)}/>
                            </a>

                            <a style={{display: 'inline-block', textAlign: 'center', fontSize: 15}}>
                                <b>
                                    {FormatPrice.formatPrice(item.price)} р.
                                </b>
                                <br/>
                                <Button disabled={item.isDisabledButton} type="primary" size={'large'} style={{margin: 5}}
                                        onClick={d => onClickBuyPhone(item)}>
                                    {item.textButton}
                                </Button>
                            </a>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default Phones