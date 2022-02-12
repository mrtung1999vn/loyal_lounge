import React, { useEffect,useRef} from 'react'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import {positions, useAlert} from 'react-alert'

function ChuyenTrangThaiDonHang({id_don,onClickCTT}) {
    const alert = useAlert()
    const [stt,setstt] = React.useState('')

    const onClickChuyenTrangThai = async ()=>{
        try{
            if(stt !== '' && stt !== "Chọn trạng thái"){
                const token = await Token.Token()
                console.log(token);
                const response = await fetch(host.XacNhanTrangThai+`/${id_don}`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({token,stt})
                })
                // chuyen du lieu sang dang json
                const JsonData = await response.json()
                console.log(JsonData);
                if(JsonData.status ===1){
                    alert.success("Cập nhập thành công",{position: positions.BOTTOM_CENTER})
                    onClickCTT(true)
                    window.location.href = "./"
                    
                }else{
                    alert.error("Cập nhập thất bại",{position: positions.BOTTOM_CENTER})
                }
            }else{
                alert("Người dùng chưa chọn trạng thái!")
            }
        }catch(error){
            
        }

    }
    return (
    <div>
    {/* Button trigger modal */}
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Chuyển trạng thái
    </button>
    {/* Modal */}
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Chuyển trạng thái</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
            </div>
            <div className="modal-body">
                <select className="form-control"
                    onChange={e=>setstt(e.target.value)}
                >
                    <option value="Chọn trạng thái">Chọn trạng thái</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã đặt hàng">Đã đặt hàng</option>
                    <option value="Đang phát giao vận">Đang phát giao vận</option>
                    <option value="Hàng về kho">Hàng về kho</option>
                    <option value="Khiếu nại">Khiếu nại</option>
                    <option value="Thành công">Thành công</option>
                    <option value="Shop huỷ">Shop huỷ</option>
                </select>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal"
            onClick={()=>onClickChuyenTrangThai()}
            >Lưu thay đổi</button>
            </div>
        </div>
        </div>
    </div>
    </div>

    )
}

export default ChuyenTrangThaiDonHang
