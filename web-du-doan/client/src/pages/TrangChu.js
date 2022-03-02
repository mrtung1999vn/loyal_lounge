import MUIDataTable from 'mui-datatables';
import React from 'react'
import { Link } from 'react-router-dom'
import func from '../asset/func';
import host from '../service/host';
import Default from './Default';

function TrangChu() {

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


    React.useEffect(async () => {
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
            console.log(error)
        }
    }, [])
    return (
        <React.Fragment>
            <div>
                {/* preloader begin */}

                {/* preloader end */}
                {/* bet modal begin */}
                {/* <div className="bet-modal-bg">
                    <div className="bet-modal">
                        <div className="bet-header">
                            <span className="title">Predict a game</span>
                            <button className="cls-btn"><i className="fas fa-times" /></button>
                        </div>
                        <div className="bet-body">
                            <div className="place-of-bet">
                                <span className="place-of-bet-title">real madrid</span>
                                <input className="place-of-bet-number" type="number" defaultValue={1} readOnly />
                            </div>
                            <div className="bet-descr">
                                <span className="team-name team-name-1st">america</span>
                                <span className="img-ic"><img src="assets/img/vs-icon.png" alt="" /></span>
                                <span className="team-name team-name-2nd">iran</span>
                                <div className="team-score">[<span className="team-first-score">1</span>:<span className="team-second-score">1</span>] 1X2 Live Prediction</div>
                            </div>
                            <div className="ctrl-buttons">
                                <div className="butto-shadow">
                                    <button className="ctrl-button-for-number minus-number">-</button>
                                    <input type="number" defaultValue={1} max={99} min={1} className="number-of-stake" placeholder="stake" />
                                    <button className="ctrl-button-for-number plus-number">+</button>
                                </div>
                            </div>
                            <div className="bet-total">
                                <ul>
                                    <li>
                                        <span className="number-of-stake-title">stake :</span>
                                        <input className="number-of-stake-count" type="number" defaultValue={1} readOnly />
                                    </li>
                                    <li>
                                        <span className="number-of-bet">Total Est. Returns :</span>
                                        <span className="number-of-bet-count">82</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bet-footer">
                            <button>Predict Now</button>
                        </div>
                    </div>
                </div> */}
                {/* bet modal end */}
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
                {/* banner begin */}
                <div className="banner">
                    <div className="container">
                        <div className="banner-content">
                            <div className="row justify-content-xl-start justify-content-lg-center justify-content-md-center">
                                <div className="col-xl-7 col-lg-11 col-md-10 col-12 d-xl-flex d-lg-flex d-block align-items-center">
                                    <div className="text-content">
                                        <h1>Prediction on the great sports.</h1>
                                        <h4>that Coral offers for Football today.</h4>
                                        <p>We're football fanatics and inside our prediction hub you'll find all manner of game prediction, aids and insights on everything the game has to offer.</p>
                                        <div className="banner-button">
                                            <ul>
                                                <li>
                                                    <Link to='/Login'>
                                                        <a className="bet-btn bet-btn-base" style={{color:'white'}}>Betting Now</a>
                                                    </Link>
                                                    
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-5 col-lg-4">
                                    <div className="banner-img">
                                        <img src="assets/img/banner-img-2.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cta">
                    <div className="container">
                        <h3>Lvaction shows real time odds for betting with the higher stakes you can get.</h3>
                        <div className="cta-btn-group">
                            <a href="#" className="bet-btn bet-btn-base">Predict Now</a>
                            <a href="#" className="bet-btn bet-btn-border">Explore More</a>
                        </div>
                    </div>
                </div>
                {/* cta end */}
                {/* betting begin */}
                <div className="betting" id="in_play">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-8">
                                <div className="section-title">
                                    <h2>Live Match   {' '}
                                        <Link to='/Login'><a> BETTING NOW</a></Link>
                                        </h2>
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
                {/* upcoming match end */}
                {/* statics begin */}
                {/* feature begin */}
                <div className="feature" id="feature_section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-6 col-md-8">
                                <div className="section-title">
                                    <h2>Lvaction Features</h2>
                                    <p>Lvaction shows real time odds for betting with the higher stakes you can get. We place your bets in various bMakers to do highest liquidity</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-feature">
                                    <div className="part-icon">
                                        <img src="assets/img/svg/music-and-multimedia.svg" alt="" />
                                    </div>
                                    <div className="part-text">
                                        <h3 className="title">Live Prediction</h3>
                                        <p>Lvaction has a quality in-play Prediction service and the live console has extensive coverage from sporting events and prediction markets.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-feature">
                                    <div className="part-icon">
                                        <img src="assets/img/svg/announcement.svg" alt="" />
                                    </div>
                                    <div className="part-text">
                                        <h3 className="title">Daily Promotions</h3>
                                        <p>Lvaction offers a huge range of different promotions, every day. These include money-back offers when your horse is beaten by a nose.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-feature">
                                    <div className="part-icon">
                                        <img src="assets/img/svg/usability.svg" alt="" />
                                    </div>
                                    <div className="part-text">
                                        <h3 className="title">Clean Usability</h3>
                                        <p>More than a single feature, usability is an aspect that affects the whole product. For us, that means an intuitive interface that is easy to use.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-feature">
                                    <div className="part-icon">
                                        <img src="assets/img/svg/browser.svg" alt="" />
                                    </div>
                                    <div className="part-text">
                                        <h3 className="title">Prediction browser</h3>
                                        <p>Lvaction on an arbitrage or value predict is extremely easy. All the information you need is gathered on one single Prediction Browser using the software.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-feature">
                                    <div className="part-icon">
                                        <img src="assets/img/svg/exchange.svg" alt="" />
                                    </div>
                                    <div className="part-text">
                                        <h3 className="title">Currency Conversion</h3>
                                        <p>Automatic currency conversion is built in. You can use different currencies on different bookmakers and we’ll do all the math for you.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-feature">
                                    <div className="part-icon">
                                        <img src="assets/img/svg/key-card.svg" alt="" />
                                    </div>
                                    <div className="part-text">
                                        <h3 className="title">High Security</h3>
                                        <p>Our security measures are way above the norm in the software industry. First, starting the program requires a master password.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* feature end */}
                <div className="statics">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-6">
                                <div className="single-counter">
                                    <span className="number odometer" data-count={1854}>0000</span>
                                    <span className="title">Project Finished</span>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6">
                                <div className="single-counter">
                                    <span className="number odometer" data-count={3254}>0000</span>
                                    <span className="title">Line Of Coding</span>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6">
                                <div className="single-counter">
                                    <span className="number odometer" data-count={584}>000</span>
                                    <span className="title">Award Won</span>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6">
                                <div className="single-counter">
                                    <span className="number odometer" data-count={1731}>0000</span>
                                    <span className="title">Satisfied Clients</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* statics end */}
                {/* testimonial begin */}

                {/* testimonial end */}
                {/* download app begin */}

                {/* download app end */}
                {/* sponsor begin */}

                {/* sponsor end */}
                {/* news letter begin */}
                <div className="newsletter">
                    <div className="container">
                        <div className="row no-gutters justify-content-center">
                            <div className="col-xl-4 col-lg-4">
                                <div className="part-img">
                                    <img src="assets/img/newsletter-img.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-10">
                                <div className="part-text">
                                    <h4>Lvaction Newsletter</h4>
                                    <p>Users enter gmail to receive the latest notifications.</p>
                                    <div className="part-form">
                                        <form>
                                            <input type="text" placeholder="Input Your Mail Here" />
                                            <button type="submit">
                                                <img src="assets/img/svg/spaceship.svg" alt="" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* news letter end */}
                {/* blog begin */}
                {/* <div className="blog">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-6 col-md-8">
                                <div className="section-title">
                                    <h2>Our Latest news</h2>
                                    <p>Lvaction shows real time odds for betting with the higher stakes you can get. We place your bets in various bMakers to do highest liquidity</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-blog">
                                    <div className="part-img">
                                        <img src="assets/img/blog-1.jpg" alt="" />
                                        <a href="#"><i className="far fa-eye" /></a>
                                        <div className="post-date">
                                            <span className="date">16</span>
                                            <span className="month">Dec</span>
                                        </div>
                                    </div>
                                    <div className="part-text">
                                        <a href="#" className="title">How could the Premier League resume?</a>
                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis sint esse vel atque asperiores eligendi vero blanditiis, totam eos beatae hic harum commodi quisquam debitis ipsam obcaecati deserunt nihil? Sed.</p>
                                        <a href="#" className="share-btn"><i className="fas fa-share-alt" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-blog">
                                    <div className="part-img">
                                        <img src="assets/img/blog-2.jpg" alt="" />
                                        <a href="#"><i className="far fa-eye" /></a>
                                        <div className="post-date">
                                            <span className="date">26</span>
                                            <span className="month">JAn</span>
                                        </div>
                                    </div>
                                    <div className="part-text">
                                        <a href="#" className="title">When coronavirus stops your league</a>
                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis sint esse vel atque asperiores eligendi vero blanditiis, totam eos beatae hic harum commodi quisquam debitis ipsam obcaecati deserunt nihil? Sed.</p>
                                        <a href="#" className="share-btn"><i className="fas fa-share-alt" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-sidebar">
                                    <div className="popular-news">
                                        <div className="single-post">
                                            <div>
                                                <div className="part-img">
                                                    <img src="assets/img/popular-news-1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="part-text">
                                                <a href="#">How could the Premier League resume?</a>
                                            </div>
                                        </div>
                                        <div className="single-post">
                                            <div>
                                                <div className="part-img">
                                                    <img src="assets/img/popular-news-2.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="part-text">
                                                <a href="#">How could the Premier League resume?</a>
                                            </div>
                                        </div>
                                        <div className="single-post">
                                            <div>
                                                <div className="part-img">
                                                    <img src="assets/img/popular-news-3.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="part-text">
                                                <a href="#">How could the Premier League resume?</a>
                                            </div>
                                        </div>
                                        <div className="single-post">
                                            <div>
                                                <div className="part-img">
                                                    <img src="assets/img/popular-news-1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="part-text">
                                                <a href="#">How could the Premier League resume?</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <a href="#" className="vew-more-news bet-btn bet-btn-base">
                                <i className="fas fa-redo" /> See More News
                            </a>
                        </div>
                    </div>
                </div> */}
                {/* blog end */}
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

export default TrangChu