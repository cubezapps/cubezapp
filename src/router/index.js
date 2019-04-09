import Vue from 'vue'
import VueRouter from 'vue-router'

const MainFrame = () => import('@/component/mainframe/mainframe.vue')
const AboutFrame = () => import('@/component/aboutframe/aboutframe.vue')
const SettingFrame = () => import('@/component/settingframe/settingframe.vue')
const TrayMenuFrame = () => import('@/component/traymenuframe/traymenuframe.vue')
const PopupMenuFrame = () => import('@/component/popupmenuframe/popupmenuframe.vue')
const ClipMenuFrame = () => import('@/component/clipmenuframe/clipmenuframe.vue')
const CalendarFrame = () => import('@/component/calendarframe/calendarframe.vue')

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
  },
  {
    path: '/traymenu',
    component: TrayMenuFrame
  },
  {
    path: '/popupmenu',
    component: PopupMenuFrame
  },
  {
    path: '/clipmenu',
    component: ClipMenuFrame
  },
  {
    path: '/calendar',
    component: CalendarFrame
  }
]

const router = new VueRouter({
  base: '/',
  routes: routes
})
router.onReady(async () => {
  console.log('router onReady')
})
export default router
