
import React, { useEffect,useRef ,useCallback} from 'react'
import { useHistory } from 'react-router-dom'
import host from '../service/host'
import Token from '../storage/Token'
import Customer from '../storage/Customer'
import { makeStyles } from '@material-ui/core/styles';
import func from '../asset/func'
import { useLocation } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
import socketIOClient from "socket.io-client";
import {positions, useAlert} from 'react-alert'
import $ from 'jquery'
// TABLE
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { configure } from '@testing-library/react';
import ChuyenTrangThaiDonHang from '../compontents/Main/TrangThaiDon/ChuyenTrangThaiDonHang';
import DSVanDon from '../compontents/Main/TrangThaiDon/DSVanDon';
import SoKhoiSoCan from '../compontents/Main/TrangThaiDon/SoKhoiSoCan'

// TABLE
const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
      // float:'right'
    },
    width: "200%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: '789px',
    width:'100%'
  },
  tableWrapper: {
    overflowX: "auto"
  },
  hover: {
    "&:hover": {
      backgroundColor: 'rgb(7, 177, 77, 0.42)'
    }
  }
}));


function ChiTietDangPhatGiaoVan({id_kh,stt,id_don_hang}) {
    const history = useHistory();
    const [ma_don,setma_don] = React.useState('')
    const alert = useAlert()
    const [KhachHang, setKhachHang] = React.useState(
        []
    )
    const classes = useStyles();
    const [TienGioHang, setTienGioHang] = React.useState([])
    
    const [GioHangKHCT, setGioHangKHCT] = React.useState([])
    const onClickDuLieuGioHang=React.useCallback(async ()=>{
      try {
          const token = await Token.Token()
          
        
          const response = await fetch(host.GioHangKhach + `/${id_kh}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
          })
    
          const JsonData = await response.json()
          // console.log(JsonData)
          if (JsonData.status === 1) {
            const DE_JsonData = func.DecodeJson_RESPONSE(JsonData.data)
            console.log(DE_JsonData)
              
              setKhachHang(func.DecodeJson_RESPONSE(JsonData.data))
          } else {}
        } catch (error) {
          console.log(error)
        }
    })

    const [phi_noi_dia,setphi_noi_dia] = React.useState(0)
    const [phi_dich_vu,setphi_dich_vu] = React.useState(0)
    const [phu_phi,setphu_phi] = React.useState(0)

    const [so_luong_tong,setso_luong_tong] = React.useState(0)
    const onClickCheckBox = (index)=>{
      try {
          const newData = [...GioHangKHCT]
  
          for(let i =0 ; i < newData.length;i++){
            if(index ===i)
              newData[i].status = !newData[i].status
          }
          setGioHangKHCT(newData)
      } catch (error) {
        
      }
    }
    const [so_khoi,set_so_khoi] = React.useState(0)
    const [so_can,set_so_can] = React.useState(0)
    
    const [tien_theo_can,settien_theo_can] = React.useState(0)
    const [tien_theo_khoi,settien_theo_khoi] = React.useState(0)
    const [ti_gia_tinh,setti_gia_tinh] = React.useState(0)

    const getData = React.useCallback(async ()=>{
      try {
          const token = await Token.Token()
          const response = await fetch(host.GioHangChiTietKhach+`/${id_don_hang}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({stt,token})
          })
          const JsonData = await response.json()
          if(JsonData.status ===1){
            const DE_JsonData = func.DecodeJson_RESPONSE(JsonData.data)
            let so_luong = 0 
            DE_JsonData.map(x=>so_luong += x.qty)
            console.log( so_luong )
            setso_luong_tong(so_luong)
            if(DE_JsonData.length > 0){
              setma_don(DE_JsonData[0].ma_don)
              setphi_noi_dia(DE_JsonData[0].phi_noi_dia)
              setphi_dich_vu(DE_JsonData[0].phi_dich_vu)
              set_so_khoi(DE_JsonData[0].so_khoi)
              set_so_can(DE_JsonData[0].so_can)
              setphu_phi(DE_JsonData[0].phu_phi)
              setti_gia_tinh( DE_JsonData[0].tien_ti_gia )
              settien_theo_can(DE_JsonData[0].tien_can)
              settien_theo_khoi(DE_JsonData[0].tien_khoi)
              updateGioHang(DE_JsonData)
              setGioHangKHCT(DE_JsonData)
            }

            
          }else{

          }
      } catch (error) {
        
      }
    },[])

    
    const onClickCapNhap = async ()=>{
      try {
          const token = await Token.Token()
          const response = await fetch(host.CapNhapDonHang+`/${id_don_hang}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({token,phu_phi,GioHangKHCT,phi_noi_dia,phi_dich_vu,TienGioHang})
          })
          const JsonData = await response.json()
          if(JsonData.status ===1){
              onClickDuLieuGioHang()
              getData()
              // alert.success("C???p nh???p th??nh c??ng",{position: positions.BOTTOM_CENTER})
          }else{
              alert.error("C???p nh???p th???t b???i",{position: positions.BOTTOM_CENTER})
          }
          
      } catch (error) {
        
      }
    }



    React.useEffect(()=>{
      onClickDuLieuGioHang()
      getData()
    },[])
    
    //#region Thay ?????i gi??? h??ng ?????t v?? c??c component res
    const updateGioHang = useCallback((JsonData)=>{
      try {
        let tien_gio_hang = 0
        const newData = JsonData
        newData.map((y,index)=>{
            tien_gio_hang += y.price*y.qty
          if(index + 1 === newData.length){setTienGioHang(tien_gio_hang)}
        })
        setGioHangKHCT(
          JSON.parse(JsonData.map(x=>x.gio_hang))
        )
      } catch (error) {
        setGioHangKHCT([])
        console.log(error)
      }
  
     
     
    },[])

    const onChangeTitle = (value,_index)=>{
      try {
          const newData = [...GioHangKHCT]
          
          newData.map((x,index)=>index === _index ? x.title = value : "")

          setGioHangKHCT(newData)
      } catch (error) {
        
      }
    }


    const onChangePrice = (value,_index)=>{
      try {
        const newData = [...GioHangKHCT]
          
        newData.map((x,index)=>index === _index ? x.price = value : "")

        setGioHangKHCT(newData)
      } catch (error) {
        
      }
    }

    const onChangeQty = (value,_index)=>{
      try {
        const newData = [...GioHangKHCT]
          
        newData.map((x,index)=>index === _index ? x.qty = value : "")

        setGioHangKHCT(newData)
      } catch (error) {
        
      }
    }
    const onClickChuyenTrangThai = ()=>{
      onClickCapNhap()
    }
    const onChangeNote = (value,_index)=>{
      try {
        const newData = [...GioHangKHCT]
          
        newData.map((x,index)=>index === _index ? x.note = value : "")

        setGioHangKHCT(newData)
      } catch (error) {
        
      }
    }
    const onChangeImage = (value,index)=>{
      try {
        
      } catch (error) {
        
      }
    }

    const onUploadGioHangKH = (e)=>{
      try {
        setGioHangKHCT(e)
      } catch (error) {
        
      }
    }
    //#endregion
    


    const onChangeDonHang = async (ma_don)=>{
      try {
        const token = await Token.Token()
        const response = await fetch(host.ThayDoiMaDonHang+`/${id_don_hang}`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({token,ma_don})
        })
        const JsonData = await response.json()
        if(JsonData.status ===1){
            alert.success("C???p nh???p th??nh c??ng",{position: positions.BOTTOM_CENTER})
            onClickHangVeKho()
        }else{
            alert.error("C???p nh???p th???t b???i",{position: positions.BOTTOM_CENTER})
        }
        
      } catch (error) {
        
      }
    }



    const onClickHangVeKho = async ()=>{
      try{
          const token = await Token.Token()
          var stt = "H??ng v??? kho"
          onClickCapNhap()
          const response = await fetch(host.XacNhanTrangThai+`/${id_don_hang}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({token,stt})
          })
          const JsonData = await response.json()
          if(JsonData.status ===1){
              alert.success("?????t ????n h??ng th??nh c??ng",{position: positions.BOTTOM_CENTER})
              history.goBack()
          }else{
              alert.error("?????t ????n h??ng th???t b???i",{position: positions.BOTTOM_CENTER})
          }
          
      }catch{

      }
    }
    const [van_don,setvan_don] = React.useState('')

    const ThemVanDon = async ()=>{
      try{
        if(van_don === ""){
          alert.error("Ng?????i d??ng ????? tr???ng v???n ????n",{position: positions.BOTTOM_CENTER})
        }else{
          const token = await Token.Token()
          const response = await fetch(host.ThemVanDon+ `/${id_don_hang}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({token,van_don})
          })
          const JsonData = await response.json()
          if(JsonData.status ===1){
              alert.success("C???p nh???p th??nh c??ng",{position: positions.BOTTOM_CENTER})
          }else{
              alert.error("C???p nh???p th???t b???i",{position: positions.BOTTOM_CENTER})
          }
        }

      }catch(error){

      }
    }
    const onUpdateKhoiCan = async ()=>{
      try {
        onClickDuLieuGioHang()
        getData()
      } catch (error) {
        
      }
    }

    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Tr???ng th??i ????n h??ng {stt}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Qu???n l??</a></li>
                  <li className="breadcrumb-item active">Tr???ng th??i ????n h??ng {stt}</li>
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="callout callout-info">
                  <h5><i className="fas fa-info" /> Note:</h5>
                  Hi???n t???i ng?????i d??ng ??ang xem gi??? h??ng c???a kh??ch h??ng.
                </div>
                {/* Main content */}
                <div className="invoice p-3 mb-3">
                  {/* title row */}
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <i className="fas fa-globe" /> ORDER0phi.
                        <small className="float-right"></small>
                      </h4>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* info row */}
                  <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
  
                      <address>
                        <strong>T??n kh??ch : </strong><h4>{KhachHang.map(x => x.ten_kh)}</h4><br />
                        <strong>?????a ch???:</strong> {KhachHang.map(x => x.dia_chi)}<br />
                        <strong>S??? ??T:</strong> {KhachHang.map(x => x.so_dt)}<br />
                        <strong>Email:</strong>{KhachHang.map(x => x.email)}<br />
                      </address>
                    </div>
                    {/* /.col */}
                    {/* <div className="col-sm-4 invoice-col">
                  To
                  <address>
                    <strong>John Doe</strong><br />
                    795 Folsom Ave, Suite 600<br />
                    San Francisco, CA 94107<br />
                    Phone: (555) 539-1037<br />
                    Email: john.doe@example.com
                  </address>
                </div> */}
                    {/* /.col */}
                    <div className="col-sm-4 invoice-col">
                    <b>Chuy???n tr???ng th??i</b><br />
                
                    <ChuyenTrangThaiDonHang id_don={id_don_hang} onClickCTT={onClickChuyenTrangThai}></ChuyenTrangThaiDonHang>
                    <div className="row">
                        <div className="col">
                        <input className="form-control mt-2" 
                      value={ma_don}
                      onChange={e=>setma_don(e.target.value)}
                      ></input><button className="btn btn-primary sm mt-1" onClick={()=>onChangeDonHang(ma_don)}>Th??m ????n</button>
                        </div>
                        <div className="col">
              
                      <input className="form-control  mt-2" 
                      onChange={(e)=>setvan_don(e.target.value)}
                      ></input>
                      <button className="btn btn-primary mt-1" style={{width:'150px'}}
                      onClick={()=>ThemVanDon()}
                      >Th??m V??</button>
                      
                      <DSVanDon id_don={id_don_hang}></DSVanDon>

                        </div>
                    </div>
                      <br />
                      <b>T??? gi?? t??nh: </b>{ti_gia_tinh.toLocaleString('vi', { style: 'currency', currency: 'VND' })} / 1?? <br />
                      <b>Ti???n theo c??n: </b> {parseInt(KhachHang.map(x => x.tien_theo_can)).toLocaleString('vi', { style: 'currency', currency: 'VND' })}<br />
                      <b>Ti???n theo kh???i: </b> {parseInt(KhachHang.map(x => x.tien_theo_khoi)).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                                
                  <div className="row">
                    <div className={classes.root}>
                      <Table className="table table-striped" style={{width:'1000px !important'}}>
                        <TableHead>
                          <TableRow> 
                            {/* <TableCell  style={{ width: '0.5rem !important' }}>Ch???n</TableCell> */}
                            <TableCell  style={{ width: '0.1rem !important' }} >???nh</TableCell>
                            <TableCell  style={{ width: '2rem  !important' }} >Link s???n ph???m</TableCell>
                            <TableCell  style={{ width: '2rem' }}   >Gi?? t???</TableCell>
                            <TableCell  style={{ width: '6rem' }}   >S??? l?????ng</TableCell>
                            <TableCell  style={{ width: '2rem' }}   >T??? gi?? t??nh</TableCell>
                            <TableCell  style={{ width: '2rem' }}   >Th??nh ti???n</TableCell>
                            <TableCell  style={{ width: '2rem' }}   >Ghi ch??</TableCell>
                            {/* <TableCell  style={{ width: '2rem' }}   >Xem trang</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {GioHangKHCT.map((x,index)=>(
                            <TableRow hover classes={{ hover: classes.hover }}>
                            {/* <TableCell style={{ width: '0.5rem !important' }}><Checkbox
                              checked={x.status}
                              onChange={()=>onClickCheckBox(index)}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            /></TableCell> */}
                            <TableCell  style={{ width: '0.1rem !important' }}  >        <img 
                                    data-toggle="modal" data-target={`#HinhAnhGioHang${index}`}
                                    src={x.image}
                                  
                                    style={{width:'40px',height:'40px'}}
                                    ></img>
                                    
                                    <div className="modal fade" id={`HinhAnhGioHang${index}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                      <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Chi ti???t ???nh</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                              <span aria-hidden="true">??</span>
                                            </button>
                                          </div>
                                          <div className="modal-body" style={{width:'100%',height:'500px'}}>
                                                      <img 
                                                
                                                src={x.image}
                                                style={{width:'100%',height:'500px'}}
                                                ></img>
                                          </div>
                                          <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">????ng</button>
                                            
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                            </TableCell>
                            <TableCell style={{ width: '2rem  !important' }}>
                            <input className="form-control"
                              style={{width:'100px'}}
                              value={x.web} onChange={(e)=>{
                                var value = e.target.value;
                                // onChangeTitle(value,index)
                              }}></input>
                              <a 
                              style={{cursor:'pointer',color:'green'}}
                              onClick={()=>{
                                window.open(x.web,x.web)
                              }}
                              >???????ng d???n</a>
                              {/* <a href={x.web}>x.web</a> */}
                              </TableCell>
                            <TableCell   style={{ width: '2rem !important' }} >
                            <input className="form-control"
                            style={{width:'80px'}}
                              value={x.price} onChange={(e)=>{
                                var value = e.target.value;
                                onChangePrice(value,index)
                              }}></input></TableCell>
                            <TableCell   style={{ width: '2rem !important' }}  ><input className="form-control"
                              value={x.qty} onChange={(e)=>{
                                var value = e.target.value;
                                onChangeQty(value,index)
                              }}></input></TableCell>
                            <TableCell   style={{ width: '2rem !important' }}  >{parseInt(ti_gia_tinh).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</TableCell>
                            <TableCell   style={{ width: '2rem !important' }}  >{
                            parseInt(x.price * x.qty * parseInt(ti_gia_tinh) ).toLocaleString('vi', { style: 'currency', currency: 'VND' })
                            }</TableCell>
                            <TableCell  style={{ width: '2rem !important' }}  ><textarea 
                            style={{width:'150px'}}
                            className="form-control"
                              value={x.note}
                              
                              onChange={(e)=>{
                                var value = e.target.value;
                                onChangeNote(value,index)
                              }}></textarea></TableCell>
                            <TableCell  style={{ width: '2rem !important' }}   >
                            <div>
             
                                 {/* <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target={`#IDGioHang${index}`}>
                                  Xem
                                </button> */}
                  
                                <div className="modal fade" id={`IDGioHang${index}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Xem Trang</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">??</span>
                                        </button>
                                      </div>
                                      <div className="modal-body" style={{width:'100%',height:'600px'}}>
                                      <input className="form-control" value={x.web}></input><i class="bi bi-clipboard"></i>
                              
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">????ng</button>
                                        
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </TableCell>
                          </TableRow>
                          ))}
 
                        </TableBody>
                      </Table>
                    </div>
       
                  </div>
           
                  <div className="row">
                    <div className="col-12">
                      <p className="lead"></p>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody><tr>
                            <th style={{ width: '50%' }}>T???ng ti???n t???:</th>
                            <td>{ parseFloat(TienGioHang).toFixed(2) } ??</td>
                          </tr>
                            <tr>
                              <th>T???ng ti???n vi???t</th>
                              <td>{parseInt(TienGioHang*parseInt(ti_gia_tinh) ).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                            <tr>
                            <th style={{ width: '50%' }}>S??? l?????ng t???ng:</th>
                            <td>  {so_luong_tong}</td>
                          </tr>
                            <tr>
                              <th>Tie????n phi?? no????i ??i??a ( {parseInt(phi_noi_dia)/ti_gia_tinh}??)</th>
                              <td><input className="form-control" 
                              value={parseInt(phi_noi_dia).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                              style={{width:'150px'}}
                              onChange={e=>setphi_noi_dia(e.target.value)}
                              disabled={true}
                              ></input>
                         
                              </td>
                            </tr>
                            <tr>
                              <th>Ti???n c??n kh???i</th>
                              <td><input className="form-control" 
                              style={{width:'150px'}}

                              value={
                                parseInt(
                                  parseFloat(so_khoi)*parseInt(KhachHang.map(x => x.tien_theo_khoi)) + parseFloat(so_can)*parseInt(KhachHang.map(x => x.tien_theo_can))
                                ).toLocaleString('vi', { style: 'currency', currency: 'VND' })
                                
                              }
                              disabled={true}></input>
                              <div className="mt-3"></div>
                              <SoKhoiSoCan id_don={id_don_hang} onUpdateKhoiCan={onUpdateKhoiCan}></SoKhoiSoCan>
                              </td>
                            </tr>
                            <tr>
                              <th>Ti???n ph?? d???ch v??? </th>
                              <td><input className="form-control"
                              value={phi_dich_vu}
                              style={{width:'150px'}}
                              onChange={e=>setphi_dich_vu(e.target.value)}
                              ></input></td>
                            </tr>
                            <tr>
                              <th>Ti???n ph??? ph?? </th>
                              <td><input className="form-control"
                              value={phu_phi}
                              onChange={e=>setphu_phi(e.target.value)}
                              style={{width:'150px'}}></input></td>
                            </tr>
                            <tr>
                              <th>Th??nh ti???n</th>
                              <td>{

                              parseInt(
                                parseInt(so_can*tien_theo_can+so_khoi*tien_theo_khoi)+
                                TienGioHang*ti_gia_tinh
                                + parseInt(phi_noi_dia === null || phi_noi_dia === '' ? 0 : phi_noi_dia) + parseInt(phi_dich_vu === null 
                                  || phi_dich_vu === ''
                                  ? 
                                  0 : phi_dich_vu) + + parseInt(phu_phi === null || phu_phi === '' ? 0 : phu_phi)
                              ).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                              
                              </td>
                            </tr>
                          </tbody></table>
                      </div>
                    </div>
                
                  </div>
              
                  {/* this row will not appear when printing */}
                  <div className="row no-print">
                    <div className="col-12">
                      {/* <BtnTachDonKhachHang GioHangKHCT={GioHangKHCT}
                      id_don_hang={id_don_hang}
                      onUploadGioHangKH={onUploadGioHangKH}
                      ></BtnTachDonKhachHang> */}

          

                      <button type="button" className="btn btn-success float-right" 
                      onClick={()=>onClickHangVeKho()}
                      id="btnDatHangGioHang"
                      ><i className="far fa-credit-card"  /> {" "}
                        H??ng v??? kho
                      </button>
                      <button type="button" className="btn btn-info float-right mr-3" 
                      onClick={()=>onClickCapNhap()}
                      id="btnDatHangGioHang"
                      ><i className="fas fa-redo" styke={{color:'while'}} /> {" "}
                        C???p nh???t
                      </button>
                      {/* <button type="button" className="btn btn-primary float-right" style={{marginRight: '5px'}}>
                    <i className="fas fa-download" /> Generate PDF
                  </button> */}
                    </div>
                  </div>
                </div>
                {/* /.invoice */}
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
  
    )
 
}

const BtnTachDonKhachHang = ({GioHangKHCT,id_don_hang,onUploadGioHangKH})=>{
  const alert = useAlert()
  const onClickTachDonHang = async (GioHangKHCT)=>{
    try{
      console.log(GioHangKHCT) 
      let check = false
      for(let i=0;i<=GioHangKHCT.length;i++){
        if(GioHangKHCT[i].status === true){
          check =true
          break
        }
      }
      if(check){
        $("#IdTachDonHang").prop("disabled", true );
        alert.info("T??ch s???n ph???m th??nh c??ng" ,{position:positions.BOTTOM_CENTER})
        const token = await Token.Token()
        const response = await fetch(host.TachDonHang + `/${id_don_hang}`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({token,GioHangKHCT}),
        })
        $("#IdTachDonHang").prop("disabled", false );
        const JsonData = await response.json()
        if(JsonData.status ===1){
            onUploadGioHangKH(func.DecodeJson_RESPONSE(JsonData.data))
        }else{

        }
      }else{
        alert.info("Ng?????i d??ng ch???n t???i thi???u m???t s???n ph???m",{position:positions.BOTTOM_CENTER})
      }
    }catch(error){
      console.log(error)
      alert.info("Ng?????i d??ng ch???n t???i thi???u m???t s???n ph???m",{position:positions.BOTTOM_CENTER})
    }
  }
  return(
    <>
    <button 
    rel="noopener" target="_blank" className="btn btn-default"
    id="IdTachDonHang"
    onClick={()=>onClickTachDonHang(GioHangKHCT)}
    ><i className="fas fa-print" 
     
     /> T??ch ????n h??ng</button>
    </>
  )
}

export default ChiTietDangPhatGiaoVan


