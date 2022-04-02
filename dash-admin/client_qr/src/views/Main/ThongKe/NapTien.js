import React ,{useState,useEffect}from 'react'
import DSNapTien from '../../../compontents/Main/ThongKeDonHang/NapTien/DSNapTien'
import ThemNapTien from '../../../compontents/Main/ThongKeDonHang/NapTien/ThemNapTien'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from "socket.io-client";
import ThemDangXuLy from '../../../compontents/Main/TrangThaiDon/DangXuLy/ThemDangXuLy'
import func from '../../../asset/func'
const ENDPOINT = "http://127.0.0.1:3007";
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function NapTien() {
    //#region setState
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [NapTien,setNapTien] = useState([])
    const [totalPage,settotalPage] = useState(0)
    const [page,setPage] = useState(1)
    //#endregion

    //#region LoadingForm
    const LoadingForm =()=>{
        setOpen(true)
        setTimeout(()=>{
            setOpen(false)
        },1000)
    }
    //#endregion
    //#region CRUD Ngành hàng
    const UpdateThemNapTien = (e)=>{
        try {
            const newData = [...NapTien]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setNapTien(newData)
        } catch (error) {
            
        }
    }
    // newData.splice(dataEdit,1,e[0]) (Sửa)
    const UpdateXoaNapTien = (e)=>{
        try{
            const newData = [...NapTien]
            const index = newData.findIndex(dl => dl.id_nap === e)
            console.log(index)
            newData.splice(index,1)
            LoadingForm()
            setNapTien(newData)
        }catch(error){

        }
    }
    const UpdateSuaNapTien = (e)=>{
        try {
            console.log(e)
            const newData = [...NapTien]
            const index = newData.findIndex(dt=>dt.id_nap === e[0].id_nap)
            newData.splice(index,1,e[0])
            LoadingForm()
            setNapTien(newData)
        } catch (error) {
            
        }
    }
    //#endregion
    const onChangePage = async (e)=>{
        
        const token = await Token.Token()
        const response = await fetch(host.DSNapTien+`/${e}`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({token})
        })
        const JsonData = await response.json()

        if(JsonData.status === 1 ){
            setNapTien(JsonData.data)

            totalPageCallBack()
        }else{
            
        }
        setPage(e)
    }

    const totalPageCallBack = React.useCallback(async ()=>{
        try {
            console.log(host.TotalPageDSNapTien)
            const response = await fetch(host.TotalPageDSNapTien)
            console.log("=======================================")
            
            const JsonData = await response.json()
            LoadingForm()
            if(JsonData.status ===1){
                console.log(JsonData.data)
                settotalPage(JsonData.data)
            }else{

            }
        } catch (error) {
            
        }
    })
    //TEST SOCKETIO
    const [response, setResponse] = useState("");

    React.useEffect(async ()=>{
        try {
            const token = await Token.Token()
            
            console.log(host.DSNapTien+`/${page}`)
            const response = await fetch(host.DSNapTien+`/${page}`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({token})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                onChangeTongTienNap(JsonData.data)
                setNapTien(JsonData.data)
                   
                totalPageCallBack()
            }else{
                
            }

        } catch (error) {
            console.log(error)
        }
    },[])
    console.log(NapTien)
    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("FromAPI", data => {
    //       setResponse(data);
    //     });
    //   }, []);
    const [tong_tien_nap,settong_tien_nap] = React.useState(0)

    const onChangeTongTienNap = (JsonData) =>{
        let tong_tien = 0

        JsonData.map((x,index)=>{
            tong_tien += parseInt(x.tien_nap)
            if(index+1 === JsonData.length){
                settong_tien_nap(tong_tien)
            }
        })


    }

    const du_lieu_loc = async (e)=>{
        try {
            const {tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van} = e
            console.log({tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van})
            const token = await Token.Token()
          
            const response = await fetch(host.LocDSNapTien,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van,token})
            })

            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                onChangeTongTienNap(func.DecodeJson_RESPONSE(JsonData.data))
                setNapTien(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                totalPageCallBack()
            }else{
                alert("Hiện tại không có dữ liệu")
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Nạp Tiền</h1>
                    <p>
                        It's <time dateTime={response}>{response}</time>
                        </p>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Thống kê</a></li>
                    <li className="breadcrumb-item active">Nạp Tiền</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                        <ThemNapTien UpdateThemNapTien={UpdateThemNapTien}></ThemNapTien>
                        </div>
                        <div className="col">
                        <ThemDangXuLy naptien={true} du_lieu_loc={du_lieu_loc}
                        ></ThemDangXuLy>
                        </div>
                    </div>
                    
                    
                    <DSNapTien 
                    tong_tien_nap={tong_tien_nap}
                    NapTien={NapTien}
                    totalPage={totalPage}
                    UpdateXoaNapTien={UpdateXoaNapTien}
                    UpdateSuaNapTien={UpdateSuaNapTien}
                    page={page}
                    onChangePage={onChangePage}
                    ></DSNapTien>   
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default NapTien
