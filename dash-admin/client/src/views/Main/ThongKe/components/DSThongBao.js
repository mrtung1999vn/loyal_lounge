import React from 'react'
import {useHistory} from 'react-router-dom'
import host from '../../../../service/host'
function convertTime(str){
    const date = new Date(str)
    // console.log()
    return `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
}
function DSThongBao({DuLieuDSThongBao}) {
    // console.log(DuLieuDSThongBao)
    const history = useHistory()
    const onClickChiTiet = async (id_tb,id_don,id_kh)=>{
        try{
            if(id_don=== '' && id_don === undefined){
                alert("Thông báo này không phải đơn hàng")
            }else{
                const response = await fetch(host.ChiTietThongBao+`/${id_tb}/${id_don}/${id_kh}`)
                const JsonData = await response.json()
    
                if(JsonData.status === 1){
    
                    history.push(`/ChiTietDonHang?stt=${JsonData.data}&id_don_hang=${id_don}&id_kh=${id_kh}`)
                }else{
    
                }
            }
          
        }catch(error){}
    }
    return (
        <div>
          <div className="table-responsive mailbox-messages" style={{height:'100vh'}}>
              <table className="table table-hover table-striped">
                <tbody>
                    {DuLieuDSThongBao.map((x,index)=>(
                        <tr>
                        {/* <td>
                            <div className="icheck-primary">
                            <input type="checkbox" defaultValue id="check1" />
                            <label htmlFor="check1" />
                            </div>
                        </td> */}
                        {/* <td className="mailbox-star"><a href="#"><i className="fas fa-star text-warning" /></a></td> */}
                        <td>
                        <img 
                                    data-toggle="modal" data-target={`#HinhAnhThongBao${index}`}
                                    src={x.image}
                                  
                                    style={{width:'40px',height:'40px'}}
                                    ></img>
                                    
                                    <div className="modal fade" id={`HinhAnhThongBao${index}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                      <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Chi tiết ảnh</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                              <span aria-hidden="true">×</span>
                                            </button>
                                          </div>
                                          <div className="modal-body" style={{width:'100%',height:'500px'}}>
                                                      <img 
                                                
                                                src={x.image}
                                                style={{width:'100%',height:'500px'}}
                                                ></img>
                                          </div>
                                          <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                            
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                        </td>
                        <td className="mailbox-name"><a 
                        style={{cursor:'pointer'}}
                        onClick={()=>{
                            const id_tb = x.id_tb
                            const id_don = x.id_don
                            const id_kh = x.id_kh
                            onClickChiTiet(id_tb,id_don,id_kh)
                        }}
                        >{x.tieu_de}</a></td>
                        <td className="mailbox-subject">
                            <label
                            style={{cursor:'pointer'}}
                            style={x.trang_thai_xem === false ? {fontWeight:'bold'} : {fontWeight:'normal'}}

                            onClick={()=>{
                                const id_tb = x.id_tb
                                const id_don = x.id_don
                                const id_kh = x.id_kh
                                onClickChiTiet(id_tb,id_don,id_kh)
                            }}
                            >{x.noi_dung}</label>
                        </td>
                        <td className="mailbox-attachment" />
                        <td className="mailbox-date"
                        style={{cursor:'pointer'}}
                            onClick={()=>{
                                const id_tb = x.id_tb
                                const id_don = x.id_don
                                const id_kh = x.id_kh
                                onClickChiTiet(id_tb,id_don,id_kh)
                            }}
                        >{
                            convertTime(x.ngay)
                        }</td>
                    </tr>
                    ))}
                
                </tbody>
              </table>
              {/* /.table */}
            </div>
            
        </div>
    )
}

export default DSThongBao
