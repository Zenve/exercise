<template>
  <div class="app">
    <iheader :seller="seller"></iheader>
    <!--<div class="tab">-->
    <!--<router-link class="tab-item" :to="{path:'goods',query:{id:'goods'}}">-->
    <!--商品-->
    <!--</router-link>-->
    <!--<router-link class="tab-item" :to="{path:'ratings',query:{id:'ratings'}}">-->
    <!--评论-->
    <!--</router-link>-->
    <!--<router-link class="tab-item" :to="{path:'seller',query:{id:'seller'}}">-->
    <!--商家-->
    <!--</router-link>-->
    <!--</div>-->
    <!--<div class="tab">-->
    <!--<router-link class="tab-item" :to="{name:'goods',params:{id:'goods'}}">-->
    <!--商品-->
    <!--</router-link>-->
    <!--<router-link class="tab-item" :to="{name:'ratings',params:{id:'ratings'}}">-->
    <!--评论-->
    <!--</router-link>-->
    <!--<router-link class="tab-item" :to="{name:'seller',params:{id:'seller'}}">-->
    <!--商家-->
    <!--</router-link>-->
    <!--</div>-->
    <!--<router-view :seller="seller"></router-view>-->
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
    // beforeCreate() {
    //   console.log('beforeCreate')
    //   console.log(this.data)
    //   console.log(this.$el)
    // },
    created() {
      // console.log('created')
      // console.log(this.data)
      // console.log(this.$el)
      console.log('测试')
      this.axios.get('/api/seller').then((res) => {
        // console.log(res)
        console.log('测试')
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
    // beforeMount() {
    //   console.log('beforeMount')
    //   console.log(this.data)
    //   console.log(this.$el)
    // },
    // mounted() {
    //   console.log('mounted')
    //   console.log(this.data)
    //   console.log(this.$el)
    // },
    // beforeUpdate() {
    //   console.log('beforeUpdate')
    //   console.log(this.data)
    //   console.log(this.$el)
    // },
    // updated() {
    //   console.log('updated')
    //   console.log(this.data)
    //   console.log(this.$el)
    // },
    // beforeDestroy() {
    //   console.log('beforeDestroy')
    //   console.log(this.data)
    //   console.log(this.$el)
    // },
    // destroyed() {
    //   console.log('destroyed')
    //   console.log(this.data)
    //   console.log(this.$el)
    // },

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
