<template>
  <div class="goods-page">
    <div class="menu-wr" ref="menuWr">
      <ul class="menu-list">
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'active': curIndex === index}" @click="selectMenu(index, $event)" ref="menuItem">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMaps[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wr" ref="goodsWr">
      <ul>
        <li v-for="(item,index) in goods" :key="index" ref="goodsItem">
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
                  <span class="text-price text-price__strong">￥
                    <span style="font-size: 14px;font-weight: 700">{{ foodsItem.price }}</span>
                  </span>
                  <span class="text-del text-price" v-show="foodsItem.oldPrice">￥
                    <span style="font-weight: 700;line-height: 24px">{{ foodsItem.oldPrice }}</span>
                  </span>
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
import BScroll from 'better-scroll'
const ERR_OK = 0
export default {
  mounted () {
    this.axios.post('api/goods').then((result) => {
      let data = result.data
      console.log(data)
      if (data.errCode === ERR_OK) {
        this.goods = data.resultData
        this.$nextTick(() => {
          this._initScroll()
          this._calcHeight()
        })
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
      classMaps: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      menuScroll: null,
      foodsScroll: null,
      listHeight: [],
      scrollY: 0,
      isSelect: false
      // curIndex: 0
    }
  },
  // watch: {
  //   scrollY () {
  //     this._calcCurIndex()
  //   }
  // },
  computed: {
    curIndex () {
      let index = 0
      let heightArr = this.listHeight
      for (let i = 0; i < heightArr.length; i++) {
        let topBorder = heightArr[i]
        let botBorder = heightArr[i + 1]
        if (botBorder && topBorder <= this.scrollY && botBorder > this.scrollY) {
          index = i
          return index
        }
      }
      return 0
    }
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWr, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.goodsWr, {
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        // @pos 是滚动的坐标 y可能是小数取整，且向上滚是负值需要取绝对值
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calcHeight () {
      let goodsItem = this.$refs.goodsItem
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < goodsItem.length; i++) {
        let itemHeight = goodsItem[i].clientHeight
        height += itemHeight
        this.listHeight.push(height)
      }
    },
    // _calcCurIndex () {
    //   let index = 0
    //   let heightArr = this.listHeight
    //   for (let i = 0; i < heightArr.length; i++) {
    //     let topBorder = heightArr[i]
    //     let botBorder = heightArr[i + 1]
    //     if (botBorder && topBorder <= this.scrollY && botBorder > this.scrollY) {
    //       index = i
    //     }
    //   }
    //   this.curIndex = index
    // },
    selectMenu (i, e) {
      if (!e._constructed) {
        // 避免双重派发点击事件 尽管实际应用并没有这情况 应该是作者优化过
        return
      }
      // this._calcCurIndex()
      let scrollGoodsElement = this.$refs.goodsItem[i]
      this.foodsScroll.scrollToElement(scrollGoodsElement, 500)
      let scrollMenuElement = this.$refs.menuItem[i]
      this.menuScroll.scrollToElement(scrollMenuElement, 500)
      this.isSelect = true

      // this.$nextTick(() => {
      //   this.curIndex = i
      // })
      // this.curIndex = index 何必要直接重置 直接滑动到相应视图就好
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
    // overflow auto
    // -webkit-overflow-scrolling touch // IOS系统
    // overflow-scrolling touch // 安卓系统
    .menu-list
      font-size 12px
      line-height 14px
      font-weight normal
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
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
        &:last-child
          .text
            border-none()
        &.active
          font-weight 700
          background-color #fff
          position relative
          margin-top -1px
          z-index 10
          .text
            border-none()
  .goods-wr
    flex auto
    // overflow auto
    // -webkit-overflow-scrolling touch // IOS系统
    // overflow-scrolling touch // 安卓系统
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
          border-none()
        .avatar
          flex none
        .cnt
          margin-left 10px
          .name
            margin-top 2px
            font-size 14px
            line-height 14px
          .desc, .extra, .price
            font-size 10px
            margin-top 8px
            line-height 10px
            color rgb(147, 153, 159)
          .desc
            line-height 12px
          .price
            margin-top 0
            .text-price
              font-size 10pxc
              display inline-block
              vertical-align text-top
              &.text-price__strong
                color rgb(240, 20, 20)
                line-height 24px
</style>
