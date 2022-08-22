<template>
  <div>
    <div class="ex-wrapper">
      <div class="form-ex_holder">
        <div class="form-confirmation__main">
          <div class="form-confirmation__give">
            <div class="form-confirmation__main--top">
              <h5 class="form-confirmation__main--title">
                Give away
              </h5>
              <div class="form-confirmation__main--currency">
                <div class="form-confirmation__main--currency__name">
                  <img :src="require(`~/assets/images/currency-logo/${getOrder.data.from_icon}`)" alt="">
                  <span>{{getOrder.data.from_name}}</span>
                </div>
                <p class="form-confirmation__main--currency__amount">
                  {{getOrder.amount_from}} {{getOrder.data.from_code}}
                </p>
              </div>
            </div>
            <div class="form-confirmation__main--bottom">
                  <span>
                    Total:
                  </span>
              <p>
                {{getOrder.amount_from}} {{getOrder.data.from_code}}
              </p>
            </div>
          </div>
          <div class="form-confirmation__ref">
          <span>
<img src="../assets/images/ref_ex.svg" alt="">
          </span>
          </div>
          <div class="form-confirmation__give">
            <div class="form-confirmation__main--top">
              <h5 class="form-confirmation__main--title">
                Take
              </h5>
              <div class="form-confirmation__main--currency">
                <div class="form-confirmation__main--currency__name">
                  <img :src="require(`~/assets/images/currency-logo/${getOrder.data.to_icon}`)" alt="">
                  <span>{{getOrder.data.to_name}}</span>
                </div>
                <p class="form-confirmation__main--currency__amount">
                  {{getOrder.amount_to}} {{getOrder.data.to_code}}
                </p>
              </div>
            </div>
            <div class="form-confirmation__main--address">
              <div class="form-confirmation__main--address__title">
                <span>Number Wallet:</span>

              </div>
              <p>{{walletNumber}}</p>
            </div>
            <div class="form-confirmation__main--bottom">
                  <span>
                    Total:
                  </span>
              <p>
                {{getOrder.amount_to}} {{getOrder.data.to_code}}
              </p>
            </div>
          </div>
        </div>

      </div>
      <div class="form-confirmation__bottom">
        <div class="form-confirmation__bottom--btns">
          <button class="btn btn-reject">
            Cancel
          </button>
          <button @click.prevent="onPay" class="btn btn-primary rounded-pill">
            Pay
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {

    data() {
      return {
        giveAmount: '123',
        giveCurrencyName: 'Bitcoin',
        giveCurrencyCode: 'BTC',
        walletNumber: '89647607958',
        takeAmount: '17000',
        takeCurrencyName: 'Qiwi',
        takeCurrencyCode: 'RUB',
      }
    },
    computed: {
      ...mapGetters('swap', ['getOrder'])
    },
    methods: {
      ...mapActions('swap', ['paymentOrder']),
     async onPay() {
        await this.paymentOrder(this.getOrder.hash)
      }
    }
  }
</script>

