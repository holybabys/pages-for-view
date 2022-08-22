<template>
  <div>
    <Main></Main>
  </div>
</template>

<script>
import Main from '../../components/Main'
import {mapGetters} from "vuex";

export default {
  async asyncData({error, store, params, route, app}) {
    try {
      await store.dispatch('swap/getMoney')
      await store.dispatch('rate/getCurrencyRates')
      if (route.params.exchange) {
        let money = store.getters['swap/getMoneys']
        let str = route.params.exchange
        let arr = str.split('-')
        let to = arr[3]
        let from = arr[1]
        let moneys = JSON.parse(JSON.stringify(money));
        let itemTo = moneys.find(item => item.link === to)
        let itemFrom = moneys.find(item => item.link === from)
        if (itemTo && itemFrom) {
          let params = {
            from_id: itemFrom.id,
            to_id: itemTo.id,
            lang: app.i18n.localeProperties.code
          }
          await store.dispatch('seo/getSeo', params)
        }
      }


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
  components: {
    Main
  },
  computed: {
    ...mapGetters('seo', ['getSeoList']),
  },
  mounted() {

  },


}
</script>
