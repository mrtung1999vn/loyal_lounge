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
function SuaNganhHang({ dulieu, onSuaNganhHang }) {
    // const alert = useAlert()
    const alert = useAlert()
    const [ten_nganh,setten_nganh] = useState(dulieu.ten_nganh)
    const [id_nh,setid_nh] = useState(dulieu.id_nh)

    const DefaulValue = ()=>{
        setten_nganh('')
    }

    
    const onClickSuaNganhHang = async () => {
        try {
            if(ten_nganh === ''  
            ){
                alert("Người dùng chưa điền tên ngành hàng!",{position:positions.BOTTOM_CENTER})
            } else {
                var token = await Token.Token()
                const response = await fetch(host.DSNganhHangSua, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ten_nganh,id_nh,token})
                })
                const JsonData = await response.json()
                console.log("a")
                if (JsonData.status === 1) {
                    alert("Lưu thành công!")
                    onSuaNganhHang(JsonData.data)
                } else {

                    alert("Lưu không thành công!")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        
        return () => {
            
        }
    }, [])
    
    return (
        <Fragment>
            <button className="btn btn-info btn-sm"
                onClick={() => timeout(() => { $(`#onClickSuaNganhHang${id_nh}`).atr("data-dismiss", '') }, 1000)}

                style={{ width: '60px' }}
                data-toggle="modal" data-target={`#IDSuaNganhHang${dulieu.id_nh}`}>
                <i className="fas fa-pencil-alt">
                </i>
                Sửa
            </button>
            {/* Modal */}
            <div className="modal fade" id={`IDSuaNganhHang${dulieu.id_nh}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sửa tài khoản</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" onKeyPress={(e)=> e.key ==="Enter" ? onClickSuaNganhHang() :""}>
                            <label>Tên ngành hàng</label>
                            <input className="form-control" value={ten_nganh}
                                onChange={e => setten_nganh(e.target.value)}
                            ></input>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                            <button type="button" className="btn btn-primary" id={`onClickSuaNganhHang${id_nh}`}
                                onClick={() => onClickSuaNganhHang()}
                            >Lưu</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default SuaNganhHang
