<template>
  <div id="setpass">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{lang.title}}</p>
    </Header>
    <div class="container">
      <div class="items">
        <mt-cell class="share" :title="lang.label">
          <p>{{tel}}</p>
        </mt-cell>
        <mt-field :label="lang.label2" type="password" v-model="password" :placeholder="lang.placeholder"></mt-field>
      </div>
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
      type: 1,
      password: '',
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
      if (this.password.length < 6 || this.password.length > 15) {
        this.$toast({
          message: '请输入≥6的字母+数字的密码',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      let passwordreg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,15}$/
      if (!passwordreg.test(this.password)) {
        this.$toast({
          message: '请输入≥6的字母+数字的密码',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('password', this.password)
      params.append('type', this.type)
      this.axios.post(process.env.API_ROOT + '/api/user/edit_password1', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.$router.push('/setting')
        } else {
          this.$toast({
            message: data.msg,
            position: 'bottom',
            duration: 1000
          })
        }
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    if (this.$route.params.type === 'pay') {
      this.type = 2
    }
    let lang = {
      en: {
        title: 'Set New Password',
        label: 'Mobile Number',
        label2: 'Set Pass',
        placeholder: 'please enter a new password',
        btn: 'Save New Pass'
      },
      cn: {
        title: '设置新密码',
        label: '手机号码',
        label2: '设置密码',
        placeholder: '请输入新密码',
        btn: '保存新密码'
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
#setpass
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
      .mint-field
        .mint-cell-title
          width 80px
      .mint-cell
        margin-top .8rem
        color #333
        border-bottom 1px solid #ddd
        .mint-cell-text
          font-size .8rem
      .mint-cell:last-child
        background-image none
    .tips
      margin-top 1rem
      color #999
    .confirm
      display block
      width 90%
      margin 1rem auto
      background #26a2ff
      color #fff
</style>
