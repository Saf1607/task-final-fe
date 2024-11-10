import { createRouter, createWebHistory } from 'vue-router'
import LoginLayout from '@/views/layouts/LoginLayout.vue'
import HomeLayout from '@/views/layouts/HomeLayout.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/user.js'
import AccountLayout from '@/views/layouts/AccountLayout.vue'
import AccountView from '@/views/AccountView.vue'
import ChangePassword from '@/views/ChangePassword.vue' // Impor halaman Ubah Password
import ChangePasswordLayout from '@/views/layouts/ChangePasswordLayout.vue'
import ChangePasswordView from '@/views/ChangePasswordView.vue'
import AccountFormView from '@/views/AccountFormView.vue'
import FormLayout from '@/views/layouts/FormLayout.vue'
import TabungakuLayout from '@/views/layouts/TabungakuLayout.vue'
import TabungankuView from '@/views/TabungankuView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: LoginLayout },
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      meta: { layout: HomeLayout },
      component: HomeView,
    },
    {
      path: '/account',
      name: 'account',
      meta: { layout: AccountLayout },
      component: AccountView,
    },
    {
      path: '/changepassword', // Tambahkan rute untuk ubah password
      name: 'changepassword',
      meta: { layout: ChangePasswordLayout },
      component: ChangePasswordView, // Halaman Ubah Password
    },
      // Rute untuk membuat akun baru
  {
    path: '/account/create',
    name: 'CreateAccount',
    meta: { layout: FormLayout },
    component: AccountFormView
  },
  // Rute untuk mengedit akun yang sudah ada
  {
    path: '/account/edit/:accountId',
    name: 'EditAccount',
    meta: { layout: FormLayout },
    component: AccountFormView
  },
  {
    path: '/tabunganku',
    name: 'tabunganku',
    meta: { layout: TabungakuLayout},
    component: TabungankuView
  },
  ],
})

// Global route guard to check for token
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // Jika halaman yang dituju bukan login dan tidak ada token, arahkan ke halaman login
  if (to.name !== 'login' && !userStore.token) {
    next({ name: 'login' })
  }
  // Jika halaman login dan sudah memiliki token, arahkan ke home
  else if (to.name == 'login' && userStore.token) {
    next({ name: 'home' })
  }
  // Lanjutkan ke rute yang dituju
  else {
    next()
  }
})

export default router
