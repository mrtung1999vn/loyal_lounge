import React, { useState, useEffect, useRef } from 'react'
import DSDangPhatGiaoVan from '../../../compontents/Main/TrangThaiDon/DangPhatGiaoVan/DSDangPhatGiaoVan'
import ThemDangXuLy from '../../../compontents/Main/TrangThaiDon/DangXuLy/ThemDangXuLy'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from "socket.io-client";
import func from '../../../asset/func'
import {
    Provider as AlertProvider,
    useAlert,
    positions,
    transitions
} from 'react-alert'

const ENDPOINT = "http://127.0.0.1:3007";
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function Form_DangPhatGiaoVan() {
    //#region setState
    const alert = useAlert()
    const timeTimeoutRef = useRef(null)
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [DangPhatGiaoVan, setDangPhatGiaoVan] = useState([])
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
    const UpdateThemDangPhatGiaoVan = (e) => {
        try {
            const newData = [...DangPhatGiaoVan]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setDangPhatGiaoVan(newData)
        } catch (error) {

        }
    }
    // newData.splice(dataEdit,1,e[0]) (Sửa)
    const UpdateXoaDangPhatGiaoVan = (e) => {
        try {
            const newData = [...DangPhatGiaoVan]
            const index = newData.findIndex(dl => dl.id_nh === e)
            console.log(index)
            newData.splice(index, 1)
            LoadingForm()
            setDangPhatGiaoVan(newData)
        } catch (error) {

        }
    }
    const UpdateSuaDangPhatGiaoVan = (e) => {
        try {
            console.log(e)
            const newData = [...DangPhatGiaoVan]
            const index = newData.findIndex(dt => dt.id_nh === e[0].id_nh)
            newData.splice(index, 1, e[0])
            LoadingForm()
            setDangPhatGiaoVan(newData)
        } catch (error) {

        }
    }
    //#endregion
    const onChangePage = async (e) => {
        var trangthai = "Đang phát giao vận"
        const token = await Token.Token()
        const response = await fetch(host.DSDangPhatGiaoVan + `/${e}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token,trangthai })
        })
        const JsonData = await response.json()

        if (JsonData.status === 1) {
            setDangPhatGiaoVan(func.DecodeJson_RESPONSE(JsonData.data))

            totalPageCallBack()
        } else {

        }
        setPage(e)
    }
    const _onChangeImage = async ()=>{
        try{
            onChangePage(page)
        }catch(error){

        }
    }

    const totalPageCallBack = React.useCallback(async () => {
        try {
            const response = await fetch(host.TotalPageDangPhatGiaoVan)
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

    React.useEffect(async () => {
        try {
            const token = await Token.Token()
            var trangthai = "Đang phát giao vận"
            const response = await fetch(host.DSDangPhatGiaoVan + `/${page}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, trangthai })
            })
            const JsonData = await response.json()

            if (JsonData.status === 1) {
                setDangPhatGiaoVan(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                totalPageCallBack()
            } else {

            }
          

        
        } catch (error) {
            console.log(error)
        }
    }, [])
    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("FromAPI", data => {
    //       setResponse(data);
    //     });
    //   }, []);



    const onClickGopHoaDon = async () => {
        try {
            // const 
        } catch (error) {

        }
    }
    const UpdateThemDangXuLy = (e) => {
        try {
            const newData = [...DangPhatGiaoVan]
            console.log(e)
            newData.push(e[0])
            LoadingForm()
            setDangPhatGiaoVan(newData)
        } catch (error) {

        }
    }
    const du_lieu_loc = async (e) => {
        try {
            const { tu_ngay, den_ngay, tim_theo_ten, tim_theo_ma, tim_theo_van } = e
            console.log({ tu_ngay, den_ngay, tim_theo_ten, tim_theo_ma, tim_theo_van })
            const token = await Token.Token()
            var trangthai = "Đang phát giao vận"
            const response = await fetch(host.TimKiemDonHang, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trangthai, tim_theo_ten, tim_theo_ma, tim_theo_van, tu_ngay, den_ngay, token })
            })
            const JsonData = await response.json()

            if (JsonData.status === 1) {
                setDangPhatGiaoVan(func.DecodeJson_RESPONSE(JsonData.data))
                // console.log(JsonData.data)   
                totalPageCallBack()
            } else {
                alert("Hiện tại không có dữ liệu")
            }
        } catch (error) {

        }
    }

    // Thêm cân khối
    const [DSKhachHang, setDSKhachHang] = React.useState([])
    const [tai_khoan_khach, settai_khoan_khach] = React.useState('')
    const [so_can, setso_can] = React.useState(0)
    const [so_khoi, setso_khoi] = React.useState(0)
    const [ghi_chu, setghi_chu] = React.useState(' ')
    const onChangeTimTenKhach = async (e) => {
        try {
            const value = e
            if (timeTimeoutRef.current) {
                clearTimeout(timeTimeoutRef.current)
            }

            timeTimeoutRef.current = setTimeout(async () => {
                const response = await fetch(host.KhachHang + `/${value}`)
                const JsonData = await response.json()

                if (JsonData.status === 1) {
                    const newData = []

                    func.DecodeJson_RESPONSE(JsonData.data).map((x, index) => {
                        newData.push({
                            ten_kh: x.ten_kh,
                            tai_khoan_khach: x.tai_khoan_khach,
                            so_dt: func.DecodeString("GIO_HANG", x.tai_khoan_khach)
                        })
                        if (index + 1 === func.DecodeJson_RESPONSE(JsonData.data).length) {
                            setDSKhachHang(newData)
                        }
                    }
                    )
                } else {

                }
            }, 500)



        } catch (error) {

        }
    }


    const ThemCanKhoiTaiKhoan = async () => {
        try {
            const token = await Token.Token()
            if(tai_khoan_khach === ''){
                alert.info("Chọn khách hàng", { position: positions.BOTTOM_CENTER })
            }else{
                const response = await fetch(host.ThemSoCanKhoi, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token,so_can, so_khoi, ghi_chu, tai_khoan_khach })
                })
                const JsonData = await response.json()
                if (JsonData.status === 1) {
                    setso_khoi(0)
                    setghi_chu(' ')
                    setso_can(0)
                    alert.success("Cập nhập thành công", { position: positions.BOTTOM_CENTER })
                } else {
                    alert.error("Cập nhập thất bại", { position: positions.BOTTOM_CENTER })
                }
            }

        } catch (error) {

        }
    }

    // 

    const onUpdateDangPhatGiaoVan = (e)=>{
        try{
            const newData = [...DangPhatGiaoVan]
            const index = newData.findIndex(dl => dl.id_don === e)
            console.log(index)
            newData.splice(index, 1)
            LoadingForm()
            setDangPhatGiaoVan(newData)
        }catch(error){

        }
    }


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Đang phát giao vận</h1>
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
                    <div>
                        <div className="row">
                            <div className="col">

                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Thêm cân khối
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Thêm số cân khối</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row">
                                                    <label>Tìm tên khách</label>
                                                    <input className="form-control" onChange={e =>
                                                        onChangeTimTenKhach(e.target.value)} />
                                                </div>
                                                <div className="row">
                                                    Số điện thoại <label style={{ color: 'green' }}> (Đăng nhập)</label>
                                                    <select className="form-control"
                                                        onChange={e => settai_khoan_khach(e.target.value)}
                                                    >
                                                        <option value="">Chọn tài khoản</option>
                                                        {DSKhachHang.map(x => <option value={x.tai_khoan_khach}>{x.ten_kh}</option>)}
                                                    </select>

                                                    <label>Số cân</label>
                                                    <input className="form-control" 
                                                    value={so_can}
                                                    onChange={e=>setso_can(e.target.value)}
                                                    />

                                                    <label>Số khối</label>
                                                    <input className="form-control" 
                                                    value={so_khoi}
                                                    onChange={e=>setso_khoi(e.target.value)}
                                                    />
                                                    <label>Mã vận đơn</label>
                                                    <input className="form-control" 
                                                    onChange={e=>setghi_chu(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                                    onClick={() => ThemCanKhoiTaiKhoan()}
                                                >Thêm cân khối tài khoản</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DSDangPhatGiaoVan DangPhatGiaoVan={DangPhatGiaoVan}
                        totalPage={totalPage}
                        UpdateXoaDangPhatGiaoVan={UpdateXoaDangPhatGiaoVan}
                        UpdateSuaDangPhatGiaoVan={UpdateSuaDangPhatGiaoVan}
                        page={page}
                        onChangePage={onChangePage}
                        onUpdateDangPhatGiaoVan={onUpdateDangPhatGiaoVan}
                        _onChangeImage={_onChangeImage}
                    ></DSDangPhatGiaoVan>
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Form_DangPhatGiaoVan
