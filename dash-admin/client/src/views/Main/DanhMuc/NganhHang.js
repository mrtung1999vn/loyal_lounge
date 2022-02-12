import React ,{useState,useEffect}from 'react'
import DSNganhHang from '../../../compontents/Main/DanhMuc/NganhHang/DSNganhHang'
import ThemNganhHang from '../../../compontents/Main/DanhMuc/NganhHang/ThemNganhHang'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3007";
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function NganhHang() {
    //#region setState
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [NganhHang,setNganhHang] = useState([])
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
    const UpdateThemNganhHang = (e)=>{
        try {
            const newData = [...NganhHang]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setNganhHang(newData)
        } catch (error) {
            
        }
    }
    // newData.splice(dataEdit,1,e[0]) (Sửa)
    const UpdateXoaNganhHang = (e)=>{
        try{
            const newData = [...NganhHang]
            const index = newData.findIndex(dl => dl.id_nh === e)
            console.log(index)
            newData.splice(index,1)
            LoadingForm()
            setNganhHang(newData)
        }catch(error){

        }
    }
    const UpdateSuaNganhHang = (e)=>{
        try {
            console.log(e)
            const newData = [...NganhHang]
            const index = newData.findIndex(dt=>dt.id_nh === e[0].id_nh)
            newData.splice(index,1,e[0])
            LoadingForm()
            setNganhHang(newData)
        } catch (error) {
            
        }
    }
    //#endregion
    const onChangePage = async (e)=>{
        
        const token = await Token.Token()
        const response = await fetch(host.DSNganhHang+`/${e}`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({token})
        })
        const JsonData = await response.json()

        if(JsonData.status === 1 ){
            setNganhHang(JsonData.data)

            totalPageCallBack()
        }else{
            
        }
        setPage(e)
    }

    const totalPageCallBack = React.useCallback(async ()=>{
        try {
            const response = await fetch(host.TotalPageNganhHang)
            const JsonData = await response.json()
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
            const response = await fetch(host.DSNganhHang+`/${page}`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({token})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setNganhHang(JsonData.data)
                // console.log(JsonData.data)   
                totalPageCallBack()
            }else{
                
            }

        } catch (error) {
            console.log(error)
        }
    },[])
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
          setResponse(data);
        });
      }, []);
    return (
        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Ngành hàng</h1>
                    <p>
                        It's <time dateTime={response}>{response}</time>
                        </p>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Danh mục</a></li>
                    <li className="breadcrumb-item active">Ngành hàng</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                    <ThemNganhHang UpdateThemNganhHang={UpdateThemNganhHang}></ThemNganhHang>
                    <DSNganhHang NganhHang={NganhHang}
                    totalPage={totalPage}
                    UpdateXoaNganhHang={UpdateXoaNganhHang}
                    UpdateSuaNganhHang={UpdateSuaNganhHang}
                    page={page}
                    onChangePage={onChangePage}
                    ></DSNganhHang>   
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default NganhHang
