<template>
  <div id="setting">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{data.title}}</p>
    </Header>
    <div class="container">
      <div class="items">
        <mt-cell :title="data.tel" to="/changeTel">
          <p>{{tel}}</p>
        </mt-cell>
        <mt-cell :title="data.modlog" is-link to="/changePass/login">
        </mt-cell>
        <mt-cell :title="data.modpay" is-link to="/changePass/pay">
        </mt-cell>
        <mt-cell :title="data.lang" is-link to="/language">
        </mt-cell>
        <mt-cell :title="data.clear" @click.native="clear" is-link>
        </mt-cell>
        <mt-cell :title="data.about" is-link to="/aboutapp">
        </mt-cell>
      </div>
      <mt-button @click.native="clear" class="confirm" size="small" type="default">{{data.exit}}</mt-button>
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
      tel: '',
      data: {}
    }
  },
  methods: {
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        this.tel = res.data.data.tel
      })
    },
    clear () {
      localStorage.clear()
      this.$toast({
        message: '缓存已清除',
        position: 'bottom',
        duration: 1000
      })
      this.$router.push('/login')
    },
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  components: {
    Header
  },
  mounted () {
    let data = {
      en: {
        title: 'Setting',
        tel: 'Mobile Number',
        modlog: 'Modify Login Password',
        modpay: 'Modify Pay Password',
        lang: 'Language Setting',
        clear: 'Clear cache',
        about: 'About',
        exit: 'Exit'
      },
      cn: {
        title: '设置',
        tel: '手机号码',
        modlog: '修改登录密码',
        modpay: '修改支付密码',
        lang: '语言设置',
        clear: '清除缓存',
        about: '关于',
        exit: '退出'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.data = data.en
    } else {
      this.data = data.cn
    }
    this.get_user_info()
  }
}
</script>

<style lang="stylus">
#setting
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
    .items
      .mint-cell-wrapper
        background-image none
      .mint-cell
        margin-top .8rem
        color #333
        border-bottom 1px solid #ddd
        .mint-cell-text
          font-size .8rem
      .mint-cell:last-child
        background-image none
    .confirm
      display block
      width 90%
      margin 1rem auto
      background #26a2ff
      color #fff
</style>
