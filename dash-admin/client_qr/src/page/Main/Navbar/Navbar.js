import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import host from '../../../service/host'
import User from '../../../storage/User'
function Navbar() {
  
  const [user,setUser]  = React.useState([])
  const location = useLocation()
  const onClickCapNhapHeThong = async()=>{
    try {
       const response = await fetch(host.CapNhapHeThong)
       const JsonData = await response.json()

       if(JsonData.status === 1){
        alert("Cập nhập thành công!")
       }else{
        alert("Cập nhập không thành công!")
       }

    } catch (error) {
      
    }
  }

  React.useEffect(async ( )=>{
    try {

      // setUser( User.getUser() )

    } catch (error) {
      console.log( error )
    }
  },[])
  // const query = new URLSearchParams(location.search)
  // console.log(location.pathname === "/TaiKhoan")
    return (
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    {/* <img src="http://www.order0phi.vn/static/media/order0phi.02eebbeb.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
    <span className="brand-text font-weight-light" style={{textAlign:"center"}}>Web thiết bị</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="info">
        {/* <h1 style={{color:'white'}}>Thanh Tùng</h1> */}
      </div>
     
      <div className="info">
        <a href="#" className="d-block">{user.map(x=>x.tai_khoan)}</a>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        {/* <input className="form-control form-control-sidebar" type="search" placeholder="Tìm kiếm" aria-label="Search" /> */}
        <div className="input-group-append">
          {/* <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button> */}
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

        <li className="nav-item menu-open">
          <a className={location.pathname === "/TaiKhoan" 
          || location.pathname === "/GioHang" 
          || location.pathname === "/KhachHang"
          || location.pathname === "/ThemGioHang"
           ? "nav-link active" : "nav-link"}>
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Quản lý 
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            {/* <li className="nav-item">
              <a className={"nav-link"} onClick={()=>onClickCapNhapHeThong()}
              style={{cursor:'pointer'}}
              >
                <i className="far fa-circle nav-icon" />
                <p>Cập nhật hệ thống</p>
              </a>
            </li> */}
            <li className="nav-item">
              <Link to="/TaiKhoan"  className={location.pathname === "/TaiKhoan" ? "nav-link active" : "nav-link"} >
                <i className="far fa-circle nav-icon" />
                <p>Tài khoản</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/CauHinhGiaoDien" className={location.pathname === "/CauHinhGiaoDien" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Cấu hình giao diện</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/SanPham" className={location.pathname === "/SanPham" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Sản phẩm</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/KieuLoaiSanPham" className={location.pathname === "/KieuLoaiSanPham" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Kiểu loại sản phẩm</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/DonHang" className={location.pathname === "/DonHang" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Đơn hàng</p>
              </Link>
            </li>

            <li className="nav-item">
              <a  
              style={{cursor:'pointer'}}
              onClick={()=>window.localStorage.clear()}
              className={location.pathname === "/DonHang" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Thoát</p>
              </a>
            </li>

            {/* <li className="nav-item">
              <Link to="/ThemGioHang" className={location.pathname === "/ThemGioHang" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Thêm giỏ hàng</p>
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/GioHang" className={location.pathname === "/GioHang" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Giỏ hàng</p>
              </Link>
            </li> */}
          </ul>
        </li>


        {/* <li className="nav-item menu-open">
          <a href="#" className={location.pathname === "/NganhHang" 
          || location.pathname === "/LoaiHang" || location.pathname === "/MatHang"
           ? "nav-link active" : "nav-link"}>
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Danh mục
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link  to="/NganhHang" className={location.pathname === "/NganhHang" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Ngành hàng</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/LoaiHang" className={location.pathname === "/LoaiHang" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Loại hàng</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/MatHang" className={location.pathname === "/MatHang" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Mặt hàng</p>
              </Link>
            </li>
   
            
          </ul>
        </li>
 */}


        {/* <li className="nav-item menu-open">
          <a href="#" className={
            location.pathname === "/TatCaDon" 
            || location.pathname === "/DangXuLy" 
            || location.pathname === "/DaDatHang"
            || location.pathname === "/DangPhatGiaoVan" 
            || location.pathname === "/HangVeKho"
            || location.pathname === "/KhieuNai" 
            || location.pathname === "/ThanhCong"
            || location.pathname === "/ShopHuy" 
            || location.pathname === "/TatCaDon" 
           ? "nav-link active" : "nav-link"}>
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Trạng thái đơn
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link  to="/TatCaDon" className={location.pathname === "/TatCaDon" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Tất cả đơn</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/DangXuLy" className={location.pathname === "/DangXuLy" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Đang xử lý</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/DaDatHang" className={location.pathname === "/DaDatHang" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Đã đặt hàng</p>
              </Link>
            </li>
   
            <li className="nav-item">
              <Link to="/DangPhatGiaoVan" className={location.pathname === "/DangPhatGiaoVan" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Đang phát giao vận</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/HangVeKho" className={location.pathname === "/HangVeKho" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Hàng về kho</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/KhieuNai" className={location.pathname === "/KhieuNai" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Khiếu nại</p>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/ThanhCong" className={location.pathname === "/ThanhCong" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Thành công</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/ShopHuy" className={location.pathname === "/ShopHuy" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Shop Huỷ</p>
              </Link>
            </li>

          </ul>
        </li> */}

        {/* Thống kê */}
        {/* <li className="nav-item menu-open">
          <a href="#" className={
            location.pathname === "/ThongKeTienHang" 
            || location.pathname === "/ThongKeChiPhi" 
            || location.pathname === "/ThongKeTienKhoiCan"
            || location.pathname === "/ThongKeThanhTien" 
            || location.pathname === "/NapTien"
            || location.pathname === "/ThongBao" 
           ? "nav-link active" : "nav-link"}>
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Thống kê
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link  to="/ThongKeTienHang" className={location.pathname === "/ThongKeTienHang" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Thống kê tiền hàng</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/NapTien" className={location.pathname === "/NapTien" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Nạp tiền</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ThongBao" className={location.pathname === "/ThongBao" ? "nav-link active" : "nav-link"}>
                <i className="far fa-circle nav-icon" />
                <p>Thông báo</p>
              </Link>
            </li>


          </ul>
        </li>

       */}



        {/* <li className="nav-item menu-open">Thoát</li> */}

        

      
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

    )
}

export default Navbar
