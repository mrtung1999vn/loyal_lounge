import React, { useEffect,useRef} from 'react'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import Customer from '../../../storage/Customer'
import func from '../../../asset/func'
import { useLocation } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
import socketIOClient from "socket.io-client";
import { useCallback } from 'react'
import {positions, useAlert} from 'react-alert'
import $ from 'jquery'
function GioHang() {
  //#region setState
  const alert = useAlert()
  const [KhachHang, setKhachHang] = React.useState(
    []
  )
  const [GioHangKH, setGioHangKH] = React.useState([])
  const [TienGioHang, setTienGioHang] = React.useState([])
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  // const [bool_GioHang,setbool_GioHang] = React.useState(false)
  const onClickDuLieuGioHang= React.useCallback (async ()=>{
    try {
        const token = await Token.Token()
        const response = await fetch(host.GioHangKhach + `/${query.get("khachhang")}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        })
  
        const JsonData = await response.json()
        // console.log(JsonData)
        if (JsonData.status === 1) {
            Customer.setCustomer(JsonData.data)    
            setKhachHang(func.DecodeJson_RESPONSE(Customer.getCustomer()))
            // Customer.getCustomer
            
        } else {}
      } catch (error) {
  
      }
      })

  const onClickDatHang = async() => {
    try {
      // alert("Đặt hàng!")
      let bool = false
      for(let i =0 ; i < GioHangKH.length;i++){
        if(GioHangKH[i].status === true){
          bool = true
        }  
      }
      console.log(bool)
      if(bool){
        const NEW_GioHangKH = [...GioHangKH]
        const token = await Token.Token()
        $("#btnDatHangGioHang").prop( "disabled", true );
        // console.log(NEW_GioHangKH)
        const response = await fetch(host.UPDATE_GIOHANG + `/${query.get("khachhang")}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token ,NEW_GioHangKH,TienGioHang})
        })
        const JsonData = await response.json()
        $("#btnDatHangGioHang").prop( "disabled", false );
        console.log(JsonData)
        if(JsonData.status ===1){
          alert.success("Đặt hàng thành công!",{position:positions.BOTTOM_CENTER})
          setGioHangKH(func.DecodeJson_RESPONSE(JsonData.data))
        }else{
          alert.info("Đặt hàng không thành công!",{position:positions.BOTTOM_CENTER})
        }
      }else{
        alert.info("Người dùng chọn giỏ hàng!",{position:positions.BOTTOM_CENTER})
      }
  
    } catch (error) {
      console.log(error)
    }
  }

  const onClickCheckBox = (index)=>{
    try {
        const newData = [...GioHangKH]

        for(let i =0 ; i < newData.length;i++){
          if(index ===i)
            newData[i].status = !newData[i].status
        }
        setGioHangKH(newData)
    } catch (error) {
      
    }
  }

  const updateGioHang = useCallback((JsonData)=>{
    try {
      let tien_gio_hang = 0
      const newData = JSON.parse(JsonData.map(x=>x.gio_hang))
      newData.map((y,index)=>{
          tien_gio_hang += y.price*y.qty
        if(index + 1 === newData.length){setTienGioHang(tien_gio_hang)}
      })
      setGioHangKH(
        JSON.parse(JsonData.map(x=>x.gio_hang))
      )
      
    } catch (error) {
      setGioHangKH([])
    }

   
   
  },[])
  const firstUpdate = useRef(true);

  useEffect(async ()=>{
    try{
      onClickDuLieuGioHang()
    }catch{

    }
  },[])
  
  useEffect(async () => {
    try {
      const token = await Token.Token()
      // console.log(host.GioHangKhach + `/${query.get("khachhang")}`)
      const response = await fetch(host.GioHangKhach + `/${query.get("khachhang")}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      })

      const JsonData = await response.json()
      // console.log(JsonData)
      if (JsonData.status === 1) {
        // console.log(func.DecodeJson_RESPONSE(JsonData.data))
        updateGioHang(func.DecodeJson_RESPONSE(JsonData.data))
        setKhachHang(func.DecodeJson_RESPONSE(JsonData.data))
      } else {}
      // $(".modal-backdrop").remove()
    } catch (error) {

    }
  }, [])

  useEffect(async ()=>{
      // SOCKET-IO
        try {
          const socket = socketIOClient(host.host);
          socket.on("getGioHang", data => {
            const newData = [...data]
            const index = newData.findIndex(dl => dl.id_kh === query.get("khachhang"))
            const arrayData = []
            arrayData.push(newData[index])
            updateGioHang(arrayData)
            setKhachHang(arrayData)
          });
        } catch (error) {
          
        }
  },[])


  const onXoaGioHang = async (xindex)=>{
    try {

        const newGioHang = [...GioHangKH]
        newGioHang.splice(xindex, 1)
        const token = await Token.Token()
        const response = await fetch(host.CapNhapGioHang + `/${query.get("khachhang")}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token ,newGioHang})
        })
        const JsonData = await response.json()
        if(JsonData.status ===1){
          alert.success("Xoá thành công!!",{position:positions.BOTTOM_CENTER})
          setGioHangKH(newGioHang)
        }else{
          alert.info("Xoá không thành công!!",{position:positions.BOTTOM_CENTER})
        }
    } catch (error) {
      
    }
  }

  if(query.get("khachhang")===null){
      return(
        // <FormKhachHang></FormKhachHang>
        <div className="text-center">XIN VUI LÒNG CHỌN GIỎ HÀNG KHÁCH TRÊN TÀI KHOẢN</div>
      )
  }else{
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Giỏ hàng</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Quản lý</a></li>
                  <li className="breadcrumb-item active">Giỏ hàng</li>
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
                  Hiện tại người dùng đang xem giỏ hàng của khách hàng.
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
                        <strong>Tên khách : </strong><h4>{KhachHang.map(x => x.ten_kh)}</h4><br />
                        <strong>Địa chỉ:</strong> {KhachHang.map(x => x.dia_chi)}<br />
                        <strong>Số ĐT:</strong> {KhachHang.map(x => x.so_dt)}<br />
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
                      <b>Giỏ hàng khách</b><br />
                      <br />
                      <b>Tỉ giá tính: </b>{parseInt(KhachHang.map(x => x.ti_gia_tinh)).toLocaleString('vi', { style: 'currency', currency: 'VND' })} / 1¥ <br />
                      <b>Tiền theo cân: </b> {parseInt(KhachHang.map(x => x.tien_theo_can)).toLocaleString('vi', { style: 'currency', currency: 'VND' })}<br />
                      <b>Tiền theo khối: </b> {parseInt(KhachHang.map(x => x.tien_theo_khoi)).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
           
                  <div className="row">
                    <div className="col-12 table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Chọn</th>
                            <th>Ảnh</th>
                            <th style={{width:'200px'}}>Tên SP</th>
                            <th>Giá tệ</th>
                            <th>Số lượng</th>
                            <th>Tỉ giá tính</th>
                            <th>Thành tiền</th>
                            <th>Ghi chú</th>
                            <th>Xem trang</th>
                            <th>Xoá</th>
                          </tr>
                        </thead>
                        <tbody>
                          {GioHangKH.map((x,index)=>(
                            <tr>
                            <td><Checkbox
                              checked={x.status}
                              onChange={()=>onClickCheckBox(index)}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            /></td>
                            <td>        <img 
                                    data-toggle="modal" data-target={`#HinhAnhGioHang${index}`}
                                    src={x.image}
                                    // src={x.image}
                                    style={{width:'40px',height:'40px'}}
                                    ></img>
                                    
                                    <div className="modal fade" id={`HinhAnhGioHang${index}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                            </td>
                            <td style={{width:'200px'}}>{x.title}</td>
                            <td>{x.price}</td>
                            <td>{x.qty}</td>
                            <td>{parseInt(KhachHang.map(x => x.ti_gia_tinh)).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                            <td>{
                            parseInt(x.price * x.qty * parseInt(KhachHang.map(x => x.ti_gia_tinh))).toLocaleString('vi', { style: 'currency', currency: 'VND' })
                            }</td>
                            <td>{x.note}</td>
                            <td>
                            <div>
                                {/* Button trigger modal */}
                                 {/* <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target={`#IDGioHang${index}`}>
                                  Xem
                                </button> */}
                                {/* Modal */}
                                <div className="modal fade" id={`IDGioHang${index}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Xem Trang</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">×</span>
                                        </button>
                                      </div>
                                      <div className="modal-body" style={{width:'100%',height:'600px'}}>
                                      <input className="form-control" value={x.web}></input><i class="bi bi-clipboard"></i>
                                          {/* <iframe
                                          src={x.web} 
                                          // src="https://detail.tmall.com/item.htm?id=644946427084&spm=a2141.241046-global.feeds.d_8_0.1b4b6f117vvQE6&country=GLOBAL&pvid=ffd29c66-39c4-477f-8a7d-35cf81849192&scm=1007.35313.223891.0&utLogMap=%7B%22card_subtype%22:%22auction%22,%22up_pvid%22:%22e4b2b461-ca33-4218-b2f5-0685aeb8d19f%22,%22x_object_type%22:%22item%22,%22matrix_score%22:0.0,%22x_extend%22:%22matchtype:rhot"
                                          style={{width:'100%',height:'500px'}}
                                          ></iframe> */}
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" 
                                        className="btn btn-danger btn-sm" data-dismiss="modal"

                                        >Đóng</button>
                                        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </td>
                            <td style={{width:'10px',height:'10px',
                            color:'white'}}><button

                            onClick={()=>onXoaGioHang(index)}
                            
                            className="btn btn-danger btn-sm">Xoá</button></td>
                          </tr>
                          ))}
 
                        </tbody>
                      </table>
                    </div>
       
                  </div>
           
                  <div className="row">
                    <div className="col-12">
                      <p className="lead"></p>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody><tr>
                            <th style={{ width: '50%' }}>Tổng tiền tệ:</th>
                            <td>{TienGioHang } ¥</td>
                          </tr>
                            <tr>
                              <th>Tổng tiền việt (dự kiến)</th>
                              <td>{parseInt(TienGioHang*parseInt(KhachHang.map(x => x.ti_gia_tinh))).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                            <tr>
                              <th>Tiền phí nội địa (dự kiến)</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>Tiền cân khối (dự kiến)</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>Tiền phụ phí (dự kiến)</th>
                              <td></td>
                            </tr>
                            <tr>
                              <th>Thành tiền (dự kiến)</th>
                              <td>{parseInt(TienGioHang*parseInt(KhachHang.map(x => x.ti_gia_tinh))).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                          </tbody></table>
                      </div>
                    </div>
                
                  </div>
              
                  {/* this row will not appear when printing */}
                  <div className="row no-print">
                    <div className="col-12">
                      <a href="invoice-print.html" rel="noopener" target="_blank" className="btn btn-default"><i className="fas fa-print" /> Print</a>
                      <button type="button" className="btn btn-success float-right" onClick={() => onClickDatHang()}
                      id="btnDatHangGioHang"
                      ><i className="far fa-credit-card" onClick={() => onClickDatHang()} /> {" "}
                        Đặt hàng
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

}

export default GioHang
