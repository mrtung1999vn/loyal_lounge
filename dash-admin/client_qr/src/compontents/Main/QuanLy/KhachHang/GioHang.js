import React from 'react'
import { Link } from "react-router-dom"
import $ from "jquery"
import Customer from '../../../../storage/Customer'
import Token from '../../../../storage/Token'
import host from '../../../../service/host'
import func from '../../../../asset/func'
import { Button } from '@material-ui/core'
function GioHang({ dulieu }) {


    const onClickDuLieuGioHang= async ()=>{
        try {
            $(`#onClickIDGIOHANG_CLOSE${dulieu.id_kh}`).attr('data-dismiss', 'modal')
            const token = await Token.Token()
            
            const response = await fetch(host.GioHangKhach + `/${dulieu.id_kh}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token })
            })
      
            const JsonData = await response.json()
            // console.log(JsonData)
            if (JsonData.status === 1) {
                Customer.setCustomer(JsonData.data)    
                // Customer.getCustomer
                
            } else {}
          } catch (error) {
      
          }
    }
    const onClickGioHangAn = ()=>{
        $(`onClickIDGIOHANG_CLOSE${dulieu.id_kh}`).trigger("click")
    }
    return (
        <div>
            <Link className="btn btn-success btn-sm"
                to={`/GioHang?khachhang=${dulieu.id_kh}`}
                style={{ width: '120px' }}
                // data-toggle="modal" data-target={`#IDGioHang${dulieu.id_kh}`}
                    >
                <i className="fas fa-pencil-alt">
                </i>
                Giỏ hàng xem
            </Link>

            {/* Modal */}
            {/* <div className="modal" id={`IDGioHang${dulieu.id_kh}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Xem giỏ hàng</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" >
                            <label>Xác nhận xem giỏ hàng khách {dulieu.ten_kh}</label>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id={`onClickIDGIOHANG_CLOSE${dulieu.id_kh}`}>Thoát</button>

                            <Link 
                                to={`/GioHang?khachhang=${dulieu.id_kh}`}
                                className="btn btn-primary" 
                            >Xem</Link>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default GioHang
