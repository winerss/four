<template>
  <div id="product">
    <Header :showTitle="showTitle" :showLeft="showLeft" :showRight="showRight">
      <p slot="title">产品中心</p>
      <p @click="goPage" slot="right">我的订单</p>
    </Header>
    <div class="container">
      <mt-navbar class="page-part" v-model="type">
        <mt-tab-item v-for="item in products" :key="item.id" @click.native="picker(item.key)" :id="item.key">{{item.title}}</mt-tab-item>
      </mt-navbar>
      <div class="content">
        <div class="product">
          <div class="right">
            <p class="name">{{products[type - 1].title}}</p>
            <p class="coin">价格：{{products[type - 1].point}}</p>
          </div>
        </div>
        <div class="address">
          <mt-field label="收货人" placeholder="请输入收货人姓名" v-model='form.user'></mt-field>
          <mt-field label="联系方式" placeholder="请输入联系方式" v-model='form.tel'></mt-field>
          <div class="borbox ">
            <mt-field label="收货地区" placeholder="请选择收货地区" :value="form.address" readonly @click.native="showAddressAreaPicker = !showAddressAreaPicker" class="address"></mt-field>
            <mt-popup v-model="showAddressAreaPicker" class="address-picker" position="bottom">
              <mt-picker :slots="slots1" value-key="name" @change="onValuesChange1"></mt-picker>
              <mt-picker :slots="slots2" value-key="name" @change="onValuesChange2"></mt-picker>
              <mt-picker :slots="slots3" value-key="name" @change="onValuesChange3"></mt-picker>
            </mt-popup>
            <p class="link"></p>
          </div>
          <mt-field label="详细地址" placeholder="请输入详细地址信息" v-model='form.addressDetail'></mt-field>
        </div>
        <mt-field label="交易密码" type="password" placeholder="请输入≥6的字母+数字的密码" v-model='form.password'></mt-field>
        <mt-button size="small" @click.native="confirm" :class="{ active: isActive }" class="confirm">购买</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showLeft: true,
      showTitle: true,
      showRight: true,
      type: '1',
      form: {
        address: '',
        user: '',
        tel: '',
        password: '',
        addressDetail: '',
        amount: 1
      },
      value: '1',
      isActive: false,
      showAddressAreaPicker: false,
      data: {},
      provinceList: [],
      city: [],
      area: [],
      selectedp: '',
      selectedc: '',
      selecteda: '',
      slots1: [
        {
          values: [],
          className: 'slot',
          textAlign: 'center'
        }
      ],
      slots2: [
        {
          values: [],
          className: 'slot',
          textAlign: 'center'
        }
      ],
      slots3: [
        {
          values: [],
          className: 'slot',
          textAlign: 'center'
        }
      ],
      products: [],
      url: ''
    }
  },
  created () {
    this.url = process.env.API_ROOT
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.address && oldValue.tel && oldValue.amount && oldValue.password && oldValue.user) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  methods: {
    goPage () {
      this.$router.push('/productOrder')
    },
    getArea () {
      var params = new FormData()
      params.append('cityId', '1')
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_address', params).then((response) => {
        this.data = response.data.data
        this.data.forEach(element => {
          if (element.type === '1') {
            this.provinceList.push(element)
          } else if (element.type === '2') {
            this.city.push(element)
          } else if (element.type === '3') {
            this.area.push(element)
          }
        })
        this.slots1[0].values = this.provinceList
      })
    },
    // 获取城市选择的值
    onValuesChange1 (picker, values) {
      // 获取city
      this.selectedp = ''
      this.slots2[0].values = ['请选择']
      this.provinceList.forEach(province => {
        if (province.name === picker.getSlotValue(0).name) {
          this.city.forEach(city => {
            if (city.parent_id === picker.getSlotValue(0).id) {
              this.slots2[0].values.push(city)
            }
          })
        }
      })
      this.selectedp = picker.getSlotValue(0).name
    },
    onValuesChange2 (picker, values) {
      this.selectedc = ''
      this.slots3[0].values = ['请选择']
      this.city.forEach(city => {
        if (city.name === picker.getSlotValue(0).name) {
          this.area.forEach(area => {
            if (area.parent_id === picker.getSlotValue(0).id) {
              this.slots3[0].values.push(area)
            }
          })
        }
      })
      this.selectedc = picker.getSlotValue(0).name
    },
    onValuesChange3 (picker, values) {
      this.selecteda = picker.getSlotValue(0).name
      this.form.address = this.selectedp + this.selectedc + this.selecteda
    },
    picker (type) {
      this.type = type
    },
    getProduct () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/block/get_product', params).then((res) => {
        res.data.data.forEach((element, index) => {
          this.products.push({
            id: element.id,
            point: element.point,
            reword: element.reword,
            title: element.title,
            inventory: element.inventory,
            key: (index + 1).toString()
          })
        })
      })
    },
    confirm () {
      if (!this.isActive) return false
      let reg = /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(this.form.tel)) {
        this.$toast({
          message: '请检查您的手机格式',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', this.products[this.type - 1].id)
      params.append('sign', 1)
      params.append('amount', this.form.amount)
      params.append('receive_name', this.form.user)
      params.append('receive_address', this.form.address + this.form.addressDetail)
      params.append('receive_tel', this.form.tel)
      params.append('erji', this.form.password)
      this.axios.post(process.env.API_ROOT + '/api/login/jihuo', params).then((res) => {
        this.$toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (res.data.code === 1) {
          this.$router.push('/productOrder')
        }
      })
    }
  },
  mounted () {
    this.getProduct()
    this.getArea()
  },
  components: {
    Header
  }

}
</script>

<style lang="stylus">
#product
  position absolute
  top 0
  left 0
  right 0
  bottom 2.8rem
  font-size .8rem
  // background #f5f5f5
  color #999
  .mint-navbar
    background none
    .mint-tab-item.is-selected
      border-bottom: 3px solid #cda041;
      color: #cda041;
  .address-picker
    display flex
  .picker
    flex 1
    text-align center
  .mint-popup-bottom
    width 100%
  .mint-cell
    background none
    border-bottom 1px solid #999
    .mint-cell-title
      color #cda041
    .mint-cell-value
      input
        background none
        color #999
  .mint-cell-wrapper
    background-image none
    .mint-cell-value
      font-size .8rem
  .mint-field
    .mint-cell-title
      width 80px
      font-size .8rem
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    .page-part
      position absolute
      z-index 2
      top 0
      width 100%
    .content
      position absolute
      top 2.8rem
      bottom 0
      overflow auto
      width 100%
      @media (min-width 768px) {
        width 60%
        height 600px
        padding 5%
        left 15%
        top 10%
        border-radius .4rem
        box-shadow 0 0 20px 3px #666
      }
      .title
        padding 0 .8rem
        line-height 2rem
        color #ebebeb
        @media (min-width 768px) {
          margin .2rem 0
        }
      .title:nth-child(1){
        @media (min-width 768px) {
          margin-top 2rem
        }
      }
      .product
        overflow hidden
        padding 0 .8rem
        margin-top 2rem
        .left
          float left
          img
            height 40px
            margin-top .6rem
        .right
          float left
          margin-left .6rem
          .name
            font-size 1rem
            color #cda041
          .coin
            font-size .6rem
            line-height 2rem
      .tips
        padding 0 .8rem
        margin-top .8rem
        line-height 2rem
        color #999
        margin-bottom .8rem
        img
          float left
          margin-top .5rem
          margin-right .5rem
          height 16px
      .confirm
        display block
        width 90%
        max-width 300px
        margin 1rem auto
        background #ddd
        max-width 200px
      .active
        background #00c087
        color #fff
</style>
