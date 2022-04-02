import React from 'react'
import MUIDataTable from "mui-datatables";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import EditBooking from './EditBooking';
import DeleteBooking from './DeleteBooking';
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

const data = new Date()
var ngay_gio_hien_tai = data.toString().split(' ')[0] + ' ' + data.toString().split(' ')[2] + '-' + data.toString().split(' ')[1] + ' ' + data.toString().split(' ')[3]



function ListBooking( { ListDataBooking , onHandleEdit , onHandleDelete, LoaiDanhMuc,ListTypeBooking,handleChangeTypeBooking}) {
    const [Data,setData] = React.useState([])

    console.log( ListDataBooking )
    const columns = [
        
        {
            name: "id_booking",
            label: "ID_Booking",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },   
        {
            name: "ten_su_kien",
            label: "Event",
            options: {
                filter: true,
                sort: true,
            }
        },    
        {
            name: "gia",
            label: "price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "so_luong_dat",
            label: "check",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "so_luong_quet",
            label: "checked",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ten_ban",
            label: "type_table",
            options: {
                filter: true,
                sort: true,
            }
        },
        // {
        //     name: "money",
        //     label: "Money",
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRenderLite: (data, dataIndex, rowIndex) => {
        //             // console.log('data :'+data)
        //             // console.log('dataIndex :'+dataIndex)
        //             // console.log('rowIndex:'+rowIndex)
        //             // console.log(DSTaiKhoan[data])
        //             return (
        //                 // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
        //                 // <>sua</>
        //                 <>{formatter.format(ListDataBooking[data].money)}</>
        //                 // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
        //                 //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
        //                 // ></SuaDonHangSanPham>
        //             );
        //         }
        //     }
        // }, 

        // {
        //     name: "money_vnd",
        //     label: "Money_In_Game",
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRenderLite: (data, dataIndex, rowIndex) => {
        //             // console.log('data :'+data)
        //             // console.log('dataIndex :'+dataIndex)
        //             // console.log('rowIndex:'+rowIndex)
        //             // console.log(DSTaiKhoan[data])
        //             return (
        //                 // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
        //                 // <>sua</>
        //                 <>{parseInt(parseInt(ListDataBooking[data].money_vnd)).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</>
        //                 // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
        //                 //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
        //                 // ></SuaDonHangSanPham>
        //             );
        //         }
        //     }
        // }, 

        // {
        //     name: "ghi_chu",
        //     label: "Description",
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRenderLite: (data, dataIndex, rowIndex) => {
        //             // console.log('data :'+data)
        //             // console.log('dataIndex :'+dataIndex)
        //             // console.log('rowIndex:'+rowIndex)
        //             // console.log(DSTaiKhoan[data])
        //             return (
        //                 // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
        //                 // <>sua</>
        //                 <>{(ListDataBooking[data].ghi_chu.toString())}</>
        //                 // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
        //                 //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
        //                 // ></SuaDonHangSanPham>
        //             );
        //         }
        //     }
        // },

        // {
        //     name: "trang_thai",
        //     label: "Status",
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRenderLite: (data, dataIndex, rowIndex) => {
        //             // console.log('data :'+data)
        //             // console.log('dataIndex :'+dataIndex)
        //             // console.log('rowIndex:'+rowIndex)
        //             // console.log(DSTaiKhoan[data])
        //             return (
        //                 // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
        //                 // <>sua</>
        //                 <>{(ListDataBooking[data].trang_thai.toString())}</>
        //                 // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
        //                 //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
        //                 // ></SuaDonHangSanPham>
        //             );
        //         }
        //     }
        // },

        // {
        //     name: "gia",
        //     label: "Price",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     }
        // },       
        // {
        //     name: "gia",
        //     label: "Price",
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRenderLite: (data, dataIndex, rowIndex) => {
        //             // console.log('data :'+data)
        //             // console.log('dataIndex :'+dataIndex)
        //             // console.log('rowIndex:'+rowIndex)
        //             // console.log(DSTaiKhoan[data])
        //             return (
        //                 // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
        //                 // <>sua</>
        //                 <>$ {ListDataBooking[data].gia_sp.toString()}</>
        //                 // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
        //                 //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
        //                 // ></SuaDonHangSanPham>
        //             );
        //         }
        //     }
        // },

        // {
        //     name: "Edit",
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRenderLite: (data, dataIndex, rowIndex) => {
        //             // console.log('data :'+data)
        //             // console.log('dataIndex :'+dataIndex)
        //             // console.log('rowIndex:'+rowIndex)
        //             // console.log(DSTaiKhoan[data])
        //             return (
        //                 // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
        //                 // <>sua</>
        //                 <EditBooking 
        //                 ListTypeBooking={ListTypeBooking}
        //                 EditData={ListDataBooking[data]} onHandleEdit={onHandleEdit}
        //                 handleChangeTypeBooking={handleChangeTypeBooking}
        //                 ></EditBooking>
        //                 // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
        //                 //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
        //                 // ></SuaDonHangSanPham>
        //             );
        //         }
        //     }
        // },
        // {
        //     name: "Delete",
        //     options: {
        //         filter: false,
        //         sort: true,
        //         customBodyRenderLite: (data, dataIndex, rowIndex) => {
        //             // console.log('data :'+data)
        //             // console.log('dataIndex :'+dataIndex)
        //             // console.log('rowIndex:'+rowIndex)
        //             // console.log(DSTaiKhoan[data])
        //             return (
        //                 // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
        //                 // <>sua</>
        //                 <DeleteBooking EditData={ListDataBooking[data]} onHandleDelete={onHandleDelete}></DeleteBooking>
        //                 // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
        //                 //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
        //                 // ></SuaDonHangSanPham>
        //             );
        //         }
        //     }
        // },
    ];

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
            filename: 'ListBooking(' + ngay_gio_hien_tai + ').csv',
            filterOptions: {
                useDisplayedRowsOnly: true,
                useDisplayedColumnsOnly: true,
            }
        },
        selectableRows: false // <===== will turn off checkboxes in rows
    }


    React.useEffect(()=>{
        try{
            setData(ListDataBooking)
        }catch(error){

        }
    },[])
    // console.log(ListDataBooking)
    // console.log(Data)
    return (
        <MUIDataTable
                title={"List Booking"}
                data={ListDataBooking}
                columns={columns}
                options={options}
        />
    )
}





export default ListBooking