<template>
  <div class="shopcart">
    <div class="list-mask" v-show="listShow" @click="hideList"></div>
    <div class="content" @click="toggleList">
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
      <div class="content-right" @click.prevent.stop="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>

    <div class="ball-container">
      <transition v-for="(ball,index) in balls" :key="index" name="drop" @before-enter="beforeEnter" @enter="enter"
                  @after-enter="afterEnter">
        <div v-show="ball.show" class="ball">
          <div class="inner"></div>
        </div>
      </transition>
    </div>

    <!--<div class="ball-container">-->
    <!--<div v-for="(ball,index) in balls" :key="index" v-show="ball.show" transition="drop" class="ball">-->
    <!--<div class="inner"></div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food" v-for="(food,foodIndex) in selectFoods" :key="foodIndex">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span></div>
            <div class="cartcontrol-wapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'

  export default {
    name: 'shopcart',
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      }
    },
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
        // console.log(this.selectFoods)
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
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        return show
      }

      // listShow: {
      //   get: function () {
      //     return this.fold
      //   },
      //   set: function () {
      //     if (!this.totalCount && !this.fold) {
      //       this.fold = true
      //       return false
      //     }
      //     let show = !this.fold
      //     return show
      //   }
      // }
    },
    watch: {
      totalCount: function () {
        if (!this.totalCount) {
          this.fold = false
          return false
        }
      },
      fold: function (totalCount) {
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      drop(args) {
        console.log(args)
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = args
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        console.log('beforeEnter')
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            console.log(rect)
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.querySelector('.inner')
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`

          }
        }
      },
      enter(el) {
        console.log('enter')
        /* eslint-disable no-unused-vars */
        let ofth = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = `translate3d(0,0,0)`
          el.style.transform = `translate3d(0,0,0)`
          let inner = el.querySelector('.inner')
          inner.style.webkitTransform = `translate3d(0,0,0)`
          inner.style.transform = `translate3d(0,0,0)`
        })
      },
      afterEnter(el) {
        console.log('afterEnter')
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      },
      hideList() {
        this.fold = true
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },

      toggleList() {
        if (!this.totalCount) {
          return false
        }
        this.fold = !this.fold
      }
    },
    components: {
      'cartcontrol': cartcontrol
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .shopcart
    display: flex
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px

    .content
      color: rgba(255, 255, 255, 0.4)
      width: 100%
      display: flex
      z-index: 6

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

    .ball-container
      .drop-enter-active {
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      }

      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 5

        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear

    .shopcart-list
      position: absolute
      bottom: 0
      left: 0
      z-index: 5
      width: 100%

      .list-header
        height: 40px
        line-height: 40px
        background-color: #f3f5f7
        padding: 0 18px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)

        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          font-weight: 200
          float: left

        .empty
          font-size: 12px
          color: rgb(0, 160, 220)
          float: right

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff

        .food
          padding: 12px 0
          -webkit-box-sizing: border-box
          -moz-box-sizing: border-box
          box-sizing: border-box
          position: relative
          border-1px(rgba(7, 17, 27, 0.1))

          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)

          .price
            position: absolute
            right: 90px
            top: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)

          .cartcontrol-wapper
            position: absolute
            right: 0
            bottom: 6px

    .list-mask
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      margin: auto
      background: rgba(7, 17, 27, 0.6)
      blur(10px)
</style>
