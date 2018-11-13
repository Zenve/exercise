<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" class="head">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/ {{seller.deliveryTime}}
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"> </i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
              <!--<span class="icon" :class="classMap[seller.supports[index].type]"></span>-->
              <!--<span class="text">{{seller.supports[index].description}}</span>-->
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="li ne"></div>
          </div>
          <div class="bulletin">
            <p class="content">
              {{seller.bulletin}}
            </p>
          </div>
        </div>

      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '@/components/star/star'

  export default {
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      'star': star
    }
  }
</script>

<style lang="stylus" scoped>
  .header
    color: #fff
    background: rgba(7, 17, 27, 0.2)
    position: relative
    overflow: hidden
    .content-wrapper
      padding: 24px 12px 18px 24px
      display: flex
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      justify-content: space-between
      font-size: 0
      position: relative;
      .avatar
        .head
          -webkit-border-radius: 2px
          -moz-border-radius: 2px
          border-radius: 2px
      .content
        flex: 1
        font-size: 14px
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          display: flex
          justify-content: flex-start
          .brand
            width 30px
            height: 18px
            display: inline-block
            bg-image(brand)
            -webkit-background-size: 30px 18px
            background-size: 30px 18px
            margin-right: 6px
          .name
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          font-size: 12px
          font-weight: 200
          line-height 12px
          margin-bottom: 10px
        .supports
          display: flex
          justify-content: flex-start
          .icon
            width: 12px
            height: 12px
            margin-right: 4px
            &.decrease
              bg-image(decrease_1)
              -webkit-background-size: 12px 12px
              background-size: 12px 12px
              background-repeat: no-repeat
            &.discount
              bg-image(discount_1)
              -webkit-background-size: 12px 12px
              background-size: 12px 12px
              background-repeat: no-repeat
            &.guarantee
              bg-image(guarantee_1)
              -webkit-background-size: 12px 12px
              background-size: 12px 12px
              background-repeat: no-repeat
            &.invoice
              bg-image(invoice_1)
              -webkit-background-size: 12px 12px
              background-size: 12px 12px
              background-repeat: no-repeat
            &.special
              bg-image(special_1)
              -webkit-background-size: 12px 12px
              background-size: 12px 12px
              background-repeat: no-repeat
          .text
            flex: 1
            font-size: 10px
            line-height: 12px
            fonfont-weight: 200

      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        -webkit-border-radius: 10px
        -moz-border-radius: 10px
        border-radius: 10px
        .count
          font-size: 10px
          color: #fff
          font-weight: 200
          line-height: 24px
        .icon-keyboard_arrow_right
          line-height: 24px
          font-size: 10px
          margin-left: 2px
    .bulletin-wrapper
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      -ms-text-overflow: ellipsis
      text-overflow: ellipsis
      position: relative
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image(bulletin)
        -webkit-background-size: 22px 12px
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
        line-height: 28px
        color: #fff
        font-weight: 200
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0
      lef: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      width: 100%
      height: 100%
      z-index: 100
      overflow: auto
      top: 0
      left: 0
      background rgba(7, 17, 27, 0.8)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 16px
            padding: 4px 0
          .title
            display: flex
            justify-content: space-between
            padding: 28px 36px 24px 36px
            .line
              flex: 1
              height: 1px
              background: rgba(255, 255, 255, 0.2)
              margin-top: 8px
            .text
              padding: 0 12px
              font-weight: 700
              font-size: 14px
          .supports
            padding: 0 36px
            .support-item
              padding-bottom: 12px
              display: flex
              justify-content: flex-start
              &:last-child
                padding-bottom: 0
              .text
                font-size: 12px
                line-height: 16px
                font-weight: 200
                color: #fff
              .icon
                width: 16px
                height: 16px
                display: block
                margin-right: 6px
                &.decrease
                  bg-image(decrease_2)
                  -webkit-background-size: 16px 16px
                  background-size: 16px 16px
                  background-repeat: no-repeat
                &.discount
                  bg-image(discount_2)
                  -webkit-background-size: 16px 16px
                  background-size: 16px 16px
                  background-repeat: no-repeat
                &.guarantee
                  bg-image(guarantee_2)
                  -webkit-background-size: 16px 16px
                  background-size: 16px 16px
                  background-repeat: no-repeat
                &.invoice
                  bg-image(invoice_2)
                  -webkit-background-size: 16px 16px
                  background-size: 16px 16px
                  background-repeat: no-repeat
                &.special
                  bg-image(special_2)
                  -webkit-background-size: 16px 16px
                  background-size: 16px 16px
                  background-repeat: no-repeat
          .bulletin
            padding: 0 36px
            .content
              font-size: 12px
              line-height: 24px
              color: #fff
              font-weight: 200
    .detail-close
      position: relative;
      width: 32px
      heigth: 32px
      margin: -64px auto 0
      font-size: 32px

</style>
