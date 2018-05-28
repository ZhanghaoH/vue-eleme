import Vue from 'vue'
import Router from 'vue-router'
import AppGoods from '@/components/goods/goods'
import AppSeller from '@/components/seller/seller'
import AppRatings from '@/components/ratings/ratings'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/goods',
    name: 'goods',
    component: AppGoods
  }, {
    path: '/seller',
    name: 'seller',
    component: AppSeller
  }, {
    path: '/ratings',
    name: 'ratings',
    component: AppRatings
  }, {
    path: '*',
    redirect: {
      name: 'goods'
    }
  }]
})
