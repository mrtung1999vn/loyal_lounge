


import React, { useState } from 'react'
import { storage } from '../../../../../firebase'
import host from '../../../../../service/host'

function SuaDonHangSanPham({ DuLieuSua, onClickSua, LoaiDanhMuc }) {
    // useState

    const [check_menubar, setcheck_menubar] = React.useState(DuLieuSua.check_menubar)
    const [ten_loai_hang, setten_loai_hang] = React.useState(DuLieuSua.ten_loai_hang)
    const [trang_thai, settrang_thai] = React.useState(DuLieuSua.trang_thai)


    //#region Sản phẩm

    // Sản Phẩm
    const [id_kieu_loai, setid_kieu_loai] = React.useState(DuLieuSua.id_kieu_loai)
    const [ten_hang, setten_hang] = React.useState(DuLieuSua.ten_kieu_loai)
    const [image_01, setimage_01] = React.useState(DuLieuSua.image_01)
    const [image_02, setimage_02] = React.useState(DuLieuSua.image_02)
    const [image_03, setimage_03] = React.useState(DuLieuSua.image_03)
    const [image_04, setimage_04] = React.useState(DuLieuSua.image_04)
    const [image_05, setimage_05] = React.useState(DuLieuSua.image_05)
    const [image_06, setimage_06] = React.useState(DuLieuSua.image_06)

    const [image_01_180, setImage_01_180] = React.useState('')
    const [image_02_180, setImage_02_180] = React.useState('')
    const [image_03_180, setImage_03_180] = React.useState('')
    const [image_04_180, setImage_04_180] = React.useState('')
    const [image_05_180, setImage_05_180] = React.useState('')
    const [image_06_180, setImage_06_180] = React.useState('')

    const [gia_chinh, setgia_chinh] = React.useState(DuLieuSua.gia_chinh)
    const [gia_giam, setgia_giam] = React.useState(DuLieuSua.gia_giam)

    const [sku, setsku] = React.useState(DuLieuSua.sku)

    const [id_lh, setid_lh] = React.useState(DuLieuSua.id_lh)

    const [noi_dung_chi_tiet, setnoi_dung_chi_tiet] = React.useState(
        DuLieuSua.noi_dung_chi_tiet
    )

    const [thong_so_ky_thuat, setthong_so_ky_thuat] = React.useState(
        DuLieuSua.thong_so_ky_thuat
    )
    //#endregion
    const [so_luong, setso_luong] = React.useState(DuLieuSua.so_luong)
    //#region Image
    const [image01, setImage01] = useState(null);
    const [image02, setImage02] = useState(null);
    const [image03, setImage03] = useState(null);
    const [image04, setImage04] = useState(null);
    const [image05, setImage05] = useState(null);
    const [image06, setImage06] = useState(null);
    const [hoa_hong, sethoa_hong] = useState(DuLieuSua.hoa_hong)

    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const [id_hang, setid_hang] = React.useState()
    // const [trang_thai_don,settrang_thai_don] = React.useState('Chuẩn bị đơn')
    //#region HandleChange
    const handleChange = (e, imageString) => {
        if (e.target.files[0]) {
            if (imageString === 'image_01') {
                setImage_01_180(e.target.files[0]);
            } else if (imageString === 'image_02') {
                setImage_02_180(e.target.files[0]);
            } else if (imageString === 'image_03') {
                setImage_03_180(e.target.files[0]);
            } else if (imageString === 'image_04') {
                setImage_04_180(e.target.files[0]);
            } else if (imageString === 'image_05') {
                setImage_05_180(e.target.files[0]);
            } else if (imageString === 'image_06') {
                setImage_06_180(e.target.files[0]);
            }

        }
    };
    //#endregion

    //#region handleUpload
    const handleUpload = (imageString) => {
        var randomString = makeid(10)
        let image

        if (imageString === 'image_01') {
            image = image_01_180
        } else if (imageString === 'image_02') {
            image = image_02_180
        } else if (imageString === 'image_03') {
            image = image_03_180
        } else if (imageString === 'image_04') {
            image = image_04_180
        } else if (imageString === 'image_05') {
            image = image_05_180
        } else if (imageString === 'image_06') {
            image = image_06_180
        }
        console.log(image)
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
                        console.log(url)
                        if (imageString === 'image_01') {
                            setimage_01(url)
                        } else if (imageString === 'image_02') {
                            setimage_02(url)
                        } else if (imageString === 'image_03') {
                            setimage_03(url)
                        } else if (imageString === 'image_04') {
                            setimage_04(url)
                        } else if (imageString === 'image_05') {
                            setimage_05(url)
                        } else if (imageString === 'image_06') {
                            setimage_06(url)
                        }
                    });
            }
        );
    };
    //#endregion
    //#endregion Image
    // useState


    //#region 
    const [id_don, setid_don] = React.useState(DuLieuSua.id_don)
    const [ten_kh, setten_kh] = React.useState(DuLieuSua.ten_kh)
    const [so_dt, setso_dt] = React.useState(DuLieuSua.so_dt)
    const [dia_chi, setdia_chi] = React.useState(DuLieuSua.dia_chi)
    const [phuong_thuc_thanh_toan, setphuong_thuc_thanh_toan] = React.useState(DuLieuSua.phuong_thuc_thanh_toan)
    const [ghi_chu, setghi_chu] = React.useState(DuLieuSua.ghi_chu)
    const [trang_thai_don, settrang_thai_don] = React.useState(DuLieuSua.trang_thai_don)
    // const [id_don,setid_don] = React.useState(DuLieuSua.id_don)
    // const [id_don,setid_don] = React.useState(DuLieuSua.id_don)
    // const [id_don,setid_don] = React.useState(DuLieuSua.id_don)

    const [DSSanPham, setDSSanPham] = React.useState([])
    //#endregion
    const [DanhSachNhanVien, setDanhSachNhanVien] = React.useState([])
    React.useEffect(async () => {
        try {

            setid_don(DuLieuSua.id_don); setso_dt(DuLieuSua.so_dt)
            setten_kh(DuLieuSua.ten_kh); setdia_chi(DuLieuSua.dia_chi)

            setphuong_thuc_thanh_toan(DuLieuSua.phuong_thuc_thanh_toan);
            setghi_chu(DuLieuSua.ghi_chu)
            settrang_thai_don(DuLieuSua.trang_thai_don)

            const res = await fetch(host.DanhSachNhanVien + `/${DuLieuSua.id_don}`)
            const JsonData = await res.json()

            if (JsonData.status === 1) {
                setDanhSachNhanVien(JsonData.data)
                setDSSanPham(JsonData.dataSP)
            }

        } catch (error) {

        }
    }, [
        DuLieuSua.id_don, DuLieuSua.so_dt,
        DuLieuSua.ten_kh, DuLieuSua.dia_chi,
        DuLieuSua.phuong_thuc_thanh_toan, DuLieuSua.ghi_chu,
        DuLieuSua.trang_thai_don
    ])



    const [chonNguoiChamSoc, setChonNguoiChamSoc] = React.useState('')

    const onClickLuuDuLieu = async () => {
        try {
            if (chonNguoiChamSoc === '') {
                alert('Người dùng chưa chọn người chăm sóc')
            } else {
                // console.log( chonNguoiChamSoc )
                var e = `Chăm sóc khách`
                const res = await fetch(host.ChamSocKhachHang + `/${DuLieuSua.id_don}/${e}`)
                const JsonData = await res.json()

                if (JsonData.status === 1) {
                    alert('Cập nhập thành công!')
                    onClickSua(true)
                }
            }


        } catch (error) {

        }
    }

    const [trang_thai_sua, settrang_thai_sua] = React.useState('')
    const onClickLuuTrangThaiDon = async () => {
        try {
            // console.log( chonNguoiChamSoc )
            // var e = `Chăm sóc khách`
            if (trang_thai_sua === '') {
                console.log(host.ChamSocKhachHang + `/${DuLieuSua.id_don}/${DuLieuSua.trang_thai_don}`)
                const res = await fetch(host.ChamSocKhachHang + `/${DuLieuSua.id_don}/${DuLieuSua.trang_thai_don}`)
                const JsonData = await res.json()

                if (JsonData.status === 1) {
                    onClickSua(true)
                }
            } else {

                console.log(host.ChamSocKhachHang + `/${DuLieuSua.id_don}/${trang_thai_sua}`)
                const res = await fetch(host.ChamSocKhachHang + `/${DuLieuSua.id_don}/${trang_thai_sua}`)
                const JsonData = await res.json()

                if (JsonData.status === 1) {
                    // alert('Cập nhập thành công!')
                    onClickSua(true)
                }

            }

        } catch (error) {
            console.log(error)
        }
    }


    console.log(DSSanPham)
    return (
        <React.Fragment>

            <div>
                {/* Button trigger modal */}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id_don${DuLieuSua.id_don}`}>
                    Sửa
                </button>
                {/* Modal */}
                <div className="modal fade bd-example-modal-lg" id={`id_don${DuLieuSua.id_don}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"> Sửa {id_don} </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <div className="row ">
                                        <div className="col col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">ID_DON</label>
                                                <input type="text"
                                                    className="form-control" id="exampleInputEmail1"
                                                    // value={ten_nganh}
                                                    // onChange={e => setten_hang(e.target.value)}
                                                    disabled={true}
                                                    value={id_don}
                                                    placeholder="sản phẩm" />
                                            </div>
                                        </div>
                                        <div className="col col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Tên khách hàng</label>
                                                <input type="text"
                                                    className="form-control" id="exampleInputEmail1"
                                                    value={ten_kh}
                                                    disabled={true}
                                                // onChange={e => sethoa_hong(e.target.value)}
                                                // placeholder="Hoa Hồng" 

                                                />

                                                {/* {parseInt(hoa_hong).toLocaleString('vi', { style: 'currency', currency: 'VND' })} */}
                                            </div>
                                        </div>

                                    </div>

                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                                            <input type="text"
                                                className="form-control" id="exampleInputEmail1"
                                                // value={ten_nganh}
                                                // onChange={e => setso_luong(e.target.value)}
                                                value={so_dt}
                                                disabled={true}
                                            // placeholder="Số lượng" 
                                            />
                                        </div>
                                        <div className="col col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Phương thức thanh toán</label>
                                                <input type="text"
                                                    className="form-control" id="exampleInputEmail1"
                                                    // value={ten_nganh}
                                                    // onChange={e => setgia_chinh(e.target.value)}
                                                    disabled={true}
                                                    value={phuong_thuc_thanh_toan}
                                                    placeholder="Giá chính" />

                                                {/* {parseInt(gia_chinh).toLocaleString('vi', { style: 'currency', currency: 'VND' })} */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="exampleInputEmail1">Địa chỉ</label>
                                            <textarea type="text"
                                                className="form-control" id="exampleInputEmail1"
                                                // value={ten_nganh}
                                                // onChange={e => setso_luong(e.target.value)}
                                                value={dia_chi}
                                            // disabled={true}
                                            // placeholder="Số lượng" 
                                            />
                                        </div>
                                        <div className="col col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Phương thức thanh toán</label>
                                                <input type="text"
                                                    className="form-control" id="exampleInputEmail1"
                                                    // value={ten_nganh}
                                                    // onChange={e => setgia_chinh(e.target.value)}
                                                    disabled={true}
                                                    value={phuong_thuc_thanh_toan}
                                                    placeholder="Giá chính" />

                                                {/* {parseInt(gia_chinh).toLocaleString('vi', { style: 'currency', currency: 'VND' })} */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="exampleInputEmail1">Ghi chú</label>
                                            <textarea type="text"
                                                className="form-control" id="exampleInputEmail1"
                                                // value={ten_nganh}
                                                // onChange={e => setso_luong(e.target.value)}
                                                value={ghi_chu}
                                            // disabled={true}
                                            // placeholder="Số lượng" 
                                            />
                                        </div>
                                        <div className="col col-sm-6">
                                            <label htmlFor="exampleInputEmail1">Chọn người chăm sóc</label>
                                            <select className='form-control'
                                                onChange={e => setChonNguoiChamSoc(e.target.value)}
                                            // defaultChecked={id_lh}
                                            >
                                                <option value={''}>Chọn danh mục</option>
                                                {DanhSachNhanVien.map((x, index) => (
                                                    <option value={x.ten_nguoi_dung}>{x.ten_nguoi_dung}</option>
                                                )
                                                )}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="row ">
                                        <div className="col col-sm-6">
                                            {/* <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Chọn người chăm sóc</label>
                                                <select className='form-control'
                                                    onChange={e => setid_lh(e.target.value)}
                                                    defaultChecked={id_lh}
                                                >
                                                    <option value={''}>Chọn danh mục</option>
                                                    {LoaiDanhMuc.map((x, index) => (
                                                        <option value={x.id_lh}>{x.ten_loai_hang}</option>
                                                    )
                                                    )}
                                                </select>
                                            </div> */}
                                        </div>

                                        <div className="col col-sm-6">
                                            {/* <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Giá giảm</label>
                                                <input type="text"
                                                    className="form-control" id="exampleInputEmail1"
                                                    // value={ten_nganh}
                                                    onChange={e => setgia_giam(e.target.value)}
                                                    value={gia_giam}
                                                    placeholder="Giá giảm" />

                                            </div> */}
                                        </div>
                                    </div>

                                    {/* <div className="row ">
                                        <label htmlFor="exampleInputEmail1">Nội dung</label>
                                        <textarea
                                            className='form-control'
                                            style={{ height: '500px' }}
                                            onChange={e => setnoi_dung_chi_tiet(e.target.value)}
                                            value={noi_dung_chi_tiet}
                                        ></textarea>
                                    </div>

                                    <div className="row ">
                                        <label htmlFor="exampleInputEmail1">Thông số chi tiết</label>
                                        <textarea
                                            className='form-control'
                                            style={{ height: '500px' }}
                                            onChange={e => setthong_so_ky_thuat(e.target.value)}
                                            value={thong_so_ky_thuat}
                                        ></textarea>
                                    </div> */}

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
                                    <div className='row'>
                                        Trạng thái đơn
                                        <br></br>
                                        <select className='form-control'
                                            // defaultValue={trang_thai_sua}
                                            onChange={e => settrang_thai_sua(e.target.value)}
                                        >
                                            <option value="Chuẩn bị đơn">Chọn trạng thái</option>
                                            {/* <option value="Chăm sóc khách">Chăm sóc khách</option> */}
                                            <option value="Chuẩn bị đơn">Chuẩn bị đơn</option>
                                            <option value="Đang ship">Đang ship</option>
                                            <option value="Thành công">Thành công</option>
                                            {/* <option value="false">Ngưng sử dụng</option> */}
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">Tên hàng</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        DSSanPham.map((x, index) => (
                                            <tr>
                                                <th scope="row">{x.id_don_ct}</th>
                                                <td>{x.ten_hang}</td>
                                                <td>{x.qty}</td>
                                                <td>{x.price}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>

                                <button type="button" className="btn btn-warning"
                                    onClick={() => onClickLuuTrangThaiDon()}
                                >Lưu trạng thái đơn</button>

                                <button type="button" className="btn btn-primary"
                                    onClick={() => onClickLuuDuLieu()}
                                >Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>


    )

}

// Functions
const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export default SuaDonHangSanPham
