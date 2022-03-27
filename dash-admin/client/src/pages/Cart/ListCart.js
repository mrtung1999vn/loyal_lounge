import React from 'react'
import MUIDataTable from "mui-datatables";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import EditCart from './EditCart';
import DeleteCart from './DeleteCart';


import $ from 'jquery'
import host from '../../service/host';
import func from '../../asset/func';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

const data = new Date()
var ngay_gio_hien_tai = data.toString().split(' ')[0] + ' ' + data.toString().split(' ')[2] + '-' + data.toString().split(' ')[1] + ' ' + data.toString().split(' ')[3]



function ListCart({ ListDataCart, onHandleEdit, onHandleDelete, LoaiDanhMuc, ListTypeCart, handleChangeTypeCart,onHandleChangeType }) {
    const [Data, setData] = React.useState([])

    console.log(ListDataCart)
    const columns = [

        {
            name: "id_don",
            label: "ID_Bill",
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
            name: "tong_tien",
            label: "total",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "day_time",
            label: "Time",
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
        // {
        //     name: "so_luong_quet",
        //     label: "checked",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     }
        // },
        {
            name: "status_don_hang",
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
                        <CartForm ListDataCart={ListDataCart[data]} onHandleChangeType={onHandleChangeType}></CartForm>
                        // <>{formatter.format(ListDataCart[data].money)}</>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
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
        //                 <>{formatter.format(ListDataCart[data].money)}</>
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
        //                 <>{parseInt(parseInt(ListDataCart[data].money_vnd)).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</>
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
        //                 <>{(ListDataCart[data].ghi_chu.toString())}</>
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
        //                 <>{(ListDataCart[data].trang_thai.toString())}</>
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
        //                 <>$ {ListDataCart[data].gia_sp.toString()}</>
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
        //                 <EditCart 
        //                 ListTypeCart={ListTypeCart}
        //                 EditData={ListDataCart[data]} onHandleEdit={onHandleEdit}
        //                 handleChangeTypeCart={handleChangeTypeCart}
        //                 ></EditCart>
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
        //                 <DeleteCart EditData={ListDataCart[data]} onHandleDelete={onHandleDelete}></DeleteCart>
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
            filename: 'ListCart(' + ngay_gio_hien_tai + ').csv',
            filterOptions: {
                useDisplayedRowsOnly: true,
                useDisplayedColumnsOnly: true,
            }
        },
        selectableRows: false // <===== will turn off checkboxes in rows
    }


    React.useEffect(() => {
        try {
            setData(ListDataCart)
        } catch (error) {

        }
    }, [])
    // console.log(ListDataCart)
    // console.log(Data)
    return (
        <MUIDataTable
            title={"List Cart"}
            data={ListDataCart}
            columns={columns}
            options={options}
        />
    )
}





export default ListCart


const CartForm = ({ ListDataCart,onHandleChangeType }) => {

    const [id_don, setid_don] = React.useState(ListDataCart.id_don)


    const [ListChiTiet, setListChiTiet] = React.useState([])
    const getData = async () => {
        try {
            const res = await fetch(host.WebDashChiTietDanhSachCart + `/${ListDataCart.id_don}`)
            const content = await res.json()

            if (content.status === 1) {
                setListChiTiet(func.DecodeJson_RESPONSE(content.data))
            }

        } catch (error) {

        }
    }

    const onClickChangeType = async()=>{
        try {
            const res = await fetch(host.WebDashChiTietDanhSachCart + `/${ListDataCart.id_don}`,{
                method:"PUT",
                headers:{"Content-Type" : "application/json"},
                // body:JSON.stringify({token,trangthai})
            })
            const content = await res.json()

            if (content.status === 1) {
                onHandleChangeType(true)
                setListChiTiet(func.DecodeJson_RESPONSE(content.data))
            }
        } catch (error) {
            
        }
    }

    console.log(ListChiTiet)
    React.useEffect(async () => {
        try {

            setid_don(ListDataCart.id_don)
            getData()
        } catch (error) {

        }
    }, [ListDataCart.id_don])
    return (
        <>
            {/* <button type="button" className="submitForm"
        style={{ backgroundColor: 'black', color: '#eaca8c' }}
        onClick={() => window.location.href = "./Register"}
        >Complete</button> */}
            <button type="button" className="form-control"
                style={{ backgroundColor: 'black', color: '#eaca8c' }}
                data-toggle="modal" data-target={`#sp_gio_hang_${ListDataCart.id_don}`}
                onClick={() => {
                    setTimeout(() => $('.modal-backdrop').remove(), 500)
                }}
            >
                {/* { ListDataCart.status_don_hang.toString() } */}
                {ListDataCart.status_don_hang.toString() === 'false' ? 'check' : 'checked'}
            </button>

            {/* modal-backdrop fade show */}

            <div className="modal fade" id={`sp_gio_hang_${ListDataCart.id_don}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"
                                style={{ color: 'black' }}
                            > </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Produce products for orders {ListDataCart.id_don} ({ListDataCart.email})?
                            <br></br>
                            <div className='row'>
                                <div className='col'>Product</div>
                                <div className='col'>Qty</div>
                                <div className='col'>Price</div>
                            </div>
                            <hr></hr>
                            {ListChiTiet.map((x, index) => (
                                <div className='row'>
                                    <div className='col'>{x.ten_sp}</div>
                                    <div className='col'>{x.so_luong_ct}</div>
                                    <div className='col'>{x.gia_sp}</div>
                                </div>
                            ))}
                            <hr></hr>
                            Choose yes or no below? ( {ListDataCart.id_don} )
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            style={{width:'200px'}}>No</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal"
                            style={{width:'200px'}}
                            onClick={() => onClickChangeType(ListDataCart.id_don)}
                            >Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}