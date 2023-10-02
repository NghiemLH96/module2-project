import { Routes , Route } from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import Home from "./pages/Home/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Allproduct from "./pages/All-product"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Admin from "./pages/Admin/Admin"
import Products_manager from "./pages/Admin/admin_pages/products_manager/Products_manager"
import Users_manager from "./pages/Admin/admin_pages/users_manager/Users_manager"
import Orders_manager from "./pages/Admin/admin_pages/orders_manager/Orders_manager"
import Admin_info from "./pages/Admin/admin_pages/admin_info/Admin_info"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/all-products' element={<Allproduct/>}></Route>
        </Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/admin' element={<Admin/>}>
            <Route path="products-manager" element={<Products_manager/>}></Route>
            <Route path="users-manager" element={<Users_manager/>}></Route>
            <Route path="orders-manager" element={<Orders_manager/>}></Route>
            <Route path="" element={<Admin_info/>}></Route>
          </Route>
      </Routes>
    </>
  )
}

export default App
