import React,{useState} from 'react'
import func from '../../../asset/func'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import DSThongBao from './components/DSThongBao'
import Folder from './components/Folder'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ThemThongBao from './components/ThemThongBao'
const useStyles = makeStyles((theme) => ({
  backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
  },
}));
function ThongBao() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [DuLieuDSThongBao,setDuLieuDSThongBao] = React.useState([])
  const [page,setPage] = React.useState(1)
  const [totalPage,settotalPage] = React.useState(0)


  const [onChangeForm,setOnChangeForm] = React.useState(false)
  const callBackTotalPage = React.useCallback(async ()=>{
      try{
          const response = await fetch(host.TotalPageDSThongBao)
          const JsonData = await response.json()
          if (JsonData.status === 1) {
            // console.log(JsonData.data)
            settotalPage(JsonData.data)
          } else {
              // alert("Hiện tại không có dữ liệu")
          }
      }catch(error){

      }
  })
  const onChangePage = async (xindex)=>{
    try {
      const token = await Token.Token()
      console.log(host.DSThongBao + `/${page+xindex}`)
      const response = await fetch(host.DSThongBao + `/${page+xindex}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({  token })
      })
      const JsonData = await response.json()

      if (JsonData.status === 1) {
        // con
        setPage(page+xindex)
        callBackTotalPage()
        setDuLieuDSThongBao(func.DecodeJson_RESPONSE(JsonData.data))
      } else {
          // alert("Hiện tại không có dữ liệu")
      }
        
        

    } catch (error) {
      
    }
  }

  const DSThongBaoTrangThai = async (e)=>{
    try {
        const token = await Token.Token()
        setOpen(true)
        const response = await fetch(host.DSThongBaoTrangThai+`/${e}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  token })
        })
        const JsonData = await response.json()
  
        if (JsonData.status === 1) {
          // con
          callBackTotalPage()
          setDuLieuDSThongBao(func.DecodeJson_RESPONSE(JsonData.data))
          setOpen(false)
        } else {
            // alert("Hiện tại không có dữ liệu")
        }
    } catch (error) {
      
    }
  }




  React.useEffect(async ()=>{
    try {

      const token = await Token.Token()
      setOpen(true)
      console.log(host.DSThongBao + `/${page}`)
      const response = await fetch(host.DSThongBao + `/${page}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({  token })
      })
      const JsonData = await response.json()

      if (JsonData.status === 1) {
        // con
        callBackTotalPage()
        setDuLieuDSThongBao(func.DecodeJson_RESPONSE(JsonData.data))
        setOpen(false)
      } else {
          // alert("Hiện tại không có dữ liệu")
      }
    } catch (error) {
      
    }
  },[])

  const onClickGuiTin = (e)=>{
    setOnChangeForm(e)
  }
    return (
<div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Thông báo</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Thống kê</a></li>
            <li className="breadcrumb-item active">Thông báo</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <section className="content">
    <div className="row">
      <div className="col-md-3">
          
           <Folder DSThongBaoTrangThai={DSThongBaoTrangThai} onClickGuiTin={onClickGuiTin}
           onChangeForm={onChangeForm}
           ></Folder>
        
         

          
      </div>  
      {/* /.col */}
      <div className="col-md-9">
        <div className="card card-primary card-outline">
          <div className="card-header">
            <h3 className="card-title">Inbox</h3>
            <div className="card-tools">
              <div className="input-group input-group-sm">
                {/* <input type="text" className="form-control" placeholder="" /> */}
                <div className="input-group-append">
                  <div className="btn btn-primary">
                    <i className="fas fa-search" />
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-tools */}
          </div>
          {/* /.card-header */}
          <div className="card-body p-0">
            <div className="mailbox-controls">
              {/* Check all button */}
              {/* <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="far fa-square" />
              </button> */}
              {/* <div className="btn-group">
                <button type="button" className="btn btn-default btn-sm">
                  <i className="far fa-trash-alt" />
                </button>
                <button type="button" className="btn btn-default btn-sm">
                  <i className="fas fa-reply" />
                </button>
                <button type="button" className="btn btn-default btn-sm">
                  <i className="fas fa-share" />
                </button>
              </div> */}
              {/* /.btn-group */}
              {/* <button type="button" className="btn btn-default btn-sm">
                <i className="fas fa-sync-alt" />
              </button> */}
              <div className="float-right">
                {/* 1-50/200 */}
                {/* <div className="btn-group">
                  <button type="button" className="btn btn-default btn-sm">
                    <i className="fas fa-chevron-left" />
                  </button>
                  <button type="button" className="btn btn-default btn-sm">
                    <i className="fas fa-chevron-right" />
                  </button>
                </div> */}
                {/* /.btn-group */}
              </div>
           
            </div>
            {onChangeForm === false ? 
                <DSThongBao DuLieuDSThongBao={DuLieuDSThongBao}></DSThongBao>
                : <ThemThongBao></ThemThongBao>}
          </div>
          {/* /.card-body */}
          <div className="card-footer p-0">
            <div className="mailbox-controls">
     
         
              <div className="btn-group">
  
              </div>
              {/* /.btn-group */}
              <button type="button" className="btn btn-default btn-sm">
                <i className="fas fa-sync-alt" />
              </button>
              <div className="float-right" hidden={onChangeForm}>
                {page=== 1 ? 1 : page*15} - {page=== 1 ? 15 : page*15 + 15} &ensp;(tin nhắn)/ 
                <label style={{color:'green'}}> &ensp;Tổng số trang : {totalPage} &ensp;</label>
                
                <div className="btn-group">
                  <button type="button" 
                  style={{width:'40px'}}
                  className="btn btn-default btn-sm"
                  onClick={()=>onChangePage(-1)}
                  disabled={page===1 ? true : false}
                  >
                    <i className="fas fa-chevron-left" />
                  </button>
                  <button type="button" className="btn btn-default btn-sm"
                  style={{width:'40px'}}
                  disabled={page===totalPage ? true : false}
                  >
                    <i className="fas fa-chevron-right" 
                    onClick={()=>onChangePage(+1)}
                    />
                  </button>
                </div>
                {/* /.btn-group */}
              </div>
              {/* /.float-right */}
            </div>
          </div>
        </div>
        {/* /.card */}
      </div>
      {/* /.col */}
    </div>
    {/* /.row */}
    <Backdrop className={classes.backdrop}
                open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
            
  </section>
</div>

    )
}

export default ThongBao
