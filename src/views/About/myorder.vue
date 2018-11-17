<template>
  <div id="myorder">
    <Header :showTitle="showTitle" :showLeft="showLeft">
      <p slot="title">我的订单</p>
    </Header>
    <div class="container">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item @click.native="getdata()" id="1">全部</mt-tab-item>
        <mt-tab-item @click.native="getdata('2')" id="2">已取消</mt-tab-item>
        <mt-tab-item @click.native="getdata('0')" id="3">待交易</mt-tab-item>
        <mt-tab-item @click.native="getdata('3')" id="4">交易中</mt-tab-item>
        <mt-tab-item @click.native="getdata('1')" id="5">已完成</mt-tab-item>
      </mt-navbar>
      <div class="content">
        <div class="wrapper" ref="wrapper">
          <div class="items">
            <div class="item" v-for="(item, index) in data" :key="index">
              <div style="overflow:hidden;display:flex;justify-content:space-between;line-height: 2rem;padding: 0 .6rem;">
                <p>{{item.username}}</p>
                <p>{{item.create_time}}</p>
                <!-- <p class="item-sign" style="color: #cda041;" v-if="item.sign === '1'">挂释放钱包</p> -->
                <p class="item-sign" style="color: #cda041;" v-if="item.sign === '1'">挂现金积分</p>
              </div>
              <div class="item-body">
                <div class="left">
                  <p>数量（个）</p>
                  <p>{{item.amount}}</p>
                </div>
                <div class="center">
                  <p>单价（元）</p>
                  <p>{{item.price}}</p>
                </div>
                <div class="right">
                  <p>总计（元）</p>
                  <p>{{(item.amount * item.price).toFixed(5)}}</p>
                </div>
              </div>
              <div class="item-footer">
                <div class="left">
                  <mt-button size="small" v-if="item.type === '1'" style="color: #cda041">买单</mt-button>
                  <mt-button size="small" v-if="item.type === '2'" style="color: #CD0000">卖单</mt-button>
                </div>
                <div class="right">
                  <mt-button size="small" v-if="item.status === '1'" style="color: #cda041">已完成</mt-button>
                  <mt-button size="small" v-if="item.status === '1' || item.status === '3'" @click.native="getTel(item.id)" style="color: #cda041">拨打电话</mt-button>
                  <mt-button size="small" v-if="item.status === '1' || item.status === '3'" @click.native="contact(item.id)" style="color: #cda041">联系买家</mt-button>
                  <mt-button size="small" v-if="item.can_cancel === 1" @click.native="cancel(item.id)" style="color: #cda041">取消订单</mt-button>
                  <mt-button size="small" v-if="item.can_shou === 1 && item.status === '3'" @click="confirm(item.id)" style="backgroundColor: #cda041;color:#fff;">确认收款</mt-button>
                </div>
              </div>
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
      data: [],
      showLeft: true,
      showTitle: true,
      selected: '1'
    }
  },
  methods: {
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
    getTel (id) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', id)
      this.axios.post(process.env.API_ROOT + '/api/words/get_tel', params).then((response) => {
        window.location.href = 'tel:' + response.data.data.tel
      })
    },
    contact (id) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', id)
      this.axios.post(process.env.API_ROOT + '/api/words/contact', params).then((response) => {
        if (response.data.code === 1) {
          this.$router.push('/messagedetail/' + response.data.data.sign)
        }
      })
    },
    confirm (id) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', id)
      this.axios.post(process.env.API_ROOT + '/api/transfer/ok_order', params).then((response) => {
        this.$toast({
          message: response.data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (response.data.code === 1) {
          this.$router.go(0)
        }
      })
    },
    cancel (id) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', id)
      this.axios.post(process.env.API_ROOT + '/api/transfer/cancel_order', params).then((response) => {
        this.$toast({
          message: response.data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (response.data.code === 1) {
          this.$router.go(0)
        }
      })
    },
    getdata (status = '-1') {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_order', params).then((response) => {
        this.data = []
        if (status === '0') { // 待交易
          response.data.data.forEach(element => {
            if (element.status === '0') {
              this.data.push(element)
            }
          })
        } else if (status === '1') { // 完成
          response.data.data.forEach(element => {
            if (element.status === '1') {
              this.data.push(element)
            }
          })
        } else if (status === '2') { // 取消
          response.data.data.forEach(element => {
            if (element.status === '2') {
              this.data.push(element)
            }
          })
        } else if (status === '3') { // 交易中
          response.data.data.forEach(element => {
            if (element.status === '3') {
              this.data.push(element)
            }
          })
        } else {
          this.data = response.data.data
        }
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.getdata()
    // this._initScroll()
  }
}
</script>

<style lang="stylus">
#myorder
  position absolute
  top 0
  left 0
  right 0
  bottom ０
  font-size .8rem
  color #999
  overflow-x hidden
  overflow-y auto
  .mint-popup-bottom
    width 100%
  .mint-cell
    border-bottom 1px solid #ddd
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
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    .mint-navbar
      background none
      .is-selected
       color #cda041
       border-bottom: 3px solid #cda041;
    .content
      position absolute
      top 4rem
      left 0
      right 0
      bottom 0
      .items
        .item
          margin-bottom .4rem
          border-top 1px solid #ddd
          border-bottom 1px solid #ddd
          color #999
          .item-time
            text-align right
            line-height 1.6rem
            padding-right .6rem
          .item-body
            padding 0 .6rem
            border-top 1px solid #ebebeb
            border-bottom 1px solid #ebebeb
            display flex
            justify-content space-between
            line-height 1.6rem
            text-align center
          .item-footer
            display flex
            justify-content space-between
            padding .5rem .6rem
            button
              padding 0 .4rem
              font-size .8rem
              height 1.4rem
              background #cda041
              color #ebebeb !important
</style>
