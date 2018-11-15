<template>
  <div id="myHeader">
    <div class="left">
      <p v-if="showLeft" @click="goBack()">
        <img src="../assets/img/back.png" alt="">
        {{data.back}}
      </p>
      <p v-if="showHome"><slot name="home"></slot></p>
    </div>
    <div class="center">
      <p v-if="showTitle"><slot name="title"></slot></p>
    </div>
    <div class="right">
      <p v-if="showRight"><slot name="right"></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myHeader',
  props: {
    showLeft: {
      type: Boolean,
      default: false
    },
    backPath: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: false
    },
    showHome: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: {}
    }
  },
  methods: {
    goBack () {
      if (this.backPath) {
        this.$router.push(this.backPath)
      } else {
        this.$router.back()
      }
    }
  },
  mounted () {
    let data = {
      en: {
        back: 'back'
      },
      cn: {
        back: '返回'
      }
    }
    this.language = localStorage.getItem('language')
    if (localStorage.getItem('language') === 'en') {
      this.data = data.en
    } else {
      this.data = data.cn
    }
  }
}

</script>

<style lang="stylus">
#myHeader
  position fixed
  display flex
  z-index 2
  top 0
  left 0
  right 0
  height 2.8rem
  line-height 3rem
  font-weight bold
  background rgb(15,15,15)
  color #cda041
  justify-content space-between
  text-align center
  font-size .8rem
  border-bottom: 1px solid rgb(229, 208, 153);
  @media (min-width 1024px) {
    width 1024px
    left 50%
    margin-left -512px
  }
  .center
    position absolute
    left 0
    right 0
    top 0
    height 3.4rem
    z-index 1
  .left
    position absolute
    left .6rem
    z-index 4
    img
      float left
      height .8rem
      margin-top 1.1rem
  .right
    position absolute
    z-index 4
    right .6rem
    img
      margin-top .6rem
</style>
