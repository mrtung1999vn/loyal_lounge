var url="https://dantri.com.vn/"
var Class ="news-item__content"


const Get_Token = {
    get: {
      tags: ['Token'],
      description: `
      [GET] /Token/:key \n
        Truyền tham số key trả về token
      `,
      operationId: 'Token',
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
                data: "<string>",
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
    Get_Token
}