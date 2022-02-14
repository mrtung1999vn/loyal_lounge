import React,{use} from 'react'
import host from '../service/host'
import { useHistory } from "react-router-dom";
import User from '../storage/User';
function DangNhap() {

    let history = useHistory();
    const [ taiKhoan,setTaiKhoan ] = React.useState('')
    const [ matKhau,setMatKhau ] = React.useState('')
    const [ otp,setOTP ] = React.useState('')
    const [ otpConfirm, setOtpConfirm] = React.useState('')
    const [count, setcount] = React.useState(0)

    // const [User,setUser] = React.useState('')
    const [UserHash,setUserHash] = React.useState('')

    const onClickDangNhap = async ()=>{
        try {
            console.log( { taiKhoan,matKhau })
            var val = Math.floor(1000 + Math.random() * 9000);
            var ten_tai_khoan = taiKhoan
            var mat_khau = matKhau
            var subject = 'OTP DashBoard loyal lounge'
            var text = `OTP is ${val}  (${taiKhoan})`

            const res = await fetch(host.WebDashDangNhap,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({ ten_tai_khoan, mat_khau, subject, text })
            })
            const content = await res.json()

            if( content.status === 1 ){
                alert('Please check OTP gmail!')
                setUserHash(content.data)
                setOTP( val )
            }else{
                alert('User session error!')
            }


        } catch (error) {
            console.log(error)
        }
    }

    const onClickOTP = async ()=>{
        try {
            console.log( {otp,otpConfirm} )
            if( otp.toString() ===  otpConfirm){
                alert('Successful verification!')
                User.setUserData( UserHash )
                window.location.href = "./"
            }else{
                setcount(count + 1)
                alert('User entered wrong otp! ')
            }
            if( count === 3){
                window.location.href = "/"
            }
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(async () => {
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.log(error)
        }
    }, [])
    
    if( otp !== '' ){
        return (
            <section className="main_content dashboard_part large_header_bg">
                <div className="container-fluid no-gutters">
                    <div className="row">
                        <div className="col-lg-12 p-0">
                            <div className="header_iner d-flex justify-content-between align-items-center">
                                <div className="sidebar_icon d-lg-none">
                                    <i className="ti-menu" />
                                </div>
                                <div className="line_icon open_miniSide d-none d-lg-block">
                                    <img src="img/line_img.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main_content_iner">
                    <div className="container-fluid p-0">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="dashboard_header mb_50">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="dashboard_header_title">
                                                <h3>Login</h3>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="dashboard_breadcam text-right">
                                                <p>
                                                    {/* <a href="index-2.html">Dashboard</a> */}
                                                    Verification code
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="white_box mb_30">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6">
                                            <div className="modal-content cs_modal">
                                                <div className="modal-header justify-content-center theme_bg_1">
                                                    <h5 className="modal-title text_white">Verification code</h5>
                                                </div>
                                                <div className="modal-body">
                                                    
                                                        {/* <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Enter your account" 
                                                            onChange={e=>setTaiKhoan(e.target.value)}
                                                            />
                                                        </div> */}
                                                        <div className="form-group">
                                                            <input  className="form-control" placeholder="Password"
                                                            value={otpConfirm} 
                                                            onChange={e=>setOtpConfirm(e.target.value)}
                                                            />
                                                        </div>
                                                        <a className="btn_1 full_width text-center"
                                                        style={{cursor:'pointer'}}
                                                        onClick={()=>onClickOTP()}
                                                        >Continue</a>
                                                        {/* <p>
                                                            Need an account?
                                                        </p> */}
                                                        {/* <div className="text-center">
                                                            <a href="#" data-toggle="modal" data-target="#forgot_password" data-dismiss="modal" className="pass_forget_btn">Forget Password?</a>
                                                        </div> */}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_part">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer_iner text-center">
                                    <p>
                                        2020 © Influence - Designed by
                                        <a href="#"> <i className="ti-heart" /> </a><a href="#"> DashboardPack</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }else{
        return (
            <section className="main_content dashboard_part large_header_bg">
                <div className="container-fluid no-gutters">
                    <div className="row">
                        <div className="col-lg-12 p-0">
                            <div className="header_iner d-flex justify-content-between align-items-center">
                                <div className="sidebar_icon d-lg-none">
                                    <i className="ti-menu" />
                                </div>
                                <div className="line_icon open_miniSide d-none d-lg-block">
                                    <img src="img/line_img.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main_content_iner">
                    <div className="container-fluid p-0">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="dashboard_header mb_50">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="dashboard_header_title">
                                                <h3>Login</h3>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="dashboard_breadcam text-right">
                                                <p>
                                                    {/* <a href="index-2.html">Dashboard</a> */}
                                                    Login
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="white_box mb_30">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6">
                                            <div className="modal-content cs_modal">
                                                <div className="modal-header justify-content-center theme_bg_1">
                                                    <h5 className="modal-title text_white">Log in</h5>
                                                </div>
                                                <div className="modal-body">
                                                    
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Enter your account" 
                                                            onChange={e=>setTaiKhoan(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control" placeholder="Password" 
                                                            onChange={e=>setMatKhau(e.target.value)}
                                                            />
                                                        </div>
                                                        <a className="btn_1 full_width text-center"
                                                        style={{cursor:'pointer'}}
                                                        onClick={()=>onClickDangNhap()}
                                                        >Log in</a>
                                                        {/* <p>
                                                            Need an account?
                                                        </p> */}
                                                        {/* <div className="text-center">
                                                            <a href="#" data-toggle="modal" data-target="#forgot_password" data-dismiss="modal" className="pass_forget_btn">Forget Password?</a>
                                                        </div> */}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_part">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer_iner text-center">
                                    <p>
                                        2020 © Influence - Designed by
                                        <a href="#"> <i className="ti-heart" /> </a><a href="#"> DashboardPack</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default DangNhap