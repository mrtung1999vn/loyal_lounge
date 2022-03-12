import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import host from '../../service/host';
import { storage } from '../../firebase'
import Select from 'react-select'

function EditProduct({ EditData, onHandleEdit, ListTypeProduct, handleChangeTypeProduct }) {
  const [IDProduct, setIDProduct] = React.useState(EditData.id_sp)
  const [NameProduct, setNameProduct] = React.useState(EditData.ten_sp)
  const [Password, setPassword] = React.useState('')
  const [RePassword, setRePassword] = React.useState('')
  const [Address, setAddress] = React.useState('')
  const [PhoneNumber, setPhoneNumber] = React.useState('')
  const [IDTypeProduct, setIDTypeProduct] = React.useState(EditData.id_loai_sp)
  const [Status, setStatus] = React.useState('')

  const [options, setOptions] = React.useState([])
  // 

  const [Description, setDescription] = React.useState(EditData.noi_dung)
  const [Price, setPrice] = React.useState(EditData.gia_sp)
  const [Amount, setAmount] = React.useState(EditData.so_luong)

  // 
  //#region Image
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(EditData.hinh_anh);
  const [progress, setProgress] = useState(0);

  const defaultValue = async () => {
    try {

      setNameProduct(''); setPassword(''); setRePassword(''); setAddress('')

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

      const res = await fetch(host.WebDashDanhSachProduct, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ IDProduct, IDTypeProduct, Description, Price, Amount, image, NameProduct })
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
      for (let i = 0; i < ListTypeProduct.length; i++) {
        var obj = {}
        obj['value'] = ListTypeProduct[i].id_loai_sp
        obj['label'] = ListTypeProduct[i].ten_loai_sp

        newData.push(obj)

      }
      setOptions(newData)
    } catch (error) {

    }
  }, [ListTypeProduct])

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product id {EditData.id_tk_admin} </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='row'>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <label>Type Product ({IDTypeProduct}){EditData.ten_loai_sp}</label>
                <Select options={options}
                  // value={IDTypeProduct}
                  onChange={(e) => setIDTypeProduct(e.value)}
                  styles={{
                    width: '100%',
                    height: '100px'
                  }} />

              </div>
            </div>

            <div className="col-lg-6">
              <label>Name Product </label>
              <div className="common_input mb_20">
                <input type="text" placeholder="NameProduct"
                  value={NameProduct}
                  onChange={e => setNameProduct(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <label>Description</label>
              <div className="common_input mb_20">
                <input type="text" placeholder="Description"
                  value={Description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <label>Price</label>
                <input type="text" placeholder="Price"
                  value={Price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <label>Amount</label>
                <input type="text" placeholder="Amount"
                  value={Amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="common_input mb_20">
                <div className='row'>
                  <div className='col-lg-6'>

                    <input type="file" onChange={(e) => handleChange(e)}
                      style={{ width: '200px', marginTop: '32px' }} />

                  </div>
                </div>
                {progress > 0 && progress < 100 ? <>Loading ... {progress}%</> : <></>}
                <br>
                </br>
                <img
                  style={window.innerWidth <= 800 ? { width: '100%', height: '100%' } :
                    { width: '50%', height: '50%' }
                  }
                  src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
              </div>
            </div>
            <div className="col-12">
              <div className="create_report_btn mt_30">
                <a style={{ cursor: 'pointer' }} className="btn_1 w-100"
                  onClick={() => onClickSave()}
                >Edit Product</a>
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

export default EditProduct