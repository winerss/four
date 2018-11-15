<template>
  <div id="freeze">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">冻结钱包</p>
    </Header>
    <div class="container">
      <div class="income" :class="{active:isActive}">
        <p class="current">当前值</p>
        <p class="curMoney">{{ curMoney }}</p>
      </div>
      <div class="detail">
        <p class="title"><span></span>资产明细</p>
        <div class="items">
          <div class="item" v-for="(item, index) in items" :key="index">
            <div class="top">
              <p class="name">{{item.note}}</p>
              <p class="price">{{item.account}}</p>
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
      items: [],
      curMoney: 0,
      mydate: {},
      isActive: false
    }
  },
  created () {
    this.isActive = false
  },
  methods: {
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', 4)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((res) => {
        let data = res.data.data
        this.items = data
      })
    },
    getdate () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/block/get_month', params).then((res) => {
        this.mydate = res.data.data
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.curMoney = this.$route.params.id
    this.getData()
    this.getdate()
    setTimeout(() => {
      this.$nextTick(function () {
        this.isActive = true
      })
    }, 500)
  }
}
</script>

<style lang="stylus">
#freeze
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    padding 0 .8rem
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .income
      width: 90%;
      margin: 1rem auto;
      padding: 1rem 0;
      @media (min-width 1024px) {
        width 80%
        margin 1rem auto
        padding 2rem 0
      }
      color: #ebebeb;
      text-align: center;
      -webkit-box-shadow: 0px 2px 1px 3px #333;
      box-shadow: 0px 2px 1px 3px #333;
      border-radius: 0.4rem;
      -webkit-transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      -moz-transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      -ms-transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      -o-transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      transition-timing-function: ease-out;
      -moz-transition-timing-function: ease-out; /* Firefox 4 */
      -webkit-transition-timing-function: ease-out; /* Safari 和 Chrome */
      -o-transition-timing-function: ease-out; /* Opera */
      box-shadow:0 0px 0px 0 rgba(33,33,33,0);
      transform-origin: top left;
      transform:rotateX(-180deg) rotateY(20deg);
      -webkit-transform:rotateX(-180deg) rotateY(20deg);
      opacity: 0;
      &.active
        transform:rotateX(0deg) rotateY(0deg);
        -webkit-transform:rotateX(0deg) rotateY(0deg);
        opacity:1;
        box-shadow 0px 0px 10px 2px #cda041
      .current
        font-size .8rem
        @media (min-width 1024px) {
          font-size 1rem
          line-height 2rem
        }
      .curMoney
        font-size 1.6rem
        line-height 3rem
        color #cda041
      .month
        display flex
        justify-content space-around
        @media (min-width 1024px) {
          font-size 1.8rem
        }
    .detail
      margin-top 1rem
      .title
        color #cda041
        span
          display inline-block
          height 10px
          width 10px
          margin-right .5rem
          background #cda041
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
          .top
            p:nth-child(1)
              color #cda041
            p:nth-child(2)
              color #CD0000
</style>
