<template>
  <div>
    <footer class="container-fluid fixed-bottom" style="background-color: #f8f9fa">
      <div class="row">
        <div class="col-3">
          <button type="button" class="btn btn-cart" @click="openCartModal()">
            <i class="fas fa-shopping-cart text-dark fa-2x"></i>
            <span class="badge badge-pill badge-danger bage-num">{{ cartsQty }}</span>
          </button>
        </div>
        <div class="footer-text col-9 text-right align-self-center">
          <!-- <router-link to="/login">管理者模式</router-link> -->
          <a href="#" @click.prevent="goLogin()">管理者模式</a>
        </div>
      </div>
    </footer>

    <!-- Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header alert-primary" style="border-bottom:0">
            <h5 class="modal-title" id="exampleModalCenterTitle">已購買物品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="carts.carts">
            <p class="text-center text-danger" v-if="carts.carts.length === 0">您尚未購買商品</p>
            <table class="table" v-else>
              <tbody>
                <tr v-for="item in carts.carts" :key="item.id">
                  <td class="align-middle p-0">
                    <button
                      type="button"
                      class="btn btn-sm p-0 text-danger"
                      @click="removeCart(item.id)"
                    >
                      <i class="fas fa-spinner fa-spin" v-if="filterLoadingItem === item.id"></i>
                      <i class="far fa-trash-alt" v-else></i>
                    </button>
                  </td>
                  <td class="align-middle">{{item.product.title}}</td>
                  <td class="align-middle text-right">{{item.qty}}件</td>
                  <td class="align-middle text-right">NT {{item.total | currency}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right">
                    <strong>小計</strong>
                  </td>
                  <td class="text-right">
                    <strong>NT {{carts.total | currency}}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
            <button type="button" class="btn btn-primary btn-block" v-if="carts.carts.length >0" @click="goOrders()">結帳去</button>
            <button type="button" class="btn btn-light btn-block" data-dismiss="modal" v-else>關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      carts: [],
      cartsQty: 0,

      filterLoadingItem: ''

    }
  },

  methods: {
    // 取得購物車列表 /api/:api_path/cart
    getCarts () {
      const vm = this
      const api = `${process.env.API_PATH}/api/${process.env.API_ADMIN}/cart`
      vm.$http.get(api).then((response) => {
        console.log('購物車列表', response.data)
        if (response.data.success) {
          vm.carts = response.data.data
          vm.cartsQty = response.data.data.carts.length
        }
      })
    },

    // 刪除某一筆購物車資料
    removeCart (id) {
      const vm = this
      vm.filterLoadingItem = id
      const api = `${process.env.API_PATH}/api/${process.env.API_ADMIN}/cart/${id}`
      vm.$http.delete(api).then((response) => {
        console.log('刪除購物車', response.data)
        if (response.data.success) {
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
          vm.getCarts()
          vm.filterLoadingItem = ''
        }
      })
    },

    // 開啟 cart Modal
    openCartModal () {
      this.getCarts()
      $('#cartModal').modal('show')
    },

    // 更新 carts 的購買數量 cartsQty
    uptadeCartsQty () {
      this.getCarts()
    },

    // 進入結帳頁面
    goOrders () {
      this.$router.push('/customer_orders')
      $('#cartModal').modal('hide')
    },

    // 進入管理者頁面 (進行登入驗證)
    goLogin () {
      // 檢查用戶是否仍持續登入 /api/user/check
      const vm = this
      const api = `${process.env.API_PATH}/api/user/check`
      vm.$http.post(api).then((response) => {
        console.log('Login 檢查登入狀態', response.data)
        if (response.data.success) {
          vm.$router.push('/admin/products')
        } else {
          vm.$router.push('/login')
        }
      })
    }
  },

  created () {
    this.getCarts()

    // 自定義 $bus 觸發方法
    const vm = this
    vm.$bus.$on('cartsQty:update', () => {
      vm.uptadeCartsQty()
    })
  }
}
</script>

<style scoped>
.footer-text {
  font-size: 12px;
  letter-spacing: 0.2em;
  color: #333;
}

/* 帳戶及購物車 */
.btn-cart {
  position: relative;
}

.bage-num {
  position: absolute;
  top: 2px;
  right: 0;
}

.bage-text {
  position: absolute;
  top: -15px;
  left: 25%;
  font-size: 0.8rem;
}
</style>
