<template>
  <div id="about">
    <Header :showTitle="showTitle" :showRight="showRight">
      <p slot="title">{{lang.title}}</p>
      <!-- <p slot="right" @click="goPage('/setting')">{{lang.label}}</p> -->
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <div class="information">
          <div class="header">
            <div class="nickName">{{data.nickname}}</div>
            <!-- <div class="avatar"><img src="../../assets/img/logo.jpg" alt=""></div> -->
          </div>
          <p class="copyContent">{{address}}</p>
          <p  v-clipboard:copy="address"
              v-clipboard:success="onCopy" class="copy">{{lang.label2}}</p>
        </div>
        <div class="packet">
          <div class="consume" @click="goPages('/freeze/', data.ice_point)">
            <p class="title">{{lang.label3}}</p>
            <p class="money">{{data.ice_point}}</p>
          </div>
          <div class="line"></div>
          <div class="cash" @click="goPages('/release/', data.all_point + ',' + 3)">
            <p class="title">{{lang.label4}}</p>
            <p class="money">{{data.all_point}}</p>
          </div>
        </div>
        <div class="packet">
          <div class="consume" @click="goPages('/release/', data.pocket_point + ',' + 10)">
            <p class="title">{{lang.label33}}</p>
            <p class="money">{{data.pocket_point}}</p>
          </div>
          <div class="line"></div>
          <div class="cash" @click="goPages('/release/', data.shop_point + ',' + 11)">
            <p class="title">{{lang.label44}}</p>
            <p class="money">{{data.shop_point}}</p>
          </div>
        </div>
        <div class="icon-group">
          <!-- <div class="item" @click="goPage('/myorder')">
            <img src="../../assets/img/platform.png" alt="">
            <p>我的交易平台</p>
          </div>
          <div class="item center" @click="goPage('/orderRecord')">
            <img src="../../assets/img/record.png" alt="">
            <p>账单记录</p>
          </div> -->
          <div class="item" @click="goPage('/reward')">
            <div class="imgwrap animated bounceInLeft"><div class="img"><img src="../../assets/img/share.png" alt=""></div></div>
            <p>分享奖励</p>
          </div>
          <div class="item" @click="goPage('/tixian')">
            <div class="imgwrap animated bounceInRight"><div class="img"><img src="../../assets/img/tixian.png" alt=""></div></div>
            <p>立即提现</p>
          </div>
        </div>
        <div class="icon-group">
          <div class="item" @click="goPage('/qrcode')">
            <div class="imgwrap animated bounce"><div class="img"><img src="../../assets/img/qrcode.png" alt=""></div></div>
            <p>我的二维码</p>
          </div>
          <div class="item center" @click="goPage('/changeTel')">
            <div class="imgwrap animated bounce"><div class="img"><img src="../../assets/img/tel.png" alt=""></div></div>
            <p>手机号码</p>
          </div>
          <div class="item" @click="goPage('/changePass/login')">
            <div class="imgwrap animated bounce"><div class="img"><img src="../../assets/img/password.png" alt=""></div></div>
            <p>修改登录密码</p>
          </div>
        </div>
        <div class="icon-group">
          <div class="item" @click="goPage('/changePass/pay')">
            <div class="imgwrap animated bounce"><div class="img"><img src="../../assets/img/payp.png" alt=""></div></div>
            <p>修改支付密码</p>
          </div>
          <div class="item center"  @click="clear">
            <div class="imgwrap animated bounce"><div class="img"><img src="../../assets/img/dataed.png" alt=""></div></div>
            <p>清除缓存</p>
          </div>
          <div class="item" @click="goPage('/aboutapp')">
            <div class="imgwrap animated bounce"><div class="img"><img src="../../assets/img/about.png" alt=""></div></div>
            <p>关于</p>
          </div>
        </div>
        <mt-button @click.native="clear" v-show="layoutShow" size="small" class="layout">退出</mt-button>
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
      lang: {},
      layoutShow: false
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
    logout () {
      localStorage.clear()
      this.$router.push('/login')
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
    clear () {
      localStorage.clear()
      this.$toast({
        message: '缓存已清除',
        position: 'bottom',
        duration: 1000
      })
      this.$router.push('/login')
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
    // this._initScroll()
    let lang = {
      en: {
        title: 'Me',
        label: 'Settings',
        label2: 'Copy',
        label3: 'Frozen purse',
        label4: 'Release the wallet',
        label33: 'reward purse',
        label44: 'shopping the wallet',
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
        label4: '现金钱包',
        label33: '奖金钱包',
        label44: '购物钱包',
        label5: '分享奖励',
        label6: '我的交易平台',
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
    setTimeout(() => {
      this.layoutShow = true
    }, 100)
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
  bottom 2.8rem
  font-size .8rem
  overflow-x hidden
  overflow-y auto
  color #fff
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    .wrapper
      padding-bottom 2.8rem
    .box
      margin-top .8rem
      padding .8rem
      background #fff
    .information
      padding 0 1.8rem 1.5rem
      // background #111216
      color #cda041
      border-bottom 1px solid #cda041
      @media (min-width 768px) {
        padding 1.5rem 10%
      }
      .header
        display flex
        justify-content space-between
        @media (min-width 768px) {
          padding 1.5rem 0
        }
        .nickName
          line-height 2rem
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
        line-height 2rem
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
      // background #111216
      color #cda041
      margin-bottom .8rem
      .consume, .cash
        flex 1
        .title
          line-height 1.2rem
          color #ebebeb
        .money
          line-height 1.4rem
          font-size 1rem
      .line
        width 2px
        height 2.4rem
        background #cda041
    .icon-group
      display flex
      padding .6rem 0
      border-top 1px solid #cda041
      .center
        border-left 1px solid #cda041
        border-right 1px solid #cda041
      .item
        flex 1
        text-align center
        color #ebebeb
        font-size .8rem
        line-height 2rem
        .imgwrap
          margin 0 auto
          height 3rem
          width 3rem
          background url('../../assets/img/bubble.png')
          background-size cover
        img
          height 1.6rem
          width 1.6rem
          margin .7rem
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
    .layout
      display: block;
      width: 90%;
      max-width 200px
      background: #cda041;
      color: #fff;
      margin: 2rem auto;
</style>
