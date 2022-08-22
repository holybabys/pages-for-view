import {mapActions, mapGetters, mapMutations} from 'vuex'
import {email, minLength, required, requiredIf, sameAs} from 'vuelidate/lib/validators'
import debounce from "lodash/debounce";
import {BigNumber} from "bignumber.js";

export default {


  data() {
    return {
      changeItemFrom: {},
      changeItemTo: {},
      fields_crypto: [
        {
          key: 'coin',
          label: '',
          variant: 'left'
        },
        {
          key: 'name',
          label: '',
          variant: 'left'
        },
        {
          key: 'volume',
          label: '',
          variant: 'left'
        },

      ],
      checkbox: false,
      disabledForm: false,
      amountFrom: null,
      inputFlag: true,
      amountTo: null,
      payload: {},
      error: '',
      rate: '',
      amount: '',
      bitcoinCode: 'BTC',
      from: '',
      to: '',

    }
  },
  validations: {
    amountTo: {
      required
    },
    amountFrom: {
      required
    },
    changeItemFrom: {
      id: {
        required
      }
    },
    changeItemTo: {
      id: {
        required
      }
    },
    checkbox: {
      sameAs: sameAs(() => true)
    },
    payload: {
      wallet: {
        required: requiredIf(function () {
          return !!this.getInputs.find(item => item.name === 'wallet');
        })
      },
      card: {
        required: requiredIf(function () {
          return !!this.getInputs.find(item => item.name === 'card');
        }),
        minLength: minLength(19)
      },
      email: {
        email,
        required: requiredIf(function () {
          return !!this.getInputs.find(item => item.name === 'email');
        })
      }
    }
  },
  computed: {
    ...mapGetters('swap', ['getTypes', 'getMoneys', 'getRate', 'getInputs',
      'getAmount', 'getHash', "getWork", 'getDirectionFrom', 'getCrypto', 'getError', 'validError', 'getWorkTimePeriod',]),
    ...mapGetters('rate', ['getCurrencyRate']),
    ...mapGetters('seo', ['getSeoList']),
    ...mapGetters(['get_time', 'get_work']),
  },

  methods: {
    ...mapActions('swap', ['getDirections', 'createOrder',]),
    ...mapActions('seo', ['getSeo']),
    ...mapActions(['getInfo']),

    ...mapMutations('swap', ['SET_RATE', 'SET_ERROR']),
    getTab(id) {

      return this.getMoneys.filter(item => item.type_id === id)

    },
    getMask(data) {
      if (data === 'card') {
        return '#### #### #### ####'
      } else return ''
    },
    saveCurrentTitle() {
      if (Object.keys(this.changeItemFrom).length == 0
        && this.changeItemFrom.constructor === Object
        && Object.keys(this.changeItemTo).length == 0 && this.changeItemTo.constructor === Object
        || Object.keys(this.changeItemFrom).length !== 0
        && this.changeItemFrom.constructor === Object &&
        Object.keys(this.changeItemTo).length == 0 && this.changeItemTo.constructor === Object
        || Object.keys(this.changeItemFrom).length == 0
        && this.changeItemFrom.constructor === Object &&
        Object.keys(this.changeItemTo).length !== 0 && this.changeItemTo.constructor === Object) {
        this.showIntro = true
      }
      if (Object.keys(this.changeItemFrom).length !== 0
        && this.changeItemFrom.constructor === Object
        && Object.keys(this.changeItemTo).length !== 0 && this.changeItemTo.constructor === Object) {
        this.showExchangeIntro = true
        this.showIntro = false
      }
    },
   async saveCurrentDirection() {
/*
      this.selectTab(this.changeIndex)
*/

      if (this.$route.params.exchange) {
        let str = this.$route.params.exchange
        let arr = str.split('-')
        let to = arr[3]
        let from = arr[1]
        this.to = to
        this.from = from
        let moneys = JSON.parse(JSON.stringify(this.getMoneys));
        let itemTo = moneys.find(item => item.link === to)
        let itemFrom = moneys.find(item => item.link === from)
        if (itemTo && itemFrom) {
          this.changeItemTo = itemTo
          this.changeItemFrom = itemFrom
          this.$nextTick(() => {
            this.tabTo = itemTo.type_id - 1
            this.tabFrom = itemFrom.type_id - 1
          })
        } else {
          this.$nuxt.error({ statusCode: 404, message: 'Not found' })

        }
      }
      this.saveCurrentTitle()
    },
    changeMoney(item, flag) {
      if (flag) {
        this.changeItemFrom = item
      } else {
        this.changeItemTo = item
      }
      this.SET_ERROR('')
      this.payload = {}
      if (this.$refs['give-modal'] || this.$refs['give-modal']) {
        this.$refs['give-modal'].hide()
        this.$refs['take-modal'].hide()
      }
      this.direction(false, true)
      let link = `/exchange-${this.changeItemFrom.link}-to-${this.changeItemTo.link}`

      if (Object.keys(this.changeItemFrom).length !== 0 &&
        this.changeItemFrom.constructor === Object && Object.keys(this.changeItemTo).length !== 0
        && this.changeItemTo.constructor === Object ) {
        history.replaceState({}, '', link)
        this.saveCurrentTitle()
      }
      if (Object.keys(this.changeItemFrom).length !== 0 &&
        this.changeItemFrom.constructor === Object && Object.keys(this.changeItemTo).length !== 0
        && this.changeItemTo.constructor === Object && this.$i18n.locale === 'tr') {
        history.replaceState({}, '', `/tr${link}`)
        this.saveCurrentTitle()
      }
      if (Object.keys(this.changeItemFrom).length !== 0 &&
        this.changeItemFrom.constructor === Object && Object.keys(this.changeItemTo).length !== 0
        && this.changeItemTo.constructor === Object && this.$i18n.locale === 'en') {
        history.replaceState({}, '', `/en${link}`)
        this.saveCurrentTitle()
      }
      if(window.location.pathname){
        let str = window.location.pathname
        let arr = str.split('-')
        let to = arr[3]
        let from = arr[1]
        this.to = to
        this.from = from
      }
    },


    async onAccept() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.disabledForm = true
        let payload = {
          form: this.payload,
          from_id: this.changeItemFrom.id,
          to_id: this.changeItemTo.id,
        }
        if (this.inputFlag) {
          payload.amount_from = this.amountFrom
        } else {
          payload.amount_to = this.amountTo
        }
        if (this.changeItemFrom.code === this.bitcoinCode) {
          this.showModalAdvice()
        } else {
          await this.sendOrder(payload)
        }
      }
    },


    async acceptModal() {
      let payload = {
        form: this.payload,
        from_id: this.changeItemFrom.id,
        to_id: this.changeItemTo.id,
      }
      if (this.inputFlag) {
        payload.amount_from = this.amountFrom
      } else {
        payload.amount_to = this.amountTo
      }
      await this.sendOrder(payload)
    },

    async sendOrder(payload) {
      await this.createOrder(payload)
      if (this.getWork) {
        this.showModalWarning()
      }

      if (this.getWorkTimePeriod) {
        this.showModalWorkTime()
      }
      if (this.getHash) {
        jivo_api.setCustomData([
          {
            "title": "Order",
            "content": this.getHash,
          },
          {
            "title": "Change from",
            "content": this.changeItemFrom.name,
          },
          {
            "title": "Amount from",
            "content": this.amountFrom.toString(),
          },
          {
            "title": "Change to",
            "content": this.changeItemTo.name,
          },
          {
            "title": "Amount to",
            "content": this.amountTo.toString()
          },
          {
            "title": "Location",
            "content": this.$i18n.locale
          },
        ]);
        yaCounter86088979.reachGoal ('createOrder')
        await this.$router.replace({path: `/order/${this.getHash}`})
        this.SET_RATE('')
      } else {
        this.disabledForm = false
      }
    },

    directionDebounce: debounce(async function (params) {
      await this.getDirections(params)
    }, 500),

    direction: debounce(async function (inputFlag, selectFlag) {
      if (!selectFlag) {
        this.inputFlag = inputFlag
      }
      if (this.amountFrom > 0) {

        this.amountFrom = new BigNumber(this.amountFrom).toNumber()
      }
      if (this.amountTo > 0) {

        this.amountTo = new BigNumber(this.amountTo).toNumber()
      }
      if (this.changeItemFrom.id && this.changeItemTo.id) {
        let params = {
          from_id: this.changeItemFrom.id,
          to_id: this.changeItemTo.id,
          lang: this.$i18n.locale.toLowerCase()
        }
        if (this.inputFlag && this.amountFrom) {
          params.amount_from = this.amountFrom
        }
        if (!this.inputFlag && this.amountTo) {
          params.amount_to = this.amountTo
        }
        if (selectFlag) {
          await this.getDirections(params)
          await this.getSeo(params)
        } else {
          this.directionDebounce(params)
        }
      }

    }, 500),
    showModalGive() {
      this.$refs['give-modal'].show()
    },
    showModalTake() {
      this.$refs['take-modal'].show()
    },
   async directions() {
      let params = {
        from_id: this.changeItemFrom.id,
        to_id: this.changeItemTo.id,
      }
      await this.getDirections(params)
    },
    showModalWarning() {
      this.$refs['warning'].show()
    },
    showModalWorkTime() {
      this.$refs['work-time'].show()
    },

    showModalAdvice() {
      this.$refs['advice'].show()
    },

  },
  watch: {
    getAmount(newVal) {
      if (this.inputFlag) {
        this.amountTo = newVal > 0 ? this.$formatNumber(newVal, this.changeItemTo.code) : ''
      } else {
        this.amountFrom = newVal > 0 ? this.$formatNumber(newVal, this.changeItemFrom.code) : ''
      }
    }
  },
  async mounted() {
 /*   await this.$store.dispatch('swap/getMoney')
    await this.$store.dispatch('rate/getCurrencyRates')*/
    await this.saveCurrentDirection()

  }
}
