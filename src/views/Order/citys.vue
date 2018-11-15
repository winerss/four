<template>
  <div id="citys">
    <mt-cell @click.native="back(item)" v-for="item in citys" :key="item.id" :title="lang === 'cn' ? item.city : item.encity">
      <p>{{ item.tel }}</p>
    </mt-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lang: 'cn',
      citys: [{
        city: '中国大陆', tel: '86', encity: 'Chinese'
      }, {
        city: '中国台湾', tel: '886', encity: 'Taiwan, China'
      }, {
        city: '美国', tel: '1', encity: 'America'
      }, {
        city: '马来西亚', tel: '60', encity: 'Malaysia'
      }, {
        city: '香港', tel: '852', encity: 'HongKong'
      }, {
        city: '澳门', tel: '853', encity: 'macau'
      }, {
        city: '韩国', tel: '82', encity: 'South Korea'
      }, {
        city: '日本', tel: '81', encity: 'Japan'
      }, {
        city: '菲律宾', tel: '63', encity: 'Philippines'
      }, {
        city: '泰国', tel: '66', encity: 'Thailand'
      }, {
        city: '澳大利亚', tel: '61', encity: 'Australia'
      }, {
        city: '黎巴嫩', tel: '961', encity: 'Lebanon'
      }, {
        city: '叙利亚', tel: '963', encity: 'Syria'
      }, {
        city: '新加坡', tel: '65', encity: 'Singapore'
      }, {
        city: '缅甸', tel: '95', encity: 'Myanmar'
      }]
    }
  },
  methods: {
    back (city) {
      this.$store.commit('selectedCity', {
        city
      })
      this.$router.back()
    }
  },
  mounted () {
    if (localStorage.getItem('language') === 'en') {
      this.lang = 'en'
    } else {
      this.lang = 'cn'
    }
  }
}
</script>

<style lang="stylus">
</style>
