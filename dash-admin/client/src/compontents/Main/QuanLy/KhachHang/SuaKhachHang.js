import React, { Fragment ,useState,useEffect} from 'react'
import func from '../../../../asset/func'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
import {
    Provider as AlertProvider,
    useAlert,
    positions,
    transitions
} from 'react-alert'
import $ from 'jquery'
import { timeout } from 'q'
import TimeLibrary from '../../../../asset/TimeLibrary'
function SuaKhachHang({ dulieu, onSuaKhachHang }) {
    // const alert = useAlert()
    const [anHien, setAnHien] = React.useState(false)
    const [id_kh, setid_kh] = React.useState(dulieu.id_kh)
    const [ten_kh,setten_kh] = useState(dulieu.ten_kh)
    const [dia_chi,setdia_chi] = useState(dulieu.dia_chi)
    const [so_dt,setso_dt] = useState(dulieu.so_dt)
    const [cmnd,setcmnd] = useState(dulieu.cmnd)
    const [ngay_sinh,setngay_sinh] = useState(TimeLibrary.convertTimeDateTime(TimeLibrary.convertTime(dulieu.ngay_sinh)))
    const [email,setemail] = useState(dulieu.email)

    // ORDER 0 phi
    const [password,setPassword] = useState(dulieu.password)
    const [ti_gia_tinh,setti_gia_tinh] = useState(dulieu.ti_gia_tinh)
    const [tien_theo_can,settien_theo_can] = useState(dulieu.tien_theo_can)
    const [tien_theo_khoi,settien_theo_khoi] = useState(dulieu.tien_theo_khoi)
    
    const onClickSuaKhachHang = async () => {
        try {
            if(ten_kh === ''  || email === '' || so_dt === ''  || 
   
                email.indexOf('@gmail.com') < 0
            ){
                alert(
                    !func.isNumeric(ti_gia_tinh) ? "Người dùng nhập lại tỉ giá tính" :
                    email.indexOf('@gmail.com') < 0 ? "Người dùng nhập sai email" : 
                    ten_kh === '' ? 'Người dùng điền tên khách hàng!' : 
                    dia_chi === '' ? 'Người dùng điền địa chỉ!' :
                    email === '' ? 'Người dùng điền Email' :
                    so_dt === '' ? 'Người dùng chưa điền số ĐT' : "Người dùng chưa điền CMND"
                ,{position:positions.BOTTOM_CENTER})
            } else {
                var token = await Token.Token()
                const response = await fetch(host.DSKhachHangSua, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ten_kh,dia_chi,so_dt,cmnd,ngay_sinh,email,id_kh,token,password,ti_gia_tinh,tien_theo_can,tien_theo_khoi})
                })
                const JsonData = await response.json()
                console.log("a")
                if (JsonData.status === 1) {
                    alert("Lưu thành công!")
                    onSuaKhachHang(JsonData.data)
                } else {

                    alert("Lưu không thành công!")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setngay_sinh(TimeLibrary.convertTimeDateTime(TimeLibrary.convertTime(dulieu.ngay_sinh)))
        return () => {
            
        }
    }, [])
    // console.log(ngay_sinh)
    return (
        <Fragment>
            <button className="btn btn-info btn-sm"
                onClick={() => timeout(() => { $(`#onClickSuaKhachHang${id_kh}`).atr("data-dismiss", '') }, 1000)}

                style={{ width: '60px' }}
                data-toggle="modal" data-target={`#IDSuaKhachHang${dulieu.id_kh}`}>
                <i className="fas fa-pencil-alt">
                </i>
                Sửa
            </button>
            {/* Modal */}
            <div className="modal fade" id={`IDSuaKhachHang${dulieu.id_kh}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sửa tài khoản</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" onKeyPress={(e)=> e.key ==="Enter" ? onClickSuaKhachHang() :""}>
                            <label>Tên khách hàng</label>
                            <input className="form-control" value={ten_kh}
                                onChange={e => setten_kh(e.target.value)}
                            ></input>

                            <label>Địa chỉ</label>
                            <input className="form-control" value={dia_chi}
                                onChange={e => setdia_chi(e.target.value)}
                            ></input>

                            <label>Số ĐT <label style={{color:'green'}}>(Tài khoản Đăng NHẬP Khách)</label></label>
                            <input className="form-control" value={so_dt}
                                onChange={e => setso_dt(e.target.value)}
                            ></input>

                            <label>PassWord</label>
                            <input className="form-control" value={password}
                                onChange={e => setPassword(e.target.value)}
                            ></input>

                            <label>Tỉ giá tính ({parseInt(ti_gia_tinh).toLocaleString('vi', {style : 'currency', currency : 'VND'})})</label>
                            <input className="form-control" value={ti_gia_tinh}
                                onChange={e => setti_gia_tinh(e.target.value)}
                            ></input>
                            <label>Tiền theo cân ({parseInt(tien_theo_can).toLocaleString('vi', {style : 'currency', currency : 'VND'})})</label>
                            <input className="form-control" value={tien_theo_can}
                                onChange={e => settien_theo_can(e.target.value)}
                            ></input>
                            <label>Tiền theo khối ({parseInt(tien_theo_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})})</label>
                            <input className="form-control" value={tien_theo_khoi}
                                onChange={e => settien_theo_khoi(e.target.value)}
                            ></input>
{/* 
                            <label>CMND</label>
                            <input className="form-control" value={cmnd}
                                onChange={e => setcmnd(e.target.value)}
                            ></input>
                            <label>Ngày sinh</label>
                            <input className="form-control" 
                            type="date"
                            value={ngay_sinh}
                                onChange={e => setngay_sinh(e.target.value)}
                            ></input> */}

                            <label>Email</label>
                            <input className="form-control"
                            value={email}
                                onChange={e => setemail(e.target.value)}
                            ></input>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                            <button type="button" className="btn btn-primary" id={`onClickSuaKhachHang${id_kh}`}
                                onClick={() => onClickSuaKhachHang()}
                            >Lưu</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default SuaKhachHang
