import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/Login.vue'
import RegisterView from '../components/Register.vue'
import SendOtpView from '../components/SendOtp.vue'
import ProfileView from '../components/Profile.vue'

const routes = [
{ 
    path: '/login',
    name: 'Login',
    component: LoginView 
},
{ 
    path: '/register',
    name: 'Register',
    component: RegisterView
},
{
    path: '/otp',
    name: 'Otp',
    component: SendOtpView
},
{
    path: '/profile',
    name: 'Profile',
    component: ProfileView  
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router