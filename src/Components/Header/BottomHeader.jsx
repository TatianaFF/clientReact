import React, {useState} from 'react';
import { HeartOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import {Menu, Layout, Input} from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import {useNavigate} from "react-router-dom";

const {Search} = Input;
const {Header} = Layout;

const navItems = [
    {
        label: 'Избранное',
        key: 'favorite',
        icon: <HeartOutlined/>
    },
    {
        label: 'Корзина',
        key: 'cart',
        icon: <ShoppingCartOutlined/>
    },
    {
        label: 'Профиль',
        key: 'profile',
        icon: <UserOutlined/>
    }
];

const onSearch = (value) => console.log(value);


const BottomHeader = () => {
    const [currentNavItem, setCurrentNavItem] = useState();
    const navigate = useNavigate()

    const onClickItemMenu = (curItem) => {
        console.log('click BottomHeader ', curItem.key)
        // setCurrentNavItem(curItem.key)
        // props.currentNavItemInApp(curItem.key)

        navigate(curItem.key, { state: { curItemKey: curItem.key }})
    };

    return (
        <Header style={{background: '#ffffff'}}>
            <nav id="header-nav-search">
                <div id="header-bottom-container">
                    <div id="div-dropdown" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                        <Search
                            placeholder="Поиск в разработке "
                            allowClear
                            onSearch={onSearch}
                            style={{
                                width: 600,
                            }}
                        />
                        <Menu onClick={onClickItemMenu} selectedKeys={[currentNavItem]} mode="horizontal" items={navItems}/>
                    </div>
                </div>
            </nav>
        </Header>
    )
}
export default BottomHeader