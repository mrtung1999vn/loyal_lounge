import React from 'react'
import MUIDataTable from 'mui-datatables'
import host from '../../service/host'
import func from '../../asset/func'
const data = new Date()
var ngay_gio_hien_tai = data.toString().split(' ')[0] + ' ' + data.toString().split(' ')[2] + '-' + data.toString().split(' ')[1] + ' ' + data.toString().split(' ')[3]


function ListSendMoney() {
    const [User,setUser] = React.useState([])
    const [ListHisTory,SetListHisTory] = React.useState([])
    
    const columns = [
        {
            name: "coin_tranfer",
            label: "Transaction",
            options: {
                filter: true,
                sort: true,
            }
        },    
        {
            name: "noi_dung",
            label: "Description",
            options: {
                filter: true,
                sort: true,
            }
        }, 
        {
            name: 'created_at',
            label: "Date",
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
                        <>{
                            ListHisTory[data].created_at.toString().split((new Date()).getFullYear().toString())[0]
                        } </>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
            }
        }, 

        {
            name: 'thoi_gian',
            label: "Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'status',
            label: "Time",
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
                        <>{
                            ListHisTory[data].status === null || ListHisTory[data].status === false ? 'Waiting for progressing' : 'Success'
                        } </>
                        // <SuaDonHangSanPham DuLieuSua={DanhSachDonHangSanPham[data]} DuLieuSuaMoi={DuLieuSuaMoi}
                        //     onClickSua={_onClickSua} LoaiDanhMuc={LoaiDanhMuc}
                        // ></SuaDonHangSanPham>
                    );
                }
            }
        }


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
        //                 <>$ {ListDataProduct[data].gia_sp.toString()}</>
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
        //                 <EditProduct 
        //                 ListTypeProduct={ListTypeProduct}
        //                 EditData={ListDataProduct[data]} onHandleEdit={onHandleEdit}
        //                 handleChangeTypeProduct={handleChangeTypeProduct}
        //                 ></EditProduct>
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
        //                 <DeleteProduct EditData={ListDataProduct[data]} onHandleDelete={onHandleDelete}></DeleteProduct>
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
            filename: 'History(' + ngay_gio_hien_tai + ').csv',
            filterOptions: {
                useDisplayedRowsOnly: true,
                useDisplayedColumnsOnly: true,
            }
        },
        selectableRows: false // <===== will turn off checkboxes in rows
    }


    React.useEffect(async ()=>{
        try {
            if( window.localStorage.getItem('__dir') !== null || window.localStorage.getItem('__dir') !== undefined || window.localStorage.getItem('__dir') !== '' ){
                setUser( 
                  func.DecodeJson_RESPONSE( window.localStorage.getItem('__dir') )
                )
            }
            let newData = func.DecodeJson_RESPONSE( window.localStorage.getItem('__dir') )
            const res = await fetch(host.WebDuDoanNapTienKhachHang + `/${newData[0]?.id_kh}`)

            const content = await res.json()

            if( content.status === 1 ){
                SetListHisTory( func.DecodeJson_RESPONSE( content.data ) )
            }

        } catch (error) {
            
        }
    },[])

    console.log( data )

  return (
    <MUIDataTable
    title={"History"}
    data={ListHisTory}
    columns={columns}
    options={options}
/>
  )
}

export default ListSendMoney