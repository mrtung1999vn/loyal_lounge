import React from 'react'
import func from '../asset/func'
import host from '../service/host'
import AddBooking from './Booking/AddBooking'
import ListBooking from './Booking/ListBooking'

function Booking() {

  const [ListDataBooking, setListDataBooking] = React.useState([])
  const [ListTypeBooking, setListTypeBooking] = React.useState([])

  const [chooseTypeBooking, setChooseTypeBooking] = React.useState('')


  const handleAddBooking = async () => {
    try {
      console.log(host.WebDashDanhSachBooking)
      const res = await fetch(host.WebDashDanhSachBooking)
      const content = await res.json()

      if (content.status === 1) {
        setListDataBooking( func.DecodeJson_RESPONSE(content.data) )
        setListTypeBooking( func.DecodeJson_RESPONSE(content.dataTypeBooking) )
      }
    } catch (error) {

    }
  }

  const onHandleEdit = async () => {
    try {
      console.log(host.WebDashDanhSachBooking)
      const res = await fetch(host.WebDashDanhSachBooking)
      const content = await res.json()

      if (content.status === 1) {
        setListDataBooking( func.DecodeJson_RESPONSE(content.data) )
        setListTypeBooking( func.DecodeJson_RESPONSE(content.dataTypeBooking) )
      }
    } catch (error) {

    }
  }

  const onHandleDelete = async () => {
    try {
      console.log(host.WebDashDanhSachBooking)
      const res = await fetch(host.WebDashDanhSachBooking)
      const content = await res.json()

      if (content.status === 1) {
        setListDataBooking( func.DecodeJson_RESPONSE(content.data) )
        setListTypeBooking( func.DecodeJson_RESPONSE(content.dataTypeBooking) )
      }
    } catch (error) {

    }
  }

  const handleChangeTypeBooking = async (e)=>{
    try {
      // console.log( e.value )
      if(e.value === ''  ){
        getDataBooking()
      }else{
        const res = await fetch(host.WebDashDanhSachBooking + `/TypeBooking/${e.value}`)
        const content = await res.json()
  
  
        if(content.status === 1){
          setChooseTypeBooking( e.value )
          setListDataBooking( func.DecodeJson_RESPONSE(content.data) )
          setListTypeBooking( func.DecodeJson_RESPONSE(content.dataTypeBooking) )
        } 
      }


    } catch (error) {
      
    }
  }


  const onHandleOnClickSuKien = async (e)=>{
      try {
        console.log( e )
          const res = await fetch(host.WebDashDanhSachBookingTheoSuKien + `/${e.value}`)

          const content = await res.json()

          if(content.status === 1){
            // setChooseTypeBooking( e.value )
            setListDataBooking( func.DecodeJson_RESPONSE(content.data) )
            setListTypeBooking( func.DecodeJson_RESPONSE(content.dataTypeBooking) )
          }
      } catch (error) {
          
      }
  }

  const getDataBooking = async( )=>{
    try {
        const res = await fetch(host.WebDashDanhSachBooking)
        const content = await res.json()
        console.log(content)
        if (content.status === 1) {
          setListDataBooking( func.DecodeJson_RESPONSE(content.data) )
          setListTypeBooking( func.DecodeJson_RESPONSE(content.dataTypeBooking) )
        }
      } catch (error) {
        console.log(error)
      }
  }
  const onClickLoadForm = ()=>{
    getDataBooking()
  }
  React.useEffect(async () => {
    try {
        getDataBooking()
    } catch (error) {
      console.log(error)
    }
  }, [])

  // console.log( "ListTypeBooking" )
  console.log( ListDataBooking )

  return (
    <>
      <div className="main_content_iner overly_inner">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="white_box_tittle">
                    <h4>Booking</h4>
                  </div>
                </div>
                <AddBooking 
                onHandleOnClickSuKien={onHandleOnClickSuKien}
                onClickLoadForm={onClickLoadForm}
                chooseTypeBooking={chooseTypeBooking}
                handleAddBooking={handleAddBooking}
                 ListTypeBooking={ListTypeBooking} 
                 handleChangeTypeBooking={handleChangeTypeBooking}
                 ></AddBooking>
              </div>
            </div>
            <div className="col-xl-4">
            </div>
            <div className="col-lg-12">
              <ListBooking ListDataBooking={ListDataBooking} onHandleEdit={onHandleEdit}
               ListTypeBooking={ListTypeBooking} 
              onHandleDelete={onHandleDelete}
              handleChangeTypeBooking={handleChangeTypeBooking}
              ></ListBooking>
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

export default Booking