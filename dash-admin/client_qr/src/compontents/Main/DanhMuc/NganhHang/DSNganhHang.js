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
import SuaNganhHang from './SuaNganhHang';
import XoaNganhHang from './XoaNganhHang';
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

function DSNganhHang({ NganhHang , UpdateXoaNganhHang ,UpdateSuaNganhHang , onChangePage,totalPage,page}) {
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

  const onXoaNganhHang = (e)=>{
    UpdateXoaNganhHang(e)
  }
  const onSuaNganhHang = (e)=>{
    UpdateSuaNganhHang(e)
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
                        <TableCell>Tên ngành hàng</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* 100vh => 10items */}
                      {NganhHang.map(x => (
                        <TableRow hover classes={{ hover: classes.hover }} key={x.id_nh}>
                          <TableCell align="left">{x.ten_nganh}</TableCell>
  
                          <TableCell align="left">
                            <div>
                              {/* <a className="btn btn-primary btn-sm" href="#">
                                                    <i className="fas fa-folder">
                                                    </i>
                                                    View
                                                </a> */}
                              <SuaNganhHang dulieu={x} onSuaNganhHang={onSuaNganhHang}></SuaNganhHang>
                              <XoaNganhHang dulieu={x} onXoaNganhHang={onXoaNganhHang}></XoaNganhHang>
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

export default DSNganhHang
