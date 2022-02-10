import React, { useState } from 'react'
import {positions, useAlert} from 'react-alert'
import Alert from '../../../../libs/Alert'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
function ThemKhachHang({UpdateThemKhachHang}) {
    // {ten_kh,dia_chi,so_dt,cmnd,ngay_sinh,email}
    const alert = useAlert()
    const [ten_kh,setten_kh] = useState('')
    const [dia_chi,setdia_chi] = useState('')
    const [so_dt,setso_dt] = useState('')
    const [cmnd,setcmnd] = useState('')
    const [ngay_sinh,setngay_sinh] = useState('2021-01-01')
    const [email,setemail] = useState('')
    // const [xacnhan_mk,setxacnhan_mk] = useState('')

    const DefaulValue = ()=>{
        setten_kh('');setdia_chi('')
        setso_dt('');setcmnd('')
        setngay_sinh('');setemail('')
    }

    const onClickThemKhachHang =  async()=>{
        try {
            if(ten_kh === ''  || email === '' || so_dt === '' ||  
                email.indexOf('@gmail.com') < 0
            ){
                alert.info(
                    email.indexOf('@gmail.com') < 0 ? "Người dùng nhập sai email" : 
                    ten_kh === '' ? 'Người dùng điền tên khách hàng!' : 
                    dia_chi === '' ? 'Người dùng điền địa chỉ!' :
                    email === '' ? 'Người dùng điền Email' :'Người dùng chưa điền số ĐT'

                ,{position:positions.BOTTOM_CENTER})
            }else{
                // console.log({
                //     trangthai
                // })
                var token = (await Token.Token()).toString()
                console.log({ten_kh,dia_chi,so_dt,cmnd,ngay_sinh,email,token})
                console.log(host.DSKhachHangThem)
                const response = await fetch(host.DSKhachHangThem,{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({ten_kh,dia_chi,so_dt,cmnd,ngay_sinh,email,token})})
                const JsonData = await response.json()
                // console.log(JsonData)
                if( JsonData.status === 1 ){
                    // helolo ok đc rời
                    alert.success(JsonData.message,{position:positions.BOTTOM_CENTER})
                    DefaulValue()
                    UpdateThemKhachHang(JsonData.data)
                }else{
                    alert.info(JsonData.message,{position:positions.BOTTOM_CENTER})
                }
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="row" onKeyPress={e=>e.key ==="Enter" ? onClickThemKhachHang() : ''}>
            <div className="col-md-12">
                <div className="card card-primary">
                    <div className="card-header">
                        {/* <h3 className="card-title">Quick Example</h3> */}
                    </div>
                    <div className="card-body">
                        <div className="row ">
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Tên khách hàng</label>
                                    <input type="text" 
                                    className="form-control" id="exampleInputEmail1"
                                    value={ten_kh}
                                    onChange={e=>setten_kh(e.target.value)}
                                    placeholder="Khách hàng" />
                                </div>
                            </div>
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Địa chỉ</label>
                                    <input className="form-control"
                                    value={dia_chi}
                                    placeholder="Địa chỉ"
                                    onChange={e=>setdia_chi(e.target.value)} />
                                </div>
                            </div>
                        </div>


                    <div className="row">
                        <div className="col col-sm-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Số ĐT</label>
                                <input type="text" 
                                className="form-control" id="exampleInputEmail1" 
                                value={so_dt}
                                onChange={e=>setso_dt(e.target.value)}
                                placeholder="Số ĐT" />
                            </div>
                        </div>
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
                        {/* <div className="col col-sm-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">CMND</label>
                                <input type="text" className="form-control" 
                                id="exampleInputEmail1" 
                                value={cmnd}
                                onChange={e=>setcmnd(e.target.value)}
                                placeholder="CMND" />
                            </div>
                        </div> */}
                    </div>


                    <div className="row ">
                        {/* <div className="col col-sm-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="text" 
                                className="form-control" 
                                value={email}
                                onChange={e=>setemail(e.target.value)}
                                id="exampleInputEmail1" placeholder="Email" />
                            </div>
                        </div> */}
                        <div className="col col-sm-6">
                        {/* <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Ngày sinh</label>
                                <input type="date" 
                                className="form-control" 
                                value={ngay_sinh}
                                onChange={e=>setngay_sinh(e.target.value)}
                                />
                            </div> */}
                        </div>
                    </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary"
                        onClick={onClickThemKhachHang}
                        style={{float:'right'}}>Thêm khách hàng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemKhachHang
