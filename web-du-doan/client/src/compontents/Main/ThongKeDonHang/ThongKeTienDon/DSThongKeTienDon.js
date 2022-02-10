import React from 'react'
import {useHistory} from 'react-router-dom'
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

function DSTienDon({ TienDon , 
  tien_don,tien_can_khoi,chi_phi,
  UpdateXoaTienDon ,UpdateSuaTienDon , onChangePage,totalPage,page}) {
  const history = useHistory()
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

  const onXoaTienDon = (e)=>{
    UpdateXoaTienDon(e)
  }
  const onSuaTienDon = (e)=>{
    UpdateSuaTienDon(e)
  }

  

  const handleChange = async (event, value) => {
    onChangePage(value)
  }
     const inputPageChange = React.useCallback(async (value)=>{
      try {
      } catch (error) {
        
      }
    })
    // console.log(TienDon)


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


    React.useEffect(()=>{
      try{
        // let tong_tien = 0 
        // let chi_phi = 0 
        // let tien_can_khoi = 0 
  
        // for(let i=0;i<TienDon.length;i++){
        //   let tien_tt = (TienDon[i].tong_tien === '' || TienDon[i].tong_tien === undefined || TienDon[i].tong_tien === null ? 0 : TienDon[i].tong_tien)
        //   let tien_cp = (TienDon[i].chi_phi === '' || TienDon[i].chi_phi === undefined || TienDon[i].chi_phi === null ? 0 : TienDon[i].chi_phi)
        //   let tien_ck = (TienDon[i].tien_can_khoi === '' || TienDon[i].tien_can_khoi === undefined || TienDon[i].tien_can_khoi === null ? 0 : TienDon[i].tien_can_khoi)
        //   tong_tien += tien_tt
        //   chi_phi += tien_cp
        //   tien_can_khoi += tien_ck
        //   if(i + 1 === TienDon.length){
        //     window.localStorage.setItem("tong_tien",tong_tien)
        //     window.localStorage.setItem("chi_phi",chi_phi)
        //     window.localStorage.setItem("tien_can_khoi",tien_can_khoi)
        //     settien_don(tong_tien)
        //     setchi_phi(chi_phi)
        //     settien_can_khoi(tien_can_khoi)
        //   }
        //     // history.push('/ThongKeTienHang'); // no longer in React Router V4
        // }
      }catch (error){
        console.log(error)
      }
  },[])
  

  return (
    
    <section className="content">
      <div className="row">
      <div className="col-lg-3 col-6">
         
         <div className="small-box bg-info">
            <div className="inner">
               <h3>{parseInt(tien_don).toLocaleString('vi', {style : 'currency', currency : 'VND'})} </h3>
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
               <h3>{parseInt(chi_phi).toLocaleString('vi', {style : 'currency', currency : 'VND'})} </h3>
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
               <h3>{parseInt(tien_can_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})} </h3>
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
               <h3>{
                 parseInt(
                  tien_don+tien_can_khoi+chi_phi
                 ).toLocaleString('vi', {style : 'currency', currency : 'VND'})
                 }</h3>
               <p>Tổng tiền</p>
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
                  <div className="row" >
                   {/* <div class="col">
                      Tìm theo tên
                      <input className="form-control"></input>
                      </div>
                   
                      <div class="col">
                      Tìm theo Mã ĐH
                      <input className="form-control"></input>
                      </div>
                      
                      <div class="col">
                      Tìm theo Mã VĐ
                      <input className="form-control"></input>
                      </div>
                      <div class="col">
                        <label hidden={true}>-</label><br></br>
                        <button className="btn btn-primary">Tìm kiếm</button>
                      </div> */}
                      <div class="col">
                        <label hidden={true}>-</label><br></br>
                        {/* <button className="btn btn-primary" onClick={()=>onClickGopHoaDon()}>Gộp đơn</button> */}
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
                        {/* <TableCell>Chọn</TableCell> */}
                        <TableCell>Mã đơn</TableCell>
                        <TableCell>Vận đơn</TableCell>
                        <TableCell>Tên khách</TableCell>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Tiền hàng</TableCell>
                        <TableCell>Tổng chi phí</TableCell>
                        <TableCell>Tiền khối cân</TableCell>
                        <TableCell>Thành tiền</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* 100vh => 10items */}
                      {TienDon.map((x,index) => (
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
                          <TableCell>
                              {TimeLibrary.convertTime(x.ngay)}
                          </TableCell>
                          <TableCell align="left">
                                {
                                parseInt(
                                  x.tong_tien === '' || x.tong_tien === undefined || x.tong_tien === null ? 0 : x.tong_tien
                                ).toLocaleString('vi', {style : 'currency', currency : 'VND'})
                                
                                }
                          </TableCell>
                          <TableCell align="left">
                          {
                                parseInt(
                                  x.chi_phi === '' || x.chi_phi === undefined || x.chi_phi === null ? 0 : x.chi_phi
                                ).toLocaleString('vi', {style : 'currency', currency : 'VND'})
                                
                                }
                               
                          </TableCell>
                          <TableCell align="left">
                                {
                                  parseInt(
                                    x.tien_can_khoi === '' || x.tien_can_khoi === undefined || x.tien_can_khoi === null ? 0 : x.tien_can_khoi
                                  ).toLocaleString('vi', {style : 'currency', currency : 'VND'})
                                }
                          
                          </TableCell>

                          <TableCell align="left">
                            {/* .toLocaleString('vi', {style : 'currency', currency : 'VND'}) */}
                                {
                                parseInt(
                                  parseInt(x.tong_tien === '' || x.tong_tien === undefined || x.tong_tien === null ? 0 : x.tong_tien)+
                                  parseInt(x.chi_phi === '' || x.chi_phi === undefined || x.chi_phi === null ? 0 : x.chi_phi)+
                                  parseInt(x.tien_can_khoi === '' || x.tien_can_khoi === undefined || x.tien_can_khoi === null ? 0 : x.tien_can_khoi)
                                )
                                .toLocaleString('vi', {style : 'currency', currency : 'VND'})
                                }
                          </TableCell>
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

export default DSTienDon
