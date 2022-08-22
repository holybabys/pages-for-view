<template>
  <div>
    <div v-if="copiedHash" class="copied">
      <p>
        <i class="icofont-tick-mark"></i>
        {{ $t('copy') }}
      </p>

    </div>
    <div class="form-confirmation-manual-bloc mt-3 mb-4">
      <div class="form-confirmation-manual-number mb-3">
        <h1>
          {{ $t($orderStatus(getOrder.status)) }}
        </h1>
        <p v-if="getOrder.data.canceled_reason && $orderStatus(getOrder.status) === 'Canceled'">
          {{ $t('reason') }}: {{ $t(getOrder.data.canceled_reason) }}
        </p>
        <p>
          <!--          ID:-->
          <span>
              № {{ getOrder.hash }}
            </span>
        </p>
        <b-alert show v-if="getOrder.data.errorMessage" variant="danger" class="">
          {{
            $t("messageError")
          }}
        </b-alert>

        <div v-if="getOrder.data.tx_hash_output">
          <div class="d-flex">
            <p class="mr-2">
              TX hash:
            </p>
            <div class="form-manual-must_txt">
              {{ getOrder.data.tx_hash_output }} <i @click="copyText(getOrder.data.tx_hash_output)"
                                                    class="icofont-ui-copy"></i>
            </div>

          </div>
        </div>
      </div>
      <div
        v-if="$orderStatus(getOrder.status) ==='Created'
         || $orderStatus(getOrder.status) ==='Payment'
          || $orderStatus(getOrder.status) ==='InputTransaction'"
        class="form-confirmation-manual-actual">
        <div class="form-confirmation-manual-overtime">
          <i class="icofont-sand-clock"></i>
        </div>
        <div class="form-confirmation-manual-actual-info">
          <div class="d-flex justify-content-between">
            <p>
              {{ $t('actualRate') }}:
            </p>
            <p class="text-right">
              <!--            Actual until: 19 Aug 2021, 16:59-->
              {{ dateOrder }}
            </p>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <p>
              {{ $t('timeLeftRate') }}:
            </p>
            <p class="mr--20 text-left">
              <b>{{
                  minutes > 0 ? minutes < 10 ? "0" + minutes : minutes : "00"
                }}:{{ seconds > 0 ? seconds < 10 ? "0" + seconds : seconds : "00" }}</b>
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      interval: null,
      minutes: null,
      seconds: null,
      copiedHash: false,
      inputTransactionStatus: 20
    }
  },
  computed: {
    ...mapGetters('swap', ['getOrder', 'getStatuses']),
    dateOrder() {
      // if (this.status('InputTransaction') === this.getOrder.status||
      //   this.status('Created') === this.getOrder.status ||
      //   this.status('Payment') === this.getOrder.status) {
        let totalSeconds = Math.floor(new Date(this.getOrder.timer).getTime() / 1000 + this.getOrder.data.time)
        return new Date(totalSeconds * 1000).toLocaleString('ru')
      // }
      // else {
      //   let totalSeconds = Math.floor(new Date(this.getOrder.created_at).getTime() / 1000 + this.getOrder.data.time)
      //   return new Date(totalSeconds * 1000).toLocaleString('ru')
      // }

    },

  },
  mounted() {
    this.interval = setInterval(() => {
      this.setMinutes()
      this.setSeconds()
    }, 1000);

  },
  methods: {
    setMinutes() {
      let totalSeconds = this.getTotalSeconds()
      this.minutes = Math.floor(totalSeconds % 3600 / 60);
    },
    status(arg) {
      const status = this.getStatuses.find(item => item.value === arg)
      return status ? status.id : ''
    },
    setSeconds() {
      let totalSeconds = this.getTotalSeconds()
      this.seconds = Math.floor(totalSeconds % 60);
    },
    getTotalSeconds() {
      // if (this.status('InputTransaction') === this.getOrder.status ||
      //   this.status('Created') === this.getOrder.status ||
      //   this.status('Payment') === this.getOrder.status) {
        let time = Math.floor(new Date(this.getOrder.timer).getTime() / 1000) + this.getOrder.data.time
        return Math.floor((time - new Date().getTime() / 1000))
      // }
      // else {
      //   let time = Math.floor(new Date(this.getOrder.created_at).getTime() / 1000) + this.getOrder.data.time
      //   return Math.floor((time - new Date().getTime() / 1000))
      // }
    },

    async copyText(text) {
      await this.$copyText(text);
      this.copiedHash = true;
      setTimeout(() => this.copiedHash = false, 5000);
    },
  },

  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
  },


}
</script>

