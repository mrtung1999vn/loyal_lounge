import React ,{useState,useEffect}from 'react'
import DSDangXuLy from '../../../compontents/Main/TrangThaiDon/DangXuLy/DSDangXuLy'
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
function Form_DangXuLy() {
    //#region setState
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [DangXuLy,setDangXuLy] = useState([])
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
 
    // newData.splice(dataEdit,1,e[0]) (Sửa)
    const UpdateXoaDangXuLy = (e)=>{
        try{
            const newData = [...DangXuLy]
            const index = newData.findIndex(dl => dl.id_nh === e)
            console.log(index)
            newData.splice(index,1)
            LoadingForm()
            setDangXuLy(newData)
        }catch(error){

        }
    }
    const _onChangeImage = async ()=>{
        try{
            onChangePage(page)
        }catch(error){

        }
    }
    const UpdateSuaDangXuLy = (e)=>{
        try {
            console.log(e)
            const newData = [...DangXuLy]
            const index = newData.findIndex(dt=>dt.id_nh === e[0].id_nh)
            newData.splice(index,1,e[0])
            LoadingForm()
            setDangXuLy(newData)
        } catch (error) {
            
        }
    }
    //#endregion
    const onChangePage = async (e)=>{
        var trangthai = "Đang xử lý"
        const token = await Token.Token()
        const response = await fetch(host.DSDangXuLy+`/${e}`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({token,trangthai})
        })
        const JsonData = await response.json()

        if(JsonData.status === 1 ){
            setDangXuLy(func.DecodeJson_RESPONSE(JsonData.data))

            totalPageCallBack()
        }else{
            
        }
        setPage(e)
    }

    const totalPageCallBack = React.useCallback(async ()=>{
        try {
            const response = await fetch(host.TotalPageDangXuLy)
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
            var trangthai = "Đang xử lý"
            const response = await fetch(host.DSDangXuLy+`/${page}`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({token,trangthai})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setDangXuLy(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                totalPageCallBack()
            }else{
                
            }

        } catch (error) {
            console.log(error)
        }
    },[])
    useEffect(() => {
        // const socket = socketIOClient(ENDPOINT);
        // socket.on("FromAPI", data => {
        //   setResponse(data);
        // });
      }, []);



    const onClickGopHoaDon = async ()=>{
        try {
            // const 
        } catch (error) {
            
        }
    }
    const onClickGopThanhCong = async ()=>{
        try {
            const token = await Token.Token()
            var trangthai = "Đang xử lý"
            const response = await fetch(host.DSDangXuLy+`/${page}`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({token,trangthai})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setDangXuLy(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                totalPageCallBack()
            }else{
                
            }

        } catch (error) {
            console.log(error)
        }
    }

    const UpdateThemDangXuLy = (e)=>{
        try {
            const newData = [...DangXuLy]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setDangXuLy(newData)
        } catch (error) {
            
        }
    }
    const du_lieu_loc = async (e)=>{
        try {
            const {tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van} = e
            console.log({tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van})
            const token = await Token.Token()
            var trangthai = "Đang xử lý"
            const response = await fetch(host.TimKiemDonHang,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({trangthai,tim_theo_ten,tim_theo_ma,tim_theo_van,tu_ngay,den_ngay,token})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setDangXuLy(func.DecodeJson_RESPONSE(JsonData.data))
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
                    <h1>Đang xử lý</h1>
                    <p>
                        <time dateTime={response}>{response}</time>
                        </p>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Trạng thái đơn</a></li>
                    <li className="breadcrumb-item active">Đang xử lý</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                    <ThemDangXuLy UpdateThemDangXuLy={UpdateThemDangXuLy} du_lieu_loc={du_lieu_loc}></ThemDangXuLy>
                    <DSDangXuLy DangXuLy={DangXuLy}
                    totalPage={totalPage}
                    UpdateXoaDangXuLy={UpdateXoaDangXuLy}
                    UpdateSuaDangXuLy={UpdateSuaDangXuLy}
                    page={page}
                    onChangePage={onChangePage}
                    onClickGopThanhCong={onClickGopThanhCong}
                    _onChangeImage={_onChangeImage}
                    ></DSDangXuLy>   
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Form_DangXuLy
