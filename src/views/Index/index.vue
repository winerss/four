<template>
  <div id="index">
    <div id="nav" class="nav">
      <router-link to="/home">
        <div class="item item1">
        </div>
      </router-link>
      <router-link to="/order">
        <div class="item item2">
        </div>
      </router-link>
      <router-link to="/message">
        <div class="item item3">
        </div>
      </router-link>
      <router-link to="/about">
        <div class="item item4">
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
    background #fafbfe
    width 100%
    bottom 0rem
    height 2.6rem
    display flex
    border-top 1px solid #fafbfe
    @media (min-width: 1024px) {
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
        background-position 50% .5rem
        background-size 1.6rem auto
      .item2
        background url('../../assets/img/money.png')
        background-repeat no-repeat
        background-position 50% .5rem
        background-size 1.6rem auto
      .item3
        background url('../../assets/img/message.png')
        background-repeat no-repeat
        background-position 50% .5rem
        background-size 1.6rem auto
      .item4
        background url('../../assets/img/mine.png')
        background-repeat no-repeat
        background-position 50% .5rem
        background-size 1.6rem auto
    .router-link-active
      .item1
        background url('../../assets/img/homepage_fill.png')
        background-repeat no-repeat
        background-position 50% .5rem
        background-size 1.6rem auto
      .item2
        background url('../../assets/img/money_fill.png')
        background-repeat no-repeat
        background-position 50% .5rem
        background-size 1.6rem auto
      .item3
        background url('../../assets/img/message_fill.png')
        background-repeat no-repeat
        background-position 50% .5rem
        background-size 1.6rem auto
      .item4
        background url('../../assets/img/mine_fill.png')
        background-repeat no-repeat
        background-position 50% .5rem
        background-size 1.6rem auto
</style>
