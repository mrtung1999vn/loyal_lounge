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
import $ from 'jquery'
import { timeout } from 'q'
function SuaTaiKhoan({ dulieu, onSuaTaiKhoan }) {
    // const alert = useAlert()
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

    const onClickSuaTaiKhoan = async () => {
        try {
            if (anHien === true && (mat_khau_lai.length === 0 || mat_khau_lai !== mat_khau)) {
                alert(
                    mat_khau_lai.length === 0 ? "Điền nhập lại mật khẩu" : ""
                )
            } else {
                var token = await Token.Token()
                const response = await fetch(host.DSTaiKhoanSua, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({id_tk,tai_khoan,mat_khau,ngay,ten_nguoi_dung,loai_tk,email,trangthai,token})
                })
                const JsonData = await response.json()
                console.log("a")
                if (JsonData.status === 1) {
                    alert("Lưu thành công!")
                    onSuaTaiKhoan(JsonData.data)
                } else {

                    alert("Lưu không thành công!")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <button className="btn btn-info btn-sm"
                onClick={() => timeout(() => { $(`#onClickSuaTaiKhoan${id_tk}`).atr("data-dismiss", '') }, 1000)}

                style={{ width: '60px' }}
                data-toggle="modal" data-target={`#IDSuaTaiKhoan${dulieu.id_tk}`}>
                <i className="fas fa-pencil-alt">
                </i>
                Sửa
            </button>
            {/* Modal */}
            <div className="modal fade" id={`IDSuaTaiKhoan${dulieu.id_tk}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sửa tài khoản</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" onKeyPress={(e)=> e.key ==="Enter" ? onClickSuaTaiKhoan() :""}>
                            <label>Tên người dùng</label>
                            <input className="form-control" value={ten_nguoi_dung}
                                onChange={e => setten_nguoi_dung(e.target.value)}
                            ></input>

                            <label>Tài khoản</label>
                            <input className="form-control" value={tai_khoan}
                                onChange={e => settai_khoan(e.target.value)}
                            ></input>

                            <label>Mật khẩu</label>
                            <input className="form-control"
                                onChange={e => setmat_khau(e.target.value)}
                                type={anHien === false ? "password" : "text"}
                                value={mat_khau}
                                disabled={!anHien}
                                style={{ width: '80%' }}></input>
                            <button className="btn btn-primary" onClick={() => setAnHien(!anHien)} style={{ width: '20%', float: 'right', marginTop: '-38px' }}>{
                                anHien === false ? "Hiện" : "Ẩn"
                            }</button>

                            <label>Nhập lại mật khẩu</label>
                            <input className="form-control" value={mat_khau_lai}
                                onChange={e => setmat_khau_lai(e.target.value)}></input>
                            <label>Email</label>
                            <input className="form-control" value={email} onChange={e=>setemail(e.target.value)}></input>
                            <label>Loại tài khoản</label>
                            <select className="form-control" onChange={e=>setloai_tk(e.target.value)}>
                                <option value="Tài khoản hệ thống" selected={loai_tk === "Tài khoản hệ thống"}>Tài khoản hệ thống</option>
                                <option value="Tài khoản khách" selected={loai_tk !== "Tài khoản hệ thống"}>Tài khoản khách</option>
                            </select>
                            <label>Trạng thái</label>
                            <select className="form-control" onChange={e=>settrangthai(e.target.value === "true" ? true : false)}>
                                <option value="true" selected={trangthai === true}>True</option>
                                <option value="false" selected={trangthai !== true}>False</option>
                            </select>
                            {/* <input className="form-control" value={trangthai}></input> */}
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                            <button type="button" className="btn btn-primary" id={`onClickSuaTaiKhoan${id_tk}`}
                                onClick={() => onClickSuaTaiKhoan()}
                            >Lưu</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default SuaTaiKhoan
