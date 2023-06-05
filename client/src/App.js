
import './App.css';
import Navbaar from './components/header/Navbaar';
import Newnav from './components/newnavbaar/Newnav';
import MainComp from './components/home/MainComp';
import Footer from './components/footer/Footer';
import Sign_in from './components/signup_sign/Sign_in';
import SIgnUp from './components/signup_sign/SIgnUp';
import { Routes, Route } from 'react-router-dom';
import Cart from "./components/cart/Cart"
import Buynow from './components/buynow/Buynow';

function App() {
  return (
  <>
   <Navbaar/>
   <Newnav/>
   <Routes>
    <Route path='/' element={ <MainComp/> } />
    <Route path='/login' element={ <Sign_in/> } />
    <Route path='/register' element={ <SIgnUp/> } />
    <Route path='/getproductsone/:id' element={<Cart/>} />
    <Route path='/buynow' element={<Buynow/>} />
   </Routes>
   
   <Footer/> 
 
   
  </>
  );
}

export default App;
