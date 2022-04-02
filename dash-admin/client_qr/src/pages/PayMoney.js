import React from 'react'
import func from '../asset/func'
import host from '../service/host'
import AddPayMoney from './PayMoney/AddPayMoney'
import ListPayMoney from './PayMoney/ListPayMoney'

function PayMoney() {

  const [ListDataPayMoney, setListDataPayMoney] = React.useState([])
  const [ListTypePayMoney, setListTypePayMoney] = React.useState([])

  const [chooseTypePayMoney, setChooseTypePayMoney] = React.useState('')


  const handleAddPayMoney = async () => {
    try {
      console.log(host.WebDashDanhSachPayMoney)
      const res = await fetch(host.WebDashDanhSachPayMoney)
      const content = await res.json()

      if (content.status === 1) {
        setListDataPayMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypePayMoney( func.DecodeJson_RESPONSE(content.dataTypePayMoney) )
      }
    } catch (error) {

    }
  }

  const onHandleEdit = async () => {
    try {
      console.log(host.WebDashDanhSachPayMoney)
      const res = await fetch(host.WebDashDanhSachPayMoney)
      const content = await res.json()

      if (content.status === 1) {
        setListDataPayMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypePayMoney( func.DecodeJson_RESPONSE(content.dataTypePayMoney) )
      }
    } catch (error) {

    }
  }

  const onHandleDelete = async () => {
    try {
      console.log(host.WebDashDanhSachPayMoney)
      const res = await fetch(host.WebDashDanhSachPayMoney)
      const content = await res.json()

      if (content.status === 1) {
        setListDataPayMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypePayMoney( func.DecodeJson_RESPONSE(content.dataTypePayMoney) )
      }
    } catch (error) {

    }
  }

  const handleChangeTypePayMoney = async (e)=>{
    try {
      // console.log( e.value )
      
      const res = await fetch(host.WebDashDanhSachPayMoney + `/TypePayMoney/${e.value}`)
      const content = await res.json()


      if(content.status === 1){
        setChooseTypePayMoney( e.value )
        setListDataPayMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypePayMoney( func.DecodeJson_RESPONSE(content.dataTypePayMoney) )
      }

    } catch (error) {
      
    }
  }

  React.useEffect(async () => {
    try {
      const res = await fetch(host.WebDashDanhSachPayMoney)
      const content = await res.json()
      console.log(content)
      if (content.status === 1) {
        setListDataPayMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypePayMoney( func.DecodeJson_RESPONSE(content.dataTypePayMoney) )
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  // console.log( "ListTypePayMoney" )
  console.log( ListDataPayMoney )

  return (
    <>
      <div className="main_content_iner overly_inner">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="white_box_tittle">
                    <h4>Rút tiền</h4>
                  </div>
                </div>
                <AddPayMoney 
                chooseTypePayMoney={chooseTypePayMoney}
                handleAddPayMoney={handleAddPayMoney}
                 ListTypePayMoney={ListTypePayMoney} 
                 handleChangeTypePayMoney={handleChangeTypePayMoney}
                 ></AddPayMoney>
              </div>
            </div>
            <div className="col-xl-4">
            </div>
            <div className="col-lg-12">
              <ListPayMoney ListDataPayMoney={ListDataPayMoney} onHandleEdit={onHandleEdit}
               ListTypePayMoney={ListTypePayMoney} 
              onHandleDelete={onHandleDelete}
              handleChangeTypePayMoney={handleChangeTypePayMoney}
              ></ListPayMoney>
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

export default PayMoney