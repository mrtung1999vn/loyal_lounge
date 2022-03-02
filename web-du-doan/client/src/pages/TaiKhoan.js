import MUIDataTable from 'mui-datatables';
import React from 'react'
import { Link } from 'react-router-dom';
import func from '../asset/func';
import host from '../service/host';
import Default from './Default';
import ListBasketball from './TaiKhoan/ListBasketBall';
import ListFootBall from './TaiKhoan/ListFootBall';

// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


function TaiKhoan() {

    const [email, setemail] = React.useState('')
    const [mat_khau, setmat_khau] = React.useState('')

    const [otp, setotp] = React.useState('')

    const [coin,setCoin] = React.useState(0)
    const [User,setUser] = React.useState([])
    // const [User,setUser] = React.useState([])

    const defaultCointEmail = async (email)=>{
        try {
            const res = await fetch(host.WebDuDoanCoinEmail+`/${email}`)
            const content = await res.json()

            if( content.status === 1 ){
                let JsonData = []
                let JsonDataUser = []
                JsonData = func.DecodeJson_RESPONSE( content.data )
                JsonDataUser = func.DecodeJson_RESPONSE( content.dataUser )
                console.log(  func.DecodeJson_RESPONSE( content.data ) )
                if( JsonData.length > 0 &&  JsonDataUser.length >0 ){
                    setCoin( JsonData[0].coin )
                    setUser(  JsonDataUser )
                }
            }
        } catch (error) {
            
        }
    }

    const onClickDangNhap = async () => {
        try {
            var OTP = Math.floor(100000 + Math.random() * 900000)
            if (email === '') {
                alert('User has not entered email!')
            } else if (mat_khau === '') {
                alert('User has not entered password!')
            } else {
                var subject = ''
                var text = `OTP is ${OTP}`
                const res = await fetch(host.WebDuDoanDangNhap, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, mat_khau, subject, text })
                })
                const content = await res.json()

                if (content.status === 1) {

                    defaultCointEmail( email )

                    window.localStorage.setItem('__dir', content.data)

                    alert('Login Success')

                } else {
                    alert('Login failed')
                }
            }
        } catch (error) {

        }
    }

    // console.log()
    const [ListDataFootball,setListDataFootball] = React.useState([])
    const defaultData = async ()=>{
        try {
            const res = await fetch(host.WebDuDoanMatch)
            const content = await res.json()

            if( content.status === 1 ){
                setListDataFootball( func.DecodeJson_RESPONSE( content.newDataFooball ) )
            }
        } catch (error) {
            
        }
    }

    const onClickExit = async()=>{
        try {
            window.localStorage.clear()
            setUser([])
            alert('Exit success!')
        } catch (error) {
            
        }
    }





    React.useEffect(async () => {
        try {
            defaultData()
            
            if( window.localStorage.getItem('__dir') !== null || window.localStorage.getItem('__dir') !== undefined || window.localStorage.getItem('__dir') !== '' ){
                setUser( 
                  func.DecodeJson_RESPONSE( window.localStorage.getItem('__dir') )
                )
            }
            let newData = []
            newData = func.DecodeJson_RESPONSE( window.localStorage.getItem('__dir') )
            defaultCointEmail( newData[0]?.email )

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.log(error)
        }
    }, [])



    // Table
    

    // 
    if (User.length > 0) {
        return (
            <React.Fragment>
                <div>
                    {/* header begin */}
                    <div className="header">
                        <div id="navbar" className="header-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                        <div className="row">
                                            <div className="col-xl-12 col-lg-12 col-6 d-xl-block d-lg-block d-flex align-items-center">
                                                <div className="logo">
                                                    <a href="./">
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/471.png?alt=media&token=86cc07ae-d8e7-427f-9f8f-2353466e0393" alt="logo" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-6 d-xl-none d-lg-none d-block">
                                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                                    <i className="fas fa-bars" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-lg-9">
                                        <div className="mainmenu">
                                            <nav className="navbar navbar-expand-lg">
                                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                                    <ul className="navbar-nav ml-auto">
                                                        
                                                    <Default email={User[0]?.email} coin={coin}></Default>

                                                    </ul>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* header end */}
                    {/* breadcrumb begin */}
                    <div className="breadcrumb-bettix register-page">

                    </div>
                    {/* breadcrumb end */}
                    {/* login begin */}
                    <div className="login">
                        <div className="">
                            {/* betting begin */}
                            <div className="betting" id="in_play">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-xl-6 col-lg-8 col-md-8">
                                            <div className="section-title">
                                                <h2>Live Match</h2>
                                                <p>Lvaction shows real time odds for betting with the higher stakes you can get. We place your bets in various bMakers to do highest liquidity</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="betting-table">
                                        <div className="row">
                                            <div className="col-xl-2 col-lg-2">
                                                <div className="bett-menu">
                                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                        <li className="nav-item">
                                                            <a className="nav-link active" id="football-tab" data-toggle="tab" href="#football" role="tab" aria-controls="football" aria-selected="false">
                                                                <i className="flaticon-football" />
                                                                <span className="text">
                                                                    football
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="basketball-tab" data-toggle="tab" href="#basketball" role="tab" aria-controls="basketball" aria-selected="false">
                                                                <i className="flaticon-basketball-ball-variant" />
                                                                <span className="text">
                                                                    Basketball
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-xl-10 col-lg-10">
                                                <div className="tab-content bet-tab-content" id="myTabContent">
                                                    <div className="tab-pane fade show active" id="football" role="tabpanel" aria-labelledby="football-tab">
                                                        <div className="sport-content-title">
                                                            <h3>Football
                                                                <span className="sport-content-conter">[3]</span>
                                                            </h3>
                                                        </div>
                                                        <div className="sports-list">
                                                            <iframe src='https://www.goaloo1.com/free/FreeSoccer/'
                                                                style={{ width: '100%', height: '100vh' }}>

                                                            </iframe>

                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="basketball" role="tabpanel" aria-labelledby="basketball-tab">
                                                        <div className="sport-content-title">
                                                            <h3>basketball
                                                                <span className="sport-content-conter">[3]</span>
                                                            </h3>
                                                        </div>

                                                        <div className="">
                                                            <iframe src='https://www.goaloo1.com/free/FreeBasketball/?t=basketball'
                                                                style={{ width: '100%', height: '100vh' }}>

                                                            </iframe>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* betting end */}
                            {/* upcoming match begin */}
                            <div className="betting" id="in_play">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-xl-6 col-lg-8 col-md-8">
                                            <div className="section-title">
                                                <h2>Predict &amp; Playing Now</h2>
                                                <p>Lvaction shows real time odds for betting with the higher stakes you can get. We place your bets in various bMakers to do highest liquidity</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="betting-table">
                                        <div className="row">
                                            <div className="col-xl-2 col-lg-2">
                                                <div className="bett-menu">
                                                    <ul className="nav nav-tabs" id="myTab" role="tablist">

                                                        <li className="nav-item">
                                                            <a className="nav-link active" id="football-tab" data-toggle="tab" href="#football-01" role="tab" aria-controls="football-01" aria-selected="true">
                                                                <i className="flaticon-football" />
                                                                <span className="text">
                                                                    football
                                                                </span>
                                                            </a>
                                                        </li>

                                                        <li className="nav-item">
                                                            <a className="nav-link" id="basketball-tab" data-toggle="tab" href="#basketball-01" role="tab" aria-controls="basketball-01" aria-selected="false">
                                                                <i className="flaticon-basketball-ball-variant" />
                                                                <span className="text">
                                                                    Basketball
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-xl-10 col-lg-10">
                                                <div className="tab-content bet-tab-content" id="myTabContent">

                                                    <div className="tab-pane fade show active" id="football-01" role="tabpanel" aria-labelledby="football-tab">
                                                        <div className="sport-content-title">
                                                            <h3>Football
                                                                <span className="sport-content-conter">[{ListDataFootball.length}]</span>
                                                            </h3>
                                                        </div>
                                                            <ListFootBall ListDataFootball={ListDataFootball}></ListFootBall>
                                                    </div>

                                                    <div className="tab-pane fade" id="basketball-01" role="tabpanel" aria-labelledby="basketball-tab">
                                                        <div className="sport-content-title">
                                                            <h3>basketball
                                                                <span className="sport-content-conter">[3]</span>
                                                            </h3>
                                                        </div>
                                                            <ListBasketball></ListBasketball>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* upcoming match end */}
                        </div>
                    </div>
                    {/* login end */}
                {/* footer begin */}
                <div className="footer" id="contact">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-4 col-lg-5 col-md-10">
                                <div className="about-widget">
                                    <a className="logo" href="./">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/471.png?alt=media&token=86cc07ae-d8e7-427f-9f8f-2353466e0393" alt="" />
                                    </a>
                                    <p>Lvaction offers you all the best online prediction from every corner of the planet with thousands of online prediction markets.</p>
                                    <div className="social">
                                        <ul>
                                            <li>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-instagram" />
                                                </a>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-pinterest-p" />
                                                </a>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="support">
                                        <ul>
                                            <li>
                                                <span className="icon">
                                                    <img src="assets/img/svg/email.svg" alt="" />
                                                </span>
                                                <span className="text">
                                                    <span className="title">Mail Us</span>
                                                    <span className="descr">don't@reply.com</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon">
                                                    <img src="assets/img/svg/phone-call.svg" alt="" />
                                                </span>
                                                <span className="text">
                                                    <span className="title">Get In Touch</span>
                                                    <span className="descr">+88 015 00 00 00</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3">
                                <div className="useful-links">
                                    <h3>Connect With Us</h3>
                                    <ul>
                                        <Link to="/"><a style={{color:'white'}}>Home</a></Link>
                                        <br></br>
                                        <br></br>
                                        <Link to="/Login"><a style={{color:'white'}}>Login</a></Link>
                                        <br></br>
                                        <br></br>
                                        <Link to="/Login"><a style={{color:'white'}}>Betting</a></Link>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-3">
                                <div className="useful-links">
                                    <h3>About Us</h3>
                                    <ul>
                                    <label style={{color:'white',textAlign:'left'}}>Whether you're a sports bettor, a horse racing fan, or casino player, lvaction is your number one source of online gambling entertainment. From our industry-leading odds, world-class sportsbook and feature-rich casino games, to our fully-loaded racebook, we've been providing players from around the world with an unparalleled gaming experience for several years. </label>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-3 col-md-3">
                                <div className="useful-links">
                                    <h3>Why Play With Us</h3>
                                    <ul>
                                    <label style={{color:'white',textAlign:'left'}}>lvaction is the gold standard in online gaming, dedicated to provide its customers with a rewarding, exciting and secure environment for online wagering. With top-of-the-line software and unique gaming opportunities, lvaction takes its players to the next level in online gambling. </label>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-3">
                                <div className="useful-links">
                                    <h3>Our Services</h3>
                                    <ul>
                                    <label style={{color:'white',textAlign:'left'}}>Our Sportsbook page offers the best odds in all major sports and leagues including the NBA, NHL, MLB, NCAA basketball and football, golf, soccer, boxing and much more.

                                    Our Racebook page is the best in the world, with up-to-post-time odds and the most major/minor track listings offered in the industry.</label>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="payment-method">
                                            <h6 className="payment-method-title">
                                                Payment methods are We accept
                                            </h6>
                                            <div className="all-method">
                                                <div className="single-method">
                                                    <img src="assets/img/brand-1.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-2.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-3.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-4.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-5.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-5.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* footer end */}
                {/* notes begin */}
                <div className="notes">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10 col-lg-10">
                                Lvaction is a sports prediction html template, published by autworks throgh envato marketplace. You can use this template on any kind of sports prediction in the world. as like football, baseball, soccer, cricket etc. all rights reserved by autworks © 2020.
                            </div>
                        </div>
                    </div>
                </div>
                {/* notes end */}
                {/* copyright footer begin */}
                <div className="copyright-footer">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-5 col-md-6 col-lg-6 d-lg-flex d-lg-flex d-block align-items-center">
                                <p className="copyright-text">
                                    <a href="#">Lvaction</a> © 2022. PRIVACY POLICY
                                </p>
                            </div>
                            <div className="text-right col-md-6 col-xl-4 col-lg-6 d-xl-flex d-lg-flex d-block align-items-center">
                                <p className="copyright-text">
                                    Powerd By <a href="AnonymousLink">Anonymous</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* copyright footer end */}
                </div>


            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <div>
                    {/* header begin */}
                    <div className="header">
                        <div id="navbar" className="header-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                        <div className="row">
                                            <div className="col-xl-12 col-lg-12 col-6 d-xl-block d-lg-block d-flex align-items-center">
                                                <div className="logo">
                                                    <a href="./">
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/471.png?alt=media&token=86cc07ae-d8e7-427f-9f8f-2353466e0393" alt="logo" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-6 d-xl-none d-lg-none d-block">
                                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                                    <i className="fas fa-bars" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-lg-9">
                                        <div className="mainmenu">
                                            <nav className="navbar navbar-expand-lg">
                                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                                    <ul className="navbar-nav ml-auto">
                                                        <Link className="nav-item" to='/'>
                                                            <a className="nav-link">Home</a>
                                                        </Link>
                                                        <Link className="nav-item" to='/Login'>
                                                            <a className="nav-link">Login</a>
                                                        </Link>
                                                        {/* <li className="nav-item">
                                                            <a className="nav-link" href="contact.html">Contact US</a>
                                                        </li> */}
                                                    </ul>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* header end */}
                    {/* breadcrumb begin */}
                    <div className="breadcrumb-bettix register-page">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-7 col-lg-7">
                                    <div className="breadcrumb-content">
                                        <h2>Login</h2>
                                        <ul>
                                            <li>
                                                <a href="#">Home</a>
                                            </li>
                                            <li>
                                                <a href="#">Pages</a>
                                            </li>
                                            <li>
                                                Login
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* breadcrumb end */}
                    {/* login begin */}
                    <div className="login">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-6 col-lg-6 col-md-8">
                                    <div className="section-title">
                                        <h2>Login To Place bets</h2>
                                        <p>Bettix is the most advanced sports trading &amp; affialiate platform and highest stakes across multiple bookmakers and exchanges.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-lg-5 col-md-6">
                                    <div className="login-form">
                                        <input type="email" placeholder="Enter Your Mail"
                                            onChange={e => setemail(e.target.value)}
                                        />
                                        <input type="password" placeholder="Enter Your Password"
                                            onChange={e => setmat_khau(e.target.value)}
                                        />
                                        <button onClick={() => onClickDangNhap()}>Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* login end */}
                {/* footer begin */}
                <div className="footer" id="contact">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-4 col-lg-5 col-md-10">
                                <div className="about-widget">
                                    <a className="logo" href="./">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/471.png?alt=media&token=86cc07ae-d8e7-427f-9f8f-2353466e0393" alt="" />
                                    </a>
                                    <p>Lvaction offers you all the best online prediction from every corner of the planet with thousands of online prediction markets.</p>
                                    <div className="social">
                                        <ul>
                                            <li>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-instagram" />
                                                </a>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-pinterest-p" />
                                                </a>
                                                <a href="#" className="social-icon">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="support">
                                        <ul>
                                            <li>
                                                <span className="icon">
                                                    <img src="assets/img/svg/email.svg" alt="" />
                                                </span>
                                                <span className="text">
                                                    <span className="title">Mail Us</span>
                                                    <span className="descr">don't@reply.com</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="icon">
                                                    <img src="assets/img/svg/phone-call.svg" alt="" />
                                                </span>
                                                <span className="text">
                                                    <span className="title">Get In Touch</span>
                                                    <span className="descr">+88 015 00 00 00</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3">
                                <div className="useful-links">
                                    <h3>Connect With Us</h3>
                                    <ul>
                                        <Link to="/"><a style={{color:'white'}}>Home</a></Link>
                                        <br></br>
                                        <br></br>
                                        <Link to="/Login"><a style={{color:'white'}}>Login</a></Link>
                                        <br></br>
                                        <br></br>
                                        <Link to="/Login"><a style={{color:'white'}}>Betting</a></Link>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-3">
                                <div className="useful-links">
                                    <h3>About Us</h3>
                                    <ul>
                                    <label style={{color:'white',textAlign:'left'}}>Whether you're a sports bettor, a horse racing fan, or casino player, lvaction is your number one source of online gambling entertainment. From our industry-leading odds, world-class sportsbook and feature-rich casino games, to our fully-loaded racebook, we've been providing players from around the world with an unparalleled gaming experience for several years. </label>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-3 col-md-3">
                                <div className="useful-links">
                                    <h3>Why Play With Us</h3>
                                    <ul>
                                    <label style={{color:'white',textAlign:'left'}}>lvaction is the gold standard in online gaming, dedicated to provide its customers with a rewarding, exciting and secure environment for online wagering. With top-of-the-line software and unique gaming opportunities, lvaction takes its players to the next level in online gambling. </label>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-3">
                                <div className="useful-links">
                                    <h3>Our Services</h3>
                                    <ul>
                                    <label style={{color:'white',textAlign:'left'}}>Our Sportsbook page offers the best odds in all major sports and leagues including the NBA, NHL, MLB, NCAA basketball and football, golf, soccer, boxing and much more.

                                    Our Racebook page is the best in the world, with up-to-post-time odds and the most major/minor track listings offered in the industry.</label>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="payment-method">
                                            <h6 className="payment-method-title">
                                                Payment methods are We accept
                                            </h6>
                                            <div className="all-method">
                                                <div className="single-method">
                                                    <img src="assets/img/brand-1.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-2.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-3.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-4.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-5.png" alt="" />
                                                </div>
                                                <div className="single-method">
                                                    <img src="assets/img/brand-5.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* footer end */}
                {/* notes begin */}
                <div className="notes">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10 col-lg-10">
                                Lvaction is a sports prediction html template, published by autworks throgh envato marketplace. You can use this template on any kind of sports prediction in the world. as like football, baseball, soccer, cricket etc. all rights reserved by autworks © 2020.
                            </div>
                        </div>
                    </div>
                </div>
                {/* notes end */}
                {/* copyright footer begin */}
                <div className="copyright-footer">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-5 col-md-6 col-lg-6 d-lg-flex d-lg-flex d-block align-items-center">
                                <p className="copyright-text">
                                    <a href="#">Lvaction</a> © 2022. PRIVACY POLICY
                                </p>
                            </div>
                            <div className="text-right col-md-6 col-xl-4 col-lg-6 d-xl-flex d-lg-flex d-block align-items-center">
                                <p className="copyright-text">
                                    Powerd By <a href="AnonymousLink">Anonymous</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* copyright footer end */}
                </div>


            </React.Fragment>
        )
    }
}

export default TaiKhoan