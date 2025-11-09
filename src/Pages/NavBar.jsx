import { Heart, Menu, Search, ShoppingCart, User, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser } from '../Redux/appSlice'
import Swal from 'sweetalert2'
import { getAuth, signOut } from 'firebase/auth'

const Navbar = () => {
  const product = useSelector((state) => state.appReducer.products)
  const userInfo = useSelector((state) => state.appReducer.UserInfo)
  const dispatch = useDispatch()
  const [isMeuOpen, setisMeuOpen] = useState(false)

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        const auth = getAuth()
        signOut(auth)
          .then(() => {
            dispatch(clearUser())
            Swal.fire(
              'Logged out!',
              'Your session has been logged out.',
              'success'
            )
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error signing out',
                  text: error.message,
                  theme: 'dark'
                })
              })
          })

      }

    })
  }
  return (
    <div className='flex justify-between items-center h-20'>
      <div className='text-2xl font-bold items-center text-gray-800'>
        <h2>
          styleshop
        </h2>
      </div>
      <ul className='hidden mdl:flex gap-10 m-0 items-center'>
        <li><Link to="/" className="hover:text-gray-800">Home</Link></li>
        <li><Link to="/about" className="hover:text-gray-800">About</Link></li>
        <li><Link to="/contact" className="hover:text-gray-800">Contact</Link></li>
        <li className='relative '>
          <div className='flex-1'>
            <div className='relative '>
              <input type="text"
                placeholder='Search Product ...'
                className="w-full px-4 py-1 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Search className='absolute left-1 top-2 h-5 w-5 text-gray-400' />
            </div>
          </div>
        </li>
      </ul>


      <div className='flex py-1 gap-6 text-gray-600 items-center'>
        <Heart className='cursor-pointer hover:text-gray-800' />
        {userInfo ? (
          <div className='flex gap-3 items-center'>
            <span className='text-sm font-medium text-gray-700'>Welcome, <span className='font-semibold text-gray-900'>{userInfo.userName || userInfo.email}</span></span>
            <button
              onClick={handleLogout}
              className='flex items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition duration-200'
              title='Logout'
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/Sign">
              <User className='cursor-pointer hover:text-gray-800' />
            </Link>
          </>
        )}
        <Link to="/cart" className='flex gap-1 items-center relative'>
          <ShoppingCart className='cursor-pointer hover:text-gray-800' />
          {product.length}
        </Link>
      </div>
      <div className='mdl:hidden cursor-pointer' onClick={() => {
        setisMeuOpen(!isMeuOpen)
      }}>
        {isMeuOpen ?
          (<X />)
          :
          (<Menu />)
        }
      </div>
      {isMeuOpen && (
        <div className='absolute top-20 left-0 w-full bg-white mdl:hidden flex flex-col items-center  z-50 '>
          <ul className='w-full text-center '>
            <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
              <div className='flex-1'>
                <div className='relative '>
                  <input type="text"
                    placeholder='Search Product ...'
                    className="w-full px-4 py-1 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <Search className='absolute left-1 top-2 h-5 w-5 text-gray-400' />
                </div>
              </div>
            </li>
            <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
              <Link to="/" className="hover:text-gray-800">Home</Link>
            </li>
            <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
              <Link to="/about" className="hover:text-gray-800">About</Link>
            </li>
            <li className='py-2 border-b border-gray-300 w-full cursor-pointer'>
              <Link to="/contact" className="hover:text-gray-800">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </div>

  )
}

export default Navbar