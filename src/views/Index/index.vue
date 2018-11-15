<template>
  <div id="index">
    <div id="nav" class="nav">
      <router-link to="/home">
        <div class="item item1">
          首页
        </div>
      </router-link>
      <router-link to="/order">
        <div class="item item2">
          交易
        </div>
      </router-link>
      <!-- <router-link to="/message">
        <div class="item item3">
        </div>
      </router-link> -->
      <router-link to="/product">
        <div class="item item3">
          产品
        </div>
      </router-link>
      <!-- <router-link to="/mall">
        <div class="item item4">
          商城
        </div>
      </router-link> -->
      <router-link to="/about">
        <div class="item item5">
          我的
        </div>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    if (!localStorage.getItem('sid')) {
      this.$router.push('/login')
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
#index
  .nav
    position fixed
    z-index 2
    background #222
    width 100%
    bottom 0rem
    height 2.8rem
    display flex
    line-height 4.2rem
    font-size .8rem
    @media (min-width 1024px) {
      width 1024px
      left 50%
      margin-left -512px
    }
    a
      display block
      flex 1
      text-align center
      .item
        width 100%
        position relative
        height 2.6rem
      .item1
        background url('../../assets/img/homepage.png')
        background-repeat no-repeat
        background-position 50% .1rem
        background-size 1.4rem auto
      .item2
        background url('../../assets/img/money.png')
        background-repeat no-repeat
        background-position 50% .1rem
        background-size 1.4rem auto
      .item3
        background url('../../assets/img/product.png')
        background-repeat no-repeat
        background-position 50% .1rem
        background-size 1.4rem auto
      .item4
        background url('../../assets/img/mall.png')
        background-repeat no-repeat
        background-position 50% .2rem
        background-size 1.4rem auto
      .item5
        background url('../../assets/img/mine.png')
        background-repeat no-repeat
        background-position 50% .1rem
        background-size 1.4rem auto
    .router-link-active
      color #cda041
      .item1
        background url('../../assets/img/homepage_fill.png')
        background-repeat no-repeat
        background-position 50% .1rem
        background-size 1.4rem auto
      .item2
        background url('../../assets/img/money_fill.png')
        background-repeat no-repeat
        background-position 50% .1rem
        background-size 1.4rem auto
      .item3
        background url('../../assets/img/product_fill.png')
        background-repeat no-repeat
        background-position 50% .1rem
        background-size 1.4rem auto
      .item4
        background url('../../assets/img/mall_fill.png')
        background-repeat no-repeat
        background-position 50% .2rem
        background-size 1.4rem auto
      .item5
        background url('../../assets/img/mine_fill.png')
        background-repeat no-repeat
        background-position 50% .1rem
        background-size 1.4rem auto
</style>
