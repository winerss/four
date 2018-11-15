<template>
  <div id="change-pass">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{title}}</p>
    </Header>
    <div class="container">
      <div class="items">
        <mt-cell :title="lang.label" is-link to="/citys">
          <p>{{ selectedCity.city }}（+{{ selectedCity.tel }}）</p>
        </mt-cell>
        <mt-field :label="lang.label2" v-model="form.tel" readonly :placeholder="lang.placeholder"></mt-field>
        <mt-cell class="share" :title="lang.label3">
          <input type="text" v-model="form.code" :placeholder="lang.placeholder2">
          <p v-show="codeSta" @click="getCode" style="font-size: 0.8rem;color:#cda041;">获取验证码</p>
          <mt-button v-show="!codeSta" size="small"  style="font-size: 0.6rem;" type="primary">{{time + ' 秒后获取'}}</mt-button>
        </mt-cell>
      </div>
      <mt-button :class="{ active: isActive }" @click.native="next" class="confirm" size="small" type="default">{{lang.btn}}</mt-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      codeSta: true,
      time: 60,
      showLeft: true,
      showTitle: true,
      title: '重置密码',
      form: {
        tel: '',
        code: ''
      },
      lang: {},
      isActive: false
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.tel && oldValue.code) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  methods: {
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        this.form.tel = res.data.data.tel
      })
    },
    getCode () {
      let reg = /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(this.form.tel)) {
        this.$toast({
          message: '请检查您的手机格式',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      this.codeSta = false
      var params = new FormData()
      params.append('tel', this.form.tel)
      if (this.params === 'pay') {
        params.append('type', '修改交易密码')
      } else {
        params.append('type', '修改密码')
      }
      this.axios.post(process.env.API_ROOT + '/api/block/send_codes', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
      })
      let timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          clearInterval(timer)
          this.codeSta = true
          this.time = 60
        }
      }, 1000)
    },
    next () {
      if (!this.isActive) return false
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('tel', this.form.tel)
      params.append('code', this.form.code)
      this.axios.post(process.env.API_ROOT + '/api/user/edit_password', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.$router.push('/changePass/setpass/' + this.params)
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
  computed: {
    selectedCity () {
      return this.$store.state.selectedCity
    }
  },
  components: {
    Header
  },
  mounted () {
    this.params = this.$route.params.type
    if (this.params === 'pay') {
      if (localStorage.getItem('language') === 'en') {
        this.title = 'Reset PayPassword'
      } else {
        this.title = '重置交易密码'
      }
    } else {
      if (localStorage.getItem('language') === 'en') {
        this.title = 'Reset Password'
      } else {
        this.title = '重置密码'
      }
    }
    let lang = {
      en: {
        label: 'PhoneBelong',
        label2: 'MobilePhone',
        label3: 'Verification',
        label4: 'Get the verifying code',
        placeholder: 'please enter the Moblie phone',
        placeholder2: 'Input verification code',
        btn: 'Next step'
      },
      cn: {
        label: '手机号归属地',
        label2: '手机号码',
        label3: '验证码',
        label4: '获取验证码',
        placeholder: '请输入手机号码',
        placeholder2: '请输入验证码',
        btn: '下一步'
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
#change-pass
  position absolute
  top 0
  left 0.6rem
  right 0.6rem
  bottom 0
  font-size .8rem
  color #999
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .items
      .mint-cell
        border-bottom 1px solid #999
        background none
        .mint-cell-wrapper
          background-image none
          .mint-cell-value
            font-size .8rem
        .mint-cell-title
          width 80px
        .mint-cell-text
          vertical-align top
          font-size .8rem
        .mint-cell-value
          p
            font-size .8rem
          input
            font-size .8rem
            color #999
            outline none
            background none
    .tips
      margin-top 1rem
      color #999
    .confirm
      display block
      width 80%
      margin 1rem auto
      background #999
      color #ccc
    .active
      background #cda041
      color #fff
</style>
