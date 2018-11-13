<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script>
  const LENGHT = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    name: 'star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        let restult = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = (score % 1) !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          restult.push(CLS_ON)
        }
        if (hasDecimal) {
          restult.push(CLS_HALF)
        }
        if (restult.length < LENGHT) {
          restult.push(CLS_OFF)
        }
        return restult
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "/src/common/stylus/mixin.styl"
  .star
    font-size: 0
    text-align: center
    .star-item
      display: inline-block
      background: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        bacground-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image(star48_on)
          -webkit-background-size: 20px 20px
          background-size: 20px 20px
        &.half
          bg-image(star48_half)
          -webkit-background-size: 20px 20px
          background-size: 20px 20px
        &.off
          bg-image(star48_off)
          -webkit-background-size: 20px 20px
          background-size: 20px 20px
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        bacground-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image(star36_on)
          -webkit-background-size: 15px 15px
          background-size: 15px 15px
        &.half
          bg-image(star36_half)
          -webkit-background-size: 15px 15px
          background-size: 15px 15px
        &.off
          bg-image(star36_off)
          -webkit-background-size: 15px 15px
          background-size: 15px 15px
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        bacground-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image(star24_on)
          -webkit-background-size: 10px 10px
          background-size: 10px 10px
        &.half
          bg-image(star24_half)
          -webkit-background-size: 10px 10px
          background-size: 10px 10px
        &.off
          bg-image(star24_off)
          -webkit-background-size: 10px 10px
          background-size: 10px 10px
</style>
