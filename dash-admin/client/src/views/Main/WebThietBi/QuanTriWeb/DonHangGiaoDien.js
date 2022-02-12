import React, { useState, useEffect } from 'react'
// import DSNganhHang from '../../../compontents/Main/DanhMuc/NganhHang/DSNganhHang'
// import ThemNganhHang from '../../../compontents/Main/DanhMuc/NganhHang/ThemNganhHang'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from "socket.io-client";
import MUIDataTable from "mui-datatables";
import SuaNavbar from './01/SuaNavbar';

import { storage } from "../../../../firebase";
import SuaDonHangSanPham from './01/SuaDonHangSanPham';
import SuaTrangThaiDonHang from './01/SuaTrangThaiDonHang';

const data = new Date()
var ngay_gio_hien_tai = data.toString().split(' ')[0] + ' ' + data.toString().split(' ')[2] + '-' + data.toString().split(' ')[1] + ' ' + data.toString().split(' ')[3]


const ENDPOINT = "http://127.0.0.1:3007";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function DonHangGiaoDien() {
    //#region setState
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [NganhHang, setNganhHang] = useState([])
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
    const UpdateThemNganhHang = (e) => {
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
    const UpdateXoaNganhHang = (e) => {
        try {
            const newData = [...NganhHang]
            const index = newData.findIndex(dl => dl.id_nh === e)
            console.log(index)
            newData.splice(index, 1)
            LoadingForm()
            setNganhHang(newData)
        } catch (error) {

        }
    }
    const UpdateSuaNganhHang = (e) => {
        try {
            console.log(e)
            const newData = [...NganhHang]
            const index = newData.findIndex(dt => dt.id_nh === e[0].id_nh)
            newData.splice(index, 1, e[0])
            LoadingForm()
            setNganhHang(newData)
        } catch (error) {

        }
    }
    //#endregion
    const onChangePage = async (e) => {

        const token = await Token.Token()
        const response = await fetch(host.DSNganhHang + `/${e}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        })
        const JsonData = await response.json()

        if (JsonData.status === 1) {
            setNganhHang(JsonData.data)

            totalPageCallBack()
        } else {

        }
        setPage(e)
    }

    const totalPageCallBack = React.useCallback(async () => {
        try {
            const response = await fetch(host.TotalPageNganhHang)
            const JsonData = await response.json()
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
            const response = await fetch(host.DSNganhHang + `/${page}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            })
            const JsonData = await response.json()

            if (JsonData.status === 1) {
                setNganhHang(JsonData.data)
                // console.log(JsonData.data)   
                totalPageCallBack()
            } else {

            }

        } catch (error) {
            console.log(error)
        }
    }, [])

    // 
    const [DanhSachDonHangSanPham,setDanhSachDonHangSanPham] = React.useState([])

    const [LoaiDanhMuc,setLoaiDanhMuc] = React.useState([])
    React.useEffect( async ( )=>{
        try {
            const res = await fetch(host.DanhSachDonHangSanPham)
            
            const JsonData = await res.json()

            // console.log( JsonData )

            if( JsonData.status === 1 ){

                setDanhSachDonHangSanPham( JsonData.data )
                setLoaiDanhMuc( JsonData.LoaiDanhMuc )

            }
        } catch (error) {
            
        }
    },[])

    console.log( LoaiDanhMuc )
    const _onClickSua = async (  ) =>{
        try {
            const res = await fetch(host.DanhSachDonHangSanPham)
            
            const JsonData = await res.json()

            // console.log( JsonData )

            if( JsonData.status === 1 ){

                setDanhSachDonHangSanPham( JsonData.data )
                setLoaiDanhMuc( JsonData.LoaiDanhMuc )
                alert( 'Cập nhập thành công!' )

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
                            <h1>Đơn hàng sản phẩm</h1>
                            <p></p>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Quản trị</a></li>
                                <li className="breadcrumb-item active">Đơn hàng sản phẩm</li>
                            </ol>
                        </div>
                    </div>
                </div>

            </section>
            <div className="content">
                <div className="container-fluid">
                    {/* {<ThemDSDonHangSanPham _onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc} />} */}
                    {<DSDonHangSanPham DanhSachDonHangSanPham={DanhSachDonHangSanPham} _onClickSua={_onClickSua}
                    LoaiDanhMuc={LoaiDanhMuc}/>}
                    {/* <ThemNganhHang UpdateThemNganhHang={UpdateThemNganhHang}></ThemNganhHang> */}
                    {/* <DSNganhHang NganhHang={NganhHang}
                    totalPage={totalPage}
                    UpdateXoaNganhHang={UpdateXoaNganhHang}
                    UpdateSuaNganhHang={UpdateSuaNganhHang}
                    page={page}
                    onChangePage={onChangePage}
                    ></DSNganhHang>    */}
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}


//#region Navbar
const ThemDSDonHangSanPham = ({_onClickSua, LoaiDanhMuc}) =>{
    
    const [check_menubar, setcheck_menubar] = React.useState('')
    const [ten_loai_hang, setten_loai_hang] = React.useState('')
    const [trang_thai, settrang_thai] = React.useState('false')

    // Sản Phẩm
    const [ten_hang, setten_hang] = React.useState('')
    const [image_01, setimage_01] = React.useState('')
    const [image_02, setimage_02] = React.useState('')
    const [image_03, setimage_03] = React.useState('')
    const [image_04, setimage_04] = React.useState('')
    const [image_05, setimage_05] = React.useState('')
    const [image_06, setimage_06] = React.useState('')
    const [hoa_hong, sethoa_hong] = React.useState('0')

    const [image_01_180, setImage_01_180] = React.useState('')
    const [image_02_180, setImage_02_180] = React.useState('')
    const [image_03_180, setImage_03_180] = React.useState('')
    const [image_04_180, setImage_04_180] = React.useState('')
    const [image_05_180, setImage_05_180] = React.useState('')
    const [image_06_180, setImage_06_180] = React.useState('')

    const [gia_chinh, setgia_chinh] = React.useState('0')
    const [gia_giam, setgia_giam] = React.useState('0')

    const [sku, setsku] = React.useState('')

    const [id_lh, setid_lh] = React.useState('')
    // const [so_luong,setso_luong] = React.useState('')

    const [noi_dung_chi_tiet, setnoi_dung_chi_tiet] = React.useState(`
    <div className="electro-description">

                        <h3>Tiêu đề 01</h3>
                        <p style="text-align: justify;">
                        Nội dung 01
                        </p>

                        <table className="layout">
                            <tbody>
                                <tr>
                                    <td>
                                        <h3>Tiêu đề 02 (Bên trái)</h3>
                                            <p style="text-align: justify;"> 
                                                Nội dung 02 (Bên trái)
                                            </p>
                                        <h3>Tiêu đề 03 (Bên trái)</h3>
                                            <p style="text-align: justify;">
                                            Nội dung 03 (Bên trái)
                                            </p>
                                            
                                        <h3>Tiêu đề 04</h3>
                                            <p style="text-align: justify;">
                                            Nội dung 04 (Bên trái)
                                            </p>
                                    </td>
                                    <td><img className="alignright" src="<Đường dẫn ảnh>" alt="" /></td>
                                </tr>
                            </tbody>
                        </table>
                    
                        <table className="layout">
                            <tbody>
                                <tr>
                                    <td><img className="alignright" src="<Đường dẫn ảnh>" alt="" /></td>
                                    <td>
                                        <h3>Tiêu đề 05 (Bên phải)</h3>
                                            <p style="text-align: justify;"> 
                                                Nội dung 05 (Bên phải)
                                            </p>
                                        <h3>Tiêu đề 06 (Bên phải)</h3>
                                            <p style="text-align: justify;">
                                            Nội dung 06 (Bên phải)
                                            </p>
                                            
                                        <h3>Tiêu đề 07</h3>
                                            <p style="text-align: justify;">
                                            Nội dung 07 (Bên phải)
                                            </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        </div>
    `)

    const [thong_so_ky_thuat,setthong_so_ky_thuat] = React.useState(`
    <table className="table">
        <tbody>
            <tr>
                <td>Brand</td>
                <td>Apple 01</td>
            </tr>
            <tr>
                <td>Item Height</td>
                <td>18 Millimeters</td>
            </tr>
            <tr>
                <td>Item Width</td>
                <td>31.4 Centimeters</td>
            </tr>
            <tr>
                <td>Screen Size</td>
                <td>13 Inches</td>
            </tr>
            <tr className="size-weight">
                <td>Item Weight</td>
                <td>1.6 Kg</td>
            </tr>
            <tr className="size-weight">
                <td>Product Dimensions</td>
                <td>21.9 x 31.4 x 1.8 cm</td>
            </tr>
            <tr className="item-model-number">
                <td>Item model number</td>
                <td>MF841HN/A</td>
            </tr>
            <tr>
                <td>Processor Brand</td>
                <td>Intel</td>
            </tr>
            <tr>
                <td>Processor Type</td>
                <td>Core i5</td>
            </tr>
            <tr>
                <td>Processor Speed</td>
                <td>2.9 GHz</td>
            </tr>
            <tr>
                <td>RAM Size</td>
                <td>8 GB</td>
            </tr>
            <tr>
                <td>Hard Drive Size</td>
                <td>512 GB</td>
            </tr>
            <tr>
                <td>Hard Disk Technology</td>
                <td>Solid State Drive</td>
            </tr>
            <tr>
                <td>Graphics Coprocessor</td>
                <td>Intel Integrated Graphics</td>
            </tr>
            <tr>
                <td>Graphics Card Description</td>
                <td>Integrated Graphics Card</td>
            </tr>
            <tr>
                <td>Hardware Platform</td>
                <td>Mac</td>
            </tr>
            <tr>
                <td>Operating System</td>
                <td>Mac OS</td>
            </tr>
            <tr>
                <td>Average Battery Life (in hours)</td>
                <td>9</td>
            </tr>
        </tbody>
    </table>
    `)
    
    const [so_luong,setso_luong] = React.useState('0')
    //#region Image
    const [image01, setImage01] = useState(null);
    const [image02, setImage02] = useState(null);
    const [image03, setImage03] = useState(null);
    const [image04, setImage04] = useState(null);
    const [image05, setImage05] = useState(null);
    const [image06, setImage06] = useState(null);

    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    
    //#region HandleChange
    const handleChange = (e,imageString) => {
        if (e.target.files[0]) {
            if(imageString === 'image_01'){
                setImage_01_180(e.target.files[0]);
            }else if(imageString === 'image_02' ){
                setImage_02_180(e.target.files[0]);
            }else if(imageString === 'image_03' ){
                setImage_03_180(e.target.files[0]);
            }else if(imageString === 'image_04' ){
                setImage_04_180(e.target.files[0]);
            }else if(imageString === 'image_05' ){
                setImage_05_180(e.target.files[0]);
            }else if(imageString === 'image_06' ){
                setImage_06_180(e.target.files[0]);
            }
            
        }
    };
    //#endregion

    //#region handleUpload
    const handleUpload = (imageString) => {
        var randomString = makeid(10)
        let image

        if(imageString === 'image_01'){
            image = image_01_180
        }else if(imageString === 'image_02' ){
            image = image_02_180
        }else if(imageString === 'image_03' ){
            image = image_03_180
        }else if(imageString === 'image_04' ){
            image = image_04_180
        }else if(imageString === 'image_05' ){
            image = image_05_180
        }else if(imageString === 'image_06' ){
            image = image_06_180
        }
        console.log( image )
        const uploadTask = storage.ref(`images/${randomString}/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
            },
            error => {
            console.log(error);
            },
            () => {
            storage
                .ref(`images/${randomString}`)
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    console.log( url )
                    if(imageString === 'image_01'){
                        setimage_01(url)
                    }else if(imageString === 'image_02' ){
                        setimage_02(url)
                    }else if(imageString === 'image_03' ){
                        setimage_03(url)
                    }else if(imageString === 'image_04' ){
                        setimage_04(url)
                    }else if(imageString === 'image_05' ){
                        setimage_05(url)
                    }else if(imageString === 'image_06' ){
                        setimage_06(url)
                    }
                });
            }
        );
    };
    //#endregion
    //#endregion Image



    // Sản phẩm
    const onClickThemDonHangSanPham = async ()=>{
        try {

            console.log({
                ten_hang, image_01, image_02, image_03, image_04, image_05, image_06,
                image_01_180, image_02_180, image_03_180, image_04_180, image_05_180,
                image_06_180, gia_chinh, gia_giam,
                id_lh, sku,
                noi_dung_chi_tiet, thong_so_ky_thuat,so_luong,hoa_hong
            })
            
            const res = await fetch( host.DonHangSanPham_1999, {
                    
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({
                        ten_hang, image_01, image_02, image_03, image_04, image_05, image_06,
                        image_01_180, image_02_180, image_03_180, image_04_180, image_05_180,
                        image_06_180, gia_chinh, gia_giam,
                        id_lh, sku,
                        noi_dung_chi_tiet, thong_so_ky_thuat,so_luong,hoa_hong
                    })

            })

            const JsonData = await res.json()

            if( res.ok ){
                
                // if( JsonData.status === 1 ){
                //     _onClickSua(true)
                // }

            }

        } catch (error) {
            
        }
    }

    return (
        <div className="row">
        <div className="col-md-12">
            <div className="card card-primary">
                <div className="card-header">
                    {/* <h3 className="card-title">Quick Example</h3> */}
                </div>
                <div className="card-body">
                    <div className="row ">
                        <div className="col col-sm-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tên sản phẩm</label>
                                <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    // value={ten_nganh}
                                    // onChange={e=> setten_hang( e.target.value )}
                                    placeholder="sản phẩm" />
                            </div>
                        </div>

                        <div className="col col-sm-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Hoa Hồng</label>
                                <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    // value={ten_nganh}
                                    // onChange={e=>sethoa_hong(e.target.value)}
                                    placeholder="Hoa Hồng" />

                                {/* {parseInt(hoa_hong).toLocaleString('vi', {style : 'currency', currency : 'VND'})} */}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label htmlFor="exampleInputEmail1">Số lượng</label>
                            <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    // value={ten_nganh}
                                    // onChange={e=>setso_luong(e.target.value)}
                                    placeholder="Số lượng" />
                        </div>
                        <div className='col'>
                        <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Giá chính</label>
                                <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    // value={ten_nganh}
                                    // onChange={e=>setgia_chinh(e.target.value)}
                                    placeholder="Giá chính" />

                                {/* {parseInt(gia_chinh).toLocaleString('vi', {style : 'currency', currency : 'VND'})} */}
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col col-sm-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Loại danh mục</label>
                                <select className='form-control'
                                onChange={e=>setid_lh(e.target.value)}>
                                    <option value={''}>Chọn danh mục</option>
                                    {/* {LoaiDanhMuc.map((x, index)=>(
                                        <option value={x.id_lh}>{x.ten_loai_hang}</option>
                                    )
                                    )} */}
                                </select>
                                {/* <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    // value={ten_nganh}
                                    onChange={e=> setten_hang( e.target.value )}
                                    placeholder="sản phẩm" /> */}
                            </div>
                        </div>

                        <div className="col col-sm-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Giá giảm</label>
                                <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    // value={ten_nganh}
                                    // onChange={e=>setgia_giam(e.target.value)}
                                    placeholder="Giá giảm" />

                                {/* {parseInt(gia_giam).toLocaleString('vi', {style : 'currency', currency : 'VND'})} */}
                            </div>
                        </div>
                    </div>

                    {/* <div className="row ">
                        <div className="col col-sm-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Trạng thái</label>
                                <select className='form-control' defaultValue={trang_thai}
                                    onChange={e => settrang_thai(  e.target.value )  }
                                    >
                                        <option value="true">Sử dụng</option>
                                        <option value="false">Ngưng sử dụng</option>
                                </select>
                            </div>
                        </div>

                    </div> */}


                </div>
                {/* /.card-body */}
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary"
                        onClick={() => onClickThemDonHangSanPham()}
                        style={{ float: 'right' }}>Thêm Sản Phẩm</button>
                </div>
            </div>
        </div>
    </div>
    )
}

const DSDonHangSanPham = ({DanhSachDonHangSanPham,DuLieuSuaMoi,_onClickSua, LoaiDanhMuc}) => {

    console.log( DanhSachDonHangSanPham )
    const columns = [
        {
            name: "id_don",
            label: "id_don",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "ten_kh",
            label: "Tên khách hàng",
            options: {
             filter: true,
             sort: false,
            }
        },
        {
            name: "so_dt",
            label: "Số ĐT",
            options: {
             filter: true,
             sort: false,
            }
        },

        {
            name: "dia_chi",
            label: "Địa chỉ",
            options: {
             filter: true,
             sort: true,
            }
        },

        {
            name: "phuong_thuc_thanh_toan",
            label: "phuong_thuc_thanh_toan",
            options: {
             filter: true,
             sort: true,
            }
        },

        {
            name: "trang_thai_don",
            label: "trang_thai_don",
            options: {
             filter: true,
             sort: true,
            }
        },

        {
            name: "ngay_dat",
            label: "ngay_dat",
            options: {
             filter: true,
             sort: true,
            }
        },

        {
            name: "ghi_chu",
            label: "Ghi chú",
            options: {
             filter: true,
             sort: true,
            }
        },

        {
            name: "nguoi_cham_soc",
            label: "Người chăm sóc",
            options: {
             filter: true,
             sort: true,
            }
        },

        {
            name: "Sửa",
              options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (data,dataIndex,rowIndex) => {
                  // console.log('data :'+data)
                  // console.log('dataIndex :'+dataIndex)
                  // console.log('rowIndex:'+rowIndex)
                  // console.log(DSTaiKhoan[data])
                  return (
                    // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
                    <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                    onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                    ></SuaDonHangSanPham>
                  );
                }
              }
        },

        // {
        //     name: "Trang thái",
        //       options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRenderLite: (data,dataIndex,rowIndex) => {
        //           // console.log('data :'+data)
        //           // console.log('dataIndex :'+dataIndex)
        //           // console.log('rowIndex:'+rowIndex)
        //           // console.log(DSTaiKhoan[data])
        //           return (
        //             // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
        //             <SuaTrangThaiDonHang DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
        //             onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
        //             ></SuaTrangThaiDonHang>
        //           );
        //         }
        //       }
        // },

        //   {
        //     name: "Xóa",
        //       options: {
        //         filter: false,
        //         sort: true,
        //         empty: true,
        //         customBodyRenderLite: (data,dataIndex,rowIndex) => {
        //           return (
        //             // <Delete todo={dataSate[rowIndex]} onSubmit={DeleteSubmit}></Delete>
        //               <XoaDoiTuong DuLieuXoa={DSDoiTuong[data]} DuLieuXoaMoi={DuLieuXoaMoi}></XoaDoiTuong>
        //           //   <div></div>
        //           );
        //         }
        //       }
        //   },
    ];


    // console.log( DanhSachDonHangSanPham )
    const options = {
        filter: true,
        filterType: 'checkbox',
        responsive: 'standard',
        // customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
        //   return (
        //     <CustomFooter
        //       count={count}
        //       page={page}
        //       rowsPerPage={rowsPerPage}
        //       changeRowsPerPage={changeRowsPerPage}
        //       changePage={changePage}
        //       textLabels={textLabels}
        //     />
        //   );
        // },
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(columns) + buildBody(data);
        },
        print: true,
        viewColumns: true,
        download: true,
        downloadOptions: {
            filename: 'LoaiDanhMuc(' + ngay_gio_hien_tai + ').csv',
            filterOptions: {
                useDisplayedRowsOnly: true,
                useDisplayedColumnsOnly: true,
            }
        },
        selectableRows: false // <===== will turn off checkboxes in rows
    }

    return (
        // <div className="row" onKeyPress={e=>e.key ==="Enter" ? onClickThemNganhHang() : ''}>
        <>
            <div className='row'>
                <div className="col-md-12">
                    <MUIDataTable
                        title={"Loại hàng"}
                        data={DanhSachDonHangSanPham}
                        columns={columns}
                        options={options}
                    />
                </div>
            </div>
        </>
    )
}
//#endregion


// Functions
const  makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
}

// 

export default DonHangGiaoDien


