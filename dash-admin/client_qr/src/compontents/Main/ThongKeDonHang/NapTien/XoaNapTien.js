import React, { Fragment ,useState, useEffect} from 'react'
import func from '../../../../asset/func'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'


import {
    Provider as AlertProvider,
    useAlert,
    positions,
    transitions
  } from 'react-alert'
  function convertTime(str){
    const date = new Date(str)
    // console.log()
    return `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
}
function XoaNapTien({ dulieu ,onXoaNapTien}) {
    const [id_nap, setid_nap] = React.useState(dulieu.id_nap)
    const [id_kh, setid_kh] = React.useState(dulieu.id_kh)
    const [ten_kh,setten_kh] = useState(dulieu.ten_kh)
    const [tien_nap,settien_nap] = useState(dulieu.tien_nap)
    const [ngay_nap,setngay_nap] = useState(dulieu.ngay_nap)
    const alert = useAlert()
    const onClickXoaNapTien = async () => {
        try {
                var token = await Token.Token()
                const response = await fetch(host.XoaNapTien+`/${id_nap}`,{
                    method:"DELETE",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({token})})
                const JsonData = await response.json()
                
                if(JsonData.status === 1){
                    alert.success("Xóa thành công!" ,{position: positions.BOTTOM_CENTER})
                    onXoaNapTien(id_kh)
                }else{
                    alert.error("Xóa không thành công!" ,{position: positions.BOTTOM_CENTER})
                }
                // console.log(JsonData)

        } catch (error) {

        }
    }
    useEffect(() => {
        setid_nap(dulieu.id_nap)
        setid_kh(dulieu.id_kh)
        setten_kh(dulieu.ten_kh)
        settien_nap(dulieu.tien_nap)
        setngay_nap(dulieu.ngay_nap)
    }, [dulieu.id_nap,dulieu.id_kh,dulieu.ten_kh,dulieu.tien_nap,dulieu.ngay_nap])
    
    return (
        <Fragment>
            <button className="btn btn-danger btn-sm" data-toggle="modal" data-target={`#IDXoaNapTien${id_nap}`}
                style={{ width: '60px' }}>
                <i className="fas fa-trash">
                </i>
                Xoá
            </button>
            {/* Modal */}
            <div className="modal fade" id={`IDXoaNapTien${id_nap}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Bạn muốn tiền nạp khách hàng {ten_kh}? </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Tên khách hàng</label>
                            <input className="form-control" value={ten_kh} disabled={true}
                                onChange={e => setten_kh(e.target.value)}
                            ></input>
                            <label>Số tiền</label>
                            <input className="form-control" value={parseInt(tien_nap).toLocaleString('vi', {style : 'currency', currency : 'VND'})} disabled={true}
                                onChange={e => setten_kh(e.target.value)}
                            ></input>
                            <label>Ngày nạp</label>
                            {/* {convertTime(ngay_nap)} */}
                            <input className="form-control" value={convertTime(ngay_nap)} disabled={true}
                                onChange={e => setten_kh(e.target.value)}
                            ></input>

                          
                        </div>



                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                onClick={() => onClickXoaNapTien()}
                            >Xác nhận Xoá</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default XoaNapTien
