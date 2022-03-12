import React from 'react'
import func from '../asset/func'
import host from '../service/host'
import AddProduct from './Product/AddProduct'
import ListProduct from './Product/ListProduct'

function Product() {

  const [ListDataProduct, setListDataProduct] = React.useState([])
  const [ListTypeProduct, setListTypeProduct] = React.useState([])

  const [chooseTypeProduct, setChooseTypeProduct] = React.useState('')


  const handleAddProduct = async () => {
    try {
      console.log(host.WebDashDanhSachProduct)
      const res = await fetch(host.WebDashDanhSachProduct)
      const content = await res.json()

      if (content.status === 1) {
        setListDataProduct( func.DecodeJson_RESPONSE(content.data) )
        setListTypeProduct( func.DecodeJson_RESPONSE(content.dataTypeProduct) )
      }
    } catch (error) {

    }
  }

  const onHandleEdit = async () => {
    try {
      console.log(host.WebDashDanhSachProduct)
      const res = await fetch(host.WebDashDanhSachProduct)
      const content = await res.json()

      if (content.status === 1) {
        setListDataProduct( func.DecodeJson_RESPONSE(content.data) )
        setListTypeProduct( func.DecodeJson_RESPONSE(content.dataTypeProduct) )
      }
    } catch (error) {

    }
  }

  const onHandleDelete = async () => {
    try {
      console.log(host.WebDashDanhSachProduct)
      const res = await fetch(host.WebDashDanhSachProduct)
      const content = await res.json()

      if (content.status === 1) {
        setListDataProduct( func.DecodeJson_RESPONSE(content.data) )
        setListTypeProduct( func.DecodeJson_RESPONSE(content.dataTypeProduct) )
      }
    } catch (error) {

    }
  }

  const handleChangeTypeProduct = async (e)=>{
    try {
      // console.log( e.value )
      
      const res = await fetch(host.WebDashDanhSachProduct + `/TypeProduct/${e.value}`)
      const content = await res.json()


      if(content.status === 1){
        setChooseTypeProduct( e.value )
        setListDataProduct( func.DecodeJson_RESPONSE(content.data) )
        setListTypeProduct( func.DecodeJson_RESPONSE(content.dataTypeProduct) )
      }

    } catch (error) {
      
    }
  }

  React.useEffect(async () => {
    try {
      const res = await fetch(host.WebDashDanhSachProduct)
      const content = await res.json()
      console.log(content)
      if (content.status === 1) {
        setListDataProduct( func.DecodeJson_RESPONSE(content.data) )
        setListTypeProduct( func.DecodeJson_RESPONSE(content.dataTypeProduct) )
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  // console.log( "ListTypeProduct" )
  // console.log( ListTypeProduct )

  return (
    <>
      <div className="main_content_iner overly_inner">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="white_box_tittle">
                    <h4>Product</h4>
                  </div>
                </div>
                <AddProduct 
                chooseTypeProduct={chooseTypeProduct}
                handleAddProduct={handleAddProduct}
                 ListTypeProduct={ListTypeProduct} 
                 handleChangeTypeProduct={handleChangeTypeProduct}
                 ></AddProduct>
              </div>
            </div>
            <div className="col-xl-4">
            </div>
            <div className="col-lg-12">
              <ListProduct ListDataProduct={ListDataProduct} onHandleEdit={onHandleEdit}
               ListTypeProduct={ListTypeProduct} 
              onHandleDelete={onHandleDelete}
              handleChangeTypeProduct={handleChangeTypeProduct}
              ></ListProduct>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_part">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer_iner text-center">
                <p>
                  2022 © Influence - Designed by
                  <a href="#"> <i className="ti-heart" /> </a><a href="#"></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>



  )
}

export default Product