import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/pages/Login'

// 客戶端頁面
import Dashboard from '@/components/Dashboard'
import CustomerProducts from '@/components/pages/CustomerProducts'
import CustomerProductsTopic from '@/components/pages/CustomerProductsTopic'
import CustomerProductsHot from '@/components/pages/CustomerProductsHot'
import CustomerProductsDiscount from '@/components/pages/CustomerProductsDiscount'
import CustomerProductsSearch from '@/components/pages/CustomerProductsSearch'
import CustomerProduct from '@/components/pages/CustomerProduct'
import CustomerOrders from '@/components/pages/CustomerOrders'
import CustomerCheck from '@/components/pages/CustomerCheck'

// 管理者頁面
import DashboardRoot from '@/components/DashboardRoot'
import Products from '@/components/pages/Products'
import Orders from '@/components/pages/Orders'
import Coupons from '@/components/pages/Coupons'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    { // 客戶端頁面
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/', // 全部商品 (index)
          name: 'CustomerProducts',
          component: CustomerProducts
        },
        {
          path: 'customer_products_topic', // 主題商品
          name: 'CustomerProductsTopic',
          component: CustomerProductsTopic
        },
        {
          path: 'customer_products_hot', // 人氣精選
          name: 'CustomerProductsHot',
          component: CustomerProductsHot
        },
        {
          path: 'customer_products_discount', // 清倉55折
          name: 'CustomerProductsDiscount',
          component: CustomerProductsDiscount
        },
        {
          path: 'customer_products_search/:keyword', // 搜尋
          name: 'CustomerProductsSearch',
          component: CustomerProductsSearch
        },
        {
          path: 'customer_product/:id', // 單一商品細節
          name: 'CustomerProduct',
          component: CustomerProduct
        },
        {
          path: 'customer_orders', // 結帳頁面 - 輸入訂購資料
          name: 'CustomerOrders',
          component: CustomerOrders
        },
        {
          path: 'customer_check/:id', // 結帳頁面 - 金流付款 & 付款完成
          name: 'CustomerCheck',
          component: CustomerCheck
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { // 管理者頁面
      path: '/admin',
      name: 'DashboardRoot',
      component: DashboardRoot,
      children: [
        {
          path: 'products', // 產品管理
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true } // 導航守衛: 到達這頁面需要授權
        },
        {
          path: 'orders', // 訂單管理
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true } // 導航守衛: 到達這頁面需要授權
        },
        {
          path: 'orders', // 訂單管理
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true } // 導航守衛: 到達這頁面需要授權
        },
        {
          path: 'coupons', // 優惠券管理
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true } // 導航守衛: 到達這頁面需要授權
        }

      ]
    }
  ]
})
