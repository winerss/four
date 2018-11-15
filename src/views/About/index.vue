<template>
  <div id="about">
    <Header :showTitle="showTitle" :showRight="showRight">
      <p slot="title">{{lang.title}}</p>
      <p slot="right" @click="goPage('/setting')">{{lang.label}}</p>
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <div class="box">
          <div class="information">
            <div class="header" @click="goPage('/user')">
              <div class="nickName">{{data.nickname}}</div>
              <div class="avatar"><img src="../../assets/img/logo.jpg" alt=""></div>
            </div>
            <p class="copyContent">{{address}}</p>
            <p  v-clipboard:copy="address"
                v-clipboard:success="onCopy" class="copy">{{lang.label2}}</p>
          </div>
        </div>
        <div class="box">
          <div class="packet">
            <div class="consume" @click="goPages('/freeze/', data.ice_point)">
              <p class="title">{{lang.label3}}</p>
              <p class="money">{{data.ice_point}}</p>
            </div>
            <div class="line"></div>
            <div class="cash" @click="goPages('/release/', data.all_point)">
              <p class="title">{{lang.label4}}</p>
              <p class="money">{{data.all_point}}</p>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="items">
            <mt-cell :title="lang.label5" is-link to="/reward">
              <img slot="icon" src="../../assets/img/share.png" width="24" height="24">
            </mt-cell>
            <mt-cell :title="lang.label6" is-link to="/myorder">
              <img slot="icon" src="../../assets/img/order.png" width="24" height="24">
            </mt-cell>
            <mt-cell :title="lang.label7" is-link to="/orderRecord">
              <img slot="icon" src="../../assets/img/record.png" width="24" height="24">
            </mt-cell>
            <mt-cell :title="lang.label8" is-link to="/qrcode">
              <img slot="icon" src="../../assets/img/qrcode.png" width="24" height="24">
            </mt-cell>
            <mt-cell :title="lang.label9" is-link to="/product">
              <img slot="icon" src="../../assets/img/product.png" width="24" height="24">
            </mt-cell>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Header from '@/components/header'
export default {
  data () {
    return {
      showTitle: true,
      showRight: true,
      address: '',
      data: {},
      lang: {}
    }
  },
  methods: {
    onCopy: function (e) {
      this.$toast({
        message: '复制成功',
        position: 'bottom',
        duration: 1000
      })
    },
    onError: function (e) {
      this.$toast({
        message: '复制失败',
        position: 'bottom',
        duration: 1000
      })
    },
    _initScroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            scrollY: true,
            probeType: 2
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        this.data = data.data
      })
    },
    getAddress () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '//api/user/transfer_host', params).then((res) => {
        let data = res.data.data[0]
        this.address = data
      })
    },
    goPage (path) {
      this.$router.push(path)
    },
    goPages (path, type) {
      this.$router.push(path + type)
    }
  },
  mounted () {
    this.get_user_info()
    this.getAddress()
    this._initScroll()
    let lang = {
      en: {
        title: 'Me',
        label: 'Settings',
        label2: 'Copy',
        label3: 'Frozen purse',
        label4: 'Release the wallet',
        label5: 'Sharing dividends',
        label6: 'My Order',
        label7: 'Biling record',
        label8: 'QR code',
        label9: 'Product center'
      },
      cn: {
        title: '我的',
        label: '设置',
        label2: '复制地址',
        label3: '冻结钱包',
        label4: '释放钱包',
        label5: '分享奖励',
        label6: '我的订单',
        label7: '账单记录',
        label8: '我的二维码',
        label9: '产品中心'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus">
#about
  position absolute
  top 0
  left 0
  right 0
  bottom 2.6rem
  font-size .8rem
  overflow hidden
  background #f5f5f5
  color #fff
  @media (min-width: 1024px) {
    width 1024px
    left 50%
    margin-left -512px
  }
  .container
    position absolute
    top 2.4rem
    bottom 0
    margin-bottom 2rem
    left 0
    right 0
    .box
      margin-top .8rem
      padding .8rem
      background #fff
    .information
      padding .5rem .8rem
      background #1b82d2
      border-radius .4rem
      .header
        display flex
        justify-content space-between
        .nickName
          line-height 4rem
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          font-size 1.4rem
        .avatar
          flex-shrink 0
          width 4rem
          height 4rem
          overflow hidden
          img
            height 3rem
            border-radius 100%
            margin .5rem
      .copyContent
        line-height 1.6rem
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .copy
        color #e0e0e0
    .packet
      display flex
      height 2.4rem
      padding .5rem 0
      text-align center
      border-radius .4rem
      background #1b82d2
      .consume, .cash
        flex 1
        .title
          line-height 1.2rem
        .money
          line-height 1.4rem
          font-size 1rem
      .line
        width 2px
        height 2.4rem
        background #fff
    .items
      .mint-cell-wrapper
        background-image none
      .mint-cell
        color #333
        border-bottom 1px solid #ddd
        .mint-cell-text
          font-size .8rem
      .mint-cell:last-child
        background-image none
</style>
