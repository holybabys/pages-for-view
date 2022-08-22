<template>
  <div>

<Main></Main>
  </div>

</template>

<script>
import Main from '../components/Main'
import {mapGetters} from 'vuex'

/*  import swapMixin from "../mixins/swapMixin";*/
export default {
  layout: 'default',
  components: {
   Main
  },
  data() {
    return {
      showMobile: false
    }
  },

  async asyncData({error, store, app}) {
    try {
      let params = {
        lang: app.i18n.localeProperties.code
      }
      await store.dispatch('swap/getMoney'),
      await store.dispatch('rate/getCurrencyRates')
      await store.dispatch('seo/getSeo', params)


    } catch (err) {
      return error({
        statusCode: 404,
      })
    }
  },
  head() {
    return {
      title: this.getSeoList.title,
      meta: this.getSeoList.meta
    }
  },

  mounted() {
    const mediaQuery = window.matchMedia("(max-width:1024px)");
    this.showMobile = mediaQuery.matches;
    const listener = e => this.showMobile = e.matches;
    mediaQuery.addListener(listener);
    this.$once('hook:beforeDestroy', () => mediaQuery.removeListener(listener));
  },
  computed: {
    ...mapGetters('rate', ['getCurrencyRate']),
    ...mapGetters('seo', ['getSeoList']),
  }


}
</script>

<style>

</style>
