


import React from 'react'
import host from '../../../../../service/host'

function SuaNavbar({ DuLieuSua,onClickSua }) {
    // useState

    const [check_menubar, setcheck_menubar] = React.useState(DuLieuSua.check_menubar)
    const [ten_loai_hang, setten_loai_hang] = React.useState(DuLieuSua.ten_loai_hang)
    const [trang_thai, settrang_thai] = React.useState(DuLieuSua.trang_thai)
    const [id_lh, setid_lh] = React.useState(DuLieuSua.id_lh)

    // useState
    React.useEffect(async () => {
        try {
            setcheck_menubar(DuLieuSua.check_menubar)
            setten_loai_hang(DuLieuSua.ten_loai_hang)
            settrang_thai(DuLieuSua.trang_thai)
            setid_lh(DuLieuSua.id_lh)

        } catch (error) {

        }
    }, [DuLieuSua.check_menubar, DuLieuSua.id_lh, DuLieuSua.trang_thai, DuLieuSua.ten_loai_hang])
    

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
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#check_menubar${DuLieuSua.check_menubar}`}>
                    Sửa
                </button>
                {/* Modal */}
                <div className="modal fade" id={`check_menubar${DuLieuSua.check_menubar}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"> Sửa {id_lh} </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* {id_lh} */}
                                <br></br>
                                Tên loại hàng
                                <br></br>
                                <input className='form-control' value={ ten_loai_hang }  
                                onChange={e=>setten_loai_hang( e.target.value )}
                                />
                                <br></br>
                                Thứ tự menu
                                <br></br>
                                <input className='form-control' value={ check_menubar }  
                                onChange={e=>setcheck_menubar( e.target.value )}
                                />
                                <br></br>
                                Trạng thái
                                <br></br>
                                <select className='form-control' defaultValue={trang_thai}
                                onChange={e => settrang_thai(  e.target.value )  }
                                >
                                    <option value="true">Sử dụng</option>
                                    <option value="false">Ngưng sử dụng</option>
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

export default SuaNavbar
