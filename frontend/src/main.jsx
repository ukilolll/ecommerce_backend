import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

import LoginPage from "./views/login"
import RegisterPage from './views/register'
import OtpPage from './views/otp'
import ProfilePage from './views/proflie'

import './index.css'

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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
