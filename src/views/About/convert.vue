<template>
  <div id="convert">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">兑换注册积分</p>
    </Header>
    <div class="container">
      <mt-field label="转入数量" placeholder="数量不能低于10，并小于20%" v-model='form.amount'></mt-field>
      <mt-field label="交易密码" type="password" placeholder="请输入≥6的字母+数字的密码" v-model='form.password'></mt-field>
      <mt-button size="small" :class="{ active: isActive }" @click="confirm" class="confirm">兑换注册积分</mt-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showLeft: true,
      isActive: false,
      showTitle: true,
      form: {
        amount: '',
        password: ''
      }
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.password && oldValue.amount) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  methods: {
    confirm () {
      if (!this.isActive) return false
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('amount', this.form.amount)
      params.append('erji', this.form.password)
      this.axios.post(process.env.API_ROOT + '/api/transfer/ice_zhuce', params).then((res) => {
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
  }
}
</script>

<style lang="stylus">
#convert
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  background #f5f5f5
  color #000
  .mint-cell
    margin-top .4rem
  .mint-popup-bottom
    width 100%
  .mint-cell-wrapper
    background-image none
  .mint-field
    .mint-cell-title
      width 80px
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    .page-part
      position absolute
      z-index 2
      top 0
      width 100%
    .confirm
      display block
      width 90%
      margin 1rem auto
      background #ddd
    .active
      background #cda041
      color #fff
</style>
