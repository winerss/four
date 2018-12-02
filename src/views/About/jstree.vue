<template>
  <div id="jstree">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">我的分享</p>
    </Header>
    <div class="container">
      <v-jstree :data="data" show-checkbox multiple allow-batch whole-row @item-click="itemClick"></v-jstree>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import VJstree from 'vue-jstree'
export default {
  data () {
    return {
      showLeft: true,
      showTitle: true,
      data: [{
          "text": "root",
          "selected": "true",
          "children": [{
            "text": "A00001",
            "children": [{
              "text": "A00002",
              "children": [{
                  "text": "A00003"
                }]
              }]
            }, {
              "text": "B00001"
            }, {
              "text": "C00001"
            }, {
              "text": "D00001"
            }
          ]
        }
      ]
    }
  },
  methods: {
    itemClick (node) {
      console.log(node.model.text + ' clicked !')
    }
  },
  components: {
    Header,
    VJstree
  },
  mounted () {
  }
}
</script>

<style lang="stylus">
#jstree
  .container
    position absolute
    top 2.8rem
    bottom 2.8rem
    left 0
    right 0
    padding 0 .8rem
    overflow-y scroll
    text-align center
    color #cda041
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    // background #fff
</style>
