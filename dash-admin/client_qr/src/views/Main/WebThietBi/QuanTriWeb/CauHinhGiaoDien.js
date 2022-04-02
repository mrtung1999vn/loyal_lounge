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

const data = new Date()
var ngay_gio_hien_tai = data.toString().split(' ')[0] + ' ' + data.toString().split(' ')[2] + '-' + data.toString().split(' ')[1] + ' ' + data.toString().split(' ')[3]


const ENDPOINT = "http://127.0.0.1:3007";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function CauHinhGiaoDien() {
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
    const [navBarList,setNavBarList] = React.useState([])


    React.useEffect( async ( )=>{
        try {
            const res = await fetch(host.Navbar)
            
            const JsonData = await res.json()

            // console.log( JsonData )

            if( JsonData.status === 1 ){
                setNavBarList( JsonData.data )
            }
        } catch (error) {
            
        }
    },[])


    const _onClickSua = async (  ) =>{
        try {
            const res = await fetch(host.Navbar)
            
            const JsonData = await res.json()

            // console.log( JsonData )

            if( JsonData.status === 1 ){
                setNavBarList( JsonData.data )
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
                            <h1>Cấu hình giao diện</h1>
                            <p>
                                {/* <time dateTime={response}>{response}</time> */}
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Quản trị</a></li>
                                <li className="breadcrumb-item active">Cấu hình giao diện</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                    {<ThemNavBarGiaoDien _onClickSua={_onClickSua}/>}
                    {<NavbarGiaoDien navBarList={navBarList} _onClickSua={_onClickSua}/>}
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
const ThemNavBarGiaoDien = ({_onClickSua}) =>{
    
    const [check_menubar, setcheck_menubar] = React.useState('')
    const [ten_loai_hang, setten_loai_hang] = React.useState('')
    const [trang_thai, settrang_thai] = React.useState('false')
    const onClickThemLoaiHang = async ()=>{
        try {
            console.log( {check_menubar,ten_loai_hang,trang_thai} )
            const res = await fetch( host.Navbar,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({check_menubar,ten_loai_hang,trang_thai})
            } )
            const JsonData = await res.json(  )
            if( res.ok ){
                if( JsonData.status === 1 ){
                    _onClickSua(true)
                }
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
                                <label htmlFor="exampleInputEmail1">Tên loại hàng</label>
                                <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    // value={ten_nganh}
                                    onChange={e=> setten_loai_hang( e.target.value )}
                                    placeholder="Loại hàng" />
                            </div>
                        </div>

                        <div className="col col-sm-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Thứ tự menu</label>
                                <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    // value={ten_nganh}
                                    onChange={e=>setcheck_menubar(e.target.value)}
                                    placeholder="Loại hàng" />
                            </div>
                        </div>
                    </div>


                    <div className="row ">
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

                    </div>


                </div>
                {/* /.card-body */}
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary"
                        onClick={() => onClickThemLoaiHang()}
                        style={{ float: 'right' }}>Thêm Loại hàng</button>
                </div>
            </div>
        </div>
    </div>
    )
}
const NavbarGiaoDien = ({navBarList,DuLieuSuaMoi,_onClickSua}) => {
    const columns = [
        {
            name: "id_lh",
            label: "ID",
            options: {
             filter: true,
             sort: true,
            }
        },
        {
            name: "ten_loai_hang",
            label: "Tên Navbar",
            options: {
             filter: true,
             sort: false,
            }
        },
        {
            name: "ghi_chu",
            label: "Ghi chú",
            options: {
             filter: true,
             sort: false,
            }
        },
        {
            name: "check_menubar",
            label: "Navbar Number",
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
                    <SuaNavbar DuLieuSua={navBarList[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                    onClickSua={_onClickSua}
                    ></SuaNavbar>
                  );
                }
              }
        },


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


    // console.log( navBarList )
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
                        data={navBarList}
                        columns={columns}
                        options={options}
                    />
                </div>
            </div>
        </>
    )
}
//#endregion




export default CauHinhGiaoDien


