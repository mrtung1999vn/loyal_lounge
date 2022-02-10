import React ,{useState,useEffect}from 'react'
import DSTatCa from '../../../compontents/Main/TrangThaiDon/TatCaVanDon/DSTatCa'
import ThemDangXuLy from '../../../compontents/Main/TrangThaiDon/DangXuLy/ThemDangXuLy'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from "socket.io-client";
import func from '../../../asset/func'
const ENDPOINT = "http://127.0.0.1:3007";
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function Form_TatCa() {
    //#region setState
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [TatCa,setTatCa] = useState([])
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
    const UpdateThemTatCa = (e)=>{
        try {
            const newData = [...TatCa]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setTatCa(newData)
        } catch (error) {
            
        }
    }
    // newData.splice(dataEdit,1,e[0]) (Sửa)
    const UpdateXoaTatCa = (e)=>{
        try{
            const newData = [...TatCa]
            const index = newData.findIndex(dl => dl.id_nh === e)
            console.log(index)
            newData.splice(index,1)
            LoadingForm()
            setTatCa(newData)
        }catch(error){

        }
    }
    const UpdateSuaTatCa = (e)=>{
        try {
            console.log(e)
            const newData = [...TatCa]
            const index = newData.findIndex(dt=>dt.id_nh === e[0].id_nh)
            newData.splice(index,1,e[0])
            LoadingForm()
            setTatCa(newData)
        } catch (error) {
            
        }
    }
    //#endregion
    const onChangePage = async (e)=>{
        var trangthai = "Tất cả"
        const token = await Token.Token()
        const response = await fetch(host.DSTatCa+`/${e}`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({token,trangthai})
        })
        const JsonData = await response.json()

        if(JsonData.status === 1 ){
            setTatCa(func.DecodeJson_RESPONSE(JsonData.data))

            totalPageCallBack()
        }else{
            
        }
        setPage(e)
    }

    const totalPageCallBack = React.useCallback(async ()=>{
        try {
            const response = await fetch(host.TotalPageTatCa)
            const JsonData = await response.json()
            console.log(JsonData)
            LoadingForm()
            if(JsonData.status ===1){
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
            var trangthai = "Thành công"
            const response = await fetch(host.DSTatCa+`/${page}`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({token,trangthai})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setTatCa(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                totalPageCallBack()
            }else{
                
            }

        } catch (error) {
            console.log(error)
        }
    },[])
    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("FromAPI", data => {
    //       setResponse(data);
    //     });
    //   }, []);



    const onClickGopHoaDon = async ()=>{
        try {
            // const 
        } catch (error) {
            
        }
    }
    const UpdateThemDangXuLy = (e)=>{
        try {
            const newData = [...TatCa]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setTatCa(newData)
        } catch (error) {
            
        }
    }
    const du_lieu_loc = async (e)=>{
        try {
            const {tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van} = e
            console.log({tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van})
            const token = await Token.Token()
            var trangthai = "Tất cả"
            const response = await fetch(host.TimKiemDonHang,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({trangthai,tim_theo_ten,tim_theo_ma,tim_theo_van,tu_ngay,den_ngay,token})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setTatCa(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                totalPageCallBack()
            }else{
                alert("Hiện tại không có dữ liệu")
            }
        } catch (error) {
            
        }
    }



    const _onChangeImage = async ()=>{
        try{
            onChangePage(page)
        }catch(error){

        }
    }
    return (
        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Tất cả đơn hàng</h1>
                    <p>
                        It's <time dateTime={response}>{response}</time>
                        </p>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Trạng thái đơn</a></li>
                    <li className="breadcrumb-item active">Tất cả đơn hàng</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                    <ThemDangXuLy UpdateThemDangXuLy={UpdateThemDangXuLy} du_lieu_loc={du_lieu_loc}></ThemDangXuLy>
                    <DSTatCa TatCa={TatCa}
                    totalPage={totalPage}
                    UpdateXoaTatCa={UpdateXoaTatCa}
                    UpdateSuaTatCa={UpdateSuaTatCa}
                    page={page}
                    onChangePage={onChangePage}
                    _onChangeImage={_onChangeImage}
                    ></DSTatCa>   
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Form_TatCa
