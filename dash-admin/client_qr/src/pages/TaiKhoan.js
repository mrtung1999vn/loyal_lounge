import React from 'react'
import { Link } from 'react-router-dom';
import host from '../service/host';
function TaiKhoan() {

    const [email, setemail] = React.useState('')
    const [mat_khau, setmat_khau] = React.useState('')

    const [otp, setotp] = React.useState('')
    
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

                if( content.status === 1 ){
                    alert('Please check otp gmail')
                    
                }else{
                    alert('Login failed')
                }
            }
        } catch (error) {

        }
    }

    console.log()
    React.useEffect(async () => {
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.log(error)
        }
    }, [])
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
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="about.html">About</a>
                                                    </li>
                                                    <Link className="nav-item" to='/Login'>
                                                        <a className="nav-link" href="about.html">Login</a>
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

export default TaiKhoan