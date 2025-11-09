import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom'
import NavBar from './Pages/NavBar'
import Footer from './Pages/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import Contant from './Pages/Contant'
import Cart from './Pages/Cart'
import "bootstrap/dist/css/bootstrap.min.css"
import AllData from './Componenet/allData'
import Register from './Pages/Register'
import Sign from './Pages/Sign'


const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

const App = () => {
  const route = createBrowserRouter(createRoutesFromElements(
    <Route>

      <Route element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path='/About' element={<About />}></Route>
        <Route path='/Contant' element={<Contant />}></Route>
        <Route path='/Cart' element={<Cart />}></Route>
        <Route path='/allData' element={<AllData />}></Route>
      </Route>

      <Route path='/Register' element={<Register />}></Route>
      <Route path='/Sign' element={<Sign />}></Route>

    </Route>
  ))
  return (
    <div className='container mx-auto'>
      <RouterProvider router={route} />
    </div>
  )
}

export default App