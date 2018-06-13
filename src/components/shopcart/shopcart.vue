<template>
  <div class="shopcart">
    <div class="cnt">
      <div class="cnt-l">
        <div class="logo-wr">
          <span :class="['logo', 'iconfont-shopping_cart', {active: totalCount > 0}]"></span>
          <div class="total" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{active: totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryFee}}</div>
      </div>
      <div :class="['cnt-r', {canPay: deliveryDiff <= 0}]">
        {{payDesc}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [{
          price: 10,
          count: 3
        }]
      }
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach(element => {
        total += element.price * element.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach(element => {
        count += element.count
      })
      return count
    },
    deliveryDiff () {
      let diffVal = this.minPrice - this.totalPrice
      return diffVal
    },
    payDesc () {
      let payDesc = '￥' + this.minPrice + '起送'
      let diffVal = this.minPrice - this.totalPrice
      if (diffVal >= 0) {
        payDesc = `还差${diffVal}起送`
      } else {
        payDesc = '去结算'
      }
      return payDesc
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.shopcart
  width 100%
  height 48px
  position fixed
  bottom 0
  left 0
  z-index 49
  .cnt
    display flex
    background-color #141d27
    .cnt-l
      flex 1
      font-size 0
      div
        display inline-block
      .desc, .price
        color rgba(255, 255, 255, 0.4)
        line-height 24px
        margin-top 12px
      .logo-wr
        position relative
        margin-left 12px
        margin-right 12px
        top -10px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        border-radius 50%
        background-color #141d27
        text-align center
        vertical-align top
        .total
          font-size 16px
          font-weight 700
          font-size 9px
          text-align center
          font-weight 700
          // width 24px
          height 16px
          line-height 16px
          box-sizing border-box
          padding 0 8px
          color #fff
          background-color rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          border-radius 16px
          position absolute
          top 0
          right 0
        .logo
          display block
          font-size 24px
          line-height 44px
          color #80858a
          width 100%
          height 100%
          border-radius 50%
          background-color #2b343c
          &.active
            background-color rgb(0, 160, 220)
            color #fff
      .price
        font-size 16px
        font-weight 700
        padding-right 12px
        border-r-1px(rgba(255, 255, 255, 0.1))
        &.active
          color #fff
      .desc
        padding-left 12px
        font-size 10px
    .cnt-r
      flex none
      text-align center
      width 105px
      padding 0 8px
      font-size 14px
      font-weight 700
      line-height 48px
      color rgba(255, 255, 255, 0.4)
      background-color #2b332b
      &.canPay
        color #ffffff
        background-color #00b43c
</style>
