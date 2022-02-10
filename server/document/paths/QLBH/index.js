const { link } = require("fs")
const TaiKhoan = require("./TaiKhoan")
const Token = require("./Token")

var url="https://dantri.com.vn/"
var Class ="news-item__content"

module.exports = {
    "/Token" :Token.Get_Token,
    "/DSTaiKhoan" : TaiKhoan.POST_DSTaiKhoan,
    "/DSTaiKhoan/ThemTaiKhoan" : TaiKhoan.POST_DSTaiKhoan_ThemTaiKhoan,
    "/DSTaiKhoan/SuaTaiKhoan" : TaiKhoan.PUT_DSTaiKhoan_SuaTaiKhoan,
    "/DSTaiKhoan/XoaTaiKhoan" : TaiKhoan.DELETE_DSTaiKhoan_XoaTaiKhoan



  }