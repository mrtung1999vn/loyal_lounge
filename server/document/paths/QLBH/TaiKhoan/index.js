var url="https://dantri.com.vn/"
var Class ="news-item__content"


const POST_DSTaiKhoan = {
    post: {
      tags: ['Tài khoản'],
      description: `
      [POST] /DSTaiKhoan \n
        Tham số truyền vào token\n
        const {token} = req.body
      `,
      operationId: '/DSTaiKhoan',
      parameters: [url,Class],
      requestBody: {
        content: {
          'application/json': {
          //   schema: {
          //     $ref: '#/CrawItemClass'
          //   }
          }
        },
        required: true
      },
      responses: {
        '200': {
          description: `Dữ liệu trả về`,
          content: {
            'application/json': {
              // schema: {
              //   $ref: '#/components/schemas/Error'
              // },
              example: {
                status: 1,
                data: [{id_tk:"",tai_khoan:"",mat_khau:"",ngay:"",trangthai:"",ten_khach:"",loai_tk:"",vi_tien:1}],
                mesage : "Thành công"
              }
            }
          }
        },
        '404': {
          description: '404 Not found',
          content: {
            'application/json': {
              // schema: {
              //   $ref: '#/components/schemas/Error'
              // },
              example: {
                  status: 0,
                  message : "Hết phiên thao tác người dùng",
                  data: []
                }
            }
          }
        }
      }
    },
  }

  const POST_DSTaiKhoan_ThemTaiKhoan = {
    post: {
      tags: ['Tài khoản'],
      description: `
      [POST] /DSTaiKhoan/ThemTaiKhoan \n
        Tham số truyền vào token\n
        const {token} = req.body\n
        
        Giá trị tham số truyền để thêm\n
        const {tai_khoan,mat_khau,ngay,ten_khach,loai_tk,vi_tien,email} = req.body  
      `,
      operationId: '/DSTaiKhoan/ThemTaiKhoan',
      parameters: [url,Class],
      requestBody: {
        content: {
          'application/json': {
          //   schema: {
          //     $ref: '#/CrawItemClass'
          //   }
          }
        },
        required: true
      },
      responses: {
        '200': {
          description: `Dữ liệu trả về`,
          content: {
            'application/json': {
              // schema: {
              //   $ref: '#/components/schemas/Error'
              // },
              example: {
                status: 1,
                data: [{id_tk:"",tai_khoan:"",mat_khau:"",ngay:"",trangthai:"",ten_khach:"",loai_tk:"",vi_tien:1}],
                mesage : "Thành công"
              }
            }
          }
        },
        '404': {
          description: '404 Not found',
          content: {
            'application/json': {
              // schema: {
              //   $ref: '#/components/schemas/Error'
              // },
              example: {
                  status: 0,
                  message : "Hết phiên thao tác người dùng",
                  data: []
                }
            }
          }
        }
      }
    },
  }

  const PUT_DSTaiKhoan_SuaTaiKhoan = {
    put: {
      tags: ['Tài khoản'],
      description: `
      [PUT] /DSTaiKhoan/SuaTaiKhoan \n
        Tham số truyền vào token\n
        const {token} = req.body\n
        
        Giá trị tham số truyền để chỉnh sửa\n
        const {tai_khoan,mat_khau,ngay,ten_khach,loai_tk,vi_tien,email} = req.body  
      `,
      operationId: '/DSTaiKhoan/SuaTaiKhoan',
      parameters: [url,Class],
      requestBody: {
        content: {
          'application/json': {
          //   schema: {
          //     $ref: '#/CrawItemClass'
          //   }
          }
        },
        required: true
      },
      responses: {
        '200': {
          description: `Dữ liệu trả về`,
          content: {
            'application/json': {
              // schema: {
              //   $ref: '#/components/schemas/Error'
              // },
              example: {
                status: 1,
                data: [{id_tk:"",tai_khoan:"",mat_khau:"",ngay:"",trangthai:"",ten_khach:"",loai_tk:"",vi_tien:1}],
                mesage : "Thành công"
              }
            }
          }
        },
        '404': {
          description: '404 Not found',
          content: {
            'application/json': {
              // schema: {
              //   $ref: '#/components/schemas/Error'
              // },
              example: {
                  status: 0,
                  message : "Hết phiên thao tác người dùng",
                  data: []
                }
            }
          }
        }
      }
    },
  }

  const DELETE_DSTaiKhoan_XoaTaiKhoan = {
    delete: {
      tags: ['Tài khoản'],
      description: `
      [DELETE] /DSTaiKhoan/XoaTaiKhoan \n
        Tham số truyền vào token\n
        const {token} = req.body\n
        
        Giá trị tham số truyền để chỉnh sửa\n
        const {tai_khoan} = req.body  
      `,
      operationId: '/DSTaiKhoan/XoaTaiKhoan',
      parameters: [url,Class],
      requestBody: {
        content: {
          'application/json': {
          //   schema: {
          //     $ref: '#/CrawItemClass'
          //   }
          }
        },
        required: true
      },
      responses: {
        '200': {
          description: `Dữ liệu trả về`,
          content: {
            'application/json': {
              // schema: {
              //   $ref: '#/components/schemas/Error'
              // },
              example: {
                status: 1,
                data: "<str> tai_khoan",
                mesage : "Thành công"
              }
            }
          }
        },
        '404': {
          description: '404 Not found',
          content: {
            'application/json': {
              // schema: {
              //   $ref: '#/components/schemas/Error'
              // },
              example: {
                  status: 0,
                  message : "Hết phiên thao tác người dùng",
                  data: []
                }
            }
          }
        }
      }
    },
  }

  
module.exports = {
    POST_DSTaiKhoan,POST_DSTaiKhoan_ThemTaiKhoan,PUT_DSTaiKhoan_SuaTaiKhoan,DELETE_DSTaiKhoan_XoaTaiKhoan
}