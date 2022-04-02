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
import SuaKhachHang from './SuaKhachHang';
import XoaKhachHang from './XoaKhachHang';
import TimeLibrary from '../../../../asset/TimeLibrary'
import GioHang from './GioHang';

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

function DSKhachHang({ KhachHang , UpdateXoaKhachHang ,UpdateSuaKhachHang , onChangePage,totalPage,page}) {
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

  const onXoaKhachHang = (e)=>{
    UpdateXoaKhachHang(e)
  }
  const onSuaKhachHang = (e)=>{
    UpdateSuaKhachHang(e)
  }

  

  const handleChange = async (event, value) => {
    onChangePage(value)
  }
     const inputPageChange = React.useCallback(async (value)=>{
      try {
      } catch (error) {
        
      }
    })
  return (
    <section className="content">
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Danh sách</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body" >
                <Paper className={classes.root} style={{height:'100vh'}}>
                  <Table className={classes.table} aria-label="simple table" hidden={false}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên KH</TableCell>
                        <TableCell align="left">Thanh toán</TableCell>
                        <TableCell align="left">Phí hàng</TableCell>
                        <TableCell align="left">Tiền cân khối</TableCell>
                        <TableCell align="left">Chi phí</TableCell>
                        <TableCell align="left">Tiền chốt</TableCell>
                        <TableCell align="left">Thao tác</TableCell>
                        {/* <TableCell align="left">Tài khoản</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* 100vh => 10items */}
                      {KhachHang.map(x => (
                        <TableRow hover classes={{ hover: classes.hover }} key={x.id_kh}>
                          <TableCell align="left">{x.ten_kh}</TableCell>
                          
                          <TableCell align="left">{parseInt(x.thanh_toan === null ? 0 : x.thanh_toan).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</TableCell>
                          <TableCell align="left">{parseInt(x.phi_hang === null ? 0 : x.phi_hang).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</TableCell>
                          {/* <TableCell align="left">{TimeLibrary.convertTime(x.ngay_sinh).split(" ")[0]}</TableCell> */}
                          <TableCell align="left">{parseInt(x.tien_can_khoi=== null ? 0 : x.tien_can_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</TableCell>
                          <TableCell align="left">{parseInt(x.chi_phi === null ? 0 : x.chi_phi).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</TableCell>
                          <TableCell align="left">{parseInt(
                            (x.thanh_toan === null ? 0 : x.thanh_toan)-
                            (x.phi_hang === null ? 0 : x.phi_hang)-
                            (x.tien_can_khoi === null ? 0 : x.tien_can_khoi)-
                            (x.chi_phi === null ? 0 : x.chi_phi)
                            ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</TableCell>
                          {/* <TableCell align="left">{x.cmnd}</TableCell> */}
                          {/* <TableCell align="left">{x.id_tk}</TableCell> */}
                          <TableCell align="left">
                            <div>
                              {/* <a className="btn btn-primary btn-sm" href="#">
                                    <i className="fas fa-folder">
                                    </i>
                                    View
                              </a> */}
                              <GioHang dulieu={x}></GioHang>
                              <SuaKhachHang dulieu={x} onSuaKhachHang={onSuaKhachHang}></SuaKhachHang>
                              <XoaKhachHang dulieu={x} onXoaKhachHang={onXoaKhachHang}></XoaKhachHang>
                            </div>
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

export default DSKhachHang
