import React from 'react'
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import TaiKhoan from './pages/TaiKhoan';
import TrangChu from './pages/TrangChu';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/Login' render={() => <TaiKhoan></TaiKhoan>}></Route>
        <Route path='/' render={() => <TrangChu></TrangChu>}></Route>
      </Switch>
    </BrowserRouter>
  )

}

export default App;
