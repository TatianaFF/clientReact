
import React, { useState } from 'react';
import './App.css';
import { Home } from './Components/Home';
import { Department } from './Components/Department';
import Phones from './Components/Phones/Phones';
import LeftSiders from './Components/Siders/LeftSiders';
import Categories from './Components/Categories/Categories';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { ShoppingOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined, AudioOutlined } from '@ant-design/icons';
import { Menu, Layout, Dropdown, Space, Typography, Input, Select } from 'antd';
import TopHeader from './Components/Header/TopHeader'
import BottomHeader from './Components/Header/BottomHeader'
const { Header, Footer, Sider, Content } = Layout;

const listCategories = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
];

//BottomHeader
const setCurrentNavItemInApp = (props) => {
  console.log(props)
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <TopHeader />
          <BottomHeader setCurrentNavItemInApp={setCurrentNavItemInApp}/>

          <Layout>
            Sider
            <LeftSiders/>

            <Content>
              <div className="App container">
                <nav className="navbar navbar-expand-sm bg-light navbar-dark">
                  <ul className="navbar-nav">
                    <li className="nav-item- m-1">
                      <NavLink className="btn btn-light btn-outline-primary" to="/home">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item- m-1">
                      <NavLink className="btn btn-light btn-outline-primary" to="/department">
                        Department
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <Routes>
                  <Route path='/home' element={<Home />} />
                  <Route path='/department' element={<Department />} />
                  <Route path='/category' element={<Categories />} />
                </Routes>
              </div>
            </Content>
          </Layout>

          <Footer style={{ background: '#666666' }}>
            Footer
          </Footer>
        </Layout>
      </BrowserRouter>
    </>

  );
}

export default App;
