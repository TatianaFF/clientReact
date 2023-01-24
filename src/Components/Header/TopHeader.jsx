import React, { useState } from 'react';
import { DownOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Space, Select, Layout } from 'antd';

const { Header } = Layout;

const listCities = ["Красноярск", "Москва", "Владивосток", "Краснодар", "Санкт-Петербург", "Пермь"]
const options = listCities.map((value) => {
    return { value }
  })

const TopHeader = () => {
    return (
        <Header style={{ background: '#ffffff' }}>
          <div id="header-top-container">
              <div id="div-city-icon">
                <EnvironmentOutlined />
                <Select
                  defaultValue={listCities[0]}
                  style={{
                    width: 120,
                  }}
                  bordered={false}
                  options={options}
                />
              </div>
            </div>
        </Header>
    )
}

export default TopHeader