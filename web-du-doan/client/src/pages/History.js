import React from 'react'
import ListSendMoney from './SendMoney/ListSendMoney'
import { Link } from 'react-router-dom'
import Default from './Default'
import func from '../asset/func'
import host from '../service/host'
function History() {

    const [coin,setCoin] = React.useState(0)
    const [User,setUser] = React.useState([])
    
    

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

    React.useEffect(()=>{
        try {
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
            
        }
    },[])
    
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
        <div className='col-xl-12 col-lg-12 col-md-12 mt-5 mb-5'>
            <ListSendMoney></ListSendMoney>                    
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

export default History