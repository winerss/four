<template>
  <div id="change-index">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{lang.title}}</p>
    </Header>
    <div class="container">
      <div class="items">
        <mt-cell :title="lang.label">
          <p>{{tel}}</p>
        </mt-cell>
      </div>
      <p class="tips">{{lang.tips}}</p>
      <mt-button @click.native="next" class="confirm" size="small" type="default">{{lang.btn}}</mt-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showLeft: true,
      showTitle: true,
      tel: '',
      lang: {}
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
    next () {
      this.$router.push('/changeTel/set')
    }
  },
  components: {
    Header
  },
  mounted () {
    let lang = {
      en: {
        title: 'Change the mobile',
        label: 'Mobile Number',
        tips: 'if you change the phone number, you can log in with the new cell phone number next time.',
        btn: 'Change the mobile'
      },
      cn: {
        title: '更换手机号',
        label: '手机号',
        tips: '如果你更改了手机号，下次登陆可使用新手机号登录。',
        btn: '更换手机号'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
    this.get_user_info()
  }
}
</script>
<style lang="stylus">
#change-index
  position absolute
  top 0
  left 0.6rem
  right 0.6rem
  bottom 0
  font-size .8rem
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    .items
      .mint-cell-wrapper
        background-image none
      .mint-cell
        margin-top .8rem
        color #cda041
        background none
        border-bottom 1px solid #999
        .mint-cell-text
          font-size .8rem
      .mint-cell:last-child
        background-image none
    .tips
      margin-top .8rem
      padding 0 .8rem
      line-height 1.4rem
      color #999
    .confirm
      display block
      width 80%
      max-width 200px
      margin 1rem auto
      background #00c087
      color #fff
</style>
