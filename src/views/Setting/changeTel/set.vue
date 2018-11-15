<template>
  <div id="change-set">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{lang.title}}</p>
    </Header>
    <div class="container">
      <div class="items">
        <mt-cell :title="lang.label" is-link to="/citys">
          <p>{{ selectedCity.city }}（+{{ selectedCity.tel }}）</p>
        </mt-cell>
        <mt-field :label="lang.label2" :laceholder="lang.placeholder" v-model="form.tel"></mt-field>
        <mt-cell class="share" :title="lang.label3">
          <input type="text" v-model="form.code" :placeholder="lang.placeholder2">
          <p v-show="codeSta" @click="getCode" style="font-size: 0.8rem;color:#26a2ff;">获取验证码</p>
          <mt-button v-show="!codeSta" size="small" style="font-size: 0.6rem;" type="primary">{{time + ' 秒后获取'}}</mt-button>
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
      form: {
        tel: '',
        code: ''
      },
      showLeft: true,
      showTitle: true,
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
      params.append('type', '修改手机号')
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
      this.axios.post(process.env.API_ROOT + '/api/user/change_tel', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (res.data.code === 1) {
          this.$router.push('/setting')
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
    let lang = {
      en: {
        title: 'Set New Phone',
        label: 'PhoneBelong',
        label2: 'MobilePhone',
        label3: 'Verification',
        label4: 'Get the verifying code',
        placeholder: 'please enter the Moblie phone',
        placeholder2: 'Input verification code',
        btn: 'Enter Change'
      },
      cn: {
        title: '更换手机号',
        label: '手机号归属地',
        label2: '手机号码',
        label3: '验证码',
        label4: '获取验证码',
        placeholder: '请输入手机号码',
        placeholder2: '请输入验证码',
        btn: '确认更换'
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
#change-set
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
    .items
      .mint-cell
        border-bottom 1px solid #ddd
        background #fff
        .mint-cell-wrapper
          background-image none
        .mint-cell-title
          width 80px
        .mint-cell-text
          vertical-align top
          font-size .8rem
        .mint-cell-value
          input
            font-size .8rem
            color #333
            outline none
            background #fff
    .confirm
      display block
      width 90%
      margin 1rem auto
      background #999
      color #ccc
    .active
      background #26a2ff
      color #fff
</style>
