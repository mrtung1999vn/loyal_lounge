import React from 'react'
import host from '../../../service/host'
import {positions, useAlert} from 'react-alert'
import Token from '../../../storage/Token'

function ThemVanDon({id_don}) {
    const [van_don,set_van_don] = React.useState(['...'])
    const [_id_don,set_id_don] = React.useState(id_don)
    React.useEffect(async ()=>{
        try {
            // console.log(host.DSVanDon+`/${id_don}`)
                const response  = await fetch(host.DSVanDon+`/${id_don}`)     
                const JsonData = await response.json()
                const newData = []
                JsonData.data.toString().split("_").map(x=>x!== '' ? newData.push(x) : "")
                set_van_don(newData)
                console.log(' a')
                set_id_don(id_don)
        } catch (error) {
            
        }
    },[van_don,id_don])
    // console.log(van_don)
    const onRemove = async (index)=>{
        try {
            const newData = [...van_don]
            newData.splice(index,1)
            
            const token = await Token.Token()
            const response = await fetch(host.CapNhapVanDon+ `/${id_don}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({token,newData})
                
              })
              const JsonData = await response.json()
              if(JsonData.status ===1){
                  set_van_don(newData)
                  alert.success("Cập nhập thành công",{position: positions.BOTTOM_CENTER})
              }else{
                  alert.error("Cập nhập thất bại",{position: positions.BOTTOM_CENTER})
              }
        } catch (error) {
            
        }
    }
    return (

            <div>
        
                {/* Button trigger modal */}
                <button type="button" className={
                    window.innerWidth < 768 ? "btn btn-primary mt-3" : "btn btn-primary mt-3"
                } 
                style={{width:'150px'}}
                data-toggle="modal" data-target={`#VanDon${id_don}`}>
                    DS VĐ
                </button>
                {/* Modal */}
                <div className="modal fade" id={`VanDon${id_don}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">DS vận đơn</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                        <div className="modal-body">
             
                        {van_don.map((x,index)=>(<>
                       
                            <div class="row">
                                <div className="col"><label>{x}</label></div>
                                <div className="col"><label className="ml-5" style={{cursor:'pointer'}}
                                onClick={()=>onRemove(index)}
                                >x</label></div>
                                {/* <hr style={{color:'blue'}}></hr> */}
                            </div>
                            
                            <br></br>
                        </>))}
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                        <button type="button" className="btn btn-primary">Lưu</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    )
}


export default ThemVanDon
