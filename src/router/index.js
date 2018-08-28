import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header/header'
import seller from '@/components/seller/seller'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    }, {
      path: '/header',
      name: 'header',
      component: 'header'
    }, {
      path: '/seller',
      name: 'seller',
      component: 'seller'
    }, {
      path: '/goods',
      name: 'goods',
      component: 'goods'
    }, {
      path: '/ratings',
      name: 'ratings',
      component: 'ratings'
    }
  ]
})
