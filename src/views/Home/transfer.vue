<template>
  <div id="transfer">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{lang.lable1}}</p>
    </Header>
    <div class="container">
    <mt-radio
      v-model="value"
      :options="options">
    </mt-radio>
      <mt-field :label="lang.lable2" :placeholder="lang.lable3" v-model='form.name'></mt-field>
      <mt-field :label="lang.lable4" :placeholder="lang.lable5" v-model="form.number"></mt-field>
      <mt-field label="手机号码" v-model="form.tel" readonly placeholder="请输入手机号码"></mt-field>
      <mt-field :label="lang.lable6" type="password" :placeholder="lang.lable7" v-model="form.password"></mt-field>
      <mt-button :class="{ active: isActive }" class="confirm" size="small" @click="comfirm" type="default">{{lang.lable9}}</mt-button>
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
      title: '',
      codeSta: true,
      time: 60,
      value: '1',
      options: [{
        label: '注册积分', value: '1'
      }],
      form: {
        name: '',
        number: '',
        password: '',
        tel: ''
      },
      isActive: false,
      lang: {}
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.tel && oldValue.name && oldValue.number && oldValue.password) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  computed: {
    selectedCity () {
      return this.$store.state.selectedCity
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
    comfirm () {
      if (!this.isActive) return false
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('host', this.form.name)
      params.append('amount', this.form.number)
      params.append('tel', this.form.tel)
      params.append('type', this.value)
      params.append('erji', this.form.password)
      this.axios.post(process.env.API_ROOT + '/api/transfer/from_host', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (data.code === 1) {
          this.$router.push('/home')
        }
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.get_user_info()
    let lang = {
      en: {
        lable1: 'Send',
        lable2: 'User Name',
        lable3: 'Please enter user name',
        lable4: 'Send quantity',
        lable55: 'Please enter the number of',
        lable5: 'Please enter the number of',
        lable6: 'Pay the password',
        lable7: 'Please enter payment passv',
        lable8: 'Available assets canbe sent this time Qi assets',
        lable9: 'Confirmation of transfer'
      },
      cn: {
        lable1: '发送',
        lable2: '用户名称',
        lable3: '请输入用户名称',
        lable4: '发送数量',
        lable55: '请输入发送数量',
        lable5: '请输入发送数量',
        lable6: '交易密码',
        lable7: '请输入≥6的字母+数字的密码',
        lable8: '可用资产本次可发送个GDC资产通证资产',
        lable9: '确认转账'
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
#transfer
  position absolute
  top 0
  left 0.6rem
  right .6rem
  bottom 0
  font-size .8rem
  color #333
  overflow-y scroll
  -webkit-overflow-scrolling touch
  &::-webkit-scrollbar
    display none
  .mint-radio-input:checked + .mint-radio-core
    background-color rgb(205,160,65)
    border-color #cda041
  .mint-radio-input:checked + .mint-radio-core::after
    background-color #000
  .mint-radio-input + .mint-radio-core
    background-color rgba(0,0,0,0)
    border-color #cda041
  .container
    margin-top 3.2rem
    .mint-radiolist
      .mint-cell-title
        width 180px !important
    .mint-cell
      border-bottom 1px solid #999
      background none
      .mint-cell-wrapper
        background-image none
        font-size .8rem
      .mint-cell-title
        width 80px
        color #cda041
        flex inherit
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
    .confirm
      display block
      width 80%
      max-width 300px
      margin 2.5rem auto
      background #999
      color #ccc
    .active
      background #00c087
      color #fff
    .tips
      text-align center
      .num
        color #cda041
</style>
