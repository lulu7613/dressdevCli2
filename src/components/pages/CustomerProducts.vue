<template>
  <div>
    <Banner class="mb-4" />
    <div class="container-fluid">
      <loading :active.sync="isLoading"></loading>
      <div class="row mb-5">
        <div class="col-lg-3 mt-md-5">
          <CouponAd />
        </div>
        <div class="col-lg-9">
          <Breadcrumb class="mb-4" :propsData="Breadcrumb" />
          <ProductTemplate :propsData="propsData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../Banner'
import Breadcrumb from '../Breadcrumb'
import ProductTemplate from '../ProductTemplate'
import CouponAd from '../CouponAd'

export default {
  components: {
    Banner,
    Breadcrumb,
    ProductTemplate,
    CouponAd
  },

  data () {
    return {
      Breadcrumb: {
        category: '全部商品'
      },
      propsData: [],
      isLoading: false

    }
  },

  methods: {
    // 取得分類為 '全部商品' 的商品列表
    getProdects () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.API_PATH}/api/${process.env.API_ADMIN}/products/all`
      vm.$http.get(api).then((response) => {
        console.log('全部商品', response.data)
        if (response.data.success) {
          vm.propsData = response.data.products
          vm.isLoading = false
        }
      })
    }
  },

  created () {
    this.getProdects()
  }
}
</script>
