import React  ,{useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Customer from '../storage/Customer'
import func from '../asset/func'
import ChiTietDangXuLy from './ChiTietDangXuLy'
import ChiTietDaDatHang from './ChiTietDaDatHang'
import ChiTietDangPhatGiaoVan from './ChiTietDangPhatGiaoVan'
import ChiTietHangVeKho from './ChiTietHangVeKho'
import ChiTietKhieuNai from './ChiTietKhieuNai'
import ChiTietThanhCong from './ChiTietThanhCong'
import ChiTietShopHuy from './ChiTietShopHuy'
import ChiTietNull from './ChiTietNull'
function Router_switch_controler() {

    const location = useLocation()

    const query = new URLSearchParams(location.search)

    const [stt,setSTT] = React.useState(query.get("stt"))
    const [id_don_hang,setid_don_hang] = React.useState(query.get("id_don_hang"))
    const [id_kh,setid_kh] = React.useState(query.get("id_kh"))

    useEffect(async ()=>{
        setSTT(query.get("stt"))
        setid_don_hang(query.get("id_don_hang"))
        setid_kh(query.get("id_kh"))
    },[])

    console.log(stt)
    // console.log(KhachHang)
    switch(stt){
        case "Đang xử lý":
            return(
                <ChiTietDangXuLy id_don_hang={id_don_hang} stt={stt} id_kh={id_kh}></ChiTietDangXuLy>
        )
        case "Đã đặt hàng":
            return(
                <ChiTietDaDatHang id_don_hang={id_don_hang} stt={stt} id_kh={id_kh}></ChiTietDaDatHang>
        )
        case "Đang phát giao vận":
            return(
                <ChiTietDangPhatGiaoVan id_don_hang={id_don_hang} stt={stt} id_kh={id_kh}></ChiTietDangPhatGiaoVan>
        )
        case "Hàng về kho":
            return(
                <ChiTietHangVeKho id_don_hang={id_don_hang} stt={stt} id_kh={id_kh}></ChiTietHangVeKho>
        )
        case "Khiếu nại":
            return(
                <ChiTietKhieuNai id_don_hang={id_don_hang} stt={stt} id_kh={id_kh}></ChiTietKhieuNai>
        )
        case "Thành công":
            return(
                <ChiTietThanhCong id_don_hang={id_don_hang} stt={stt} id_kh={id_kh}></ChiTietThanhCong>
        )
        case "Shop huỷ":
            return(
                <ChiTietShopHuy id_don_hang={id_don_hang} stt={stt} id_kh={id_kh}></ChiTietShopHuy>
        )
        case "null":
            return(
                <ChiTietNull id_don_hang={id_don_hang} stt={stt} id_kh={id_kh}></ChiTietNull>
        )

    }



}

export default Router_switch_controler
