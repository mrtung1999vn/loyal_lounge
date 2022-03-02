import React from 'react'
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import TaiKhoan from './pages/TaiKhoan';
import TrangChu from './pages/TrangChu';

import func from './asset/func';
import SendMoney from './pages/SendMoney';
import History from './pages/History';
import WithdrawMoney from './pages/WithdrawMoney';

function App() {
  const [User,setUser] = React.useState([])


  React.useEffect(()=>{
    try {
        if( window.localStorage.getItem('__dir') !== null || window.localStorage.getItem('__dir') !== undefined || window.localStorage.getItem('__dir') !== '' ){
          setUser( 
            func.DecodeJson_RESPONSE( window.localStorage.getItem('__dir') )
          )
        }
    } catch (error) {
      
    }
  },[])

  // console.log( User )
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/WithdrawMoney' render={() => <WithdrawMoney User={User}></WithdrawMoney>}></Route>
        <Route path='/History' render={() => <History User={User}></History>}></Route>
        <Route path='/SendMoney' render={() => <SendMoney User={User}></SendMoney>}></Route>
        <Route path='/Login' render={() => <TaiKhoan User={User}></TaiKhoan>}></Route>
        <Route path='/' render={() => <TrangChu User={User}></TrangChu>}></Route>
      </Switch>
    </BrowserRouter>
  )

}

export default App;
