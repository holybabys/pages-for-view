<template>
  <div>
    <div class="mt-80">

      <div class="container">
      <manual></manual>
      <confirm></confirm>

      </div>

    </div>
  </div>

</template>

<script>
  import manual from "~/components/manual";
  import confirm from "~/components/confirm";
  export default {
    layout: 'default',
    data() {
      return {
        giveAmount: '123',
        giveCurrencyName: 'Bitcoin',
        giveCurrencyCode: 'BTC',
        walletNumber: '89647607958',
        takeAmount: '17000',
        takeCurrencyName: 'Qiwi',
        takeCurrencyCode: 'RUB',
        copiedAmount: false,
        copiedAddress: false,
        copiedComment: false,
        dealNumber: '777',
        giveWalletAddress: ''
      }
    },
    components: {
      manual,
     confirm
    },
    methods: {
      onPay() {
        this.$router.replace({path: '/succes'});
      },
      async copyAmount() {
        await this.$copyText(this.giveAmount);
        this.copiedAmount = true;
        setTimeout(() => this.copiedAmount = false, 5000);
      },
      async copyAccount() {
        await this.$copyText(this.giveWalletAddress);
        this.copiedAddress = true;
        setTimeout(() => this.copiedAddress = false, 5000);
      },
      async copyComment() {
        await this.$copyText(this.dealNumber);
        this.copiedComment = true;
        setTimeout(() => this.copiedComment = false, 5000);
      },
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
