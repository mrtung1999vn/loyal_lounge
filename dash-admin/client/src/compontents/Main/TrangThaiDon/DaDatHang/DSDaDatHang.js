import React, {useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import ReactLoading from 'react-loading';

import TimeLibrary from '../../../../asset/TimeLibrary'
import Checkbox from '@material-ui/core/Checkbox';
import ChiTietGia from './ChiTietGia';
import { Link } from 'react-router-dom';
import Token from '../../../../storage/Token';
import host from '../../../../service/host';
import Customer from '../../../../storage/Customer'
import ThanhDoiImage from '../ThanhDoiImage';
// import Token from '../'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
      // float:'right'
    },
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: '100%',
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

function DSDaDatHang({ DaDatHang , UpdateXoaDaDatHang ,UpdateSuaDaDatHang , onChangePage,totalPage,page,onClickCapNhapDon,_onChangeImage}) {
  // const [load,setLoad] = React.useState('')
  // <img id="someImage" />
  const timeTimeoutRef = useRef(null)
  function showGetResult(name, idElelemnt) {
    var result = null;
    var URL = name;

  };
  const [load, setLoad] = React.useState(true)
  const classes = useStyles();

  React.useEffect(() => {
    try {
    } catch (error) {

    }
  }, [])

  const onXoaDaDatHang = (e)=>{
    UpdateXoaDaDatHang(e)
  }
  const onSuaDaDatHang = (e)=>{
    UpdateSuaDaDatHang(e)
  }

  

  const handleChange = async (event, value) => {
    onChangePage(value)
  }
     const inputPageChange = React.useCallback(async (value)=>{
      try {
      } catch (error) {
        
      }
    })
    // console.log(DaDatHang)


    const onClickDuLieuGioHang= async (e)=>{
      try {
          const token = await Token.Token()
          
        
          const response = await fetch(host.GioHangKhach + `/${e}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
          })
    
          const JsonData = await response.json()
          // console.log(JsonData)
          if (JsonData.status === 1) {
              Customer.setCustomer(JsonData.data)    
              // Customer.getCustomer
          } else {}
        } catch (error) {
    
        }
    }
  
  const onChangeMaVanDon = async (id_don,value)=>{
    try{  
      const _value = value 
      const _id_don = id_don 
      console.log(_value,_id_don)
      if(timeTimeoutRef.current){
          clearTimeout(timeTimeoutRef.current)
      }
      
      timeTimeoutRef.current = setTimeout(async ()=>{
              const response = await fetch(host.CapNhapVanDonChuyen + `/${_id_don}/${_value}`)
              const JsonData = await response.json()
  
              if(JsonData.status === 1){
                alert('C???p nh???p th??nh c??ng!')
                onClickCapNhapDon(true)
              }else{
                alert('C???p nh???p kh??ng th??nh c??ng!')
              }
      },500)
    }catch(error){

    }
  }
  const onClickCheckBox = (x)=>{
    try{
      console.log(x)
    }catch{

    }
  }

  const onChangeImage = (e)=>{
    _onChangeImage(e)
  }

  return (
    <section className="content">
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                <div className="container">
                  <div className="row" >
                   {/* <div class="col">
                      T??m theo t??n
                      <input className="form-control"></input>
                      </div>
                   
                      <div class="col">
                      T??m theo M?? ??H
                      <input className="form-control"></input>
                      </div>
                      
                      <div class="col">
                      T??m theo M?? V??
                      <input className="form-control"></input>
                      </div>
                      <div class="col">
                        <label hidden={true}>-</label><br></br>
                        <button className="btn btn-primary">T??m ki???m</button>
                      </div> */}
                      <div class="col">
                        <label hidden={true}>-</label><br></br>
                        {/* <button className="btn btn-primary" onClick={()=>onClickGopHoaDon()}>G???p ????n</button> */}
                      </div>
                  </div>
                </div>
                </h3>
              </div>
              {/* /.card-header */}
              <div className="card-body" >
                <Paper className={classes.root} style={{height:'100vh'}}>
                  <Table className={classes.table} aria-label="simple table" hidden={false}>
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>Ch???n</TableCell> */}
                        <TableCell>H??nh ???nh</TableCell>
<TableCell>Thay ?????i HA</TableCell>
                       <TableCell>Chi tiet</TableCell> 

                        <TableCell>M?? ??H</TableCell>
                        <TableCell>M?? V??</TableCell>
                        <TableCell>T??n KH</TableCell>
                        {/* <TableCell>CT gi??</TableCell> */}
                        <TableCell>CT s???n ph???m</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* 100vh => 10items */}
                      {DaDatHang.map((x,index) => (
                        <TableRow hover classes={{ hover: classes.hover }} key={x.id_don}>
                          {/* <TableCell align="left">
                            <Checkbox
                                checked={x.status}
                                onChange={()=>onClickCheckBox(x)}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                          </TableCell> */}
                          <TableCell align="left">
                              <img 
                                    data-toggle="modal" data-target={`#HinhAnhXuLyDon${index}`}
                                    src={x.image}
                                    // src={x.image}
                                    style={{width:'50px',height:'50px'}}
                              ></img>
                                  <div className="modal fade" id={`HinhAnhXuLyDon${index}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                                          {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                          </TableCell>
                          <TableCell>
                            <ThanhDoiImage id_don={x.id_don} onChangeImage={onChangeImage}></ThanhDoiImage>
                          </TableCell>
                          <TableCell style={{whiteSpace:'nowrap'}}>
                            T???ng t??? : {parseFloat( x.tong_tien / x.tien_ti_gia )}??<br></br>
                            T??? gi?? t??? : {parseInt( x.tien_ti_gia ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}/1??<br></br>
                            Ti???n h??ng: {parseInt(x.tong_tien === undefined || x.tong_tien === '' || x.tong_tien === null ? 0 : x.tong_tien).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                            Ph?? n???i ?????a: {parseInt(x.phi_noi_dia === undefined || x.phi_noi_dia === '' || x.phi_noi_dia === null ? 0 : x.phi_noi_dia).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                            <br></br>
                          {/* Ti???n c??n kh???i */}
                          Ti???n C??n ({x.so_can} KG -- {x.tien_can}??/1Kg): {parseInt(x.so_can * x.tien_can ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                          Ti???n kh???i ({x.so_khoi} m3 -- { x.tien_khoi }??/1m3): {parseInt(x.so_khoi * x.tien_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})} <br></br>
                          {/* Ti???n c??n kh???i */}
                          T???ng ti???n c??n kh???i: { parseInt(x.so_can * x.tien_can + x.so_khoi * x.tien_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                          Th??nh ti???n: {
                              parseInt(
                                (x.tong_tien === undefined || x.tong_tien === '' || x.tong_tien === null ? 0 : x.tong_tien)+
                                (x.phi_noi_dia === undefined || x.phi_noi_dia === '' || x.phi_noi_dia === null ? 0 : x.phi_noi_dia)+
                                (x.phu_phi === undefined || x.phu_phi === '' || x.phu_phi === null ? 0 : x.phu_phi)+
                                (x.phi_dich_vu === undefined || x.phi_dich_vu === '' || x.phi_dich_vu === null ? 0 : x.phi_dich_vu)
                                + parseInt(x.so_can*x.tien_can + x.so_khoi*x.tien_khoi)
                              ).toLocaleString('vi', {style : 'currency', currency : 'VND'})
                          }<br></br>

                            </TableCell>


<TableCell>
                              {x.ma_don}
                          </TableCell>
                          <TableCell>
                            <input className="form-control" style={{width:'150px'}}
                            onChange={e=>{
                              var value = e.target.value
                              var id_don = x.id_don
                              onChangeMaVanDon(id_don,value)
                            }}
                            ></input>
                              {x.van_don}
                          </TableCell>
                          <TableCell>
                              {x.ten_kh}
                          </TableCell>
                          {/* <TableCell align="left">
                                <ChiTietGia dl={x}></ChiTietGia>
                          </TableCell> */}
                          
                          <TableCell align="left"><Link className="btn btn-warning btn-sm" to={`/ChiTietDonHang?stt=???? ?????t h??ng&id_don_hang=${x.id_don}&id_kh=${x.id_kh}`}
                     
                          >
                          <i className="fa fa-eye"></i>Xem 
                            </Link></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                  </Table>
                       
                </Paper>
                <div className={classes.root}>
                    <Typography style={{color:'black'}} style={{textAlign:'center',position:'relative',float:'right',marginRight:'100px'}}>Trang: <input value={page} style={{width:'40px'}}
                    onChange={e=>
                      inputPageChange(e.target.value === NaN ? parseInt(1) : parseInt(e.target.value))
                    }
                    ></input> / {totalPage}</Typography>
                    
                  </div>
                  <Pagination count={totalPage} page={page} onChange={handleChange} style={{textAlign:'center',position:'relative',float:'right',marginLeft:'100px'}}/>
              </div>
              {/* /.card-body */}
            </div>
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}
    </section>


  )
}

export default DSDaDatHang
