import React from 'react'
import host from '../../../../service/host'

function Folder({DSThongBaoTrangThai,onClickGuiTin,onChangeForm}) {

    const [so_tin,setSo_tin] = React.useState(0)
    const [so_tin_chua_doc,setSo_tin_chua_doc] = React.useState(0)
    const [so_tin_da_doc,setso_tin_da_doc] = React.useState(0)

    const getData = React.useCallback(async()=>{
        try{
            const response = await fetch(host.TotalDSThongBao)
            const JsonData = await response.json()
            if(JsonData.status ===1){
                setSo_tin(JsonData.data)
                setSo_tin_chua_doc(JsonData.chua_doc)
                setso_tin_da_doc(JsonData.da_doc)
            }else{

            }
            
        }catch(error){

        }
    })
    React.useEffect(async ()=>{
        try{
            getData()
        }catch(error){

        }
    },[])
    const onClickTrangThai = (e)=>{
        DSThongBaoTrangThai(e)
    }
    return (
        <div>
        <a className="btn btn-primary btn-block mb-3"
        onClick={()=>onClickGuiTin(onChangeForm=== true ? false : true)}
        >{onChangeForm === true ? "Trờ về" : "Gửi thông báo"} </a>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Folders</h3>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus" />
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item active">
                <a href="#" className="nav-link">
                  <i className="fas fa-inbox" /> Thông báo
                  <span className="badge bg-primary float-right">{so_tin}</span>
                </a>
              </li>
              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-envelope" /> Sent
                </a>
              </li> */}
              <li className="nav-item"
              onClick={()=>onClickTrangThai(true)}>
                <a href="#" className="nav-link">
                  <i className="far fa-file-alt" /> Tin nhắn đã đọc
                  <span className="badge bg-primary float-right">{so_tin_da_doc}</span>
                </a>
              </li>
              <li className="nav-item"
               onClick={()=>onClickTrangThai(false)}
              >
                <a href="#" className="nav-link">
                  <i className="far fa-file-alt" /> Tin nhắn chưa đọc
                  <span className="badge bg-primary float-right">{so_tin_chua_doc}</span>
                </a>
              </li>
              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fas fa-filter" /> Junk
                  <span className="badge bg-warning float-right">65</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-trash-alt" /> Trash
                </a>
              </li> */}
            </ul>
          </div>
      
        </div>

        {/* <div className="card">
          <div className="card-header">
            <h3 className="card-title">Labels</h3>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus" />
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle text-danger" />
                  Important
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle text-warning" /> Promotions
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle text-primary" />
                  Social
                </a>
              </li>
            </ul>
          </div>
     
        </div>
         */}
        </div>
    )
}

export default Folder
