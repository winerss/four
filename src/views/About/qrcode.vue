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
    top 2.4rem
    bottom 0
    left 0
    right 0
    padding 0 .8rem
    overflow-y scroll
    background #f5f5f5
    text-align center
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    @media (min-width: 1024px) {
      width 1024px
      left 50%
      margin-left -512px
    }
    .qrcode
      padding 2rem
      margin 1rem auto
      background #fff
      img
        margin 0 auto
      .name
        font-size 1.2rem
        line-height 3rem
      .tips
        line-height 2rem
</style>
