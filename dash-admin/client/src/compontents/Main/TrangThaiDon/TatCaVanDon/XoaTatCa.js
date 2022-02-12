import React, { Fragment ,useState} from 'react'
import func from '../../../../asset/func'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
import {
    Provider as AlertProvider,
    useAlert,
    positions,
    transitions
  } from 'react-alert'
function XoaNganhHang({ dulieu ,onXoaNganhHang}) {
    const [id_kh, setid_kh] = React.useState(dulieu.id_kh)
    const [ten_kh,setten_kh] = useState(dulieu.ten_kh)
    const [dia_chi,setdia_chi] = useState(dulieu.dia_chi)
    const [so_dt,setso_dt] = useState(dulieu.so_dt)
    const [cmnd,setcmnd] = useState(dulieu.cmnd)
    const [ngay_sinh,setngay_sinh] = useState(dulieu.ngay_sinh)
    const [email,setemail] = useState(dulieu.email)
    const alert = useAlert()
    const onClickXoaNganhHang = async () => {
        try {
                var token = await Token.Token()
                const response = await fetch(host.DSNganhHangXoa,{
                    method:"DELETE",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({token,ten_kh,id_kh})})
                const JsonData = await response.json()
                
                if(JsonData.status === 1){
                    alert.success("Xóa thành công!" ,{position: positions.BOTTOM_CENTER})
                    onXoaNganhHang(id_kh)
                }else{
                    alert.error("Xóa không thành công!" ,{position: positions.BOTTOM_CENTER})
                }
                // console.log(JsonData)

        } catch (error) {

        }
    }
    
    return (
        <Fragment>
            <button className="btn btn-danger btn-sm" data-toggle="modal" data-target={`#IDXoaNganhHang${id_kh}`}
                style={{ width: '60px' }}>
                <i className="fas fa-trash">
                </i>
                Xoá
            </button>
            {/* Modal */}
            <div className="modal fade" id={`IDXoaNganhHang${id_kh}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Bạn muốn xóa khách hàng {ten_kh}? </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Tên khách hàng</label>
                            <input className="form-control" value={ten_kh} disabled={true}
                                onChange={e => setten_kh(e.target.value)}
                            ></input>

                            <label>Địa chỉ</label>
                            <input className="form-control" value={dia_chi} disabled={true}
                                onChange={e => setdia_chi(e.target.value)}
                            ></input>

                            <label>Số ĐT</label>
                            <input className="form-control" value={so_dt} disabled={true}
                                onChange={e => setso_dt(e.target.value)}
                            ></input>

                            <label>CMND</label>
                            <input className="form-control" value={cmnd} disabled={true}
                                onChange={e => setcmnd(e.target.value)}
                            ></input>
                            <label>Ngày sinh</label>
                            <input className="form-control"  disabled={true}
                            type="date"
                            value={ngay_sinh}
                                onChange={e => setngay_sinh(e.target.value)}
                            ></input>

                            <label>Email</label>
                            <input className="form-control" disabled={true}
                            value={email}
                                onChange={e => setemail(e.target.value)}
                            ></input>
                        </div>



                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                onClick={() => onClickXoaNganhHang()}
                            >Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default XoaNganhHang
