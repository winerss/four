<template>
  <div id="language">
    <Header :showLeft="showLeft" :showRight=showRight :showTitle="showTitle">
      <p slot="title">{{data.title}}</p>
      <p slot="right" @click="confirm">{{data.save}}</p>
    </Header>
    <div class="container">
      <div class="items">
        <mt-cell @click.native="select('cn')" title="简体中文">
          <p v-show="language === 'cn'">√</p>
        </mt-cell>
        <mt-cell @click.native="select('en')" title="English">
          <p v-show="language === 'en'">√</p>
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
      language: 'cn',
      showLeft: true,
      showRight: true,
      showTitle: true,
      data: {}
    }
  },
  methods: {
    select (language) {
      this.language = language
    },
    confirm () {
      if (this.language === 'en') {
        localStorage.setItem('language', 'en')
      } else {
        localStorage.setItem('language', 'cn')
      }
      window.location.reload()
    }
  },
  components: {
    Header
  },
  mounted () {
    let data = {
      en: {
        title: 'Language Setting',
        save: 'Save'
      },
      cn: {
        title: '语言设置',
        save: '保存'
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
#language
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  background #f5f5f5
  color #000
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
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
