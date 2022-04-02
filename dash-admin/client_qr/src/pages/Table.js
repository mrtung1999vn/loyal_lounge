import React from 'react'
import func from '../asset/func'
import host from '../service/host'
import AddTable from './Table/AddTable'
import ListTable from './Table/ListTable'

function Table() {

  const [ListDataTable, setListDataTable] = React.useState([])

  const handleAddTable = async () => {
    try {
      console.log(host.WebDashDanhSachTable)
      const res = await fetch(host.WebDashDanhSachTable)
      const content = await res.json()

      if (content.status === 1) {
        setListDataTable(func.DecodeJson_RESPONSE(content.data))
      }
    } catch (error) {

    }
  }

  const onHandleEdit = async () => {
    try {
      console.log(host.WebDashDanhSachTable)
      const res = await fetch(host.WebDashDanhSachTable)
      const content = await res.json()

      if (content.status === 1) {
        setListDataTable(func.DecodeJson_RESPONSE(content.data))
      }
    } catch (error) {

    }
  }

  const onHandleDelete = async () => {
    try {
      console.log(host.WebDashDanhSachTable)
      const res = await fetch(host.WebDashDanhSachTable)
      const content = await res.json()

      if (content.status === 1) {
        setListDataTable(func.DecodeJson_RESPONSE(content.data))
      }
    } catch (error) {

    }
  }

  React.useEffect(async () => {
    try {
      const res = await fetch(host.WebDashDanhSachTable)
      const content = await res.json()

      if (content.status === 1) {
        setListDataTable(func.DecodeJson_RESPONSE(content.data))
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  console.log( ListDataTable )
  return (
    <>
      <div className="main_content_iner overly_inner">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="white_box_tittle">
                    <h4>Table</h4>
                  </div>
                </div>
                <AddTable handleAddTable={handleAddTable}></AddTable>
              </div>
            </div>
            <div className="col-xl-4">
            </div>
            <div className="col-lg-12">
              <ListTable ListDataTable={ListDataTable} onHandleEdit={onHandleEdit}
              onHandleDelete={onHandleDelete}
              ></ListTable>
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

export default Table