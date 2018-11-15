<template>
  <div id="money">
    <div class="header">
      <div class="center">
        <div class="btn-group">
          <p><router-link to="/order/saleOrder">{{lang.label}}</router-link></p>
          <p><router-link to="/order/buyOrder">{{lang.label2}}</router-link></p>
        </div>
      </div>
      <div class="right">
        <p @click="goDetail"><img src="../../assets/img/edit.png" alt=""> {{lang.label3}}</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lang: {}
    }
  },
  methods: {
    goDetail () {
      this.$router.push('/putup')
    }
  },
  mounted () {
    let lang = {
      en: {
        label: 'Sell',
        label2: 'Buy',
        label3: 'Pending Order'
      },
      cn: {
        label: '卖单',
        label2: '买单',
        label3: '挂单'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
  }
}
</script>

<style lang="stylus">
#money
  position absolute
  top 0
  left 0
  right 0
  bottom 2.8rem
  font-size .8rem
  .header
    position fixed
    display flex
    z-index 2
    top 0
    left 0
    right 0
    height 2.8rem
    padding 0 .8rem
    line-height 3.4rem
    font-weight bold
    background #111216
    color #fff
    font-size .8rem
    border-bottom 1px solid #e5d099
    @media (min-width 1024px) {
      width 1024px
      left 50%
      margin-left -512px
      padding 0
    }
    .center
      width 60%
      margin 0 auto
      display flex
      justify-content center
      .btn-group
        height 1.4rem
        width 80%
        margin-top .7rem
        display flex
        justify-content center
        align-items center
        overflow hidden
        border 1px solid #cda041;
        font-size 0
        p
          display inline-block
          line-height 2rem
          width 100%
          text-align center
          font-size .8rem
          overflow hidden
          a
            display inline-block
            width 100%
            color #cda041
          .router-link-active
            background #cda041
            color #fff
    .right
      position absolute
      right .8rem
      line-height 2.8rem
      p
        img
          height 1.4rem
          float left
          margin .7rem .2rem 0 0
</style>
