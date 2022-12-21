import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import { ShoppingOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined, AudioOutlined } from '@ant-design/icons';
import { Menu, Layout, Dropdown, Space, Typography, Input, Select, Button } from 'antd';
const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

const navItems = [
    {
        label: 'Каталог',
        key: 'catalog',
        icon: <ShoppingOutlined />,
    },
    {
        label: 'Избранное',
        key: 'favorite',
        icon: <HeartOutlined />
    },
    {
        label: 'Корзина',
        key: 'cart',
        icon: <ShoppingCartOutlined />
    },
    {
        label: 'Профиль',
        key: 'profile',
        icon: <UserOutlined />
    }
];

const onSearch = (value) => console.log(value);





const BottomHeader = (props) => {
    const [currentNavItem, setCurrentNavItem] = useState(navItems[0].label);
    const onClick = (e) => {
        // console.log('click ', e)
        setCurrentNavItem(e.key)
        props.setCurrentNavItemInApp(e.key)
    }

    return (
        <Header style={{ background: '#bf9c11' }}>
            <nav id="header-nav-search">
                <div id="header-bottom-container">
                    <div id="div-dropdown" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Link to="/category">
                            <Button
                                icon={<ShoppingOutlined />}
                                style={{
                                    background: '#bf9c11'
                                }}
                            >
                                Каталог
                            </Button>
                        </Link>

                        <Search
                            placeholder="input search text"
                            allowClear
                            onSearch={onSearch}
                            style={{
                                width: 200,
                            }}
                        />
                        <Menu onClick={onClick} selectedKeys={[currentNavItem]} mode="horizontal" items={navItems} style={{ background: '#bf9c11' }} />
                    </div>
                </div>
            </nav>
        </Header>
    )
}
export default BottomHeader