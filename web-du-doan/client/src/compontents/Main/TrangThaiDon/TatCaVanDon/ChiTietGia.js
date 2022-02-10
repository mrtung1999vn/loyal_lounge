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
function ChiTietGia({dl}) {
    

    return (
        <Fragment>
            <button className="btn btn-primary btn-sm" data-toggle="modal" data-target={`#ChiTietGiaHoaDonDangPhatGiaoVan${dl.id_don}`}>
                <i className="fas fa-eye">
                </i>
                Giá
            </button>
            {/* Modal */}
            <div className="modal fade" id={`ChiTietGiaHoaDonDangPhatGiaoVan${dl.id_don}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Chi tiết giá </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                                <label>Tổng tiền:</label> <span>{parseInt(dl.tong_tien === null ? 0 : dl.tong_tien).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                <br></br>
                                <label>Phí nội địa:</label> <span>{parseInt(dl.phi_noi_dia === null ? 0 : dl.phi_noi_dia).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                <br></br>
                                <label>Phí dịch vụ:</label> <span>{parseInt(dl.phi_dich_vu === null ? 0 : dl.phi_dich_vu).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                <br></br>
                                <label>Phụ phí:</label> <span>{parseInt(dl.phu_phi === null ? 0 : dl.phu_phi).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                <br></br>
                                <label>Thành tiền:</label> <span>{parseInt(dl.thanhtien_CT).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>  
                        </div>



                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                         
                            >Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ChiTietGia
