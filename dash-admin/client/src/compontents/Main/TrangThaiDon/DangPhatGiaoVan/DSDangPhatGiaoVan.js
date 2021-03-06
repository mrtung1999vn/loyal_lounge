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
      if (stt !== "" && stt !== "Ch???n tr???ng th??i") {
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
          // alert("C???p nh???p th??nh c??ng");
        } else {
          alert("C???p nh???p th???t b???i");
        }
      } else {
        alert("Ng?????i d??ng ch??a ch???n tr???ng th??i!");
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
        // alert("Nh???p s??? kh???i, s??? c??n th??nh c??ng!");
        console.log(id_don);
        onChuyenHangVeKho("H??ng v??? kho", id_don);
        setSo_can(0);
        setso_khoi(0);
      } else {
        alert("Nh???p kh??ng th??nh c??ng!");
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
                      T??m theo t??n
                      <input className="form-control"></input>
                      </div>
                   
                      <div class="col">
                      T??m theo M?? ??H
                      <input className="form-control"></input>
                      </div>
                      
                      <div class="col">
                      T??m theo M?? V??
                      <input className="form-control"></input>
                      </div>
                      <div class="col">
                        <label hidden={true}>-</label><br></br>
                        <button className="btn btn-primary">T??m ki???m</button>
                      </div> */}
                      <div class="col">
                        <label hidden={true}>-</label>
                        <br></br>
                        {/* <button className="btn btn-primary" onClick={()=>onClickGopHoaDon()}>G???p ????n</button> */}
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
                        {/* <TableCell>Ch???n</TableCell> */}
                        <TableCell>H??nh ???nh</TableCell>
<TableCell>Thay ?????i HA</TableCell>
<TableCell>Chi tiet</TableCell>
                        <TableCell>M?? ??H</TableCell>
                        <TableCell>M?? V??</TableCell>
                        <TableCell>T??n KH</TableCell>
                        <TableCell>Nh???p c??n kh???i</TableCell>
                        {/* <TableCell>CT gi??</TableCell> */}
                        <TableCell>CT s???n ph???m</TableCell>
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
                                      Chi ti???t ???nh
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">??</span>
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
                                      ????ng
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
                             T???ng t??? : {parseFloat( x.tong_tien / x.tien_ti_gia )}??<br></br>
                            T??? gi?? t??? : {parseInt( x.tien_ti_gia ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}/1??<br></br>
                            Ti???n h??ng: {parseInt(x.tong_tien === undefined || x.tong_tien === '' || x.tong_tien === null ? 0 : x.tong_tien).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                            Ph?? n???i ?????a: {parseInt(x.phi_noi_dia === undefined || x.phi_noi_dia === '' || x.phi_noi_dia === null ? 0 : x.phi_noi_dia).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                            <br></br>
                          {/* Ti???n c??n kh???i */}
                          Ti???n C??n ({x.so_can} KG -- {x.tien_can}??/1Kg): {parseInt(x.so_can * x.tien_can ).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                          Ti???n kh???i ({x.so_khoi} m3 -- { x.tien_khoi }??/1m3): {parseInt(x.so_khoi * x.tien_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})} <br></br>
                          {/* Ti???n c??n kh???i */}
                          T???ng ti???n c??n kh???i: { parseInt(x.so_can * x.tien_can + x.so_khoi * x.tien_khoi).toLocaleString('vi', {style : 'currency', currency : 'VND'})}<br></br>
                          Th??nh ti???n: {
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
                              Nh???p
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
                                      Ti???n c??n kh???i ({x.id_don})
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">??</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <label>M?? ????n h??ng</label>
                                    <br></br>
                                    {x.ma_don}
                                    <br></br>
                                    <label>M?? v??n ????n</label>
                                    <br></br>
                                    {x.van_don}
                                    <br></br>
                                    S??? c??n
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
                                      S??? kh???i
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
                                      L??u
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
                              to={`/ChiTietDonHang?stt=??ang ph??t giao v???n&id_don_hang=${x.id_don}&id_kh=${x.id_kh}`}
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
