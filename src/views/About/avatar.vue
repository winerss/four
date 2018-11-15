<template>
  <div id="avatar">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">设置个人头像</p>
    </Header>
    <div class="container">
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showTitle: true,
      showLeft: true
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus">
#avatar
  position absolute
  top 0
  left 0
  right 0
  bottom 2.6rem
  font-size .8rem
  background #fff
  color #000
  @media (min-width: 1024px) {
    width 1024px
    left 50%
    margin-left -512px
  }
  .container
    position absolute
    top 2.4rem
    bottom 0
    left 0
    right 0
    padding 0 .8rem
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
</style>
