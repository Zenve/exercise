<template>
  <div class="app">
    <iheader :seller="seller"></iheader>
    <div class="tab">
      <router-link class="tab-item" to="goods">
        商品
      </router-link>
      <router-link class="tab-item" to="ratings">
        评论
      </router-link>
      <router-link class="tab-item" to="seller">
        商家
      </router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from '@/components/header/header'
  import goods from '@/components/goods/goods'
  import ratings from '@/components/ratings/ratings'
  import seller from '@/components/seller/seller'

  export default {
    name: 'App',
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.axios.get('/api/seller').then((res) => {
        console.log(res)
        let {
          status: statu,
          data: {
            data: jsonData
          }
        } = res
        // console.log(statu)
        // console.log(jsonData)
        if (statu === 200) {
          this.seller = jsonData
        }
        // if (res.status === 200) {
        //   // console.log(res.data.data)
        //   this.seller = res.data.data
        // }
      })
    },
    components: {
      'iheader': header,
      'goods': goods,
      'ratings': ratings,
      'seller': seller
    }
  }
</script>

<style lang="stylus">
  .tab
    color: #2c3e50
    height: 40px
    line-height: 40px
    display: flex
    justify-content: space-between
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
</style>
