import React from 'react'
import func from '../asset/func'
import host from '../service/host'
import {
    Provider as AlertProvider,
    useAlert,
    positions,
    transitions
} from 'react-alert'
import QuenMatKhau from './Login/QuenMatKhau'
import XacThucOTP from './Login/XacThucOTP'
import User from '../storage/User'


function Login() {
    // Thông báo 
    const alert = useAlert()

    // Sự kiện chuyển form  (onSwitchForm)     Đăng nhập  <=> Quên mật khẩu
    const [onSwitchForm, setOnSwitchForm] = React.useState(false)

    // Dữ liệu Tài khoản, Mật khẩu, OTP kiểm tra trên gmail
    const [TaiKhoan, setTaiKhoan] = React.useState('')
    const [MatKhau, setMatKhau] = React.useState('')
    const [otp, setOTP] = React.useState('')

    // Bắt sự kiện click Đăng nhập gửi dữ liệu xuống bên dưới kiểm tra
    const onClickDangNhap = async () => {
        try {
            if (TaiKhoan.length === 0 || MatKhau.length === 0) {

                alert.error(TaiKhoan.length === 0 ? "Người dùng chưa điền tài khoản!" : "Người dùng chưa điền mật khẩu!", { position: positions.TOP_CENTER })
            } else {
                const responseToken = await fetch(host.token)
                const _Token = await responseToken.json()
                if (_Token.status === 1) {
                    const token = func.DecodeString_AES("0366262072", _Token.data).toString() + host.SHOP
                    //console.log(token)
                    const responseDangNhap = await fetch(host.DangNhap, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token, TaiKhoan, MatKhau })
                    })
                    const JsonData = await responseDangNhap.json()
                    if (JsonData.status === 1) {

                        setOTP(func.DecodeString_AES("0366262072", JsonData.OTP.toString()))

                        User.setUserLogin(func.EncodeJson(JsonData.data))

                        console.log("=======================")

                        // console.log( User.getUserLogin()  )

                        alert.info("Xin vui lòng nhập mã OTP đăng nhập", { position: positions.TOP_CENTER })

                        window.location.href = "./"

                    } else {
                        alert.error(JsonData.message, { position: positions.TOP_CENTER })
                    }

                } else {

                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    React.useEffect(async () => {
        try {
            const response = await fetch(host.token)
            const JsonData = await response.json()
            //console.log(JsonData)
        } catch (error) { }
    })

    // if(otp !== ''){
    //     return(
    //         <XacThucOTP onClickTroVe={()=> {setOnSwitchForm(false);setOTP('')} } otp={otp}></XacThucOTP>
    //     )
    // }else{
    //console.log(otp)
    if (!onSwitchForm) {
        return (
            <div className="login-page"
                onKeyPress={e => e.key === "Enter" ? onClickDangNhap() : ''}>
                <div className="login-box">
                    <div className="login-logo">
                        <a href=""><b>Quản lý </b>bán hàng</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Đăng nhập</p>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Tài khoản"
                                        onChange={e => setTaiKhoan(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-user" />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Mật khẩu"
                                        onChange={e => setMatKhau(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary btn-block"
                                            onClick={() => onClickDangNhap()}
                                        >Đăng nhập</button>
                                    </div>
                                </div>
                            </div>

                            <p className="mb-1 mt-2">
                                <a style={{ float: 'right', cursor: 'pointer', color: '#007bff' }} onClick={() => setOnSwitchForm(true)}>Quên mật khẩu</a>
                            </p>
                            <p className="mb-0">
                                <a href="register.html" className="text-center"></a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <QuenMatKhau onClickTroVe={() => setOnSwitchForm(false)}></QuenMatKhau>
        )
    }
    // }
}
export default Login
