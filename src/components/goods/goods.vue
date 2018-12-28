<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="memu-item" v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex === index}"
            @click="selectMenu(index)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="foods-list foods-list-hook" v-for="(item,index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,foodIndex) in item.foods" class="food-item" :key="foodIndex">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-if="item.desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:cartAdd="cartAdds($event)"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice" ref="shopcart"></shopcart>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'
  import shopcart from '@/components/shopcart/shopcart'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'

  const ERR_OK = 200
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        classMap: [],
        listHeight: [],
        scrollY: 0
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.axios.get('/api/goods').then((res) => {
        // console.log(res.data.data)
        if (res.status === ERR_OK) {
          this.goods = res.data.data
          // console.log(this.goods)
          this.$nextTick(() => {
            this._initBScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      cartAdds(args) {
        console.log(args)
        // this._drop(args)
      },
      _drop(args) {
        this.$refs.shopcart.drop(args)
      },
      selectMenu(index) {
        console.log(index)
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initBScroll() {
        this.memuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0, lent = foodList.length; i < lent; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0, lent = this.listHeight.length; i < lent; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    components: {
      'shopcart': shopcart,
      'cartcontrol': cartcontrol
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .goods
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    display: flex
    overflow: hidden
    .menu-wrapper
      width: 80px
      flex: 0 0 80px
      background: #f3f5f7
      .memu-item
        width: 56px
        height: 54px
        display: table
        line-height 14px
        padding: 0 12px
        &.current
          position: relative
          margin-top: -1px
          background: #fff
          font-weight: 700
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          &.decrease
            bg-image(decrease_3)
            -webkit-background-size: 12px 12px
            background-size: 12px 12px
            background-repeat: no-repeat
          &.discount
            bg-image(discount_3)
            -webkit-background-size: 12px 12px
            background-size: 12px 12px
            background-repeat: no-repeat
          &.guarantee
            bg-image(guarantee_3)
            -webkit-background-size: 12px 12px
            background-size: 12px 12px
            background-repeat: no-repeat
          &.invoice
            bg-image(invoice_3)
            -webkit-background-size: 12px 12px
            background-size: 12px 12px
            background-repeat: no-repeat
          &.special
            bg-image(special_3)
            -webkit-background-size: 12px 12px
            background-size: 12px 12px
            background-repeat: no-repeat
        .text
          display: table-cell
          vertical-align: middle
          width: 56px
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        padding: 18px
        /*padding-bottom: 18px*/
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          font-size: 0
        .content
          padding-left: 10px
          .name
            padding-top: 2px
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 14px
          .desc
          .extra
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
            padding-top: 8px
            .count
              margin-right: 8px
          .price
            padding-top：8px
            .new
              font-weight: 700
              font-size: 14px
              line-height: 24px
              color: rgb(240, 20, 20)
            .old
              font-weight: 700
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 24px
          .cartcontrol-wrapper
            position: absolute
            bottom: 10px
            right: 18px
</style>
