import React, { useState, useEffect } from 'react'
import DSTienDon from '../../../compontents/Main/ThongKeDonHang/ThongKeTienDon/DSThongKeTienDon'
import ThemDangXuLy from '../../../compontents/Main/TrangThaiDon/DangXuLy/ThemDangXuLy'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import socketIOClient from "socket.io-client";
import func from '../../../asset/func'
const ENDPOINT = "http://127.0.0.1:3007";
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function Form_TienDon() {
    //#region setState
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [TienDon, setTienDon] = useState([])
    const [totalPage, settotalPage] = useState(0)
    const [page, setPage] = useState(1)
    //#endregion


    //#region LoadingForm
    const LoadingForm = () => {
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 1000)
    }
    //#endregion
    //#region CRUD Ngành hàng
    const UpdateThemTienDon = (e) => {
        try {
            const newData = [...TienDon]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setTienDon(newData)
        } catch (error) {

        }
    }
    // newData.splice(dataEdit,1,e[0]) (Sửa)
    const UpdateXoaTienDon = (e) => {
        try {
            const newData = [...TienDon]
            const index = newData.findIndex(dl => dl.id_nh === e)
            console.log(index)
            newData.splice(index, 1)
            LoadingForm()
            setTienDon(newData)
        } catch (error) {

        }
    }
    const UpdateSuaTienDon = (e) => {
        try {
            console.log(e)
            const newData = [...TienDon]
            const index = newData.findIndex(dt => dt.id_nh === e[0].id_nh)
            newData.splice(index, 1, e[0])
            LoadingForm()
            setTienDon(newData)
        } catch (error) {

        }
    }
    //#endregion
    const onChangePage = async (e) => {

        const token = await Token.Token()
        const response = await fetch(host.DSTienDon + `/${e}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        })
        const JsonData = await response.json()

        if (JsonData.status === 1) {
            setTienDon(JsonData.data)

            totalPageCallBack()
        } else {

        }
        setPage(e)
    }

    const totalPageCallBack = React.useCallback(async () => {
        try {
            const response = await fetch(host.TotalPageThongKeTienDon)
            const JsonData = await response.json()
            console.log(JsonData)
            LoadingForm()
            if (JsonData.status === 1) {
                settotalPage(JsonData.data)
            } else {

            }
        } catch (error) {

        }
    })
    //TEST SOCKETIO
    const [response, setResponse] = useState("");





    const onClickGopHoaDon = async () => {
        try {
            // const 
        } catch (error) {

        }
    }
    const UpdateThemDangXuLy = (e) => {
        try {
            const newData = [...TienDon]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setTienDon(newData)
        } catch (error) {

        }
    }
    const du_lieu_loc = async (e) => {
        try {
            const { tu_ngay, den_ngay, tim_theo_ten, tim_theo_ma, tim_theo_van } = e
            console.log({ tu_ngay, den_ngay, tim_theo_ten, tim_theo_ma, tim_theo_van })
            const token = await Token.Token()
            var trangthai = ""
            const response = await fetch(host.ThongKeTienDonHang + `/${-1}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trangthai, tim_theo_ten, tim_theo_ma, tim_theo_van, tu_ngay, den_ngay, token })
            })
            const JsonData = await response.json()

            if (JsonData.status === 1) {
                setTienDon(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                UpdateForm(func.DecodeJson_RESPONSE(JsonData.data))
                totalPageCallBack()
            } else {
                alert("Hiện tại không có dữ liệu")
            }
        } catch (error) {

        }
    }
    const [tien_don,settien_don] = React.useState(    
        window.localStorage.getItem("tong_tien") === null ? 0 : parseInt(window.localStorage.getItem("tong_tien"))
      )
      const [chi_phi,setchi_phi] = React.useState(
        window.localStorage.getItem("chi_phi") === null ? 0 : parseInt(window.localStorage.getItem("chi_phi"))
      )
        
      const [tien_can_khoi,settien_can_khoi] = React.useState(
        window.localStorage.getItem("tien_can_khoi") === null ? 0 : parseInt(window.localStorage.getItem("tien_can_khoi"))
      )
  

    console.log(TienDon)


    React.useEffect(async () => {
        try {
            console.log(host.ThongKeTienDonHang + `/${page}`)
            const token = await Token.Token()
            console.log(token)
            var trangthai = ""
            console.log(host.ThongKeTienDonHang + `/${page}`)
            const response = await fetch(host.ThongKeTienDonHang + `/${page}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, trangthai })
            })
            const JsonData = await response.json()
            console.log(JsonData)
            if (JsonData.status === 1) {
                // console.log()
                console.log(func.DecodeJson_RESPONSE(JsonData.data))
                setTienDon(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                totalPageCallBack()
            } else {

            }

        } catch (error) {
            console.log(error)
        }
    }, [])
    React.useEffect(() => {
        // setTienDon(TienDon)
    }, [])
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);

    const UpdateForm = (TienDon)=>{
        try{
          let tong_tien = 0 
          let chi_phi = 0 
          let tien_can_khoi = 0 
    
          for(let i=0;i<TienDon.length;i++){
            let tien_tt = (TienDon[i].tong_tien === '' || TienDon[i].tong_tien === undefined || TienDon[i].tong_tien === null ? 0 : TienDon[i].tong_tien)
            let tien_cp = (TienDon[i].chi_phi === '' || TienDon[i].chi_phi === undefined || TienDon[i].chi_phi === null ? 0 : TienDon[i].chi_phi)
            let tien_ck = (TienDon[i].tien_can_khoi === '' || TienDon[i].tien_can_khoi === undefined || TienDon[i].tien_can_khoi === null ? 0 : TienDon[i].tien_can_khoi)
            tong_tien += tien_tt
            chi_phi += tien_cp
            tien_can_khoi += tien_ck
            if(i + 1 === TienDon.length){
              window.localStorage.setItem("tong_tien",tong_tien)
              window.localStorage.setItem("chi_phi",chi_phi)
              window.localStorage.setItem("tien_can_khoi",tien_can_khoi)
              settien_don(tong_tien)
              setchi_phi(chi_phi)
              settien_can_khoi(tien_can_khoi)
            }
              // history.push('/ThongKeTienHang'); // no longer in React Router V4
          }
        }catch (error){
          console.log(error)
        }
      }

    return (
        <div className="content-wrapper">
            <section className="content-header" >
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6" >
                            <h1> Thống kê tiền đơn hàng </h1><p >
                                It 's <time dateTime={response}>{response}</time> </p> </div>
                        <div className="col-sm-6" >
                            <ol className="breadcrumb float-sm-right" >
                                <li className="breadcrumb-item" > < a href="#" > Thống kê </a></li >
                                <li className="breadcrumb-item active" > Thống kê tiền đơn hàng </li> </ol>
                        </div> </div>
                </div> </section>
            <div className="content">
                <div className="container-fluid" >
                    <ThemDangXuLy UpdateThemDangXuLy={UpdateThemDangXuLy}
                        du_lieu_loc={du_lieu_loc}>
                    </ThemDangXuLy>
                    <DSTienDon TienDon={TienDon}
                        totalPage={totalPage}
                        UpdateXoaTienDon={UpdateXoaTienDon}
                        UpdateSuaTienDon={UpdateSuaTienDon}
                        page={page}
                        tien_don={tien_don}
                        chi_phi={chi_phi}
                        tien_can_khoi={tien_can_khoi}
                        onChangePage={onChangePage} >
                    </DSTienDon> </div> </div>
            <Backdrop className={classes.backdrop}
                open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
            
            </div>

    )
}

export default Form_TienDon