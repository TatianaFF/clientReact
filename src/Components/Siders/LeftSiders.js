import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { Component, useEffect, useState } from 'react';
import { variables } from '../../Variables';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
  ];



const LeftSiders = () => {
    const [categories, setcategories] = useState([]);

    const refreshListCategories = () => {
        console.log("refreshListCategories")
        fetch(variables.API_URL + 'category')
            .then(response => response.json())
            .then(data => setcategories(data))
    }

    // useEffect(
    //     refreshListCategories()
    // )

    const onClick = (e) => {
        console.log('click ', e);
    };

    return (
        // console.log("return", categories)
        <>
            <Sider>
                <Menu
                    onClick={onClick}
                    style={{
                      width: 256,
                    }}
                    mode="inline"
                    items={["item", ""]}
                />
            </Sider>
        </>
    )
}
export default LeftSiders