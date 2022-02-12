import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import ReactLoading from "react-loading";
import { positions, useAlert } from "react-alert";
import TimeLibrary from "../../../../asset/TimeLibrary";
import Checkbox from "@material-ui/core/Checkbox";
import ChiTietGia from "./ChiTietGia";
import { Link } from "react-router-dom";
import Token from "../../../../storage/Token";
import host from "../../../../service/host";
import Customer from "../../../../storage/Customer";
import { useHistory } from "react-router-dom";
import ThanhDoiImage from '../ThanhDoiImage';
// import Token from '../'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
      // float:'right'
    },
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: "100%",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  hover: {
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.42)",
    },
  },
}));

function DSDangPhatGiaoVan({
  DangPhatGiaoVan,
  UpdateXoaDangPhatGiaoVan,
  UpdateSuaDangPhatGiaoVan,
  onChangePage,
  totalPage,
  page,_onChangeImage,
  onUpdateDangPhatGiaoVan
}) {
  // const [load,setLoad] = React.useState('')
  // <img id="someImage" />
  const history = useHistory();
  function showGetResult(name, idElelemnt) {
    var result = null;
    var URL = name;
  }
  const [load, setLoad] = React.useState(true);
  const classes = useStyles();

  React.useEffect(() => {
    try {
    } catch (error) {}
  }, []);

  const onXoaDangPhatGiaoVan = (e) => {
    UpdateXoaDangPhatGiaoVan(e);
  };
  const onSuaDangPhatGiaoVan = (e) => {
    UpdateSuaDangPhatGiaoVan(e);
  };

  const handleChange = async (event, value) => {
    onChangePage(value);
  };
  const inputPageChange = React.useCallback(async (value) => {
    try {
    } catch (error) {}
  });
  // console.log(DangPhatGiaoVan)

  const onClickDuLieuGioHang = async (e) => {
    try {
      const token = await Token.Token();

      const response = await fetch(host.GioHangKhach + `/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const JsonData = await response.json();
      // console.log(JsonData)
      if (JsonData.status === 1) {
        Customer.setCustomer(JsonData.data);
        // Customer.getCustomer
      } else {
      }
    } catch (error) {}
  };

  const onClickCheckBox = async (x) => {
    try {
    } catch {}
  };

  const onChangeImage = (e)=>{
    _onChangeImage(e)
  }

  const [so_can, setSo_can] = React.useState(0);
  const [so_khoi, setso_khoi] = React.useState(0);
  const onChuyenHangVeKho = React.useCallback(async (stt, id_don) => {
    try {
      // console
      if (stt !== "" && stt !== "Chọn trạng thái") {
        // console(stt,id_don)
        const token = await Token.Token();
        console.log(token);
        const response = await fetch(host.XacNhanTrangThai + `/${id_don}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, stt }),
        });
        // chuyen du lieu sang dang json
        const JsonData = await response.json();
        console.log(JsonData);
        if (JsonData.status === 1) {
          onUpdateDangPhatGiaoVan( id_don )
          history.push("/DangPhatGiaoVan");
          // alert("Cập nhập thành công");
        } else {
          alert("Cập nhập thất bại");
        }
      } else {
        alert("Người dùng chưa chọn trạng thái!");
      }
    } catch (error) {
      console.log(error);
    }
  });

  const onClickCapNhapCanKhoi = async (id_don, so_khoi, so_can) => {
    try {
      const token = await Token.Token();
      const response = await fetch(host.CapNhapTienSoCanSoKhoi + `/${id_don}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ so_khoi, so_can, token }),
      });
      const JsonData = await response.json();

      if (JsonData.status === 1) {
        // alert("Nhập số khối, số cân thành công!");
        console.log(id_don);
        onChuyenHangVeKho("Hàng về kho", id_don);
        setSo_can(0);
        setso_khoi(0);
      } else {
        alert("Nhập không thành công!");
      }
    } catch (error) {}
  };

  return (
    <section className="content">
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <div className="container">
                    <div className="row">
                      {/* <div class="col">
                      Tìm theo tên
                      <input className="form-control"></input>
                      </div>
                   
                      <div class="col">
                      Tìm theo Mã ĐH
                      <input className="form-control"></input>
                      </div>
                      
                      <div class="col">
                      Tìm theo Mã VĐ
                      <input className="form-control"></input>
                      </div>
                      <div class="col">
                        <label hidden={true}>-</label><br></br>
                        <button className="btn btn-primary">Tìm kiếm</button>
                      </div> */}
                      <div class="col">
                        <label hidden={true}>-</label>
                        <br></br>
                        {/* <button className="btn btn-primary" onClick={()=>onClickGopHoaDon()}>Gộp đơn</button> */}
                      </div>
                    </div>
                  </div>
                </h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <Paper className={classes.root} style={{ height: "100vh" }}>
                  <Table
                    className={classes.table}
                    aria-label="simple table"
                    hidden={false}
                  >
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>Chọn</TableCell> */}
                        <TableCell>Hình ảnh</TableCell>
<TableCell>Thay đổi HA</TableCell>
<TableCell>Chi tiet</TableCell>
                        <TableCell>Mã ĐH</TableCell>
                        <TableCell>Mã VĐ</TableCell>
                        <TableCell>Tên KH</TableCell>
                        <TableCell>Nhập cân khối</TableCell>
                        {/* <TableCell>CT giá</TableCell> */}
                        <TableCell>CT sản phẩm</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* 100vh => 10items */}
                      {DangPhatGiaoVan.map((x, index) => (
                        <TableRow
                          hover
                          classes={{ hover: classes.hover }}
                          key={x.id_don}
                        >
                          {/* <TableCell align="left">
                            <Checkbox
                                checked={x.status}
                                onChange={()=>onClickCheckBox(x)}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                          </TableCell> */}
                          <TableCell align="left">
                            <img
                              data-toggle="modal"
                              data-target={`#HinhAnhXuLyDon${index}`}
                              src={x.image}
                              // src={x.image}
                              style={{ width: "50px", height: "50px" }}
                            ></img>
                            <div
                              className="modal fade"
                              id={`HinhAnhXuLyDon${index}`}
                              tabIndex={-1}
                              role="dialog"
                              aria-labelledby="exampleModalLongTitle"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLongTitle"
                                    >
                                      Chi tiết ảnh
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div
                                    className="modal-body"
                                    style={{ width: "100%", height: "500px" }}
                                  >
                                    <img
                                      src={x.image}
                                      style={{ width: "100%", height: "500px" }}
                                    ></img>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Đóng
                                    </button>
                                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <ThanhDoiImage id_don={x.id_don} onChangeImage={onChangeImage}></ThanhDoiImage>
                          </TableCell>
                          <TableCell style={{whiteSpace:'nowrap'}}>
                             Tổng tệ : {parseFloat( x.tong_tien / x.tien_ti_gia )}¥<br></br>
                            Tỉ giá tệ : {parseInt( x.tien_ti_gia ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}/1¥<br></br>
                            Tiền hàng: {parseInt(x.tong_tien === undefined || x.tong_tien === '' || x.tong_tien === null ? 0 : x.tong_tien).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                            Phí nội địa: {parseInt(x.phi_noi_dia === undefined || x.phi_noi_dia === '' || x.phi_noi_dia === null ? 0 : x.phi_noi_dia).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                            <br></br>
                          {/* Tiền cân khối */}
                          Tiền Cân ({x.so_can} KG -- {x.tien_can}đ/1Kg): {parseInt(x.so_can * x.tien_can ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                          Tiền khối ({x.so_khoi} m3 -- { x.tien_khoi }đ/1m3): {parseInt(x.so_khoi * x.tien_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})} <br></br>
                          {/* Tiền cân khối */}
                          Tổng tiền cân khối: { parseInt(x.so_can * x.tien_can + x.so_khoi * x.tien_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                          Thành tiền: {
                              parseInt(
                                (x.tong_tien === undefined || x.tong_tien === '' || x.tong_tien === null ? 0 : x.tong_tien)+
                                (x.phi_noi_dia === undefined || x.phi_noi_dia === '' || x.phi_noi_dia === null ? 0 : x.phi_noi_dia)+
                                (x.phu_phi === undefined || x.phu_phi === '' || x.phu_phi === null ? 0 : x.phu_phi)+
                                (x.phi_dich_vu === undefined || x.phi_dich_vu === '' || x.phi_dich_vu === null ? 0 : x.phi_dich_vu)
                                + parseInt(x.so_can*x.tien_can + x.so_khoi*x.tien_khoi)
                              ).toLocaleString('vi', {style : 'currency', currency : 'VND'})
                          }<br></br>

                            </TableCell>

                          <TableCell>{x.ma_don}</TableCell>
                          <TableCell>{x.van_don !== null ? <>
                              {x.van_don.split('_').map(y=><>
                                {y}<br></br>
                              </>)}
                              </> : <></>}</TableCell>
                          <TableCell>{x.ten_kh}</TableCell>
                          <TableCell>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target={`#NhapSoKhoiCan${x.id_don}`}
                            >
                              Nhập
                            </button>

                            <div
                              className="modal fade"
                              id={`NhapSoKhoiCan${x.id_don}`}
                              tabIndex={-1}
                              role="dialog"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Tiền cân khối ({x.id_don})
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <label>Mã đơn hàng</label>
                                    <br></br>
                                    {x.ma_don}
                                    <br></br>
                                    <label>Mã vân đơn</label>
                                    <br></br>
                                    {x.van_don}
                                    <br></br>
                                    Số cân
                                    <div className="row">
                                      <input
                                        className="form-control"
                                        value={so_can}
                                        onChange={(e) =>
                                          setSo_can(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="row">
                                      Số khối
                                      <input
                                        className="form-control"
                                        value={so_khoi}
                                        onChange={(e) =>
                                          setso_khoi(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-dismiss="modal"
                                      onClick={(e) => {
                                        var id_don = x.id_don;
                                        onClickCapNhapCanKhoi(
                                          id_don,
                                          so_khoi,
                                          so_can
                                        );
                                      }}
                                    >
                                      Lưu
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          {/* <TableCell align="left">
                                <ChiTietGia dl={x}></ChiTietGia>
                          </TableCell> */}

                          <TableCell align="left">
                            <Link
                              className="btn btn-warning btn-sm"
                              to={`/ChiTietDonHang?stt=Đang phát giao vận&id_don_hang=${x.id_don}&id_kh=${x.id_kh}`}
                            >
                              <i className="fa fa-eye"></i>Xem
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
                <div className={classes.root}>
                  <Typography
                    style={{ color: "black" }}
                    style={{
                      textAlign: "center",
                      position: "relative",
                      float: "right",
                      marginRight: "100px",
                    }}
                  >
                    Trang:{" "}
                    <input
                      value={page}
                      style={{ width: "40px" }}
                      onChange={(e) =>
                        inputPageChange(
                          e.target.value === NaN
                            ? parseInt(1)
                            : parseInt(e.target.value)
                        )
                      }
                    ></input>{" "}
                    / {totalPage}
                  </Typography>
                </div>
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handleChange}
                  style={{
                    textAlign: "center",
                    position: "relative",
                    float: "right",
                    marginLeft: "100px",
                  }}
                />
              </div>
              {/* /.card-body */}
            </div>
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}
    </section>
  );
}

export default DSDangPhatGiaoVan;
