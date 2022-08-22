<template>
  <div>
    <div v-if="copiedAmount || copiedAddress" class="copied">
      <p>
        <i class="icofont-tick-mark"></i>
        {{ $t('copy') }}
      </p>

    </div>
    <div class="ex-wrapper">
      <div class="form-ex_holder">
        <div class="form-confirmation__main">
          <div class="form-confirmation__give d-flex flex-column">

            <div class="form-manual-must ">
              <p class="title text-center">
                {{ infoMsg(getOrder.status) }}
              </p>
              <ol v-if="$orderStatus(getOrder.status) ==='Created' || $orderStatus(getOrder.status) ==='Payment'">
                <li>
                  <div class="d-flex justify-content-between">
                    <p>
                      {{ $t('currency') }}
                    </p>
                    <div class="form-manual-must_txt">

                      <img :src="require(`~/assets/images/currency-logo/${getOrder.data.from_icon}`)" alt=""
                           class="mr-2"
                           height="25" width="25">

                      <span>{{ getOrder.data.from_name }}</span></div>
                  </div>
                </li>
                <li>
                  <div class="d-flex justify-content-between">
                    <p>
                      {{ $t('amount') }}
                    </p>
                    <div class="form-manual-must_txt">
                      {{ $formatNumber(getOrder.amount_from, getOrder.data.from_code) }} {{ getOrder.data.from_code }}
                      <i class="icofont-ui-copy"
                         @click="copyText($formatNumber(getOrder.amount_from, getOrder.data.from_code))"></i>
                    </div>

                  </div>
                </li>
                <li>
                  <div class="d-flex justify-content-between">
                    <p>
                      {{ $t('moneyTo') }}
                    </p>
                    <div v-if="getOrder.data.systemWallet !== 'manual_requisites'"
                         class="form-manual-must_txt adaptive-with-holder">
                      <div class="wallet-input">
                        {{ getOrder.data.systemWallet }}
                      </div>
                      <i class="icofont-ui-copy" @click="copyText(getOrder.data.systemWallet)"></i>
                    </div>
                    <div v-else>
                      <div>
                        <button id="tooltip-button-interactive"
                                class="fsz_btn_tooltip px-2 py-0 btn justify-content-center d-flex align-items-center btn-primary rounded-pill">
                          {{ $t('get_requisites') }}
                        </button>
                        <b-tooltip target="tooltip-button-interactive">{{ $t('manual_requisites') }}</b-tooltip>
                      </div>

                    </div>

                  </div>
                </li>
                <li class="d-none d-sm-none d-md-block">
                  <div v-if="getOrder.data.systemWallet !== 'manual_requisites'">
                    <div class="d-flex justify-content-center">{{ $t('qr_code_for_payment') }}</div>
                    <div class="d-flex justify-content-center">
                      <div class="qr-code">
                        <qrcode :size="175" :value="getOrder.data.systemWallet"></qrcode>
                      </div>
                    </div>
                  </div>

                </li>
                <li v-if="getOrder.data.tag">
                  <div class="d-flex justify-content-between">
                    <p>
                      Tag
                    </p>
                    <div class="form-manual-must_txt">
                      {{ getOrder.data.tag }} <i class="icofont-ui-copy" @click="copyText(getOrder.data.tag)"></i>
                    </div>

                  </div>
                </li>

              </ol>
              <ul v-if="$orderStatus(getOrder.status) ==='InputTransaction'">
                <li>
                  {{ $t('InputTransaction') }}
                  <div class="d-flex align-items-center">
                    <p class="full-w-colored-input">
                      {{ getOrder.data.tx_hash }}
                    </p>
                    <i class="icofont-ui-copy c-pointer" @click="copyText(getOrder.data.tx_hash)"></i>
                  </div>

                </li>
                <li>
                  {{ $t('needConfirmations') }}: {{ getOrder.data.need_confirmations }}
                </li>
              </ul>
            </div>

            <div v-if="$orderStatus(getOrder.status) === 'Created'" class="d-flex justify-content-center form-submit">
              <button :disabled="disabledButton"
                      class="btn justify-content-center d-flex align-items-center btn-primary rounded-pill"
                      @click="onPay">
                <b-spinner v-if="disabledButton" class="mr-2" small></b-spinner>
                {{ $t('iPaid') }}
              </button>
            </div>
          </div>
          <div class="form-confirmation__ref">
          <span>
<img alt="" src="../assets/images/ref_ex.svg">
          </span>
          </div>
          <div class="form-confirmation__give">
            <div class="form-confirmation__main--top">
              <h5 class="form-confirmation__main--title">
                {{ $t('take') }}
              </h5>
              <div class="form-confirmation__main--currency">
                <div class="form-confirmation__main--currency__name">
                  <img :src="require(`~/assets/images/currency-logo/${getOrder.data.to_icon}`)" alt="">
                  <span>{{ getOrder.data.to_name }}</span>
                </div>
                <p class="form-confirmation__main--currency__amount">
                  {{ $formatNumber(getOrder.amount_to, getOrder.data.to_code) }} {{ getOrder.data.to_code }}
                </p>
              </div>
            </div>
            <div v-if="getOrder.data.form.wallet" class="form-confirmation__main--address">
              <div class="form-confirmation__main--address__title">
                <span> {{ $t('walletNumber') }}</span>
              </div>
              <p>{{ getOrder.data.form.wallet }}</p>
            </div>
            <div v-if="getOrder.data.form.card" class="form-confirmation__main--address">
              <div class="form-confirmation__main--address__title">
                <span> {{ $t('cardNumber') }}</span>
              </div>
              <p>{{ getOrder.data.form.card }}</p>
            </div>
            <div class="form-confirmation__main--bottom">
              <span>
                {{ $t('amount') }}
              </span>
              <p>
                {{ $formatNumber(getOrder.amount_to, getOrder.data.to_code) }} {{ getOrder.data.to_code }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import Qrcode from 'v-qrcode'

export default {

  data() {
    return {
      walletNumber: '89647607958',
      copiedAmount: false,
      copiedAddress: false,
      interval: false,
      disabledButton: false
    }
  },
  components: {
    Qrcode,
  },
  computed: {
    ...mapGetters('swap', ['getOrder', 'getStatuses', 'statusFlag'])
  },

  mounted() {
    this.getDetailsOrder()
  },

  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
  },
  methods: {
    ...mapActions('swap', ['paymentOrder', 'getOrderShow']),

    async copyAmount() {
      await this.$copyText(this.getOrder.amount_from);
      this.copiedAmount = true;
      setTimeout(() => this.copiedAmount = false, 5000);
    },
    getDetailsOrder() {
      this.interval = setInterval(async () => {
        await this.getOrderShow(this.getOrder.hash)
      }, 5000);
    },
    async copyText(text) {
      await this.$copyText(text);
      this.copiedAddress = true;
      setTimeout(() => this.copiedAddress = false, 5000);
    },
    async onPay() {
      this.disabledButton = true
      await this.paymentOrder(this.getOrder.hash)
      yaCounter86088979.reachGoal ('confirmOrder')
      if (this.statusFlag) {
        await this.getOrderShow(this.getOrder.hash)
      } else {
        this.disabledButton = false
      }
    },
    infoMsg(status) {
      if (this.$orderStatus(status) === 'Created') {
        return this.$t('complete')
      }
      if (this.$orderStatus(status) === 'Payment') {
        return this.$t('check')
      }
      if (this.$orderStatus(status) === 'Waiting') {
        return this.$t('wait')
      }
      if (this.$orderStatus(status) === 'Completed') {
        return this.$t('successful')
      }
      if (this.$orderStatus(status) === 'Aml') {
        return this.$t('amlText')
      }
      if (this.$orderStatus(status) === 'InputTransaction') {
        return ''
      } else {
        return this.$t('canceled')
      }
    }
  }
}

</script>


<style>
.fsz_btn_tooltip {
  font-size: 0.81em;
}

.wallet-input {
  background-color: #32394e;
  padding: 5px;
  border: #32394e;
  border-radius: 5px;
  height: 36px;
  color: inherit;
  font-size: 12px;
  max-width: 100%;
  overflow-x: auto;
  text-align: right;
}

.full-w-colored-input {
  background-color: #32394e;
  padding: 5px;
  border: #32394e;
  border-radius: 5px;
  width: 100%;
  overflow-x: auto;
  font-size: 12px;
}

ol {
  padding-left: 0px !important;
}

.adaptive-with-holder {
  width: 60%;
}

.qr-code {
  background-color: white;
  padding: 5px;
}

@media screen and (max-width: 1000px) {
  .adaptive-with-holder {
    width: 50%;
  }
}
</style>
