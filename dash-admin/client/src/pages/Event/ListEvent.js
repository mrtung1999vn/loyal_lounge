import React from 'react'
import MUIDataTable from "mui-datatables";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';

const data = new Date()
var ngay_gio_hien_tai = data.toString().split(' ')[0] + ' ' + data.toString().split(' ')[2] + '-' + data.toString().split(' ')[1] + ' ' + data.toString().split(' ')[3]



function ListEvent( { ListDataEvent , onHandleEdit , onHandleDelete, LoaiDanhMuc}) {
    const [Data,setData] = React.useState([])
    const columns = [
        {
            name: "id_su_kien",
            label: "ID_Event",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ten_su_kien",
            label: "Event",
            options: {
                filter: true,
                sort: false,
            }
        },        
        {
            name: "thoi_gian_dien",
            label: "Name Event",
            options: {
                filter: true,
                sort: false,
            }
        },  
        {
            name: "gia",
            label: "Price",
            options: {
                filter: true,
                sort: false,
            }
        }, 
        {
            name: "the_loai",
            label: "Type",
            options: {
                filter: true,
                sort: false,
            }
        },  
        {
            name: "noi_dung",
            label: "Description",
            options: {
                filter: true,
                sort: false,
            }
        }, 
        {
            name: "nguoi_tham_gia",
            label: "Actors",
            options: {
                filter: true,
                sort: false,
            }
        }, 

        {
            name: "status",
            label: "status",
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
                        <>{ListDataEvent[data].status.toString()}</>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
            }
        },

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
                        <EditEvent EditData={ListDataEvent[data]} onHandleEdit={onHandleEdit}></EditEvent>
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
                        <DeleteEvent EditData={ListDataEvent[data]} onHandleDelete={onHandleDelete}></DeleteEvent>
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
            filename: 'ListEvent(' + ngay_gio_hien_tai + ').csv',
            filterOptions: {
                useDisplayedRowsOnly: true,
                useDisplayedColumnsOnly: true,
            }
        },
        selecEventRows: false // <===== will turn off checkboxes in rows
    }


    React.useEffect(()=>{
        try{
            setData(ListDataEvent)
        }catch(error){

        }
    },[])
    // console.log(ListDataEvent)
    // console.log(Data)
    return (
        <MUIDataTable
                title={"List Event"}
                data={ListDataEvent}
                columns={columns}
                options={options}
        />
    )
}





export default ListEvent