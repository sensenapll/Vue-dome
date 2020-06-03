// import MSite from '../pages/MSite/MSite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// 动态路由 -----路由的懒加载
const MSite =()=>import('../pages/MSite/MSite.vue')
const Search =()=>import('../pages/Search/Search.vue')
const Order =()=>import('../pages/Order/Order.vue')
const Profile =()=>import('../pages/Profile/Profile.vue')
// 引入组件
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop'
import Goods from '../pages/Shop/Goods/Goods.vue'
import Info from '../pages/Shop/Info/Info.vue'
import Ratings from '../pages/Shop/Ratings/Ratings.vue'
// 向外暴露routers数组
export default [
  {
    path: '/msite',
    component: MSite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'info',
        component: Info
      },
      {
        path: 'ratings',
        component: Ratings
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }
    ]
  },
  // 重定向
  {
    path: '/',
    redirect: '/msite'
  }
]
