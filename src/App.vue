<template>
  <div>
    <the-header :seller="seller"></the-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{name: 'goods'}" active-class='active'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name: 'ratings'}" active-class='active'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name: 'seller'}" active-class='active'>商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import theHeader from './components/header/header'
const ERR_OK = 0
export default {
  name: 'App',
  components: {
    theHeader
  },
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.axios.post('/api/seller').then((result) => {
      let data = result.data
      if (data.errCode === ERR_OK) {
        this.seller = data.resultData
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="stylus" scoped>
@import './common/stylus/mixin.styl'
.tab
  display flex
  width 100%
  height 40px
  line-height 40px
  border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    flex 1
    text-align center
    & > a
      display block
      font-size 14px
      color rgb(77, 85, 93)
      &.active
        color rgb(240, 20, 20)
</style>
