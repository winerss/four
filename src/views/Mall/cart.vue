<template>
  <div id="cart-page">
    <Header :showLeft="showLeft">
      <p slot="title">我的购物车</p>
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <div class="item" v-for="(item, index) in items" :key="index">
          <p class="selectGoods" @click="select(item)"><span v-show="item.status === true"></span></p>
          <p class="name">商品名：{{item.title}}</p>
          <p class="price">金额：{{item.price}}</p>
          <div class="num-input">
            <button @click="changeNum('mins', item)" class="mins" size="small">-</button>
            <input type="number" v-model="item.num">
            <button @click="changeNum('plus', item)" class="plus" size="small">+</button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <p class="total">商品总数：{{allNum}} 商品总金额： {{allPrice}}</p>
      <div class="btn-group">
        <mt-button @click="selectAll" type="primary" size="small">全选</mt-button>
        <mt-button @click="del" type="primary" size="small">删除</mt-button>
        <mt-button @click="goPage" type="primary" size="small">结算</mt-button>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/header'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      showLeft: true,
      items: [],
      allSelect: false,
      allNum: 0,
      allPrice: 0
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
    select (item) {
      item.status = !item.status
      let i = 0
      this.allPrice = 0
      this.items.forEach(element => {
        if (element.status) {
          this.allPrice += element.price * element.num
          i++
        }
      })
      this.allNum = i
    },
    selectAll () {
      if (this.allSelect) {
        this.items.forEach(element => {
          element.status = false
        })
        this.allSelect = false
      } else {
        this.items.forEach(element => {
          element.status = true
        })
        this.allSelect = true
      }
      let i = 0
      this.allPrice = 0
      this.items.forEach(element => {
        if (element.status) {
          this.allPrice += element.price * element.num
          i++
        }
      })
      this.allNum = i
    },
    del () {
      let list = []
      this.items.forEach(element => {
        if (element.status === true) {
          list.push(element.id)
        }
      })
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('data', JSON.stringify(list))
      this.axios.post(process.env.API_ROOT + '/api/block/del_buy_car', params).then((res) => {
        window.location.reload()
      })
    },
    changeNum (type, item) {
      if (type === 'mins') {
        if (item.num > 1) {
          item.num--
        } else {
          this.$toast({
            message: '数量不能小于1',
            position: 'bottom',
            duration: 1000
          })
        }
      } else if (type === 'plus') {
        item.num++
      }
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('car_id', item.id)
      params.append('num', item.num)
      this.axios.post(process.env.API_ROOT + '/api/block/edit_buy_car', params).then((res) => {})
      let i = 0
      this.allPrice = 0
      this.items.forEach(element => {
        if (element.status) {
          this.allPrice += element.price * element.num
          i++
        }
      })
      this.allNum = i
    },
    goPage () {
      let data = []
      this.items.forEach(element => {
        if (element.status) {
          data.push(element)
        }
      })
      window.localStorage.setItem('confirm', JSON.stringify(data))
      this.$router.push('/confirm')
    },
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/block/get_buy_car', params).then((res) => {
        console.log(res)
        res.data.data.forEach(element => {
          this.items.push({
            create_time: element.create_time,
            id: element.id,
            price: element.price,
            num: element.num,
            shop_id: element.shop_id,
            title: element.title,
            uid: element.uid,
            status: true
          })
          this.allPrice += element.price * element.num
        })
        this.allNum = this.items.length
        console.log(this.items)
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
#cart-page
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  color #666
  .container
    position absolute
    top 2.8rem
    bottom 4rem
    left 0
    right 0
    .wrapper
      .item
        position relative
        height 40px
        line-height 40px
        border-bottom 1px solid #ebebeb
        .selectGoods
          position relative
          float left
          margin-left .4rem
          margin-top 12px
          width: 18px
          height: 18px
          background: none
          border: 2px solid #cda041
          box-sizing border-box
          border-radius: 50%
          font-size: 0
          outline: none
          span
            position absolute
            background: #cda041
            width: 8px
            height: 8px
            top 3px
            left 3px
            display: inline-block
            border-radius: 50%
        p
          float left
          margin-left .4rem
          width 30%
          white-space nowrap
          text-overflow ellipsis
          overflow hidden
        .num-input
          position absolute
          right 1rem
          float right
          line-height 20px
          margin-top 8px
          color #ebebeb
          .mins
            float left
          .plus
            float right
          .mins,.plus
            cursor pointer
            height 22px
            width 20px
            padding 0
            border 1px solid  #ccc
            background none
            color #ebebeb
            border-radius 4px
            outline none
          input
            width 30px
            height 20px
            float left
            margin 0 4px
            text-align center
            border 1px solid #ccc
            border-radius 4px
            outline none
            color #ebebeb
            background none
  footer
    position fixed
    height 4.7rem
    bottom 0
    width 100%
    .total
      padding 0 .6rem
      height 1.6rem
      line-height 1.6rem
    .btn-group
      margin-top .5rem
      height 2.6rem
      width 100%
      display flex
      align-items center
      justify-content space-around
      .mint-button
        height 1.6rem
        margin 0 .4rem
        padding 0 .8rem
        background #cda041
        color #fff
</style>
