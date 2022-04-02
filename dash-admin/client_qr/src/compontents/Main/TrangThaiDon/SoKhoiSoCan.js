import React from 'react'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import { useHistory } from "react-router-dom";

function SoKhoiSoCan({id_don,onUpdateKhoiCan}) {
    const history = useHistory();
    const [so_khoi,setso_khoi] = React.useState(0)
    const [so_can,setso_can] = React.useState(0)

    const onChangeSoKhoiCan = async ()=>{
        try {
            console.log({so_khoi,so_can})
            const token = await Token.Token()
            console.log(host.CapNhapSoCanSoKhoi+`/${id_don}`)
            const response = await fetch(host.CapNhapSoCanSoKhoi+`/${id_don}`,{
              method:"PUT",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({so_can,so_khoi,token})
            })
            const JsonData = await response.json()
            if(JsonData.status ===1){
                // alert("Cập nhập thành công!")
                // history.push("/DangPhatGiaoVan");
                onUpdateKhoiCan(true)
            }else{
  
            }
        } catch (error) {
            
        }
    }
    return (
        <div>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#SoKhoiCan"+id_don}>
            Nhập
        </button>
        {/* Modal */}
        <div className="modal fade" id={"SoKhoiCan"+id_don} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Điền khối cân</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div className="modal-body">
                    <label>Điền số khối</label>
                    <br></br>
                    <input className="form-control" onChange={(e)=>setso_khoi(e.target.value)}></input>
                    <label>Điền số cân</label>
                    <br></br>
                    <input className="form-control" onChange={(e)=>setso_can(e.target.value)}></input>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal"
                onClick={()=>onChangeSoKhoiCan()}
                >Lưu</button>
                </div>
            </div>
            </div>
        </div>
        </div>

    )
}

export default SoKhoiSoCan
