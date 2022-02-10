var host = "http://127.0.0.1:3007"

const tags = require('./tags')
const QLBH = require('./paths/QLBH')
module.exports = {
    openapi: '3.0.1',
    info: {
      version: '1.0.0',
      title: 'API bán hàng',
      description: `Các API bán hàng\n
      1. Token\n
      2. Tài khoản\n
      3. Ngành hàng\n
      4. Loại hàng\n
      5. Mặt hàng\n
      5. Đơn hàng\n
      `,
    //   termsOfService: 'http://api_url/terms/',
    //   contact: {
    //     name: 'Wolox Team',
    //     email: 'hello@wolox.co',
    //     url: 'https://www.wolox.com.ar/'
    //   },
    //   license: {
    //     name: 'Apache 2.0',
    //     url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    //   }
    },
    servers: [
      {
        url: host,
        description: 'Local server'
      },
    ],
    security: [
      {
        ApiKeyAuth: []
      }
    ],
    tags: tags,
    paths: QLBH,
    
    
    
    
    
    
    // components: {
    //   schemas: {
    //     identificationNumber: {
    //       type: 'integer',
    //       description: 'User identification number',
    //       example: 1234
    //     },
    //     username: {
    //       type: 'string',
    //       example: 'raparicio'
    //     },
    //     userType: {
    //       type: 'string',
    //       enum: 1,
    //       default: 1
    //     },
    //     companyId: {
    //       type: 'integer',
    //       description: 'Company id where the user works',
    //       example: 15
    //     },
    //     User: {
    //       type: 'object',
    //       properties: {
    //         identificationNumber: {
    //           $ref: '#/components/schemas/identificationNumber'
    //         },
    //         username: {
    //           $ref: '#/components/schemas/username'
    //         },
    //         userType: {
    //           $ref: '#/components/schemas/userType'
    //         },
    //         companyId: {
    //           $ref: '#/components/schemas/companyId'
    //         }
    //       }
    //     },
    //     Users: {
    //       type: 'object',
    //       properties: {
    //         users: {
    //           type: 'array',
    //           items: {
    //             $ref: '#/components/schemas/User'
    //           }
    //         }
    //       }
    //     },
    //     Error: {
    //       type: 'object',
    //       properties: {
    //         message: {
    //           type: 'string'
    //         },
    //         internal_code: {
    //           type: 'string'
    //         }
    //       }
    //     }
    //   },
    //   securitySchemes: {
    //     ApiKeyAuth: {
    //       type: 'apiKey',
    //       in: 'header',
    //       name: 'x-api-key'
    //     }
    //   }
    // }
}