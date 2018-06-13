<template>
  <div class="header" style="">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="shopicon" width="64" height="64">
      </div>
      <div class="content">
        <div class="title" @click="showDeatil">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="desc">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span :class="[classMaps[seller.supports[0].type], 'icon']"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDeatil">
          <span class="count">{{ seller.supports.length }}个</span>
          <i class="iconfont-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-tit"></span>
      <span class="bulletin-cnt">{{ seller.bulletin }}</span>
      <i class="iconfont-keyboard_arrow_right"></i>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.foodScore"></v-star>
            </div>
            <div class="supports-wrapper" v-if="seller.supports">
              <v-line tit="优惠信息"></v-line>
              <ul class="supports-list">
                <li v-for="item in seller.supports" :key="item.type" class="supports-item">
                  <span :class="[classMaps[item.type], 'icon']"></span>
                  <span class="text">{{ item.description }}</span>
                </li>
              </ul>
            </div>
            <div class="bulletins-wr">
              <v-line tit="商家公告"></v-line>
              <div class="text">{{ seller.bulletin }}</div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="iconfont-close"></i>
        </div>

      </div>
    </transition>

  </div>
</template>

<script>
import vStar from '../star/star'
import vLine from '../line'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    vStar, vLine
  },
  data () {
    return {
      classMaps: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      detailShow: false,
      ltxt: '优惠信息'
    }
  },
  methods: {
    showDeatil () {
      this.detailShow = true
    },
    closeDetail () {
      this.detailShow = false
    }
  },
  created () {

  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  color #ffffff
  position relative
  background-color rgba(7, 17, 27, 0.5)
  overflow hidden
  .content-wrapper
    padding 24px 12px 18px 24px
    font-size 0
    position relative
    .avatar
      width 64px
      height 64px
      display inline-block
      > img
        border-radius 4px
    .content
      display inline-block
      margin-left 16px
      padding-top 2px
      vertical-align top
      .title
        margin 2px 0 8px 0
        .brand
          display inline-block
          width 30px
          height 18px
          bg-image('./brand')
          background-size 30px 18px
          background-repeat no-repeat
          vertical-align top
        .name
          font-size 16px
          margin-left 6px
          line-height 18px
          font-weight bold
      .desc
        font-size 12px
        line-height 12px
        margin-bottom 10px
      .support
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          font-size 10px
          line-height 12px
          vertical-align top
    .support-count
      position absolute
      right 12px
      bottom 14px
      height 24px
      line-height 24px
      padding 0 8px
      background-color rgba(0, 0, 0, 0.2)
      border-radius 12px
      font-size 10px
      .count
        vertical-align top
      .iconfont-keyboard_arrow_right
        margin-left 2px
        line-height 24px
  .bulletin-wrapper
    height 28px
    line-height 28px
    padding-left 12px
    padding-right 24px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    position relative
    background-color rgba(7, 17, 27, 0.2)
    .bulletin-tit
      margin-right 4px
      display inline-block
      width 22px
      height 12px
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
      vertical-align top
      margin-top 8px
    .bulletin-cnt
      font-size 10px
      vertical-align top
    i
      font-size 10px
      position absolute
      right 12px
      top 50%
      transform translateY(-50%)
  .bg
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
  .detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 99
    overflow auto
    background-color rgba(7, 17, 27, 0.8)
    -webkit-backdrop-filter blur(10px)
    // filter blur(10px)
    .detail-wrapper
      min-height 100%
      width 100%
      position relative
      .detail-main
        margin-top 64px
        padding-bottom 80px
        .name
          font-weight 700
          font-size 16px
          text-align center
          line-height 12px
        .star-wrapper
          margin-top 16px
        .supports-wrapper
          text-align center
          margin 28px auto 0
          width 80%
          .supports-list
            font-size 12px
            line-height 12px
            margin-top 24px
            .supports-item
              padding-left 16px
              margin-bottom 12px
              text-align left
            &:last-child
              margin-bottom 0
            .text
              vertical-align text-top
            .icon
              display inline-block
              width 16px
              height 16px
              margin-right 6px
              background-size 16px 16px
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
        .bulletins-wr
          width 80%
          margin 28px auto 0
          .text
            padding 0 12px
            margin-top 24px
            line-height 24px
            font-size 12px
            text-align left
    .detail-close
      width 32px
      height 32px
      margin -64px auto 0 auto
    .iconfont-close
      position relative
      color rgba(255, 255, 255, 0.5)
      font-size 32px
</style>
