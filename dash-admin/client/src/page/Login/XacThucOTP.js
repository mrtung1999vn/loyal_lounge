import React from 'react'
import {
    Provider as AlertProvider,
    useAlert,
    positions,
    transitions
  } from 'react-alert'
import func from '../../asset/func'
import User from '../../storage/User'
import $ from 'jquery'

const XacThucOTP = ({onClickTroVe,otp})=>{
    // Thông báo 
    const alert = useAlert()
    const [confirmOtp,setCofirmOtp] = React.useState('')

    const onClickXacThucOTP = ()=>{
        try {
            $( "#onClickXacNhanTaiKhoan" ).prop( "disabled", false );
            if(otp === confirmOtp){
                
                alert.success("Xác thực mật khẩu thành công!",{position: positions.TOP_CENTER})
                // User.setUserLogin(func.EncodeJson(User.getUser()))
                //  User.setUserLogin(JSON.stringify(User.getUser()))
                //  User.clearUser()
                setTimeout(()=>{
                    // window.location.href = "./"
                    $( "#onClickXacNhanTaiKhoan" ).prop( "disabled", true );
                },1500)
            }else{
                alert.error("Xác thực mật khẩu không đúng!",{position: positions.TOP_CENTER})
            }
        } catch (error) {
            
        }
    }

    React.useEffect( async ()=>{
        try{
            // alert.success("Xác thực mật khẩu thành công!",{position: positions.TOP_CENTER})
            // User.setUserLogin(func.EncodeJson(User.getUser()))
            // //  User.setUserLogin(JSON.stringify(User.getUser()))
            //  User.clearUser()
            // setTimeout(()=>{
            //     // window.location.href = "./"
            //     $( "#onClickXacNhanTaiKhoan" ).prop( "disabled", true );
            // },1500)
        }catch(error){

        }
    },[])
    return(
        <div className="login-page" onKeyPress={e=>e.key === "Enter" ? onClickXacThucOTP() : ''}>
        <div className="login-box">
            <div className="login-logo">
                <a href=""><b>Quản lý </b>bán hàng</a>
            </div>
            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Xác thực OTP người dùng</p>
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" 
                            
                            placeholder="Điền mã OTP" 
                            onChange={e=>setCofirmOtp(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user" />
                                </div>
                            </div>
                        </div>
                        {/* <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Mật khẩu" />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-12">
                                {/* <label>Điền tài khoản người dùng</label> */}
                                <label>Nhập mã xác thực</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block"
                                id="onClickXacNhanTaiKhoan"
                                onClick={onClickXacThucOTP}
                                >Xác nhận</button>
                            </div>
                        </div>
                    </div>

                    <p className="mb-1 mt-2">
                        <a style={{ float: 'right', cursor: 'pointer', color: '#007bff' }} 
                        onClick={()=> onClickTroVe(true)}
                        >Trở về</a>
                    </p>
                    <p className="mb-0">
                        <a href="register.html" className="text-center"></a>
                    </p>
                </div>
            </div>
        </div>

    </div>
    )
}


export default XacThucOTP
