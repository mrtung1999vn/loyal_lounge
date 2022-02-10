import React from 'react'
import DSTaiKhoan from '../../../compontents/Main/QuanLy/TaiKhoan/DSTaiKhoan'
import ThemTaiKhoan from '../../../compontents/Main/QuanLy/TaiKhoan/ThemTaiKhoan'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import func from '../../../asset/func'
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function TaiKhoan() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [TaiKhoan, setTaiKhoan] = React.useState([])
    const [totalPage, settotalPage] = React.useState(0)
    const [page, setPage] = React.useState(1)
    //#region LoadingForm
    const LoadingForm =()=>{
        setOpen(true)
        setTimeout(()=>{
            setOpen(false)
        },1000)
    }
    //#endregion

    //#region CRUD Tài khoản
    const UpdateThemTaiKhoan = (e) => {
        try {
            LoadingForm()
            const newData = [...TaiKhoan]
            console.log(e)
            newData.push(e[0])
            setTaiKhoan(newData)
        } catch (error) {

        }
    }
    // newData.splice(dataEdit,1,e[0]) (Sửa)
    const UpdateXoaTaiKhoan = (e) => {
        try {
            LoadingForm()
            const newData = [...TaiKhoan]
            const index = newData.findIndex(dl => dl.id_tk === e)
            console.log(index)
            newData.splice(index, 1)
            setTaiKhoan(newData)
        } catch (error) {

        }
    }
    const UpdateSuaTaiKhoan = (e) => {
        try {
            LoadingForm()
            const newData = [...TaiKhoan]
            const index = newData.findIndex(dt => dt.id_tk === e[0].id_tk)
            newData.splice(index, 1, e[0])
            setTaiKhoan(newData)
        } catch (error) {

        }
    }
    //#endregion
    const onChangePage = async (e) => {
        
        const token = await Token.Token()
        const response = await fetch(host.DSTaiKhoan + `/${e}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        })
        LoadingForm()
        const JsonData = await response.json()

        if (JsonData.status === 1) {
            setTaiKhoan(
                func.DecodeJson_RESPONSE(JsonData.data)
                )
            totalPageCallBack()
        } else {

        }
        setPage(e)
    }

    const totalPageCallBack = React.useCallback(async () => {
        try {
            
            const response = await fetch(host.TotalPageTaiKhoan)
            const JsonData = await response.json()
            
            if (JsonData.status === 1) {
                LoadingForm()
                settotalPage(JsonData.data)
            } else {

            }
        } catch (error) {

        }
    })
    React.useEffect(async () => {
        try {
            const token = await Token.Token()
            const response = await fetch(host.DSTaiKhoan + `/${page}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            })
            const JsonData = await response.json()

            if (JsonData.status === 1) {
                setTaiKhoan(func.DecodeJson_RESPONSE(JsonData.data))
                LoadingForm()
                totalPageCallBack()
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Tài khoản</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Quản lý</a></li>
                                <li className="breadcrumb-item active">Tài khoản khách</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                    <ThemTaiKhoan UpdateThemTaiKhoan={UpdateThemTaiKhoan}></ThemTaiKhoan>
                    <DSTaiKhoan TaiKhoan={TaiKhoan}
                        totalPage={totalPage}
                        UpdateXoaTaiKhoan={UpdateXoaTaiKhoan}
                        UpdateSuaTaiKhoan={UpdateSuaTaiKhoan}
                        page={page}
                        onChangePage={onChangePage}
                    ></DSTaiKhoan>
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    )
}

export default TaiKhoan
