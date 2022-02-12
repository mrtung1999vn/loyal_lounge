


import React from 'react'
import host from '../../../../../service/host'

function SuaTrangThaiDonHang({ DuLieuSua,onClickSua }) {
    
    // useState
    const [check_menubar, setcheck_menubar] = React.useState(DuLieuSua.check_menubar)
    const [ten_loai_hang, setten_loai_hang] = React.useState(DuLieuSua.ten_loai_hang)
    const [trang_thai, settrang_thai] = React.useState(DuLieuSua.trang_thai)
    const [id_lh, setid_lh] = React.useState(DuLieuSua.id_lh)



    //#region 
    const [id_don,setid_don] = React.useState(DuLieuSua.id_don)
    const [ten_kh,setten_kh] = React.useState(DuLieuSua.ten_kh)
    const [so_dt,setso_dt] = React.useState(DuLieuSua.so_dt)
    const [dia_chi,setdia_chi] = React.useState(DuLieuSua.dia_chi)
    const [phuong_thuc_thanh_toan,setphuong_thuc_thanh_toan] = React.useState(DuLieuSua.phuong_thuc_thanh_toan)
    const [ghi_chu,setghi_chu] = React.useState(DuLieuSua.ghi_chu)
    // const [id_don,setid_don] = React.useState(DuLieuSua.id_don)
    // const [id_don,setid_don] = React.useState(DuLieuSua.id_don)
    // const [id_don,setid_don] = React.useState(DuLieuSua.id_don)


    //#endregion

    const [trang_thai_don,settrang_thai_don] = React.useState('Chuẩn bị đơn')


    // useState
    React.useEffect(async () => {
        try {

            setid_don(DuLieuSua.id_don);setso_dt(DuLieuSua.so_dt)
            setten_kh(DuLieuSua.ten_kh);setdia_chi(DuLieuSua.dia_chi)

            setphuong_thuc_thanh_toan(DuLieuSua.phuong_thuc_thanh_toan);
            setghi_chu(DuLieuSua.ghi_chu)

        } catch (error) {

        }
    }, [
    
        DuLieuSua.id_don, DuLieuSua.so_dt,
        DuLieuSua.ten_kh, DuLieuSua.dia_chi,
        DuLieuSua.phuong_thuc_thanh_toan, DuLieuSua.ghi_chu,

    ])
    

    const onClickLuuDuLieu = async ()=>{
        try {
            const res = await fetch( host.Navbar,{
                method:"PUT",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    check_menubar,ten_loai_hang,trang_thai,id_lh
                })
            })
            const JsonData = await res.json()
            if( res.ok ){
                if( JsonData.status ){
                    onClickSua(true)
                }
            }
        } catch (error) {
            
        }
    }

    return (
        <React.Fragment>
            <div>
                {/* Button trigger modal */}
                <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#suatrangthaidon${DuLieuSua.check_menubar}`}>
                    Sửa TT
                </button>
                {/* Modal */}
                <div className="modal fade" id={`suatrangthaidon${DuLieuSua.check_menubar}`} 
                tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"> Thông tin đơn {id_lh} </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Trạng thái đơn
                                <br></br>
                                <select className='form-control' defaultValue={trang_thai}
                                onChange={e => settrang_thai_don(  e.target.value )  }
                                >
                                    <option value="Chuẩn bị đơn">Chuẩn bị đơn</option>
                                    <option value="Đang ship">Đang ship</option>
                                    <option value="Thành công">Thành công</option>
                                    {/* <option value="false">Ngưng sử dụng</option> */}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                onClick={()=>onClickLuuDuLieu()}
                                >Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>


    )

}

export default SuaTrangThaiDonHang
