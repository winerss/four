<template>
  <div id="nickname">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">设置昵称</p>
    </Header>
    <div class="container">
      <mt-field label="昵称" placeholder="请设置您的昵称" v-model='nickname'></mt-field>
      <p class="tips">设置后，其他人将看到您的昵称。</p>
      <mt-button :class="{ active: isActive }" size="small">保存</mt-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showTitle: true,
      showLeft: true,
      nickname: '',
      isActive: false
    }
  },
  watch: {
    nickname () {
      if (this.nickname) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus">
#nickname
  position absolute
  top 0
  left 0
  right 0
  bottom 2.8rem
  font-size .8rem
  background #fff
  color #000
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    padding 0 .8rem
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .mint-cell
      margin-top 1rem
      border-bottom 1px solid #ddd
      background #fff
      .mint-cell-wrapper
        background-image none
      .mint-cell-title
        width 80px
      .mint-cell-text
        vertical-align top
        font-size .8rem
      .mint-cell-value
        input
          font-size .8rem
          color #333
          outline none
          background #fff
    .tips
      line-height 2rem
      padding 0 .4rem
      color #999
    button
      display block
      width 90%;
      max-width 300px
      margin 1rem auto
    .active
      background #00c087
      color #fff
</style>
