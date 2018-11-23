import Vue from 'vue'
import VueRouter from 'vue-router'

const MainFrame = () => import('@/component/mainframe/mainframe.vue')
const AboutFrame = () => import('@/component/aboutframe/aboutframe.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainFrame
  },
  {
    path: '/about',
    component: AboutFrame
  }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

export default router
