import React from 'react'
import func from '../asset/func'
import host from '../service/host'
import AddCart from './Cart/AddCart'
import ListCart from './Cart/ListCart'

function Cart() {

  const [ListDataCart, setListDataCart] = React.useState([])
  const [ListTypeCart, setListTypeCart] = React.useState([])

  const [chooseTypeCart, setChooseTypeCart] = React.useState('')


  const handleAddCart = async () => {
    try {
      console.log(host.WebDashDanhSachCart)
      const res = await fetch(host.WebDashDanhSachCart)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCart( func.DecodeJson_RESPONSE(content.data) )
        setListTypeCart( func.DecodeJson_RESPONSE(content.dataTypeCart) )
      }
    } catch (error) {

    }
  }

  const onHandleEdit = async () => {
    try {
      console.log(host.WebDashDanhSachCart)
      const res = await fetch(host.WebDashDanhSachCart)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCart( func.DecodeJson_RESPONSE(content.data) )
        setListTypeCart( func.DecodeJson_RESPONSE(content.dataTypeCart) )
      }
    } catch (error) {

    }
  }

  const onHandleDelete = async () => {
    try {
      console.log(host.WebDashDanhSachCart)
      const res = await fetch(host.WebDashDanhSachCart)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCart( func.DecodeJson_RESPONSE(content.data) )
        setListTypeCart( func.DecodeJson_RESPONSE(content.dataTypeCart) )
      }
    } catch (error) {

    }
  }

  const handleChangeTypeCart = async (e)=>{
    try {
      // console.log( e.value )
      if(e.value === ''  ){
        getDataCart()
      }else{
        const res = await fetch(host.WebDashDanhSachCart + `/TypeCart/${e.value}`)
        const content = await res.json()
  
  
        if(content.status === 1){
          setChooseTypeCart( e.value )
          setListDataCart( func.DecodeJson_RESPONSE(content.data) )
          setListTypeCart( func.DecodeJson_RESPONSE(content.dataTypeCart) )
        }
      }


    } catch (error) {
      
    }
  }


  const onHandleOnClickSuKien = async (e)=>{
      try {
        console.log( e )
          const res = await fetch(host.WebDashDanhSachCartTheoSuKien + `/${e.value}`)

          const content = await res.json()

          if(content.status === 1){
            // setChooseTypeCart( e.value )
            setListDataCart( func.DecodeJson_RESPONSE(content.data) )
            setListTypeCart( func.DecodeJson_RESPONSE(content.dataTypeCart) )
          }
      } catch (error) {
          
      }
  }

  const getDataCart = async( )=>{
    try {
        const res = await fetch(host.WebDashDanhSachCart)
        const content = await res.json()
        console.log(content)
        if (content.status === 1) {
          setListDataCart( func.DecodeJson_RESPONSE(content.data) )
          setListTypeCart( func.DecodeJson_RESPONSE(content.dataTypeCart) )
        }
      } catch (error) {
        console.log(error)
      }
  }

  const onHandleChangeType = async ()=>{
    getDataCart()
  }

  const onHandleChooseCheck = async(e)=>{
    try {
        // console.log(e.value )
        if( e.value !== '' ){
          const res = await fetch(host.ChooseCheckDon + `/${e.value}`)
          const content = await res.json()

          console.log(  content )
          if( content.status === 1 ){
            // console.log( func.DecodeJson_RESPONSE(content.data) )
            setListDataCart( func.DecodeJson_RESPONSE(content.data) )
          }else{
            
          }
        }

    } catch (error) {
      
    }
  }
  
  React.useEffect(async () => {
    try {
        getDataCart()
    } catch (error) {
      console.log(error)
    }
  }, [])

  // console.log( "ListTypeCart" )
  console.log( ListDataCart )

  return (
    <>
      <div className="main_content_iner overly_inner">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="white_box_tittle">
                    <h4>Cart</h4>
                  </div>
                </div>
                <AddCart 
                onHandleOnClickSuKien={onHandleOnClickSuKien}
                chooseTypeCart={chooseTypeCart}
                handleAddCart={handleAddCart}
                 ListTypeCart={ListTypeCart} 
                 handleChangeTypeCart={handleChangeTypeCart}
                 onHandleChooseCheck={onHandleChooseCheck}
                 onHandleChangeType={onHandleChangeType}
                 ></AddCart>
              </div>
            </div>
            <div className="col-xl-4">
            </div>
            <div className="col-lg-12">
              <ListCart ListDataCart={ListDataCart} onHandleEdit={onHandleEdit}
              onHandleChangeType={onHandleChangeType}
               ListTypeCart={ListTypeCart} 
              onHandleDelete={onHandleDelete}
              handleChangeTypeCart={handleChangeTypeCart}
              ></ListCart>
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

export default Cart