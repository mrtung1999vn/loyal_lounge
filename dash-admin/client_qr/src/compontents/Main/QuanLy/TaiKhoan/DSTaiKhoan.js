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
import SuaTaiKhoan from './SuaTaiKhoan';
import XoaTaiKhoan from './XoaTaiKhoan';
import TimeLibrary from '../../../../asset/TimeLibrary'

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

function DSTaiKhoan({ TaiKhoan , UpdateXoaTaiKhoan ,UpdateSuaTaiKhoan , onChangePage,totalPage,page}) {
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

  const onXoaTaiKhoan = (e)=>{
    UpdateXoaTaiKhoan(e)
  }
  const onSuaTaiKhoan = (e)=>{
    UpdateSuaTaiKhoan(e)
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
                        <TableCell>Tài khoản</TableCell>
                        <TableCell align="left">Ngày tạo</TableCell>
                        <TableCell align="left">Trạng thái</TableCell>
                        <TableCell align="left">Loại tài khoản</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Tên người dùng</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* 100vh => 10items */}
                      {TaiKhoan.map(x => (
                        <TableRow hover classes={{ hover: classes.hover }} key={x.id_tk}>
                          <TableCell align="left">{x.tai_khoan}</TableCell>
                          <TableCell align="left">{TimeLibrary.convertTime(x.ngay)}</TableCell>
                          <TableCell align="left"><span className={x.trangthai === true ? "badge badge-success" : "badge badge-danger"}>
                            {x.trangthai === true ? "Kích hoạt" : "Không kích hoạt"}</span></TableCell>
                          <TableCell align="left">{x.loai_tk}</TableCell>
                          <TableCell align="left">{x.email}</TableCell>
                          <TableCell align="left">{x.ten_nguoi_dung}</TableCell>
                          <TableCell align="left">
                            <div>
                          {/* <a className="btn btn-primary btn-sm" href="#">
                                                <i className="fas fa-folder">
                                                </i>
                                                View
                                            </a> */}
                              <SuaTaiKhoan dulieu={x} onSuaTaiKhoan={onSuaTaiKhoan}></SuaTaiKhoan>
                              <XoaTaiKhoan dulieu={x} onXoaTaiKhoan={onXoaTaiKhoan}></XoaTaiKhoan>
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

export default DSTaiKhoan
