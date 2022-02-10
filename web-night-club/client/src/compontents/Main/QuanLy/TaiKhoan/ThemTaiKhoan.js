import React, { useState } from 'react'
import {positions, useAlert} from 'react-alert'
import Alert from '../../../../libs/Alert'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
function ThemTaiKhoan({UpdateThemTaiKhoan}) {
    const alert = useAlert()
    const [tai_khoan,settai_khoan] = useState('')
    const [loai_tk,setloai_tk] = useState('')
    const [email,setemail] = useState('')
    const [mat_khau,setmat_khau] = useState('')
    const [trangthai,settrangthai] = useState(false)
    const [ten_nguoi_dung,setten_nguoi_dung] = useState('')
    const [xacnhan_mk,setxacnhan_mk] = useState('')

    const DefaulValue = ()=>{
        settai_khoan('');setloai_tk('')
        setemail('');setmat_khau('')
        settrangthai('');setten_nguoi_dung('')
        setxacnhan_mk('');settrangthai(false)
    }

    const onClickThemTaiKhoan =  async()=>{
        try {
            if(tai_khoan === '' || loai_tk === '' || email === '' || mat_khau === '' 
            || ten_nguoi_dung === '' || xacnhan_mk === '' || mat_khau !== xacnhan_mk || email.indexOf('@gmail.com') < 0
            ){
                alert.info(
                    email.indexOf('@gmail.com') < 0 ? "Người dùng nhập sai email" : 
                    tai_khoan === '' ? 'Người dùng điền tài khoản!' : 
                    loai_tk === '' ? 'Người dùng chọn loại tài khoản' :
                    email === '' ? 'Người dùng điền Email' :
                    ten_nguoi_dung === '' ? 'Điền tên người dùng' : 
                    mat_khau === '' ? 'Người dùng điền mật khẩu' : 
                    xacnhan_mk === '' ? 'Người dùng điền xác nhận mật khẩu' : 'Người dùng xác nhận lại mật khẩu'
                ,{position:positions.BOTTOM_CENTER})
            }else{
                // console.log({
                //     trangthai
                // })
                var token = (await Token.Token()).toString()
                const response = await fetch(host.DSTaiKhoanThem,{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({token,tai_khoan,mat_khau,trangthai,ten_nguoi_dung,loai_tk,email})})
                const JsonData = await response.json()
                // console.log(JsonData)
                if( JsonData.status === 1 ){
                    alert.success(JsonData.message,{position:positions.BOTTOM_CENTER})
                    DefaulValue()
                    UpdateThemTaiKhoan(JsonData.data)
                }else{
                    alert.info(JsonData.message,{position:positions.BOTTOM_CENTER})
                }
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="row" onKeyPress={e=>e.key ==="Enter" ? onClickThemTaiKhoan() : ''}>
            <div className="col-md-12">
                <div className="card card-primary">
                    <div className="card-header">
                        {/* <h3 className="card-title">Quick Example</h3> */}
                    </div>
                    <div className="card-body">
                    <div className="row ">
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Tên người dùng</label>
                                    <input type="text" 
                                    className="form-control" id="exampleInputEmail1"
                                    value={ten_nguoi_dung}
                                    onChange={e=>setten_nguoi_dung(e.target.value)}
                                    placeholder="Tài khoản" />
                                </div>
                            </div>
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Loại tài khoản</label>
                                    <select className="form-control"
                                    value={loai_tk}
                                    onChange={e=>setloai_tk(e.target.value)}
                                    >
                                        <option className="">Chọn loại tài khoản</option>
                                        <option className="Tài khoản hệ thống">Tài khoản hệ thống</option>
                                        <option className="Tài khoản khách">Tài khoản khách</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Tài khoản</label>
                                    <input type="text" 
                                    className="form-control" id="exampleInputEmail1" 
                                    value={tai_khoan}
                                    onChange={e=>settai_khoan(e.target.value)}
                                    placeholder="Tài khoản" />
                                </div>
                            </div>
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Mật khẩu</label>
                                    <input type="password" className="form-control" 
                                    id="exampleInputEmail1" 
                                    value={mat_khau}
                                    onChange={e=>setmat_khau(e.target.value)}
                                    placeholder="Mật khẩu" />
                                </div>
                            </div>
                        </div>


                        <div className="row ">
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input type="text" 
                                    className="form-control" 
                                    value={email}
                                    onChange={e=>setemail(e.target.value)}
                                    id="exampleInputEmail1" placeholder="Email" />
                                </div>
                            </div>
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Xác nhận mật khẩu</label>
                                    <input type="password" className="form-control" 
                                    id="exampleInputEmail1" placeholder="Xác nhận mật khẩu"
                                    value={xacnhan_mk} 
                                    onChange={e=>setxacnhan_mk(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="exampleInputFile">File input</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="exampleInputFile" />
                                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text">Upload</span>
                                </div>
                            </div>
                        </div> */}
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" 
                            onClick={async ()=>settrangthai(!trangthai)}
                            checked={trangthai}
                            id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Bạn có muốn kích hoạt tài khoản?</label>
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary"
                        onClick={onClickThemTaiKhoan}
                        style={{float:'right'}}>Thêm tài khoản</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemTaiKhoan
