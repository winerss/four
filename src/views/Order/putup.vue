<template>
  <div id="putup">
    <Header :showLeft="showLeft" :backPath="backPath">
      <p slot="title">{{lang.label}}</p>
    </Header>
    <div class="navbar">
      <p><router-link to="/putup/putbuy">{{lang.label2}}</router-link></p>
      <p><router-link to="/putup/putsale">{{lang.label3}}</router-link></p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showLeft: true,
      selected: 1,
      backPath: '/order',
      lang: {}
    }
  },
  components: {
    Header
  },
  mounted () {
    let lang = {
      en: {
        label: 'Pending Order',
        label2: 'Place Buy Order',
        label3: 'Place Sell Order'
      },
      cn: {
        label: '挂单',
        label2: '挂买单',
        label3: '挂卖单'
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
#putup
  .navbar
    margin-top 2.8rem
    display flex
    font-size .8rem
    p
      flex 1
      height 2.4rem
      line-height 2.4rem
      text-align center
      a
        display inline-block
        height 2.3rem
        width 80%
        color #ebebeb
      .router-link-active
        color #cda041
        border-bottom .1rem solid #cda041
</style>
