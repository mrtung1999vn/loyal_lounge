import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Loading from '../asset/animation/Loading'
import Body from './Main/Body/Body'
import Footer from './Main/Footer/Footer'
import Header from './Main/Header/Header'
import Navbar from './Main/Navbar/Navbar'

function Main() {
    // sidebar-mini sidebar-open
    
    return (
        <BrowserRouter>
            <Loading></Loading>
            <Header></Header>
            <Navbar></Navbar>
            <Body></Body>
            <Footer></Footer>
        </BrowserRouter>
    )
}

export default Main
