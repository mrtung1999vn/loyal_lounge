import React from 'react'
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

function DSHangVeKho({ 
  tien_hang,chi_phi,so_can_khoi,
  HangVeKho , UpdateXoaHangVeKho ,UpdateSuaHangVeKho , onChangePage,totalPage,page,_onChangeImage}) {
  // const [load,setLoad] = React.useState('')
  // <img id="someImage" />
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

  const onXoaHangVeKho = (e)=>{
    UpdateXoaHangVeKho(e)
  }
  const onSuaHangVeKho = (e)=>{
    UpdateSuaHangVeKho(e)
  }

  

  const handleChange = async (event, value) => {
    onChangePage(value)
  }
     const inputPageChange = React.useCallback(async (value)=>{
      try {
      } catch (error) {
        
      }
    })
    // console.log(HangVeKho)


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
      <div className="row">
<div className="col-lg-3 col-6">
   
   <div className="small-box bg-info">
      <div className="inner">
         <h3>{
           parseInt(tien_hang).toLocaleString('vi', {style : 'currency', currency : 'VND'})
           } </h3>
         <p>Tổng tiền hàng</p>
      </div>
      <div className="icon">
         <i className="ion ion-person-add"></i>
      </div>
   </div>
</div>
<div className="col-lg-3 col-6">
   
   <div className="small-box bg-primary">
      <div className="inner">
         <h3>
           {parseInt(chi_phi).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
         </h3>
         <p>Tổng chi phí</p>
      </div>
      <div className="icon">
         <i className="ion ion-pie-graph"></i>
      </div>
   </div>
</div>

<div className="col-lg-3 col-6">
   
   <div className="small-box bg-warning">
      <div className="inner">
         <h3>{parseInt(so_can_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})} </h3>
         <p>Tổng tiền cân khối</p>
      </div>
      <div className="icon">
         <i className="ion ion-bag"></i>
      </div>
   </div>
</div>

<div className="col-lg-3 col-6">
 
   <div className="small-box bg-success">
      <div className="inner">
         <h3>{parseInt(
           tien_hang+ chi_phi+so_can_khoi
         ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
          </h3>
           <p>Thành tiền</p>
      </div>
      <div className="icon">
         <i className="ion ion-stats-bars"></i>
      </div>
   </div>
</div> 
</div>
     
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                <div className="container">
                  
                </div>
                </h3>
              </div>
              {/* /.card-header */}
              <div className="card-body" >
                <Paper className={classes.root} style={{height:'100vh'}}>
                  <Table className={classes.table} aria-label="simple table" hidden={false}>
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>Chọn</TableCell> */}
                        <TableCell>Hình ảnh</TableCell>
<TableCell>Thay đổi HA</TableCell>
<TableCell>Chi tiết</TableCell>
                        <TableCell>Mã ĐH</TableCell>
                        <TableCell>Mã VĐ</TableCell>
                        <TableCell>Tên KH</TableCell>
                        {/* <TableCell>CT giá</TableCell> */}
                        <TableCell>CT sản phẩm</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* 100vh => 10items */}
                      {HangVeKho.map((x,index) => (
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

                          </TableCell>
                          <TableCell>
                            <ThanhDoiImage id_don={x.id_don} onChangeImage={onChangeImage}></ThanhDoiImage>
                          </TableCell>
                                             <TableCell style={{whiteSpace:'nowrap'}}>
                             Tổng tệ : {parseFloat( x.tong_tien / x.tien_ti_gia )}¥<br></br>
                            Tỉ giá tệ : {parseInt( x.tien_ti_gia ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}/1¥<br></br>
                            Tiền hàng: {parseInt(x.tong_tien === undefined || x.tong_tien === '' || x.tong_tien === null ? 0 : x.tong_tien).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                            Phí nội địa ( {x.phi_noi_dia / x.tien_ti_gia}¥): {parseInt(x.phi_noi_dia === undefined || x.phi_noi_dia === '' || x.phi_noi_dia === null ? 0 : x.phi_noi_dia).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                            <br></br>
                          {/* Tiền cân khối */}
                          Tiền Cân ({x.so_can} KG -- {x.tien_can}đ/1Kg): {parseInt(x.so_can * x.tien_can ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                          Tiền khối ({x.so_khoi} m3 -- { x.tien_khoi }đ/1m3): {parseInt(x.so_khoi * x.tien_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})} <br></br>
                          {/* Tiền cân khối */}
                          Tổng tiền cân khối: {parseInt(x.so_can * x.tien_can + x.so_khoi * x.tien_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                          Thành tiền: {
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
                          <TableCell>{x.van_don !== null ? <>
                              {x.van_don.split('_').map(y=><>
                                {y}<br></br>
                              </>)}
                              </> : <></>}</TableCell>
                          <TableCell>
                              {x.ten_kh}
                          </TableCell>
                          {/* <TableCell align="left">
                                <ChiTietGia dl={x}></ChiTietGia>
                          </TableCell> */}
                          
                          <TableCell align="left"><Link className="btn btn-warning btn-sm" to={`/ChiTietDonHang?stt=Hàng về kho&id_don_hang=${x.id_don}&id_kh=${x.id_kh}`}
                     
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


export default DSHangVeKho;











<div className="row">
<div className="col-lg-3 col-6">
   
   <div className="small-box bg-info">
      <div className="inner">
         <h3>123 </h3>
         <p>Tổng tiền hàng</p>
      </div>
      <div className="icon">
         <i className="ion ion-person-add"></i>
      </div>
   </div>
</div>
<div className="col-lg-3 col-6">
   
   <div className="small-box bg-primary">
      <div className="inner">
         <h3>123 </h3>
         <p>Tổng chi phí</p>
      </div>
      <div className="icon">
         <i className="ion ion-pie-graph"></i>
      </div>
   </div>
</div>

<div className="col-lg-3 col-6">
   
   <div className="small-box bg-warning">
      <div className="inner">
         <h3>123 </h3>
         <p>Tổng tiền cân khối</p>
      </div>
      <div className="icon">
         <i className="ion ion-bag"></i>
      </div>
   </div>
</div>

<div className="col-lg-3 col-6">
 
   <div className="small-box bg-success">
      <div className="inner">
         <h3>
           123   </h3>
           <p>Tổng tiền cân khối</p>
      </div>
      <div className="icon">
         <i className="ion ion-stats-bars"></i>
      </div>
   </div>
</div> 
</div>