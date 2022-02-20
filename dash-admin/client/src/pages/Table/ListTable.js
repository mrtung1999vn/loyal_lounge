import React from 'react'
import MUIDataTable from "mui-datatables";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import EditTable from './EditTable';
import DeleteTable from './DeleteTable';

const data = new Date()
var ngay_gio_hien_tai = data.toString().split(' ')[0] + ' ' + data.toString().split(' ')[2] + '-' + data.toString().split(' ')[1] + ' ' + data.toString().split(' ')[3]



function ListTable( { ListDataTable , onHandleEdit , onHandleDelete, LoaiDanhMuc}) {
    const [Data,setData] = React.useState([])
    const columns = [
        {
            name: "id_ban",
            label: "ID_Table",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ten_ban",
            label: "Name Table",
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
                        <>{ListDataTable[data].status.toString()}</>
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
                        <EditTable EditData={ListDataTable[data]} onHandleEdit={onHandleEdit}></EditTable>
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
                        <DeleteTable EditData={ListDataTable[data]} onHandleDelete={onHandleDelete}></DeleteTable>
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
            filename: 'ListTable(' + ngay_gio_hien_tai + ').csv',
            filterOptions: {
                useDisplayedRowsOnly: true,
                useDisplayedColumnsOnly: true,
            }
        },
        selectableRows: false // <===== will turn off checkboxes in rows
    }


    React.useEffect(()=>{
        try{
            setData(ListDataTable)
        }catch(error){

        }
    },[])
    // console.log(ListDataTable)
    // console.log(Data)
    return (
        <MUIDataTable
                title={"List Table"}
                data={ListDataTable}
                columns={columns}
                options={options}
        />
    )
}





export default ListTable