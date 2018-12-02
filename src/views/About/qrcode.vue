<template>
  <div id="qrcode">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">我的二维码</p>
    </Header>
    <div class="container">
      <div class="qrcode">
        <p class="name">我的二维码</p>
        <div class="qrcode">
          <div id="code"></div>
        </div>
        <p class="tips">扫描二维码，快速注册</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      showLeft: true,
      showTitle: true,
      url: ''
    }
  },
  methods: {
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/block/get_user_qcode', params).then((res) => {
        this.url = res.data.data.url
        this.qrcode()
      })
    },
    qrcode () {
      let qrcode = new QRCode('code', {
        width: 150,
        height: 150, // 高度
        text: this.url // 二维码内容
      })
      console.log(qrcode)
    }
  },
  components: {
    Header
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus">
#qrcode
  .container
    position absolute
    top 2.8rem
    bottom 2.8rem
    left 0
    right 0
    padding 0 .8rem
    overflow-y scroll
    text-align center
    color #cda041
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .qrcode
      padding .4rem
      margin 2rem auto 0
      img
        margin 0 auto
        background #fff
        padding .4rem
        border 4px solid rgba(205,160,65,0.7)
        border-radius 1rem
      .name
        font-size 1.2rem
        line-height 3rem
      .tips
        line-height 1rem
</style>
