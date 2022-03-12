import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import host from '../../service/host';
import { storage } from '../../firebase'
import Select from 'react-select'
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

function EditCashMoney({ EditData, onHandleEdit, ListTypeCashMoney, handleChangeTypeCashMoney }) {
  const [IDCashMoney, setIDCashMoney] = React.useState(EditData.id_cash)
  const [NameCashMoney, setNameCashMoney] = React.useState(EditData.ten_sp)
  const [Password, setPassword] = React.useState('')
  const [RePassword, setRePassword] = React.useState('')
  const [Address, setAddress] = React.useState('')
  const [PhoneNumber, setPhoneNumber] = React.useState('')
  const [IDTypeCashMoney, setIDTypeCashMoney] = React.useState(EditData.id_loai_sp)
  const [Status, setStatus] = React.useState('')

  const [options, setOptions] = React.useState([])
  // 

  const [Description, setDescription] = React.useState(EditData.ghi_chu)
  const [Price, setPrice] = React.useState(EditData.money)
  const [TypeStatus, setTypeStatus] = React.useState(EditData.trang_thai)
  const [PriceVND, setPriceVND] = React.useState(EditData.money_vnd)
  const [Type, setType] = React.useState(EditData.kieu_thanh_toan)
  const [Amount, setAmount] = React.useState(0)
  const [userName,setUserName] = React.useState(EditData.ten_nguoi_dung)
  const [TypeCashMoney,setTypeCashMoney] = React.useState('')

  // 
  //#region Image
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(EditData.hinh_anh);
  const [progress, setProgress] = useState(0);

  const defaultValue = async () => {
    try {

      setNameCashMoney(''); setPassword(''); setRePassword(''); setAddress('')

      setPhoneNumber(''); setStatus(''); setImage(null); setUrl('')

      setProgress(0)

    } catch (error) {

    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //#region Image

  const handleChange = e => {
    var date = new Date()
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      let image = e.target.files[0]

      function makeid(length) {

        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return `${result}_${date.getSeconds()}_${date.getDate()}_${date.getMonth()}`;
      }
      var randomString = makeid(5)
      var url_image = `images/${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}/${randomString}/${image.name}`
      const uploadTask = storage.ref(url_image).put(image);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref(`images/${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}/${randomString}`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
            });
        }
      );
    }

  };


  //#endregion
  const onClickSave = async () => {
    try {

      var image = url === '' ? `https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/User_font_awesome.svg.png?alt=media&token=2d674b84-1646-4d51-a862-9c780e0a3460` : url

      const res = await fetch(host.WebDashDanhSachCashMoney, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ IDCashMoney, Description, TypeStatus, PriceVND, userName })
      })
      const content = await res.json()
      if (content.status === 1) {
        alert(content.msg_en)
        onHandleEdit(true)
      } else {
        alert(content.msg_en)
      }

    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(async () => {
    try {
      let newData = []
      // const options = [
      //     { value: '', label: 'Choose status' },
      //     { value: 'true', label: 'True' },
      //     { value: 'false', label: 'False' }
      // ]
      for (let i = 0; i < ListTypeCashMoney.length; i++) {
        var obj = {}
        obj['value'] = ListTypeCashMoney[i].id_loai_sp
        obj['label'] = ListTypeCashMoney[i].ten_loai_sp

        newData.push(obj)

      }
      setOptions(newData)
    } catch (error) {

    }
  }, [ListTypeCashMoney])

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit CashMoney id {EditData.id_cash} </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='row'>
          <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Type CashMoney </label>
                        <Select options={options}
                            onChange={(e)=>setTypeCashMoney(e)}
                            styles={{
                                width: '100%',
                                height: '100px'
                            }} />

                    </div>
                </div>

                <div className="col-lg-6">
                    <label>User Name </label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="User Name"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-lg-6">
                    <label>Money ({formatter.format(Price)}) x 21.000đ = {
                    parseInt(parseInt(Price)*21000).toLocaleString('vi', {style : 'currency', currency : 'VND'}) } </label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="Money"
                            value={Price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Description</label>
                        <input type="text" placeholder="Description"
                            style={{marginTop:'22px'}}
                            value={Description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Status </label>
                        <select 
                          className='form-control' 
                            style={{marginTop:'22px'}}
                            // onSelect={TypeStatus}
                            onChange={e => setTypeStatus(e.target.value)}
                        >
                          {/* <option value={TypeStatus}>{TypeStatus}</option> */}
                          {/* <option value=''>Choose value</option> */}
                          <option value='Waiting for progressing'>Waiting for progressing</option>
                          <option value='Success'>Success</option>
                        </select>
                    </div>
                </div>

            <div className="col-12">
              <div className="create_report_btn mt_30">
                <a style={{ cursor: 'pointer' }} className="btn_1 w-100"
                  onClick={() => onClickSave()}
                >Edit CashMoney</a>
              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={() => onClickSave()}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditCashMoney