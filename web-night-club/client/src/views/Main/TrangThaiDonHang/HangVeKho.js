import React ,{useState,useEffect}from 'react'
import DSHangVeKho from '../../../compontents/Main/TrangThaiDon/HangVeKho/DSHangVeKho'
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
function Form_HangVeKho() {
    //#region setState
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [HangVeKho,setHangVeKho] = useState([])
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
    const UpdateThemHangVeKho = (e)=>{
        try {
            const newData = [...HangVeKho]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setHangVeKho(newData)
        } catch (error) {
            
        }
    }
    // newData.splice(dataEdit,1,e[0]) (Sửa)
    const UpdateXoaHangVeKho = (e)=>{
        try{
            const newData = [...HangVeKho]
            const index = newData.findIndex(dl => dl.id_nh === e)
            console.log(index)
            newData.splice(index,1)
            LoadingForm()
            setHangVeKho(newData)
        }catch(error){

        }
    }
    const _onChangeImage = async ()=>{
        try{
            onChangePage(page)
        }catch(error){

        }
    }
    const UpdateSuaHangVeKho = (e)=>{
        try {
            console.log(e)
            const newData = [...HangVeKho]
            const index = newData.findIndex(dt=>dt.id_nh === e[0].id_nh)
            newData.splice(index,1,e[0])
            LoadingForm()
            setHangVeKho(newData)
        } catch (error) {
            
        }
    }
    //#endregion
    const onChangePage = async (e)=>{
        var trangthai = "Hàng về kho"
        const token = await Token.Token()
        const response = await fetch(host.DSHangVeKho+`/${e}`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({token,trangthai})
        })
        const JsonData = await response.json()

        if(JsonData.status === 1 ){
            setHangVeKho(func.DecodeJson_RESPONSE(JsonData.data))

            totalPageCallBack()
        }else{
            
        }
        setPage(e)
    }

    const totalPageCallBack = React.useCallback(async ()=>{
        try {
            const response = await fetch(host.TotalPageHangVeKho)
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
            var trangthai = "Hàng về kho"
            const response = await fetch(host.DSHangVeKho+`/${page}`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({token,trangthai})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setHangVeKho(func.DecodeJson_RESPONSE(JsonData.data))
                onUpdateForm(func.DecodeJson_RESPONSE(JsonData.data))
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
            const newData = [...HangVeKho]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setHangVeKho(newData)
        } catch (error) {
            
        }
    }

    const [tien_hang,settien_hang] = React.useState(0)
    const [chi_phi,setchi_phi] = React.useState(0)
    const [so_can_khoi,setso_can_khoi] = React.useState(0)

    const onUpdateForm = React.useCallback((JsonData)=>{
        console.log(JsonData)
        let _tien_hang = 0
        let _chi_phi = 0
        let _so_can_khoi = 0

        JsonData.map((x,index)=>{
            _tien_hang += x.tong_tien
            _chi_phi += (parseInt(x.phu_phi === null ? 0 : x.phu_phi)
                        + parseInt(x.phi_noi_dia === null ? 0 : x.phi_noi_dia)
                        + parseInt(x.phi_dich_vu === null ? 0 : x.phi_dich_vu))
            _so_can_khoi += (
                x.so_can*x.tien_can + x.so_khoi*x.tien_khoi
            )
            if(index +1 === JsonData.length){
                settien_hang(_tien_hang)
                setchi_phi(_chi_phi)
                setso_can_khoi(_so_can_khoi)
            }
        })
    }) 

    const du_lieu_loc = async (e)=>{
        try {
            const {tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van} = e
            console.log({tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van})
            const token = await Token.Token()
            var trangthai = "Hàng về kho"
            const response = await fetch(host.TimKiemDonHang,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({trangthai,tim_theo_ten,tim_theo_ma,tim_theo_van,tu_ngay,den_ngay,token})
            })
            const JsonData = await response.json()

            if(JsonData.status === 1 ){
                setHangVeKho(func.DecodeJson_RESPONSE(JsonData.data))
                onUpdateForm(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                totalPageCallBack()
            }else{
                alert("Hiện tại không có dữ liệu")
            }
        } catch (error) {
            
        }
    }
    // const _onChangeImage = async ()=>{
    //     try{
    //         onChangePage(page)
    //     }catch(error){

    //     }
    // }
    return (
        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Hàng về kho</h1>
                    <p>
                         <time dateTime={response}>{response}</time>
                        </p>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Trạng thái đơn</a></li>
                    <li className="breadcrumb-item active">Đã đặt hàng</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                <ThemDangXuLy UpdateThemDangXuLy={UpdateThemDangXuLy} du_lieu_loc={du_lieu_loc}></ThemDangXuLy>
                    <DSHangVeKho 
                    tien_hang={tien_hang}
                    chi_phi={chi_phi}
                    so_can_khoi={so_can_khoi}
                    
                    HangVeKho={HangVeKho}
                    totalPage={totalPage}
                    UpdateXoaHangVeKho={UpdateXoaHangVeKho}
                    UpdateSuaHangVeKho={UpdateSuaHangVeKho}
                    page={page}
                    onChangePage={onChangePage}
                    _onChangeImage={_onChangeImage}
                    ></DSHangVeKho>   
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Form_HangVeKho
