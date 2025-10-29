import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import {UserProvider} from "./userContext"
import {CartProvider} from "./cartContext"

// import TestPage from './views/test'
import LoginPage from "./views/login"
import RegisterPage from './views/register'
import OtpPage from './views/otp'
import ProfilePage from './views/proflie'
import ProductPage from "./views/product"
import ProductDetailPage from './views/productDetail'
import CartPage from './views/cart'
import OrderPage from './views/order'
// import adminLoginPage from './views/adminLogin'
// import adminMangePage from "./views/adminManage"

const router = createBrowserRouter([
  {
  path:'/login',
  element: <LoginPage />
  },
  {
  path:'/register',
  element: <RegisterPage />
  },
  {
  path:'/otp',
  element: <OtpPage />
  },
  {
  path:'/profile',
  element: <ProfilePage />
  },
  {
  path:'/',
  element: <ProductPage />
  },
  {
  path:'/product/detail/:id',
  element: <ProductDetailPage />
  },
  {
  path:'/cart',
  element: <CartPage />
  },
  {
  path:'/myorder',
  element: <OrderPage />
  },
  // {
  // path:'/admin/login',
  // element: <adminLoginPage />
  // },
  // {
  // path:'/admin/page',
  // element: <OrdadminMangePageerPage />
  // },
  
])

createRoot(document.getElementById('root')).render(
<StrictMode>
  <UserProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </UserProvider>
</StrictMode>,
)
