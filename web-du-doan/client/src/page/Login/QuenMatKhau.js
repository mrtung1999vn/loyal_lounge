import React from 'react'
import {
    Provider as AlertProvider,
    useAlert,
    positions,
    transitions
  } from 'react-alert'
import func from '../../asset/func'
import host from '../../service/host'
import Token from '../../storage/Token'
// Quên mật khẩu khi click trở về truyền thao tác lên phần form 
// thực hiện setState lại setOnSwitchForm(false)

// Quên mật khẩu đăng nhập đúng tài khoản có trong hệ thống, hệ thống
// sẽ gửi reset mã trên gmail
const QuenMatKhau = ({onClickTroVe})=>{
    const alert = useAlert()
    const [TaiKhoan,setTaiKhoan] = React.useState('')
    const onClickQuenMatKhau = async ()=>{
        try {
            console.log(TaiKhoan)
            if(TaiKhoan.length === 0 ){
                alert.info("Người dùng chưa điền tài khoản",{position: positions.TOP_CENTER})
            }else{
                var token = (await Token.Token()).toString()

                const response = await fetch(host.QuenMatKhau,{
                    method:'POST',
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({TaiKhoan,token})
                })
                const JsonData = await response.json()
                if(JsonData.status === 0 ){
                    alert.info(JsonData.message,{position: positions.TOP_CENTER})
                    setTaiKhoan('')
                }
                else{
                    alert.success("Kiểm tra email của bạn",{position: positions.TOP_CENTER})
                    setTaiKhoan('')
                }
                // console.log(JsonData)
            }
        } catch (error) {
            console.log(error)
        }   
    }
    return(
        <div className="login-page" >
        <div className="login-box">
            <div className="login-logo">
                <a href=""><b>Quản lý </b>bán hàng</a>
            </div>
            <div className="card">
                <div className="card-body login-card-body" onKeyPress={e=>e.key ==="Enter" ? onClickQuenMatKhau() : ""}>
                    <p className="login-box-msg">Quên mật khẩu</p>
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control"
                            value={TaiKhoan}
                            name="QuenMatKhau"
                            onChange={e=>setTaiKhoan(e.target.value)}
                            placeholder="Điền tài khoản người dùng" />
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
                                <label>Mật khẩu mới gửi về tài khoản đã đăng ký gmail</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block"
                                onClick={()=>onClickQuenMatKhau()}
                                >Gửi</button>
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


export default QuenMatKhau
