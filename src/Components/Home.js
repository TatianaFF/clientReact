import React,{Component} from 'react'
import {Image} from "antd";

function json_parse_phone_imgs(str) {
    return JSON.parse(str)
}

export class Home extends Component{
    render(){
        return(
            <div>
                <h1>Главная страница</h1>
                <h3>Тут должны быть баннеры </h3>
            </div>
        )
    }
}