import React from 'react'
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import DangNhap from './pages/DangNhap';
import Footer from './pages/Footer';
import NarBar from './pages/NarBar';
import TaiKhoan from './pages/TaiKhoan';
import TrangChu from './pages/TrangChu';
import User from './storage/User';

function App() {
  const [user,SetUser] = React.useState([])

  React.useEffect(async ()=>{
    try {
      SetUser( User.getUserData() )
    } catch (error) {
      
    }
  },[])

  console.log(  user )
  if( user.length > 0 ){
    return (
      <BrowserRouter>
  
        <NarBar />
  
        <Switch>
          {/* <Route path='/Login' render={() => <TaiKhoan></TaiKhoan>}></Route> */}
          <Route path='/Login' render={() => <DangNhap></DangNhap>}></Route>
        </Switch>
  
        <Footer />
  
      </BrowserRouter>
    )
  }else{
    return (
      <DangNhap></DangNhap>
    )
  }


}

export default App;
