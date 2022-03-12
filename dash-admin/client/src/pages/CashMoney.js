import React from 'react'
import func from '../asset/func'
import host from '../service/host'
import AddCashMoney from './CashMoney/AddCashMoney'
import ListCashMoney from './CashMoney/ListCashMoney'

function CashMoney() {

  const [ListDataCashMoney, setListDataCashMoney] = React.useState([])
  const [ListTypeCashMoney, setListTypeCashMoney] = React.useState([])

  const [chooseTypeCashMoney, setChooseTypeCashMoney] = React.useState('')


  const handleAddCashMoney = async () => {
    try {
      console.log(host.WebDashDanhSachCashMoney)
      const res = await fetch(host.WebDashDanhSachCashMoney)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCashMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypeCashMoney( func.DecodeJson_RESPONSE(content.dataTypeCashMoney) )
      }
    } catch (error) {

    }
  }

  const onHandleEdit = async () => {
    try {
      console.log(host.WebDashDanhSachCashMoney)
      const res = await fetch(host.WebDashDanhSachCashMoney)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCashMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypeCashMoney( func.DecodeJson_RESPONSE(content.dataTypeCashMoney) )
      }
    } catch (error) {

    }
  }

  const onHandleDelete = async () => {
    try {
      console.log(host.WebDashDanhSachCashMoney)
      const res = await fetch(host.WebDashDanhSachCashMoney)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCashMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypeCashMoney( func.DecodeJson_RESPONSE(content.dataTypeCashMoney) )
      }
    } catch (error) {

    }
  }

  const handleChangeTypeCashMoney = async (e)=>{
    try {
      // console.log( e.value )
      
      const res = await fetch(host.WebDashDanhSachCashMoney + `/TypeCashMoney/${e.value}`)
      const content = await res.json()


      if(content.status === 1){
        setChooseTypeCashMoney( e.value )
        setListDataCashMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypeCashMoney( func.DecodeJson_RESPONSE(content.dataTypeCashMoney) )
      }

    } catch (error) {
      
    }
  }

  React.useEffect(async () => {
    try {
      const res = await fetch(host.WebDashDanhSachCashMoney)
      const content = await res.json()
      console.log(content)
      if (content.status === 1) {
        setListDataCashMoney( func.DecodeJson_RESPONSE(content.data) )
        setListTypeCashMoney( func.DecodeJson_RESPONSE(content.dataTypeCashMoney) )
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  // console.log( "ListTypeCashMoney" )
  console.log( ListDataCashMoney )

  return (
    <>
      <div className="main_content_iner overly_inner">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="white_box_tittle">
                    <h4>Nạp tiền</h4>
                  </div>
                </div>
                <AddCashMoney 
                chooseTypeCashMoney={chooseTypeCashMoney}
                handleAddCashMoney={handleAddCashMoney}
                 ListTypeCashMoney={ListTypeCashMoney} 
                 handleChangeTypeCashMoney={handleChangeTypeCashMoney}
                 ></AddCashMoney>
              </div>
            </div>
            <div className="col-xl-4">
            </div>
            <div className="col-lg-12">
              <ListCashMoney ListDataCashMoney={ListDataCashMoney} onHandleEdit={onHandleEdit}
               ListTypeCashMoney={ListTypeCashMoney} 
              onHandleDelete={onHandleDelete}
              handleChangeTypeCashMoney={handleChangeTypeCashMoney}
              ></ListCashMoney>
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

export default CashMoney