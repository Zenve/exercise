<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shopcart',
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .shopcart
    display: flex
    position: fixed
    left: 0
    bottom: 0
    z-index: 66
    width: 100%
    height: 48px
    .content
      color: rgba(255, 255, 255, 0.4)
      width: 100%
      display: flex
      .content-left
        background: #141d27
        flex: 1
        display: flex
        .logo-wrapper
          position: relative
          top: -10px
          padding: 6px
          margin: 0 12px
          width: 56px
          height: 56px
          -webkit-box-sizing: border-box
          -moz-box-sizing: border-box
          box-sizing: border-box
          -webkit-border-radius: 50%
          -moz-border-radius: 50%
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            background: #2b343c
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%
            text-align: center
            line-height: 44px
            &.highlight
              background: rgb(0, 160, 220)
              .icon-shopping_cart
                font-size: 24px
                line-height: 44px
                color: #80858a
                &.highlight
                  background: rgb(0, 160, 220)
                  color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            border-radius: 16px
            font-size 9px
            font-weight: 400
            color: #fff
            width: 24px
            box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.4)
            height: 16px
            line-height: 16px
            background: rgb(240, 0, 0)
            text-align: center
        .price
          line-height: 24px
          font-size: 16px
          font-weight: 700
          padding-right: 12px
          -webkit-box-sizing: border-box
          -moz-box-sizing: border-box
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          margin: 12px 0
          &.highlight
            color: #fff
        .desc
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 0 105px
        width: 105px

        .pay
          font-size: 12px
          height: 48px
          text-align: center
          font-weight: 700
          line-height: 48px
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
</style>
