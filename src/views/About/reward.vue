<template>
  <div id="reward">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">分享奖励</p>
    </Header>
    <div class="container">
      <div class="income">
        <p class="current">当前总收益</p>
        <p class="curMoney" @click="goDetail('/balance', 'balance')">{{ head.today }}</p>
        <p class="yesterday">昨日收益</p>
        <p class="yesMoney">{{head.yesterday}}</p>
      </div>
      <div class="integration">
        <div class="consume">
          <p class="title">左社区</p>
          <p class="money">{{head.left}}</p>
        </div>
        <div class="line"></div>
        <div class="cash">
          <p class="title">右社区</p>
          <p class="money">{{head.right}}</p>
        </div>
      </div>
      <div class="detail">
        <p class="title"><span></span>交易记录</p>
        <div class="items">
          <div class="item" v-for="(item, index) in body" :key="index">
            <div class="top">
              <p>{{item.note}}</p>
              <p>{{item.account}}</p>
            </div>
            <div class="bottom">
              <p>{{item.create_time}}</p>
              <p>{{item.c_account}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showTitle: true,
      showLeft: true,
      head: {},
      body: []
    }
  },
  methods: {
    get_fx () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', 9)
      this.axios.post(process.env.API_ROOT + '/api/user/get_fx', params).then((res) => {
        this.head = res.data.data.head
        this.body = res.data.data.body
        console.log(res)
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.get_fx()
  }
}
</script>

<style lang="stylus">
#reward
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
    padding 0 .8rem
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .income
      margin .8rem 0
      padding .5rem 0
      text-align center
      background #1b82d2
      border-radius .4rem
      color #fff
      .current
        font-size .8rem
      .curMoney
        font-size 1.6rem
        line-height 3rem
      .yesMoney
        font-size 1rem
        line-height 2rem
    .integration
      display flex
      height 2.4rem
      padding .5rem 0
      text-align center
      border-radius .4rem
      background #1b82d2
      color #fff
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
    .detail
      margin-top 1rem
      .title
        color #333
        span
          display inline-block
          height 10px
          width 10px
          margin-right .5rem
          background #1b82d2
      .items
        color #333
        .item
          margin-top 8px;
          height 60px
          line-height 30px
          border-top 1px solid #ddd
          border-bottom 1px solid #ddd
          .top,.bottom
            display flex
            justify-content space-between
</style>
