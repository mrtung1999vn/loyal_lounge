import React, { Fragment } from 'react'
import func from '../../../../asset/func'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
import {
    Provider as AlertProvider,
    useAlert,
    positions,
    transitions
  } from 'react-alert'
function XoaTaiKhoan({ dulieu ,onXoaTaiKhoan}) {
    const [anHien, setAnHien] = React.useState(false)
    const [id_tk, setid_tk] = React.useState(dulieu.id_tk)
    const [tai_khoan, settai_khoan] = React.useState(dulieu.tai_khoan)
    const [mat_khau, setmat_khau] = React.useState(func.DecodeString(dulieu.tai_khoan, dulieu.mat_khau))
    const [mat_khau_lai, setmat_khau_lai] = React.useState('')
    const [ngay, setngay] = React.useState(dulieu.ngay)
    const [trangthai, settrangthai] = React.useState(dulieu.trangthai)
    const [email, setemail] = React.useState(dulieu.email)
    const [loai_tk, setloai_tk] = React.useState(dulieu.loai_tk)
    const [ten_nguoi_dung, setten_nguoi_dung] = React.useState(dulieu.ten_nguoi_dung)
    const alert = useAlert()
    const onClickXoaTaiKhoan = async () => {
        try {
                var token = await Token.Token()
                const response = await fetch(host.DSTaiKhoanXoa,{
                    method:"DELETE",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({token,tai_khoan})})
                const JsonData = await response.json()
                
                if(JsonData.status === 1){
                    alert.success("Xóa thành công!" ,{position: positions.BOTTOM_CENTER})
                    onXoaTaiKhoan(id_tk)
                }else{
                    alert.error("Xóa không thành công!" ,{position: positions.BOTTOM_CENTER})
                }
                console.log(JsonData)
        } catch (error) {

        }
    }

    return (
        <Fragment>
            <button className="btn btn-danger btn-sm" data-toggle="modal" data-target={`#IDXoaTaiKhoan${id_tk}`}
                style={{ width: '60px' }}>
                <i className="fas fa-trash">
                </i>
                Xoá
            </button>
            {/* Modal */}
            <div className="modal fade" id={`IDXoaTaiKhoan${id_tk}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Bạn muốn xóa tài khoản {tai_khoan}? </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Tên người dùng</label>
                            <input className="form-control" value={ten_nguoi_dung}
                                disabled={true}
                                onChange={e => setten_nguoi_dung(e.target.value)}
                            ></input>

                            <label>Tài khoản</label>
                            <input className="form-control" value={tai_khoan}
                            disabled={true}
                                onChange={e => settai_khoan(e.target.value)}
                            ></input>

                            <label>Mật khẩu</label>
                            <input className="form-control"
                                onChange={e => setmat_khau(e.target.value)}
                                type={anHien === false ? "password" : "text"}
                                value={mat_khau}
                                // disabled={!anHien}
                                disabled={true}
                                style={{ width: '80%' }}></input>
                            <button className="btn btn-primary" onClick={() => setAnHien(!anHien)} style={{ width: '20%', float: 'right', marginTop: '-38px' }}>{
                                anHien === false ? "Hiện" : "Ẩn"
                            }</button>

                            <label>Nhập lại mật khẩu</label>
                            <input className="form-control" value={mat_khau_lai}
                            disabled={true}
                                onChange={e => setmat_khau_lai(e.target.value)}></input>
                            <label>Email</label>
                            <input className="form-control" value={email}
                            disabled={true}></input>
                            <label>Loại tài khoản</label>
                            <select className="form-control"
                            disabled={true}>
                                <option value="true" selected={loai_tk === "Tài khoản hệ thống"}>Tài khoản hệ thống</option>
                                <option value="false" selected={loai_tk !== "Tài khoản hệ thống"}>Tài khoản khách</option>
                            </select>
                            <label>Trạng thái</label>
                            <select className="form-control" disabled={true}>
                                <option value="true" selected={trangthai === true}>True</option>
                                <option value="false" selected={trangthai !== true}>False</option>
                            </select>
                            {/* <input className="form-control" value={trangthai}></input> */}
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                onClick={() => onClickXoaTaiKhoan()}
                            >Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default XoaTaiKhoan
