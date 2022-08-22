<template>
  <div>
    <div class="mt-80">
      <div class="container">
        <manual/>
        <confirm />
      </div>

    </div>
  </div>

</template>

<script>
  import manual from "~/components/manual";
  import info from "~/components/info";
  import confirm from "~/components/confirm";
  import {mapGetters} from "vuex";

  export default {
    layout: 'default',

    async asyncData ({ error, store, params }) {
      try {
        await store.dispatch('swap/getOrderShow', params.hash)

      } catch (err) {
        error(err)
      }
    },
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
      ...mapGetters('swap', ['getStatuses', 'getOrder'])
    },
    components: {
      manual,
      info,
      confirm
    }

  }
</script>

<style>
  .mr-30 {
    margin-right: 30px;
  }

  .header-holder {
    margin: 0 10px;
  }

  .header-holder p {
    margin-top: 5px;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    color: #FFFFFF;
  }

  .title_p {
    margin-top: 10px;
    font-weight: bold !important;
    font-size: 15px;
    line-height: 22px;
  }

  .time-desc {
    font-size: 36px !important;
    line-height: 54px !important;
    margin-top: 0px !important;
    margin-left: 10px;
    margin-bottom: 0px !important;
  }

  .accept_ul {
    padding: 10px;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
  }

  .mt-10 {
    margin-top: 10px;
  }

  .accept_p {
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    margin-top: 9px;
    margin-bottom: 0px;
  }

  .accept_p span {
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    margin-left: 10px;
  }

  .accept-btn {
    width: 49%;
    background: #32394E;
    border-radius: 5px;
    border: 1px solid #32394E;
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    padding: 8px 12px;
  }

  .accept-btn:hover {
    background: #556EE6;
    cursor: pointer;
  }
</style>
