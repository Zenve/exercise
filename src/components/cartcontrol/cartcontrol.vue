<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart" transition="move">
      <span class="inner icon-remove_circle_outline" ></span>
    </div>
    <div class="cart-count " v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object
      }
    },
    created() {
      // console.log(this.food)
    },
    methods: {
      addCart() {
        console.log('click')
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart() {
        if (this.food.count > 0) {
          this.food.count--
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      padding: 6px
      display: inline-block
      transition: all 0.5s linear
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
      &.move-transition
        opacity: 1
        transform: translate3d(0, 0, 0)
        .inner
          transition: all 0.5s linear
          transform: rotate(0)
      &.move-enter, &move-leave
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      vertical-align: top
      color: rgb(37, 157, 159)
    .cart-add
      padding: 6px
      display: inline-block
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
