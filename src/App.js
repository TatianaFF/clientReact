import React from 'react'
import './App.css'
import {Home} from './Components/Home'
import LeftSiders from './Components/Siders/LeftSiders.jsx'
import Phones from "./Components/Phones/Phones.jsx"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Layout} from 'antd'
import TopHeader from './Components/Header/TopHeader.jsx'
import DetailPhone from "./Components/DetailPhone/DetailPhone.jsx"
import Favorite from "./Components/Favorite/Favorite.jsx"
import Profile from "./Components/Profile/Profile";
import Cart from "./Components/Cart/Cart"
import BottomHeader from "./Components/Header/BottomHeader.jsx"

const {Footer, Content} = Layout

function App() {

    return (
        <>
            <BrowserRouter>
                <Layout>
                    <TopHeader/>
                    <BottomHeader/>

                    <Layout>
                        <LeftSiders/>

                        <Content>
                            <div className="App container">

                                <Routes>
                                    <Route path='/' element={<Home/>}/>
                                    <Route path='/phone' element={<Phones/>}/>
                                    <Route path='/detail' element={<DetailPhone/>}/>
                                    <Route path='/favorite' element={<Favorite/>}/>
                                    <Route path='/favorite' element={<Favorite/>}/>
                                    <Route path='/cart' element={<Cart/>}/>
                                    <Route path='/profile' element={<Profile/>}/>
                                </Routes>
                            </div>
                        </Content>

                    </Layout>

                    <Footer style={{background: '#999999'}}>
                    </Footer>
                </Layout>
            </BrowserRouter>
        </>

    );
}

export default App;
