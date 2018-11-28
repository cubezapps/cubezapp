import Vue from 'vue'
import VueRouter from 'vue-router'

const MainFrame = () => import('@/component/mainframe/mainframe.vue')
const AboutFrame = () => import('@/component/aboutframe/aboutframe.vue')
const SettingFrame = () => import('@/component/settingframe/settingframe.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainFrame
  },
  {
    path: '/about',
    component: AboutFrame
  },
  {
    path: '/setting',
    component: SettingFrame
  }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

export default router
