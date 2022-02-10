import React ,{useState}from 'react'
import {positions, useAlert} from 'react-alert'
import Alert from '../../../libs/Alert'
import host from '../../../service/host'
import Token from '../../../storage/Token'
import { storage } from "../../../firebase/index";
import func from '../../../asset/func'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  var date = new Date()
const timeNow = `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()}`

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


function ThanhDoiImage({id_don,onChangeImage}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // IMAGE
    const alert = useAlert()
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");


    const handleChange = e => {
        const file = e.target.files[0];
    
        if (file) {
          const fileType = file["type"];
          const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
          if (validImageTypes.includes(fileType)) {
            setOpen(true)
            setError("");
            setImage(file);
            handleUpload(file)
          } else {
            console.log("error");
            setError("error please upload a image file");
          }
        }
    };


    const handleUpload = (image) => {
    var path_1 = getRandomInt(10000)
    var path_2 = getRandomInt(10000)
    if (image) {
        
        // add to image folder in firebase
        const uploadTask = storage.ref(`images/${timeNow}/${path_1}/${path_2}/${image.name}`).put(image);
        // Listen for state changes, errors, and completion of the upload.
        // UpdateThemGioHang(true)
        uploadTask.on(
        "state_changed",
        snapshot => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        error => {
            // error function ....
            console.log(error);
            setError(error);
        },
        () => {
            // complete function ....
            storage
            .ref(`images/${timeNow}/${path_1}/${path_2}`)
            .child(image.name) // Upload the file and metadata
            .getDownloadURL() // get download url
            .then(async (url) => {
                
                const response = await fetch(host.ThayDoiHinhAnh+`/${id_don}`,{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({url})
                  })
                  const JsonData = await response.json()
                  if(JsonData.status ===1){
                      onChangeImage({"id_don":id_don,"url":url})
                      alert.success("Cập nhập thành công",{position: positions.BOTTOM_CENTER})
                  }else{
                      alert.error("Cập nhập thất bại",{position: positions.BOTTOM_CENTER})
                  }
                  
                setOpen(false)
                setUrl(url);
                setProgress(0);
                // UpdateThemGioHang(false)
            });
        }
        );
    } else {
        setOpen(false)
        setError("Error please choose an image to upload");
    }
    };



    return (

        <div className="input-group" style={{width:'120px'}}>
            <div className="custom-file">
                <input type="file" 
                style={{color:'transparent'}}
                onChange={handleChange}

                ></input>
                {/* <input 
                style={{width:'-20px'}}
                type="file" className="custom-file-input"
                onChange={handleChange}
                id="exampleInputFile" />
                <label 
                style={{width:'0px'}}
                className="custom-file-label" htmlFor="exampleInputFile"
                style={{cursor:'pointer'}}
                ></label> */}
            </div>
            {/* <div className="input-group-append"
            style={{cursor:'pointer'}}>
                <span className="input-group-text"
                onClick={handleUpload}
                >Tải ảnh</span>
            </div> */}

<Backdrop className={classes.backdrop} open={open} >
            <CircularProgress color="inherit" />
        </Backdrop>
        </div>
    )
}

export default ThanhDoiImage
