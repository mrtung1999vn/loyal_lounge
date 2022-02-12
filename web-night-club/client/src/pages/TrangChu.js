import React from 'react'
import { Link } from 'react-router-dom'

function TrangChu() {
    



    
    React.useEffect(async ()=>{
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.log(error)
        }
    },[])
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
                                                <a href="index.html">
                                                    <img src="assets/img/logo.png" alt="logo" />
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
                                                    <li className="nav-item dropdown">
                                                        <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Home
                                                        </a>
                                                        {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <a className="dropdown-item" href="index.html">Home One</a>
                                                            <a className="dropdown-item" href="index-2.html">Home Two</a>
                                                        </div> */}
                                                    </li>
                                                    <Link className="nav-item" to='/About'>
                                                        <a className="nav-link">About</a>
                                                    </Link>
                                                    <Link className="nav-item" to='/Login'>
                                                        <a className="nav-link">Login</a>
                                                    </Link>

                                                    <li className="nav-item">
                                                        <a className="nav-link" href="contact.html">Contact US</a>
                                                    </li>
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
                                                    <a href="#" className="bet-btn bet-btn-base">Predict now</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="bet-btn bet-btn-border">explore more</a>
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
                {/* banner end */}
                {/* about begin */}
                <div className="about">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-xl-8 col-lg-8">
                                <div className="part-img">
                                    <img src="assets/img/about.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 d-xl-flex d-lg-flex d-block align-items-center">
                                <div>
                                    <div className="part-text">
                                        <h2>Introducing Our Words</h2>
                                        <p>The bigger the sports event the more interest, excitement and media attention on the action. And the more betting markets we have available here at Peredion to turn your opinions into winning bets. And few events come any bigger than the World Cup and the Olympics.</p>
                                    </div>
                                    <a href="#" className="about-btn">Predict Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* about end */}
                {/* cta begin */}
                <div className="cta">
                    <div className="container">
                        <h3>PerediOn shows real time odds for betting with the higher stakes you can get.</h3>
                        <div className="cta-btn-group">
                            <a href="#" className="bet-btn bet-btn-base">Predict Now</a>
                            <a href="#" className="bet-btn bet-btn-border">Explore More</a>
                        </div>
                    </div>
                </div>
                {/* cta end */}
                {/* feature begin */}
                <div className="feature" id="feature_section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-6 col-md-8">
                                <div className="section-title">
                                    <h2>PerediOn Features</h2>
                                    <p>PerediOn shows real time odds for betting with the higher stakes you can get. We place your bets in various bMakers to do highest liquidity</p>
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
                                        <p>PerediOn has a quality in-play Prediction service and the live console has extensive coverage from sporting events and prediction markets.</p>
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
                                        <p>PerediOn offers a huge range of different promotions, every day. These include money-back offers when your horse is beaten by a nose.</p>
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
                                        <p>PerediOn on an arbitrage or value predict is extremely easy. All the information you need is gathered on one single Prediction Browser using the software.</p>
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
                {/* betting begin */}
                <div className="betting" id="in_play">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-8">
                                <div className="section-title">
                                    <h2>Predict &amp; Playing Now</h2>
                                    <p>PerediOn shows real time odds for betting with the higher stakes you can get. We place your bets in various bMakers to do highest liquidity</p>
                                </div>
                            </div>
                        </div>
                        <div className="betting-table">
                            <div className="row">
                                <div className="col-xl-2 col-lg-2">
                                    <div className="bett-menu">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="all-sports-tab" data-toggle="tab" href="#all-sports" role="tab" aria-controls="all-sports" aria-selected="true">
                                                    <i className="flaticon-medal" />
                                                    <span className="text">
                                                        all sports
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="football-tab" data-toggle="tab" href="#football" role="tab" aria-controls="football" aria-selected="false">
                                                    <i className="flaticon-football" />
                                                    <span className="text">
                                                        football
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="tennis-tab" data-toggle="tab" href="#tennis" role="tab" aria-controls="tennis" aria-selected="false">
                                                    <i className="flaticon-tennis-ball" />
                                                    <span className="text">
                                                        tennis
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
                                            <li className="nav-item">
                                                <a className="nav-link" id="hockey-tab" data-toggle="tab" href="#hockey" role="tab" aria-controls="hockey" aria-selected="false">
                                                    <i className="flaticon-ice-hockey" />
                                                    <span className="text">
                                                        Ice hockey
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="volleyball-tab" data-toggle="tab" href="#volleyball" role="tab" aria-controls="volleyball" aria-selected="false">
                                                    <i className="flaticon-volleyball" />
                                                    <span className="text">
                                                        VOLLEYBALL
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="badminton-tab" data-toggle="tab" href="#badminton" role="tab" aria-controls="badminton" aria-selected="false">
                                                    <i className="flaticon-badminton" />
                                                    <span className="text">
                                                        BADMINTON
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="baseball-tab" data-toggle="tab" href="#baseball" role="tab" aria-controls="baseball" aria-selected="false">
                                                    <i className="flaticon-baseball" />
                                                    <span className="text">
                                                        BASEBALL
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-10 col-lg-10">
                                    <div className="tab-content bet-tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="all-sports" role="tabpanel" aria-labelledby="all-sports-tab">
                                            <div className="sport-content-title">
                                                <h3>All Sports
                                                    <span className="sport-content-conter">[30]</span>
                                                </h3>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">England International League</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-football" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    arsenal
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    everton
                                                                </span>
                                                                <span className="score-number">
                                                                    4
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.00</span>
                                                                <span className="result-for-final">
                                                                    arsenal
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">5.75</span>
                                                                <span className="result-for-final">
                                                                    everton
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-football" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Aston Villa
                                                                </span>
                                                                <span className="score-number">
                                                                    4
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Norwich City
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.52</span>
                                                                <span className="result-for-final">
                                                                    Aston Villa
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.35</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.65</span>
                                                                <span className="result-for-final">
                                                                    Norwich City
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-football" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    West Ham United
                                                                </span>
                                                                <span className="score-number">
                                                                    1
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Bournemouth
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.50</span>
                                                                <span className="result-for-final">
                                                                    West Ham United
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.45</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.75</span>
                                                                <span className="result-for-final">
                                                                    Bournemouth
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">France National tennis</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-tennis-ball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Kenny Schepper
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Quentin Robert
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.25</span>
                                                                <span className="result-for-final">
                                                                    Kenny Schepper
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.62</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.44</span>
                                                                <span className="result-for-final">
                                                                    Quentin Robert
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-tennis-ball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Christian Langmo
                                                                </span>
                                                                <span className="score-number">
                                                                    5
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.70</span>
                                                                <span className="result-for-final">
                                                                    Christian Langmo
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.05</span>
                                                                <span className="result-for-final">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-tennis-ball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Stade Bordelais
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Nantes II
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.22</span>
                                                                <span className="result-for-final">
                                                                    Stade Bordelais
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.00</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.45</span>
                                                                <span className="result-for-final">
                                                                    Nantes II
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">League of europe</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-basketball-ball-variant" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Kenny Schepper
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Quentin Robert
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.25</span>
                                                                <span className="result-for-final">
                                                                    Kenny Schepper
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.62</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.44</span>
                                                                <span className="result-for-final">
                                                                    Quentin Robert
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-basketball-ball-variant" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Christian Langmo
                                                                </span>
                                                                <span className="score-number">
                                                                    5
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.70</span>
                                                                <span className="result-for-final">
                                                                    Christian Langmo
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.05</span>
                                                                <span className="result-for-final">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-basketball-ball-variant" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Stade Bordelais
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Nantes II
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.22</span>
                                                                <span className="result-for-final">
                                                                    Stade Bordelais
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.00</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.45</span>
                                                                <span className="result-for-final">
                                                                    Nantes II
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="football" role="tabpanel" aria-labelledby="football-tab">
                                            <div className="sport-content-title">
                                                <h3>Football
                                                    <span className="sport-content-conter">[3]</span>
                                                </h3>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">England International League</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-football" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    arsenal
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    everton
                                                                </span>
                                                                <span className="score-number">
                                                                    4
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.00</span>
                                                                <span className="result-for-final">
                                                                    arsenal
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">5.75</span>
                                                                <span className="result-for-final">
                                                                    everton
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-football" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Aston Villa
                                                                </span>
                                                                <span className="score-number">
                                                                    4
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Norwich City
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.52</span>
                                                                <span className="result-for-final">
                                                                    Aston Villa
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.35</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.65</span>
                                                                <span className="result-for-final">
                                                                    Norwich City
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-football" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    West Ham United
                                                                </span>
                                                                <span className="score-number">
                                                                    1
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Bournemouth
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.50</span>
                                                                <span className="result-for-final">
                                                                    West Ham United
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.45</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.75</span>
                                                                <span className="result-for-final">
                                                                    Bournemouth
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="tennis" role="tabpanel" aria-labelledby="tennis-tab">
                                            <div className="sport-content-title">
                                                <h3>tennis
                                                    <span className="sport-content-conter">[3]</span>
                                                </h3>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">France National tennis</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-tennis-ball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Kenny Schepper
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Quentin Robert
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.25</span>
                                                                <span className="result-for-final">
                                                                    Kenny Schepper
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.62</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.44</span>
                                                                <span className="result-for-final">
                                                                    Quentin Robert
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-tennis-ball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Christian Langmo
                                                                </span>
                                                                <span className="score-number">
                                                                    5
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.70</span>
                                                                <span className="result-for-final">
                                                                    Christian Langmo
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.05</span>
                                                                <span className="result-for-final">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-tennis-ball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Stade Bordelais
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Nantes II
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.22</span>
                                                                <span className="result-for-final">
                                                                    Stade Bordelais
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.00</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.45</span>
                                                                <span className="result-for-final">
                                                                    Nantes II
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="basketball" role="tabpanel" aria-labelledby="basketball-tab">
                                            <div className="sport-content-title">
                                                <h3>basketball
                                                    <span className="sport-content-conter">[3]</span>
                                                </h3>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">League of europe</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-basketball-ball-variant" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Kenny Schepper
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Quentin Robert
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.25</span>
                                                                <span className="result-for-final">
                                                                    Kenny Schepper
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.62</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.44</span>
                                                                <span className="result-for-final">
                                                                    Quentin Robert
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-basketball-ball-variant" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Christian Langmo
                                                                </span>
                                                                <span className="score-number">
                                                                    5
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.70</span>
                                                                <span className="result-for-final">
                                                                    Christian Langmo
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.05</span>
                                                                <span className="result-for-final">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-basketball-ball-variant" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Stade Bordelais
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Nantes II
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.22</span>
                                                                <span className="result-for-final">
                                                                    Stade Bordelais
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.00</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.45</span>
                                                                <span className="result-for-final">
                                                                    Nantes II
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="hockey" role="tabpanel" aria-labelledby="hockey-tab">
                                            <div className="sport-content-title">
                                                <h3>ice hockey
                                                    <span className="sport-content-conter">[3]</span>
                                                </h3>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">Hocky Tour'20</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-ice-hockey" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Kenny Schepper
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Quentin Robert
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.25</span>
                                                                <span className="result-for-final">
                                                                    Kenny Schepper
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.62</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.44</span>
                                                                <span className="result-for-final">
                                                                    Quentin Robert
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-ice-hockey" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Christian Langmo
                                                                </span>
                                                                <span className="score-number">
                                                                    5
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.70</span>
                                                                <span className="result-for-final">
                                                                    Christian Langmo
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.05</span>
                                                                <span className="result-for-final">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-ice-hockey" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Stade Bordelais
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Nantes II
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.22</span>
                                                                <span className="result-for-final">
                                                                    Stade Bordelais
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.00</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.45</span>
                                                                <span className="result-for-final">
                                                                    Nantes II
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="volleyball" role="tabpanel" aria-labelledby="volleyball-tab">
                                            <div className="sport-content-title">
                                                <h3>volleyball
                                                    <span className="sport-content-conter">[3]</span>
                                                </h3>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">Hocky Tour'20</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-volleyball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Kenny Schepper
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Quentin Robert
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.25</span>
                                                                <span className="result-for-final">
                                                                    Kenny Schepper
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.62</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.44</span>
                                                                <span className="result-for-final">
                                                                    Quentin Robert
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-volleyball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Christian Langmo
                                                                </span>
                                                                <span className="score-number">
                                                                    5
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.70</span>
                                                                <span className="result-for-final">
                                                                    Christian Langmo
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.05</span>
                                                                <span className="result-for-final">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-volleyball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Stade Bordelais
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Nantes II
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.22</span>
                                                                <span className="result-for-final">
                                                                    Stade Bordelais
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.00</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.45</span>
                                                                <span className="result-for-final">
                                                                    Nantes II
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="badminton" role="tabpanel" aria-labelledby="badminton-tab">
                                            <div className="sport-content-title">
                                                <h3>badminton
                                                    <span className="sport-content-conter">[3]</span>
                                                </h3>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">Hocky Tour'20</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-badminton" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Kenny Schepper
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Quentin Robert
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.25</span>
                                                                <span className="result-for-final">
                                                                    Kenny Schepper
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.62</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.44</span>
                                                                <span className="result-for-final">
                                                                    Quentin Robert
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-badminton" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Christian Langmo
                                                                </span>
                                                                <span className="score-number">
                                                                    5
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.70</span>
                                                                <span className="result-for-final">
                                                                    Christian Langmo
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.05</span>
                                                                <span className="result-for-final">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-badminton" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Stade Bordelais
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Nantes II
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.22</span>
                                                                <span className="result-for-final">
                                                                    Stade Bordelais
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.00</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.45</span>
                                                                <span className="result-for-final">
                                                                    Nantes II
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="baseball" role="tabpanel" aria-labelledby="baseball-tab">
                                            <div className="sport-content-title">
                                                <h3>baseball
                                                    <span className="sport-content-conter">[3]</span>
                                                </h3>
                                            </div>
                                            <div className="sports-list">
                                                <h4 className="title">Hocky Tour'20</h4>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-baseball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Kenny Schepper
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Quentin Robert
                                                                </span>
                                                                <span className="score-number">
                                                                    6
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.25</span>
                                                                <span className="result-for-final">
                                                                    Kenny Schepper
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.62</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.44</span>
                                                                <span className="result-for-final">
                                                                    Quentin Robert
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-baseball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Christian Langmo
                                                                </span>
                                                                <span className="score-number">
                                                                    5
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                                <span className="score-number">
                                                                    2
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">1.70</span>
                                                                <span className="result-for-final">
                                                                    Christian Langmo
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.30</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.05</span>
                                                                <span className="result-for-final">
                                                                    Manuel Pena Lopez
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
                                                <div className="single-sport-box">
                                                    <div className="part-icon">
                                                        <i className="flaticon-baseball" />
                                                    </div>
                                                    <div className="part-team">
                                                        <ul>
                                                            <li>
                                                                <span className="team-name">
                                                                    Stade Bordelais
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="team-name">
                                                                    Nantes II
                                                                </span>
                                                                <span className="score-number">
                                                                    3
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="part-match">
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">3.22</span>
                                                                <span className="result-for-final">
                                                                    Stade Bordelais
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">4.00</span>
                                                                <span className="result-for-final">
                                                                    draw
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="single-place-to-bet">
                                                            <a href="#">
                                                                <span className="bet-price">2.45</span>
                                                                <span className="result-for-final">
                                                                    Nantes II
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="part-bnonus">
                                                        <span className="bonus-number">+336</span>
                                                    </div>
                                                </div>
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
                <div className="upcoming-match" id="upcoming_match">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-6 col-md-8">
                                <div className="section-title">
                                    <h2>Upcoming Match</h2>
                                    <p>PerediOn shows real time odds for betting with the higher stakes you can get. We place your bets in various bMakers to do highest liquidity</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="single-match">
                                    <div className="part-head">
                                        <h5 className="match-title">BBPL 2019 Semi Final</h5>
                                        <span className="match-venue">Venue : Sher-e-Bangla National Stadium. Mirpur, Dhaka</span>
                                    </div>
                                    <div className="part-team">
                                        <div className="single-team">
                                            <div className="logo">
                                                <img src="assets/img/team-1.png" alt="" />
                                            </div>
                                            <span className="team-name">Khulna Tigers</span>
                                        </div>
                                        <div className="match-details">
                                            <div className="match-time">
                                                <span className="date">Fri 09 Oct 2019</span>
                                                <span className="time">09:00 am</span>
                                            </div>
                                            <span className="versase">vs</span>
                                            <div className="buttons">
                                                <a href="#" className="buy-ticket bet-btn bet-btn-dark-light">buy ticket</a>
                                            </div>
                                        </div>
                                        <div className="single-team">
                                            <div className="logo">
                                                <img src="assets/img/team-2.png" alt="" />
                                            </div>
                                            <span className="team-name">Dhaka Platoon</span>
                                        </div>
                                    </div>
                                    <span className="to-begin-time">
                                        Starting on
                                    </span>
                                    <div className="part-timer timer" data-date="30 April 2020 9:56:00 GMT+01:00">
                                        <div className="single-time">
                                            <span className="number day">01</span>
                                            <span className="title">Days</span>
                                        </div>
                                        <div className="single-time">
                                            <span className="number hour">24</span>
                                            <span className="title">Hours</span>
                                        </div>
                                        <div className="single-time">
                                            <span className="number minute">48</span>
                                            <span className="title">Minutes</span>
                                        </div>
                                        <div className="single-time">
                                            <span className="number second">11</span>
                                            <span className="title">Seconds</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="upcoming-match-list">
                                    <div className="single-upcoming-match">
                                        <div className="single-team">
                                            <div className="part-logo">
                                                <img src="assets/img/team-1.png" alt="" />
                                            </div>
                                            <div className="part-text">
                                                <span className="team-name">
                                                    Khulna tigers
                                                </span>
                                            </div>
                                        </div>
                                        <span className="versase">vs</span>
                                        <div className="single-team">
                                            <div className="part-text">
                                                <span className="team-name">
                                                    dhaka platoon
                                                </span>
                                            </div>
                                            <div className="part-logo">
                                                <img src="assets/img/team-2.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-upcoming-match">
                                        <div className="single-team">
                                            <div className="part-logo">
                                                <img src="assets/img/team-3.png" alt="" />
                                            </div>
                                            <div className="part-text">
                                                <span className="team-name">
                                                    Cumilla Viking
                                                </span>
                                            </div>
                                        </div>
                                        <span className="versase">vs</span>
                                        <div className="single-team">
                                            <div className="part-text">
                                                <span className="team-name">
                                                    Barishal Bulls
                                                </span>
                                            </div>
                                            <div className="part-logo">
                                                <img src="assets/img/team-4.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-upcoming-match">
                                        <div className="single-team">
                                            <div className="part-logo">
                                                <img src="assets/img/team-5.png" alt="" />
                                            </div>
                                            <div className="part-text">
                                                <span className="team-name">
                                                    CG challenge
                                                </span>
                                            </div>
                                        </div>
                                        <span className="versase">vs</span>
                                        <div className="single-team">
                                            <div className="part-text">
                                                <span className="team-name">
                                                    r.shahi royals
                                                </span>
                                            </div>
                                            <div className="part-logo">
                                                <img src="assets/img/team-6.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-upcoming-match">
                                        <div className="single-team">
                                            <div className="part-logo">
                                                <img src="assets/img/team-7.png" alt="" />
                                            </div>
                                            <div className="part-text">
                                                <span className="team-name">
                                                    Khulna tigers
                                                </span>
                                            </div>
                                        </div>
                                        <span className="versase">vs</span>
                                        <div className="single-team">
                                            <div className="part-text">
                                                <span className="team-name">
                                                    dhaka platoon
                                                </span>
                                            </div>
                                            <div className="part-logo">
                                                <img src="assets/img/team-8.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <a href="#" className="vew-more-news bet-btn bet-btn-dark-light">
                                <i className="fas fa-redo" /> See More match
                            </a>
                        </div>
                        <span className="text-special">
                            <b>Note:</b>  The timing of each match will depend on the weather conditions.
                        </span>
                    </div>
                </div>
                {/* upcoming match end */}
                {/* statics begin */}
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
                <div className="testimonial" id="testimonial">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-7">
                                <div className="section-title">
                                    <h2>Feedback to PerediOn</h2>
                                    {/* <p>PerediOn shows real time odds for betting with the higher stakes you can get. We place your bets in various bMakers to do highest liquidity</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-xl-8 col-lg-8">
                                <div className="testimonial-slider owl-carousel owl-theme">
                                    <div className="single-testimonial">
                                        <div className="part-img">
                                            <img src="assets/img/testi-user-1.jpg" alt="" />
                                        </div>
                                        <div className="part-text">
                                            <i className="icon-for-quot fas fa-quote-left" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nesciunt dignissimos laborum praesentium illo dolorem, fuga commodi? Laudantium totam porro quod nihil eius!</p>
                                            <span className="position">
                                                Player
                                            </span>
                                            <span className="user-name">
                                                Illustino Calibia
                                            </span>
                                        </div>
                                    </div>
                                    <div className="single-testimonial">
                                        <div className="part-img">
                                            <img src="assets/img/testi-user-1.jpg" alt="" />
                                        </div>
                                        <div className="part-text">
                                            <i className="icon-for-quot fas fa-quote-left" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nesciunt dignissimos laborum praesentium illo dolorem, fuga commodi? Laudantium totam porro quod nihil eius!</p>
                                            <span className="position">
                                                Player
                                            </span>
                                            <span className="user-name">
                                                Illustino Calibia
                                            </span>
                                        </div>
                                    </div>
                                    <div className="single-testimonial">
                                        <div className="part-img">
                                            <img src="assets/img/testi-user-1.jpg" alt="" />
                                        </div>
                                        <div className="part-text">
                                            <i className="icon-for-quot fas fa-quote-left" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nesciunt dignissimos laborum praesentium illo dolorem, fuga commodi? Laudantium totam porro quod nihil eius!</p>
                                            <span className="position">
                                                Player
                                            </span>
                                            <span className="user-name">
                                                Illustino Calibia
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* testimonial end */}
                {/* download app begin */}
                <div className="download-app">
                    <div className="container">
                        <img className="shape" src="assets/img/app-feature-bg.png" alt="" />
                        <div className="row justify-content-xl-between justify-content-lg-between justify-content-md-center">
                            <div className="col-xl-5 col-lg-5">
                                <div className="part-img">
                                    <img className="app" src="assets/img/app.png" alt="" />
                                    <img className="app" src="assets/img/app.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-7 col-md-10 d-xl-flex d-lg-flex d-block align-items-xl-baseline align-items-lg-center">
                                <div>
                                    <div className="part-text">
                                        <h4>enjoy your favourites right now</h4>
                                        <h3>download our app</h3>
                                        <p>Predict you love anywhere, on any device with <span><img src="assets/img/small-logo.png" alt="" /></span> stream app. included at no additional cost, exclusively for PerediOn customers. It comes with two variations. Dark &amp; Light. You can get to download <span><img src="assets/img/small-logo.png" alt="" /></span> on google play store an apple mobile store.</p>
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/apple.png" alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/and.png" alt="" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="app-features">
                                        <div className="single-feature">
                                            <div className="part-icon">
                                                <img src="assets/img/svg/ram.svg" alt="" />
                                            </div>
                                            <span className="title">
                                                lite weight
                                            </span>
                                        </div>
                                        <div className="single-feature">
                                            <div className="part-icon">
                                                <img src="assets/img/svg/memory-card.svg" alt="" />
                                            </div>
                                            <span className="title">
                                                2MB size
                                            </span>
                                        </div>
                                        <div className="single-feature">
                                            <div className="part-icon">
                                                <img src="assets/img/svg/dark-and-light.svg" alt="" />
                                            </div>
                                            <span className="title">
                                                light &amp; dark
                                            </span>
                                        </div>
                                        <div className="single-feature">
                                            <div className="part-icon">
                                                <img src="assets/img/svg/easy-return.svg" alt="" />
                                            </div>
                                            <span className="title">
                                                easy to use
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* download app end */}
                {/* sponsor begin */}
                <div className="sponsor">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                <div className="single-sponsor">
                                    <a href="#">
                                        <img src="assets/img/sponsor-1.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                <div className="single-sponsor">
                                    <a href="#">
                                        <img src="assets/img/sponsor-2.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                <div className="single-sponsor">
                                    <a href="#">
                                        <img src="assets/img/sponsor-3.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                <div className="single-sponsor">
                                    <a href="#">
                                        <img src="assets/img/sponsor-6.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                <div className="single-sponsor">
                                    <a href="#">
                                        <img src="assets/img/sponsor-5.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                <div className="single-sponsor">
                                    <a href="#">
                                        <img src="assets/img/sponsor-4.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                <div className="single-sponsor">
                                    <a href="#">
                                        <img src="assets/img/sponsor-7.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 d-xl-flex d-lg-flex d-block align-items-center">
                                <div className="single-sponsor">
                                    <a href="#">
                                        <img src="assets/img/sponsor-8.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    <h4>PerediOn Newsletter</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident et repellendus deleniti dolor aperiam, magni est tenetur ullam omnis eius illo cum cupiditate, eligendi aspernatur praesentium fuga.</p>
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
                <div className="blog">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-6 col-md-8">
                                <div className="section-title">
                                    <h2>Our Latest news</h2>
                                    <p>PerediOn shows real time odds for betting with the higher stakes you can get. We place your bets in various bMakers to do highest liquidity</p>
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
                </div>
                {/* blog end */}
                {/* footer begin */}
                <div className="footer" id="contact">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-4 col-lg-5 col-md-10">
                                <div className="about-widget">
                                    <a className="logo" href="index.html">
                                        <img src="assets/img/logo.png" alt="" />
                                    </a>
                                    <p>PerediOn offers you all the best online prediction from every corner of the planet with thousands of online prediction markets.</p>
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
                                    <h3>Useful links</h3>
                                    <ul>
                                        <li>
                                            <a href="#">IN-PLAY</a>
                                        </li>
                                        <li>
                                            <a href="#">PROMOTIONS</a>
                                        </li>
                                        <li>
                                            <a href="#">STATICS</a>
                                        </li>
                                        <li>
                                            <a href="#">RESULTS</a>
                                        </li>
                                        <li>
                                            <a href="#">Predict now</a>
                                        </li>
                                        <li>
                                            <a href="#">GAME RESULTS</a>
                                        </li>
                                        <li>
                                            <a href="#">STANDINGS</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-3">
                                <div className="useful-links">
                                    <h3>Connect With Us</h3>
                                    <ul>
                                        <li>
                                            <a href="#">About Us</a>
                                        </li>
                                        <li>
                                            <a href="#">Blog</a>
                                        </li>
                                        <li>
                                            <a href="#">Blog Details</a>
                                        </li>
                                        <li>
                                            <a href="#">Service</a>
                                        </li>
                                        <li>
                                            <a href="#">Contact us</a>
                                        </li>
                                        <li>
                                            <a href="#">TEAM OVERVIEW</a>
                                        </li>
                                        <li>
                                            <a href="#">SCHEDULE</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3">
                                <div className="useful-links">
                                    <h3>All Sports</h3>
                                    <ul>
                                        <li>
                                            <a href="#">FOOTBALL</a>
                                        </li>
                                        <li>
                                            <a href="#">TENNIS</a>
                                        </li>
                                        <li>
                                            <a href="#">BASKETBALL</a>
                                        </li>
                                        <li>
                                            <a href="#">ICE HOCKEY</a>
                                        </li>
                                        <li>
                                            <a href="#">VOLLEYBALL</a>
                                        </li>
                                        <li>
                                            <a href="#">BADMINTON</a>
                                        </li>
                                        <li>
                                            <a href="#">BASEBALL</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
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
                        </div>
                    </div>
                </div>
                {/* footer end */}
                {/* notes begin */}
                <div className="notes">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10 col-lg-10">
                                PerediOn is a sports prediction html template, published by autworks throgh envato marketplace. You can use this template on any kind of sports prediction in the world. as like football, baseball, soccer, cricket etc. all rights reserved by autworks © 2020.
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
                                    <a href="#">PerediOn</a> © 2020. PRIVACY POLICY
                                </p>
                            </div>
                            <div className="text-right col-md-6 col-xl-4 col-lg-6 d-xl-flex d-lg-flex d-block align-items-center">
                                <p className="copyright-text">
                                    Powerd By <a href="https://themeforest.net/user/autworks/portfolio">Autworks ( Envato Author )</a>
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