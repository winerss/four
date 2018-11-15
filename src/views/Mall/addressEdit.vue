<template>
  <div id="mall-address-edit">
    <Header :showLeft="showLeft">
      <p slot="title">地址管理</p>
    </Header>
    <div class="container">
      <mt-field label="收件人姓名" placeholder="请输入收件人姓名"></mt-field>
      <mt-field label="收件人电话" placeholder="请输入收件人联系电话"></mt-field>
      <p class="title">收件人地址</p>
      <textarea name="address" id="address-detail" placeholder="请输入收件人地址"></textarea>
    </div>
    <footer>确定</footer>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data () {
    return {
      showLeft: true
    }
  },
  methods: {
  },
  components: {
    Header
  },
  mounted () {
  }
}
</script>

<style lang="stylus">
#mall-address-edit
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  @media (min-width: 1024px) {
    width 1024px
    left 50%
    margin-left -512px
  }
  .container
    position absolute
    top 2.8rem
    bottom 2.6rem
    left 0
    right 0
    background #f5f5f5
    .mint-cell
      border-bottom 1px solid #ebebeb
      height 3rem
      line-height 3rem
      .mint-cell-wrapper
        background none
      .mint-cell-wrapper
        font-size .8rem
        .mint-cell-title
          width 5rem
    .title
      line-height 3rem
      background #fff
      padding 0 10px
    #address-detail
      width 100%
      padding 6px 10px
      height 60px
      border none
      outline none
      border-top 1px solid #ebebeb
  footer
    position fixed
    height 2.6rem
    bottom 0
    width 100%
    text-align center
    line-height 2.6rem
    font-size .8rem
    background #CD0000
    color #333
</style>
