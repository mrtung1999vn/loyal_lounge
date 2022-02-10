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
import SuaNapTien from './SuaNapTien';
import XoaNapTien from './XoaNapTien';
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

function DSNapTien({tong_tien_nap, NapTien , UpdateXoaNapTien ,UpdateSuaNapTien , onChangePage,totalPage,page}) {
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

  const onXoaNapTien = (e)=>{
    UpdateXoaNapTien(e)
  }
  const onSuaNapTien = (e)=>{
    UpdateSuaNapTien(e)
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
        <div className="row">
      <div className="col-lg-3 col-6">
         
         <div className="small-box bg-info">
            <div className="inner">
               <h3>{parseInt(tong_tien_nap) .toLocaleString('vi', {style : 'currency', currency : 'VND'})}</h3>
               <p>Tổng tiền nạp</p>
            </div>
            <div className="icon">
               <i className="ion ion-person-add"></i>
            </div>
         </div>
      </div>
      </div> 
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
                        <TableCell>Tên khách hàng</TableCell>
                        <TableCell>Tiền nạp</TableCell>
                        <TableCell>Nội dung nạp</TableCell>
                        <TableCell>Ngày nạp</TableCell>
                        {/* <TableCell>Ghi chú</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* 100vh => 10items */}
                      {NapTien.map(x => (
                        <TableRow hover classes={{ hover: classes.hover }} key={x.id_nh}>
                          <TableCell align="left">{x.ten_kh}</TableCell>
                          <TableCell align="left">{parseInt(x.tien_nap).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</TableCell>
                          <TableCell align="left">{x.noi_dung_nap}</TableCell>
                          <TableCell align="left">{
                            TimeLibrary.convertTime(x.ngay_nap)
                          }</TableCell>
                          <TableCell align="left">
                            <div>
                              <SuaNapTien dulieu={x} onSuaNapTien={onSuaNapTien}></SuaNapTien>
                              <XoaNapTien dulieu={x} onXoaNapTien={onXoaNapTien}></XoaNapTien>
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

export default DSNapTien
