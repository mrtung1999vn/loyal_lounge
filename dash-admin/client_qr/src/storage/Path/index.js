import React from 'react'
import Router_switch_controler from '../../controller/Router_switch_controler'
import LoaiHang from '../../views/Main/DanhMuc/LoaiHang'
import MatHang from '../../views/Main/DanhMuc/MatHang'
import NganhHang from '../../views/Main/DanhMuc/NganhHang'
import GioHang from '../../views/Main/QuanLy/GioHang'
import KhachHang from '../../views/Main/QuanLy/KhachHang'
import TaiKhoan from '../../views/Main/QuanLy/TaiKhoan'
import DangXuLy from '../../views/Main/TrangThaiDonHang/DangXuLy'
import DaDatHang from '../../views/Main/TrangThaiDonHang/DaDatHang'
import DangPhatGiaoVan from '../../views/Main/TrangThaiDonHang/DangPhatGiaoVan'
import HangVeKho from '../../views/Main/TrangThaiDonHang/HangVeKho'
import KhieuNai from '../../views/Main/TrangThaiDonHang/KhieuNai'
import ThanhCong from '../../views/Main/TrangThaiDonHang/ThanhCong'
import ShopHuy from '../../views/Main/TrangThaiDonHang/ShopHuy'
import TatCaVanDon from '../../views/Main/TrangThaiDonHang/TatCaVanDon'
import ThemGioHang from '../../views/Main/QuanLy/ThemGioHang'

// Thống kê

import ThongKeTienDon from '../../views/Main/ThongKe/ThongKeTienDon'
import NapTien from '../../views/Main/ThongKe/NapTien'
import ThongBao from '../../views/Main/ThongKe/ThongBao'
// 

import CauHinhGiaoDien from '../../views/Main/WebThietBi/QuanTriWeb/CauHinhGiaoDien'
import SanPhamGiaoDien from '../../views/Main/WebThietBi/QuanTriWeb/SanphamGiaoDien'
import KieuLoaiGiaoDien from '../../views/Main/WebThietBi/QuanTriWeb/KieuLoaiGiaoDien'
import DonHangGiaoDien from '../../views/Main/WebThietBi/QuanTriWeb/DonHangGiaoDien'

export default [

    //#region Web thiết bị

    //#endregion 
    
    //#region Quản lý
    {
        path:"/KhachHang",
        components:<KhachHang></KhachHang>
    },
    {
        path:"/TaiKhoan",
        components:<TaiKhoan></TaiKhoan>
    },
    {
        path:"/GioHang",
        components:<GioHang></GioHang>
    },
    {
        path:"/ThemGioHang",
        components:<ThemGioHang></ThemGioHang>
    },

    {
        path:"/CauHinhGiaoDien",
        components:<CauHinhGiaoDien></CauHinhGiaoDien>
    },
    {
        path:"/SanPham",
        components:<SanPhamGiaoDien></SanPhamGiaoDien>
    },
    {
        path:"/KieuLoaiSanPham",
        components: <KieuLoaiGiaoDien></KieuLoaiGiaoDien>
    },
    {
        path:"/DonHang",
        components: <DonHangGiaoDien></DonHangGiaoDien>
    },
    //#endregion

    //#region Danh mục
    {
        path:"/NganhHang",
        components:<NganhHang></NganhHang>
    },
    {
        path:"/LoaiHang",
        components:<LoaiHang></LoaiHang>
    },
    {
        path:"/MatHang",
        components:<MatHang></MatHang>
    },
    //#endregion


    //#region Trạng thái đơn hàng
    {
        path:"/TatCaDon",
        components:<TatCaVanDon></TatCaVanDon>
    },
    {
        path:"/DangXuLy",
        components:<DangXuLy></DangXuLy>
    },
    {
        path:"/DaDatHang",
        components:<DaDatHang></DaDatHang>
    },
    {
        path:"/DangPhatGiaoVan",
        components:<DangPhatGiaoVan></DangPhatGiaoVan>
    },
    {
        path:"/HangVeKho",
        components:<HangVeKho></HangVeKho>
    },
    {
        path:"/KhieuNai",
        components:<KhieuNai></KhieuNai>
    },
    {
        path:"/ThanhCong",
        components:<ThanhCong></ThanhCong>
    },
    {
        path:"/ShopHuy",
        components:<ShopHuy></ShopHuy>
    },

    {
        path:"/ChiTietDonHang",
        components:<Router_switch_controler></Router_switch_controler>
    },
    //#endregion


    //#region Thống kê
    {
        path:"/ThongKeTienHang",
        components:<ThongKeTienDon></ThongKeTienDon>
    },
    {
        path:"/NapTien",
        components: <NapTien></NapTien>
    },
    // {
    //     path:"/ThongKeChiPhi",
    //     components:<Router_switch_controler></Router_switch_controler>
    // },
    // {
    //     path:"/ThongKeTienKhoiCan",
    //     components:<Router_switch_controler></Router_switch_controler>
    // },
    // {
    //     path:"/ThongKeThanhTien",
    //     components:<Router_switch_controler></Router_switch_controler>
    // },
   
    {
        path:"/ThongBao",
        components:<ThongBao></ThongBao>
    },
    //#endregion

    
    {
        path:"/",
        components:<div style={{height:'100vh'}}></div>
    }
]