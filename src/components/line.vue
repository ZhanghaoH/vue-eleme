<template>
  <div class="hd-tit">
    <div class="line"></div>
    <div class="text">{{ tit }}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: ['tit']
}
</script>

<style lang="stylus" scoped>
.hd-tit
  margin 0 auto
  display flex
  align-items center

  .line
    flex 1
    height 1px
    background-color rgba(255, 255, 255, 0.2)

  .text
    flex none
    font-size 14px
    font-weight 700
    line-height 14px
    margin-left 12px
    margin-right 12px
</style>
