<template>
  <div>

    <div class="container mt-80">
      <Rate v-if="rateView"/>
    </div>
    <Swap/>
    <Seo/>
    <Benefits/>
    <div v-if="showBanner" class="cookie_banner">
      <div class="container d-flex justify-content-between align-items-center">
        <p class="col-md-9 ">
          {{ $t('cookie_info') }}
          <nuxt-link v-if="this.$i18n.locale === 'ru'" class="my-ex-link_rules" to="/cookie_ru"> {{ $t('cookie_link') }}
          </nuxt-link>
          <nuxt-link v-if="this.$i18n.locale === 'en'" class="my-ex-link_rules" to="/cookie_en"> {{ $t('cookie_link') }}
          </nuxt-link>
          <nuxt-link v-if="this.$i18n.locale === 'tr'" class="my-ex-link_rules" to="/cookie_tr"> {{ $t('cookie_link') }}
          </nuxt-link>
        </p>
        <div class="col-md-3 d-flex justify-content-between align-items-center position-relative">
          <p class="mr-3">

          </p>
          <button class="btn btn-primary cookie_banner-btn" @click="closeBanner">{{ $t('close_cookie') }}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Swap from '../components/Swap'
import Mobile from '../components/Mobile-swap'
import Rate from '../components/RateViewer'
import Benefits from '../components/Benefits'
import Seo from '../components/Seo'

import {mapGetters} from 'vuex'

/*  import swapMixin from "../mixins/swapMixin";*/
export default {
  layout: 'default',
  components: {
    Swap,
    Mobile,
    Rate,
    Benefits,
    Seo
  },
  data() {
    return {
      showMobile: false,
      showBanner: '',
      rateView: false
    }
  },

  methods: {
    closeBanner() {
      this.showBanner = 0
      this.$cookie.set('banner', '0', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365 * 10
      })
    },
    async getCookie() {
      const cookieRes = this.$cookie.get('banner')
      if (cookieRes === 0) {
        this.showBanner = 0
      } else {
        this.showBanner = 1
      }

    }
  },
  mounted() {
    this.getCookie()
  },
  computed: {
    ...mapGetters('rate', ['getCurrencyRate'])
  }


}
</script>

<style>

</style>
