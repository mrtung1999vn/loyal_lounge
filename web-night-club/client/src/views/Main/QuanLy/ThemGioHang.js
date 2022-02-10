import React from 'react'
// import DSGioHang from '../../../compontents/Main/QuanLy/GioHang/DSGioHang'
import ThemGioHang from '../../../compontents/Main/QuanLy/GioHang/ThemGioHang'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function GioHang() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    //#region LoadingForm
    const LoadingForm =()=>{
        setOpen(true)
        setTimeout(()=>{
            setOpen(false)
        },1000)
    }
    //#endregion
    const UpdateThemGioHang = (e)=>{
        setOpen(e)
        console.log(e)
    }
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Thêm giỏ hàng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Quản lý</a></li>
                                <li className="breadcrumb-item active">Tài khoản</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                    <ThemGioHang UpdateThemGioHang={UpdateThemGioHang}></ThemGioHang>
       
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    )
}

export default GioHang
