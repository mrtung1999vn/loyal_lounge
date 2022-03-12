import React from 'react'
import { Link } from 'react-router-dom'

function NarBar() {
    

    const onClickExit = async ()=>{
        try {
            window.localStorage.clear()
            window.location.href = "./"
        } catch (error) {
            
        }
    }

    return (
        <nav className="sidebar dark_sidebar" id="nav_bar_id">
            <div className="logo d-flex justify-content-between">
                <a className="large_logo" href="index-2.html"><img src="img/logo_white.png" alt="" /></a>
                <a className="small_logo" href="index-2.html"><img src="img/mini_logo.png" alt="" /></a>
                <div className="sidebar_close_icon d-lg-none">
                    <i className="ti-close" />
                </div>
            </div>
            <ul id="sidebar_menu">
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/1.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Dashboard </span>
                        </div>
                    </a>
                    <ul>
                        <Link to="/Users" style={{ backgroundColor: '#091023', color: 'white' }}>Users</Link>
                        <Link to="/Customer" style={{ backgroundColor: '#091023', color: 'white' }}>Customer</Link>
                        <Link to="/Table" style={{ backgroundColor: '#091023', color: 'white' }}>Table</Link>
                        {/* <Link to="/Table" style={{backgroundColor:'#091023',color:'white'}}>Table</Link> */}

                    </ul>
                </li>

                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/1.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Product </span>
                        </div>
                    </a>
                    <ul>
                        <Link to="/Type-Product" style={{ backgroundColor: '#091023', color: 'white' }}>Type-Product</Link>
                        <Link to="/Product" style={{ backgroundColor: '#091023', color: 'white' }}>Product</Link>
                    </ul>
                </li>

                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/1.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>General activities </span>
                        </div>
                    </a>
                    <ul>
                        <Link to="/CashMoney" style={{ backgroundColor: '#091023', color: 'white' }}>Nạp tiền</Link>
                        <Link to="/PayMoney" style={{ backgroundColor: '#091023', color: 'white' }}>Khách rút</Link>
                        <Link to="/Event" style={{ backgroundColor: '#091023', color: 'white' }}>Event</Link>
                        <Link to="/Gallery" style={{ backgroundColor: '#091023', color: 'white' }}>Gallery</Link>
                        <Link to="/Reservations" style={{ backgroundColor: '#091023', color: 'white' }}>Reservations</Link>
                    </ul>
                </li>

                <li className=''>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/1.svg" alt="" />
                        </div>
                        <div className="nav_title"
                        onClick={()=>onClickExit()}
                        >
                            <span>Exit </span>
                        </div>
                    </a>
                </li>


                {/* <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/1.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>General activities </span>
                        </div>
                    </a>
                    <ul>
                        <Link to="/Event" style={{backgroundColor:'#091023',color:'white'}}>Event</Link>
                        <Link to="/Gallery" style={{backgroundColor:'#091023',color:'white'}}>Gallery</Link>
                        <Link to="/Table" style={{backgroundColor:'#091023',color:'white'}}>Table</Link>
                        <Link to="/Reservations" style={{backgroundColor:'#091023',color:'white'}}>Reservations</Link>
                    </ul>
                </li> */}

                {/* <li className>
                    <a href="crypto_wallet.html" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/2.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Crypto Wallet</span>
                        </div>
                    </a>
                </li>
                <li className>
                    <a href="buy_sell.html" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/3.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Buy &amp; Sell</span>
                        </div>
                    </a>
                </li>
                <li className>
                    <a href="Trader_Profile.html" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/4.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Trader Profile</span>
                        </div>
                    </a>
                </li>
                <li className>
                    <a href="crypto_stats.html" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/5.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Crypto Stats</span>
                        </div>
                    </a>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/6.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Transactions</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="Request.html">Request</a></li>
                        <li><a href="tan_cancel.html">Cancel</a></li>
                        <li><a href="Refound.html">Refound</a></li>
                        <li><a href="Payment_details.html">Payment details</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/7.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Tickers</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="ticker_dark.html">Ticker Dark</a></li>
                        <li><a href="Ticker_Light.html">Ticker Light</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/8.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Apps </span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="editor.html">Editor</a></li>
                        <li><a href="invoice.html">Invoice</a></li>
                        <li><a href="Builder.html">Builder</a></li>
                        <li><a href="calender.html">Calander</a></li>
                        <li><a href="Board.html">Board</a></li>
                        <li><a href="basic_card.html">Basic Card</a></li>
                        <li><a href="theme_card.html">Theme Card</a></li>
                        <li><a href="dargable_card.html">Draggable Card</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/Pages.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Pages</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="role_permissions.html">Role &amp; Permissions</a></li>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="login.html">Login</a></li>
                        <li><a href="resister.html">Register</a></li>
                        <li><a href="error_400.html">Error 404</a></li>
                        <li><a href="error_500.html">Error 500</a></li>
                        <li><a href="forgot_pass.html">Forgot Password</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="module_setting.html">Module Setting</a></li>
                        <li><a href="Products.html">Products</a></li>
                        <li><a href="Product_Details.html">Product Details</a></li>
                        <li><a href="Cart.html">Cart</a></li>
                        <li><a href="Checkout.html">Checkout</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/General.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>General</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="Minimized_Aside.html">Minimized Aside</a></li>
                        <li><a href="empty_page.html">Empty page</a></li>
                        <li><a href="fixed_footer.html">Fixed Footer</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/Mail_Box.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Mail Box </span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="mail_box.html">Mail Box</a></li>
                        <li><a href="compose.html">Compose</a></li>
                        <li><a href="important_mail.html">Important Mail</a></li>
                        <li><a href="mail_trash.html">Mail Trash</a></li>
                        <li><a href="chat.html">Chat</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/icon.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Icons</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="Fontawesome_Icon.html">Fontawesome Icon</a></li>
                        <li><a href="themefy_icon.html">themefy icon</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/18.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>UI Elements </span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="colors.html">colors</a></li>
                        <li><a href="Alerts.html">Alerts</a></li>
                        <li><a href="buttons.html">Buttons</a></li>
                        <li><a href="modal.html">modal</a></li>
                        <li><a href="dropdown.html">Droopdowns</a></li>
                        <li><a href="Badges.html">Badges</a></li>
                        <li><a href="Loading_Indicators.html">Loading Indicators</a></li>
                        <li><a href="color_plate.html">Color Plate</a></li>
                        <li><a href="typography.html">Typography</a></li>
                        <li><a href="datepicker.html">Date Picker</a></li>
                        <li><a href="wow_animation.html">Animate</a></li>
                        <li><a href="Scroll_Reveal.html">Scroll Reveal</a></li>
                        <li><a href="tilt.html">Tilt Animation</a></li>
                        <li><a href="navs.html">Navs</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/forms.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>forms</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="Basic_Elements.html">Basic Elements</a></li>
                        <li><a href="Groups.html">Groups</a></li>
                        <li><a href="Max_Length.html">Max Length</a></li>
                        <li><a href="Layouts.html">Layouts</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/14.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Widgets</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="accordion.html">Accordions</a></li>
                        <li><a href="Scrollable.html">Scrollable</a></li>
                        <li><a href="notification.html">Notifications</a></li>
                        <li><a href="carousel.html">Carousel</a></li>
                        <li><a href="Pagination.html">Pagination</a></li>
                        <li><a href="profilebox.html">Profile Box</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/17.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Table</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="data_table.html">Data Tables</a></li>
                        <li><a href="bootstrap_table.html">Bootstrap</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/16.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Charts</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="chartjs.html">ChartJS</a></li>
                        <li><a href="apex_chart.html">Apex Charts</a></li>
                        <li><a href="chart_sparkline.html">Chart sparkline</a></li>
                        <li><a href="am_chart.html">am-charts</a></li>
                        <li><a href="nvd3_charts.html">nvd3 charts.</a></li>
                    </ul>
                </li>
                <li className>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="nav_icon_small">
                            <img src="img/menu-icon/map.svg" alt="" />
                        </div>
                        <div className="nav_title">
                            <span>Maps</span>
                        </div>
                    </a>
                    <ul>
                        <li><a href="mapjs.html">Maps JS</a></li>
                        <li><a href="vector_map.html">Vector Maps</a></li>
                    </ul>
                </li> */}
            </ul>
        </nav>

    )
}

export default NarBar