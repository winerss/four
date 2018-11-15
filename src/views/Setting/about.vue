<template>
  <div id="about-app">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{lang.title}}</p>
    </Header>
    <div class="container">
      <div class="logo">
        <img src="../../assets/img/avatar.png" alt="">
        <p class="info">{{lang.version}} 1.0.0</p>
      </div>
      <div class="items">
        <mt-cell :title="lang.label" is-link>
          <p>{{lang.content}}</p>
        </mt-cell>
        <mt-cell :title="lang.label2" is-link>
        </mt-cell>
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
      showTitle: true
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
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .logo
      margin-top 2rem
      text-align center
      img
        height 4rem
      .info
        margin-top 1rem
        margin-bottom .5rem
    .items
      .mint-cell-wrapper
        background-image none
      .mint-field
        .mint-cell-title
          width 80px
      .mint-cell
        margin-top .8rem
        color #333
        border-bottom 1px solid #ddd
        .mint-cell-text
          font-size .8rem
      .mint-cell:last-child
        background-image none
</style>
