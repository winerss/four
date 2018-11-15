<template>
  <div id="mall-address">
    <Header :showLeft="showLeft">
      <p slot="title">地址管理</p>
    </Header>
    <div class="container">
      <mt-radio class="mt-check" v-model="typeValue" @change.native="checked" :options="options"></mt-radio>
    </div>
    <footer @click="goPage">添加地址</footer>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data () {
    return {
      showLeft: true,
      typeValue: '1',
      options: [{
        label: 'winerss 18883988888 上海市松江区xxxyy小区',
        value: '1'
      },
      {
        label: 'winerss 18883988888 上海市松江区xxxyy小区',
        value: '2'
      }]
    }
  },
  methods: {
    checked () {
      this.$nextTick(() => {
        console.log(this.typeValue)
      })
    },
    goPage () {
      this.$router.push('/addressEdit')
    }
  },
  components: {
    Header
  },
  mounted () {
  }
}
</script>

<style lang="stylus">
#mall-address
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  @media (min-width: 1024px) {
    width 1024px
    left 50%
    margin-left -512px
  }
  .mint-cell
    margin-top .4rem
    .mint-cell-wrapper
      padding .4rem 0
      background none
      line-height 1.4rem
  .container
    position absolute
    top 2.8rem
    bottom 2.6rem
    left 0
    right 0
    background #f5f5f5
  footer
    position fixed
    height 2.6rem
    bottom 0
    width 100%
    text-align center
    line-height 2.6rem
    font-size .8rem
    background #CD0000
    color #333
</style>
