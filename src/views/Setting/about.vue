<template>
  <div id="about-app">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{lang.title}}</p>
    </Header>
    <div class="container">
      <div class="logo">
        <img src="../../assets/img/logo.jpg" alt="">
        <p class="info">{{lang.version}} 1.0.0</p>
      </div>
      <div class="items">
        <mt-cell :title="lang.label">
          <p>{{lang.content}}</p>
        </mt-cell>
        <!-- <mt-cell :title="lang.label2" is-link>
        </mt-cell> -->
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
      lang: {}
    }
  },
  components: {
    Header
  },
  mounted () {
    let lang = {
      en: {
        title: 'About',
        label: 'Check version',
        label2: 'To score',
        content: 'The Latest Version',
        version: 'Version Number'
      },
      cn: {
        title: '关于',
        label: '检查更新',
        label2: '去评分',
        content: '已是最新版本',
        version: '版本号'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
  }
}
</script>

<style lang="stylus">
#about-app
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  color #cda041
  .container
    position absolute
    top 2.8rem
    bottom 0
    left .6rem
    right 0.6rem
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .logo
      margin-top 3rem
      text-align center
      img
        height 4rem
      .info
        margin-top 1rem
        margin-bottom 2.5rem
    .items
      .mint-cell-wrapper
        background-image none
      .mint-field
        .mint-cell-title
          width 80px
      .mint-cell
        margin-top .8rem
        color #333
        background none
        border-top 1px solid #ebebeb
        border-bottom 1px solid #ebebeb
        .mint-cell-value
          font-size .8rem
          color #cda041
        .mint-cell-text
          font-size .8rem
      .mint-cell:last-child
        background-image none
</style>
