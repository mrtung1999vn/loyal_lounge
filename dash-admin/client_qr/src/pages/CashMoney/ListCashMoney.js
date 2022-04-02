import React from 'react'
import MUIDataTable from "mui-datatables";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import EditCashMoney from './EditCashMoney';
import DeleteCashMoney from './DeleteCashMoney';
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

const data = new Date()
var ngay_gio_hien_tai = data.toString().split(' ')[0] + ' ' + data.toString().split(' ')[2] + '-' + data.toString().split(' ')[1] + ' ' + data.toString().split(' ')[3]



function ListCashMoney( { ListDataCashMoney , onHandleEdit , onHandleDelete, LoaiDanhMuc,ListTypeCashMoney,handleChangeTypeCashMoney}) {
    const [Data,setData] = React.useState([])

    console.log( ListDataCashMoney )
    const columns = [
        
        {
            name: "id_cash",
            label: "ID_CashMoney",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "ten_nguoi_dung",
            label: "User Name",
            options: {
                filter: true,
                sort: false,
            }
        },   
        {
            name: "kieu_thanh_toan",
            label: "Type",
            options: {
                filter: true,
                sort: true,
            }
        },    
        {
            name: "money",
            label: "Money",
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (data, dataIndex, rowIndex) => {
                    // console.log('data :'+data)
                    // console.log('dataIndex :'+dataIndex)
                    // console.log('rowIndex:'+rowIndex)
                    // console.log(DSTaiKhoan[data])
                    return (
                        // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
                        // <>sua</>
                        <>{formatter.format(ListDataCashMoney[data].money)}</>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
            }
        }, 

        {
            name: "money_vnd",
            label: "Money_In_Game",
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (data, dataIndex, rowIndex) => {
                    // console.log('data :'+data)
                    // console.log('dataIndex :'+dataIndex)
                    // console.log('rowIndex:'+rowIndex)
                    // console.log(DSTaiKhoan[data])
                    return (
                        // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
                        // <>sua</>
                        <>{parseInt(parseInt(ListDataCashMoney[data].money_vnd)).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
            }
        }, 

        {
            name: "ghi_chu",
            label: "Description",
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (data, dataIndex, rowIndex) => {
                    // console.log('data :'+data)
                    // console.log('dataIndex :'+dataIndex)
                    // console.log('rowIndex:'+rowIndex)
                    // console.log(DSTaiKhoan[data])
                    return (
                        // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
                        // <>sua</>
                        <>{(ListDataCashMoney[data].ghi_chu.toString())}</>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
            }
        },

        {
            name: "trang_thai",
            label: "Status",
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (data, dataIndex, rowIndex) => {
                    // console.log('data :'+data)
                    // console.log('dataIndex :'+dataIndex)
                    // console.log('rowIndex:'+rowIndex)
                    // console.log(DSTaiKhoan[data])
                    return (
                        // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
                        // <>sua</>
                        <>{(ListDataCashMoney[data].trang_thai.toString())}</>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
            }
        },
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
        //                 <>$ {ListDataCashMoney[data].gia_sp.toString()}</>
        //                 // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
        //                 //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
        //                 // ></SuaDonHangSanPham>
        //             );
        //         }
        //     }
        // },

        {
            name: "Edit",
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (data, dataIndex, rowIndex) => {
                    // console.log('data :'+data)
                    // console.log('dataIndex :'+dataIndex)
                    // console.log('rowIndex:'+rowIndex)
                    // console.log(DSTaiKhoan[data])
                    return (
                        // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
                        // <>sua</>
                        <EditCashMoney 
                        ListTypeCashMoney={ListTypeCashMoney}
                        EditData={ListDataCashMoney[data]} onHandleEdit={onHandleEdit}
                        handleChangeTypeCashMoney={handleChangeTypeCashMoney}
                        ></EditCashMoney>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
            }
        },
        {
            name: "Delete",
            options: {
                filter: false,
                sort: true,
                customBodyRenderLite: (data, dataIndex, rowIndex) => {
                    // console.log('data :'+data)
                    // console.log('dataIndex :'+dataIndex)
                    // console.log('rowIndex:'+rowIndex)
                    // console.log(DSTaiKhoan[data])
                    return (
                        // <Edit todo={dataSate[rowIndex]} OnSubmit={EditSubmit}></Edit>
                        // <>sua</>
                        <DeleteCashMoney EditData={ListDataCashMoney[data]} onHandleDelete={onHandleDelete}></DeleteCashMoney>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
            }
        },
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
            filename: 'ListCashMoney(' + ngay_gio_hien_tai + ').csv',
            filterOptions: {
                useDisplayedRowsOnly: true,
                useDisplayedColumnsOnly: true,
            }
        },
        selectableRows: false // <===== will turn off checkboxes in rows
    }


    React.useEffect(()=>{
        try{
            setData(ListDataCashMoney)
        }catch(error){

        }
    },[])
    // console.log(ListDataCashMoney)
    // console.log(Data)
    return (
        <MUIDataTable
                title={"List CashMoney"}
                data={ListDataCashMoney}
                columns={columns}
                options={options}
        />
    )
}





export default ListCashMoney