<template>
  <div class="goods-page">
    <div class="menu-wr">
      <ul class="menu-list">
        <li v-for="(item,index) in goods" :key="index" class="menu-item">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMaps[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wr">
      <ul>
        <li v-for="(item,index) in goods" :key="index">
          <h2 class="goods-tit">{{ item.name }}</h2>
          <ul class="foods-list">
            <li v-for="(foodsItem,index) in item.foods" :key="index">
              <div class="avatar">
                <img :src="foodsItem.icon" alt="foodsItem.name">
              </div>
              <div class="cnt">
                <h3 class="name">{{ foodsItem.name }}</h3>
                <p class="desc">{{ foodsItem.description }}</p>
                <div class="extra">
                  <span>月售{{foodsItem.sellCount}}份</span>
                  <span style="margin-left:12px">好评率{{foodsItem.rating}}%</span>
                </div>
                <div class="price">
                  <span class="text-price">￥{{ foodsItem.price }}</span>
                  <span class="text-del" v-show="foodsItem.oldPrice">￥{{ foodsItem.oldPrice }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const ERR_OK = 0
export default {
  created () {
    this.axios.post('api/goods').then((result) => {
      let data = result.data
      console.log(data)
      if (data.errCode === ERR_OK) {
        this.goods = data.resultData
      } else {
        console.log('emopty data')
      }
    }).catch((err) => {
      console.error(err)
    })
  },
  data () {
    return {
      goods: [],
      classMaps: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'

.goods-page
  display flex
  position absolute
  top 174px
  left 0
  bottom 48px
  width 100%
  overflow hidden

  .menu-wr
    flex 0 0 80px
    width 80px
    background-color #f3f5f7
    overflow auto
    -webkit-overflow-scrolling touch // IOS系统
    overflow-scrolling touch // 安卓系统

    .menu-list
      font-size 12px
      line-height 14px

      .menu-item
        display table
        height 54px
        width 56px
        margin 0 auto

        .text
          display table-cell
          vertical-align middle
          text-align center
          // width 56px
          border-1px(rgba(7, 17, 27, 0.1))

        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 3px
          background-size 12px 12px
          background-repeat no-repeat
          vertical-align top

          &.decrease
            bg-image('decrease_3')

          &.discount
            bg-image('discount_3')

          &.guarantee
            bg-image('guarantee_3')

          &.invoice
            bg-image('invoice_3')

          &.special
            bg-image('special_3')

      &.active
        background-color #fff

  .goods-wr
    flex auto
    overflow auto
    -webkit-overflow-scrolling touch // IOS系统
    overflow-scrolling touch // 安卓系统

    .goods-tit
      border-left 2px solid #d9dde1
      background-color #f3f5f7
      font-size 12px
      line-height 26px
      height 26px
      color rgb(147, 153, 159)
      padding-left 14px

    .foods-list
      background-color #ffffff
      margin 0 18px

      li
        padding 18px 0
        display flex
        border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          ::after
            display none

        .avatar
          flex none

        .cnt
          margin-left 10px

          .name
            margin-top 2px
            font-size 14px
            line-height 14px

          .desc, .extra, .price
            margin-top 8px
            font-size 10px
            color rgb(147, 153, 159)
</style>
