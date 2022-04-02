import React from 'react'
import func from '../asset/func'
import host from '../service/host'
import AddCustomer from './Customer/AddCustomer'
import ListCustomer from './Customer/ListCustomer'

function Customer() {

  const [ListDataCustomer, setListDataCustomer] = React.useState([])

  const handleAddCustomer = async () => {
    try {
      console.log(host.WebDashDanhSachCustomer)
      const res = await fetch(host.WebDashDanhSachCustomer)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCustomer(func.DecodeJson_RESPONSE(content.data))
      }
    } catch (error) {

    }
  }

  const onHandleEdit = async () => {
    try {
      console.log(host.WebDashDanhSachCustomer)
      const res = await fetch(host.WebDashDanhSachCustomer)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCustomer(func.DecodeJson_RESPONSE(content.data))
      }
    } catch (error) {

    }
  }

  const onHandleDelete = async () => {
    try {
      console.log(host.WebDashDanhSachCustomer)
      const res = await fetch(host.WebDashDanhSachCustomer)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCustomer(func.DecodeJson_RESPONSE(content.data))
      }
    } catch (error) {

    }
  }

  React.useEffect(async () => {
    try {
      const res = await fetch(host.WebDashDanhSachCustomer)
      const content = await res.json()

      if (content.status === 1) {
        setListDataCustomer(func.DecodeJson_RESPONSE(content.data))
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  console.log( ListDataCustomer )
  return (
    <>
      <div className="main_content_iner overly_inner">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="white_box_tittle">
                    <h4>Customer</h4>
                  </div>
                </div>
                <AddCustomer handleAddCustomer={handleAddCustomer}></AddCustomer>
              </div>
            </div>
            <div className="col-xl-4">
            </div>
            <div className="col-lg-12">
              <ListCustomer ListDataCustomer={ListDataCustomer} onHandleEdit={onHandleEdit}
              onHandleDelete={onHandleDelete}
              ></ListCustomer>
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

export default Customer