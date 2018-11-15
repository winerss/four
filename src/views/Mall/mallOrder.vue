<template>
  <div id="mall-order">
    <Header :showLeft="showLeft">
      <p slot="title">我的订单</p>
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <div class="items">
          <div class="item" v-for="(item, index) in data" :key="index">
            <div class="title">
              <p class="name">商品名：{{item.title}}</p>
              <p class="price">￥{{item.price}}</p>
            </div>
            <p class="detail">支付方式：{{item.detail}}</p>
            <p class="address">收货地址：{{item.address}}</p>
            <div class="footer">
              <p class="tel">联系方式：{{item.phone}}</p>
              <p class="date">日期：{{item.create_time}}</p>
            </div>
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
      showLeft: true,
      data: []
    }
  },
  methods: {
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/block/get_self_buy', params).then((res) => {
        this.data = res.data.data
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
    }
  },
  components: {
    Header
  },
  mounted () {
    this.getData()
    this._initScroll()
  }
}
</script>

<style lang="stylus">
#mall-order
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    background #f5f5f5
    .wrapper
      .items
        line-height 1.2rem
        .item
          background #fff
          margin-top .4rem
          padding 0 .4rem
          .title
            height 2rem
            line-height 2rem
            display flex
            justify-content space-between
            font-size 1rem
            .price
              color #CD0000
          .footer
            display flex
            justify-content space-between
            height 2rem
            line-height 2rem
</style>
