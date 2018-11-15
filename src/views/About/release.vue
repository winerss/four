<template>
  <div id="release">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">释放钱包</p>
    </Header>
    <div class="container">
      <div class="income">
        <p class="current">当前值为</p>
        <p class="curMoney" >{{ curMoney }}</p>
      </div>
      <div class="detail">
        <p class="title"><span></span>资产明细</p>
        <div class="items">
          <div class="item" v-for="(item, index) in items" :key="index">
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
      <p class="footer" @click="goPage">兑换消费积分</p>
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
      items: [],
      curMoney: 0
    }
  },
  methods: {
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', 3)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((res) => {
        let data = res.data.data
        this.items = data
      })
    },
    goPage () {
      this.$router.push('/convert')
    }
  },
  components: {
    Header
  },
  mounted () {
    this.curMoney = this.$route.params.id
    this.getData()
  }
}
</script>

<style lang="stylus">
#release
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  background #fff
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
      background #26a2ff
      border-radius .4rem
      color #fff
      .current
        font-size .8rem
      .curMoney
        font-size 1.6rem
        line-height 3rem
    .detail
      margin-top 1rem
      .title
        color #333
        span
          display inline-block
          height 10px
          width 10px
          margin-right .5rem
          background #26a2ff
      .items
        padding-bottom 2.4rem
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
    .footer
      position fixed
      left 0
      right 0
      bottom 0
      height 2rem
      line-height 2rem
      text-align center
      background #ccc
      color #26a2ff
</style>
