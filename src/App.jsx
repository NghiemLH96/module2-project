import { Routes , Route } from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import Home from "./pages/Home/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Allproduct from "./pages/All-product"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Admin from "./pages/Admin/admin"
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
          <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
    </>
  )
}

export default App
