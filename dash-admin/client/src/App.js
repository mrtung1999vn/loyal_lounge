import React from 'react'
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import DangNhap from './pages/DangNhap';
import Default from './pages/Default';
import Footer from './pages/Footer';
import NarBar from './pages/NarBar';
import TaiKhoan from './pages/TaiKhoan';
import TrangChu from './pages/TrangChu';
import Users from './pages/Users';
import User from './storage/User';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
import Customer from './pages/Customer';


function App() {

  const [user, SetUser] = React.useState([])
  
  React.useEffect(async () => {
    try {
      SetUser(User.getUserData())
    } catch (error) {

    }
  }, [])


  const onClickOpenNavbar = async () => {
    try {
      if ($("#nav_bar_id").attr('class').toString().indexOf('active_sidebar') > 0) {
        // $("#nav_bar_id").attr('class','sidebar dark_sidebar active_sidebar')
      } else {
        $("#nav_bar_id").removeClass('sidebar dark_sidebar').addClass('active_sidebar').addClass('dark_sidebar').addClass('sidebar')
        $("#nav_bar_id").removeClass('sidebar dark_sidebar').addClass('active_sidebar').addClass('dark_sidebar').addClass('sidebar')
      }

    } catch (error) {

    }
  }

  if (user.length > 0) {
    return (
      <BrowserRouter>

        <NarBar />

        <section className="main_content dashboard_part large_header_bg">
          <div className="container-fluid no-gutters">
            <div className="row">
              <div className="col-lg-12 p-0">
                <div
                  className="header_iner d-flex justify-content-between align-items-center"
                >
                  <div className="line_icon open_miniSide d-none d-lg-block" onClick={() => onClickOpenNavbar()}></div>
                  <div
                    className="header_right d-flex justify-content-between align-items-center"
                  >

                    <div className="header_notification_warp d-flex align-items-center">
                      <li>
                        <a className="CHATBOX_open nav-link-notify" href="#">
                          <img src="img/icon/msg.svg" alt="" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="bell_notification_clicker nav-link-notify"
                          href="#"
                        >
                          <img src="img/icon/bell.svg" alt="" />
                        </a>

                        <div className="Menu_NOtification_Wrap">
                          <div className="notification_Header">
                            <h4>Notifications</h4>
                          </div>
                          <div className="Notification_body">
                            <div className="single_notify d-flex align-items-center">
                              <div className="notify_thumb">
                                <a href="#"><img src="img/staf/2.png" alt="" /></a>
                              </div>
                              <div className="notify_content">
                                <a href="#"><h5>Cool Marketing</h5></a>
                                <p>Lorem ipsum dolor sit amet</p>
                              </div>
                            </div>

                            <div className="single_notify d-flex align-items-center">
                              <div className="notify_thumb">
                                <a href="#"><img src="img/staf/4.png" alt="" /></a>
                              </div>
                              <div className="notify_content">
                                <a href="#"><h5>Awesome packages</h5></a>
                                <p>Lorem ipsum dolor sit amet</p>
                              </div>
                            </div>

                            <div className="single_notify d-flex align-items-center">
                              <div className="notify_thumb">
                                <a href="#"><img src="img/staf/3.png" alt="" /></a>
                              </div>
                              <div className="notify_content">
                                <a href="#"><h5>what a packages</h5></a>
                                <p>Lorem ipsum dolor sit amet</p>
                              </div>
                            </div>

                            <div className="single_notify d-flex align-items-center">
                              <div className="notify_thumb">
                                <a href="#"><img src="img/staf/2.png" alt="" /></a>
                              </div>
                              <div className="notify_content">
                                <a href="#"><h5>Cool Marketing</h5></a>
                                <p>Lorem ipsum dolor sit amet</p>
                              </div>
                            </div>

                            <div className="single_notify d-flex align-items-center">
                              <div className="notify_thumb">
                                <a href="#"><img src="img/staf/4.png" alt="" /></a>
                              </div>
                              <div className="notify_content">
                                <a href="#"><h5>Awesome packages</h5></a>
                                <p>Lorem ipsum dolor sit amet</p>
                              </div>
                            </div>

                            <div className="single_notify d-flex align-items-center">
                              <div className="notify_thumb">
                                <a href="#"><img src="img/staf/3.png" alt="" /></a>
                              </div>
                              <div className="notify_content">
                                <a href="#"><h5>what a packages</h5></a>
                                <p>Lorem ipsum dolor sit amet</p>
                              </div>
                            </div>
                          </div>
                          <div className="nofity_footer">
                            <div className="submit_button text-center pt_20">
                              <a href="#" className="btn_1 green">See More</a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </div>
                    <div className="profile_info d-flex align-items-center">
                      <div className="profile_thumb mr_20">
                        <img src="img/transfer/4.png" alt="#" />
                      </div>
                      <div className="author_name">
                        <h4 className="f_s_15 f_w_500 mb-0">Jiue Anderson</h4>
                        <p className="f_s_12 f_w_400">Manager</p>
                      </div>
                      <div className="profile_info_iner">
                        <div className="profile_author_name">
                          <p>Manager</p>
                          <h5>Jiue Anderson</h5>
                        </div>
                        <div className="profile_info_details">
                          <a href="#">My Profile </a>
                          <a href="#">Settings</a>
                          <a href="#">Log Out </a>
                        </div>
                      </div>
                    </div>

                    <div className="sidebar_icon d-lg-none"
                      onClick={() => onClickOpenNavbar()}
                    >
                      {/* <img src="img/line_img.png" alt="" /> */}

                      <i className='ti-menu'></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <Switch>

            {/* <Route path='/Login' render={() => <TaiKhoan></TaiKhoan>}></Route> */}

            <Route path='/Users' render={() => <Users></Users>}></Route>
            <Route path='/Customer' render={() => <Customer></Customer>}></Route>
            <Route path='/' render={() => <Default></Default>}></Route>
          </Switch>
        </section>


        <Footer />

      </BrowserRouter>
    )
  } else {
    return (
      <DangNhap></DangNhap>
    )
  }


}

export default App;
