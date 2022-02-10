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

function convertTime(str){
    const date = new Date(str)
    // console.log()
    return `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
}

function SuaNapTien({ dulieu, onSuaNapTien }) {
    // const alert = useAlert()
    // const alert = useAlert()
    const [id_nap, setid_nap] = React.useState(dulieu.id_nap)
    const [id_kh, setid_kh] = React.useState(dulieu.id_kh)
    const [ten_kh,setten_kh] = useState(dulieu.ten_kh)
    const [tien_nap,settien_nap] = useState(dulieu.tien_nap)
    const [ngay_nap,setngay_nap] = useState(dulieu.ngay_nap)
    const DefaulValue = ()=>{
       
    }

    
    const onClickSuaNapTien = async () => {
        try {
  
                var token = await Token.Token()
                const response = await fetch(host.SuaNapTien+`/${id_nap}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({tien_nap,token})
                })
                const JsonData = await response.json()
                console.log("a")
                if (JsonData.status === 1) {
                    alert("Lưu thành công!")
                    onSuaNapTien(JsonData.data)
                } else {

                    alert("Lưu không thành công!")
                }
            
        } catch (error) {
            console.log(error)
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
            <button className="btn btn-info btn-sm"
                onClick={() => timeout(() => { $(`#onClickSuaNapTien${id_nap}`).atr("data-dismiss", '') }, 1000)}

                style={{ width: '60px' }}
                data-toggle="modal" data-target={`#IDSuaNapTien${id_nap}`}>
                <i className="fas fa-pencil-alt">
                </i>
                Sửa
            </button>
            {/* Modal */}
            <div className="modal fade" id={`IDSuaNapTien${id_nap}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sửa tài khoản</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" onKeyPress={(e)=> e.key ==="Enter" ? onClickSuaNapTien() :""}>
                        <label>Tên khách hàng</label>
                            <input className="form-control" value={ten_kh} disabled={true}
                                onChange={e => setten_kh(e.target.value)}
                            ></input>
                            <label>Số tiền <label style={{color:'green'}}>({parseInt(tien_nap).toLocaleString('vi', {style : 'currency', currency : 'VND'})})</label></label>
                            <input className="form-control" value={tien_nap} disabled={false}
                                onChange={e => settien_nap(e.target.value)}
                            ></input>

                            <label>Ngày nạp</label>
                            {/* {convertTime(ngay_nap)} */}
                            <input className="form-control" value={convertTime(ngay_nap)} disabled={true}
                                // onChange={e => setten_kh(e.target.value)}
                            ></input>

                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                            <button type="button" className="btn btn-primary" id={`onClickSuaNapTien${id_kh}`}
                                onClick={() => onClickSuaNapTien()}
                            >Lưu</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default SuaNapTien
