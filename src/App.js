import React from "react";
// react-router-dom
import { BrowserRouter, Route, Switch} from "react-router-dom"
//pages
import   About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
//component
import Header from './components/Header'


export default function App() {
  return (
  <BrowserRouter>
  <Header/>
 <Switch>
    <Route path="/" exact={true} component={Home}/>
    <Route path="/about"  component={About}/>
    <Route path="/cart"  component={Cart}/>
    <Route path="/checkout"  component={Checkout}/>
    <Route path="/products" exact component={Products}/>
    <Route path="/login" component={Login}/>
    
    <Route path="/products/:id"
    children={<ProductDetails></ProductDetails>}/>
    {/* <Route path="/products/:id" component={ProductDetails}/> */}


   <Route path="*" component={Error}/> 
   {/* <Route  component={Error}/>  */}



    </Switch>
  </BrowserRouter>
  )

}
