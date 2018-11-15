<template>
  <div id="user">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">个人资料</p>
    </Header>
    <div class="container">
      <mt-cell title="头像" is-link>
        <img style="height: 30px;" src="../../assets/img/avatar.png" alt="">
      </mt-cell>
      <mt-cell title="用户名">
        <p>winerss</p>
      </mt-cell>
      <mt-cell title="昵称" is-link></mt-cell>
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
#user
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  background #f5f5f5
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
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .container
      .mint-cell-wrapper
        background-image none
      .mint-cell
        color #333
        border-bottom 1px solid #ddd
        .mint-cell-text
          font-size .8rem
</style>
