import React from 'react'
import DSKhachHang from '../../../compontents/Main/QuanLy/KhachHang/DSKhachHang'
import ThemKhachHang from '../../../compontents/Main/QuanLy/KhachHang/ThemKhachHang'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ThemDangXuLy from '../../../compontents/Main/TrangThaiDon/DangXuLy/ThemDangXuLy'
import func from '../../../asset/func'
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function KhachHang() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [KhachHang,setKhachHang] = React.useState([])
    const [totalPage,settotalPage] = React.useState(0)
    const [page,setPage] = React.useState(1)
        //#region LoadingForm
        const LoadingForm =()=>{
            setOpen(true)
            setTimeout(()=>{
                setOpen(false)
            },1000)
        }
        //#endregion
    //#region CRUD Tài khoản
    const UpdateThemKhachHang = (e)=>{
        try {
            const newData = [...KhachHang]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setKhachHang(newData)
        } catch (error) {
            
        }
    }
    // newData.splice(dataEdit,1,e[0]) (Sửa)
    const UpdateXoaKhachHang = (e)=>{
        try{
            const newData = [...KhachHang]
            const index = newData.findIndex(dl => dl.id_kh === e)
            console.log(index)
            newData.splice(index,1)
            LoadingForm()
            setKhachHang(newData)
        }catch(error){

        }
    }
    const UpdateSuaKhachHang = (e)=>{
        try {
            console.log(e)
            const newData = [...KhachHang]
            const index = newData.findIndex(dt=>dt.id_kh === e[0].id_kh)
            newData.splice(index,1,e[0])
            LoadingForm()
            setKhachHang(newData)
        } catch (error) {
            
        }
    }
    //#endregion
    const onChangePage = async (e)=>{
        
        const token = await Token.Token()
        const response = await fetch(host.DSKhachHang+`/${e}`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({token})
        })
        const JsonData = await response.json()

        if(JsonData.status === 1 ){
            setKhachHang(func.DecodeJson_RESPONSE(JsonData.data))

            totalPageCallBack()
        }else{
            
        }
        setPage(e)
    }

    const totalPageCallBack = React.useCallback(async ()=>{
        try {
            const response = await fetch(host.TotalPageKhachHang)
            const JsonData = await response.json()
            LoadingForm()
            if(JsonData.status ===1){
                settotalPage(JsonData.data)
            }else{

            }
        } catch (error) {
            
        }
    })
    React.useEffect(async ()=>{
        try {
            const token = await Token.Token()
            const response = await fetch(host.DSKhachHang+`/${page}`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({token})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setKhachHang(
                    func.DecodeJson_RESPONSE(JsonData.data)
                    )
                
                totalPageCallBack()
            }else{
                
            }
        } catch (error) {
            console.log(error)
        }
    },[])

    const onClickTaiLai = async ()=>{
        try {
            const token = await Token.Token()
            const response = await fetch(host.DSKhachHang+`/${page}`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({token})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setKhachHang(
                    func.DecodeJson_RESPONSE(JsonData.data)
                    
                    )
                
                totalPageCallBack()
            }else{
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    const du_lieu_loc = async (e)=>{
        try {
            const {tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van,so_dt} = e
            console.log(host.DLLocKhachHang)
            
            const response = await fetch(host.DLLocKhachHang,{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van,so_dt})
            })
            console.log(host.DLLocKhachHang)
            const JsonData = await response.json()
            if(JsonData.status ===1){
                setKhachHang(
                    func.DecodeJson_RESPONSE(JsonData.data)
                )
            }else{

            }
            // console.log({tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van})
            // const token = await Token.Token()
            // var trangthai = "Thành công"
            // const response = await fetch(host.TimKiemDonHang,{
            //     method:"POST",
            //     headers:{"Content-Type" : "application/json"},
            //     body:JSON.stringify({trangthai,tim_theo_ten,tim_theo_ma,tim_theo_van,tu_ngay,den_ngay,token})
            // })
            // const JsonData = await response.json()

            // if(JsonData.status === 1 ){
            //     setThanhCong(func.DecodeJson_RESPONSE(JsonData.data))
            //     // console.log(JsonData.data)   
            //     totalPageCallBack()
            // }else{
            //     alert("Hiện tại không có dữ liệu")
            // }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Khách hàng</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Quản lý</a></li>
                    <li className="breadcrumb-item active">Khách hàng</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <ThemKhachHang UpdateThemKhachHang={UpdateThemKhachHang}></ThemKhachHang>
                        </div>
                        <div className="col">
                            <ThemDangXuLy naptien={true}
                            du_lieu_loc={du_lieu_loc}
                            khachhang={true}
                            onClickTaiLai={onClickTaiLai}
                            ></ThemDangXuLy>
                        </div>
                     
                    </div>
             
                
                    
                    <DSKhachHang KhachHang={KhachHang}
                    totalPage={totalPage}
                    UpdateXoaKhachHang={UpdateXoaKhachHang}
                    UpdateSuaKhachHang={UpdateSuaKhachHang}
                    page={page}
                    onChangePage={onChangePage}
                    ></DSKhachHang>   
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default KhachHang
