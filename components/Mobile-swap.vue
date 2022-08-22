<template>
  <form @submit.prevent="onAccept" novalidate>
    <div >
      <b-modal header-class="warning-header" body-class="warning-body"  content-class="warning-content" id="warning" hide-footer centered ref="warning" >
        <template #modal-title>
          {{$t('warning')}}
        </template>
        <p class="my-4">{{$t('serviceStop')}}</p>
      </b-modal>
    </div>
    <b-modal content-class="modal-content-tab" ref="give-modal" :title="$t('giveM')" hide-header-close hide-footer
    >
      <div class="input-holder">
        <input class="pl-3" @input="search(false)" type="text" :placeholder="$t('search')" v-model="searchGive">
      </div>
      <div class="my-tabs">
        <b-card no-body>
          <b-tabs @input="selectTab" card>
            <b-tab v-for="(item, index) in getTypes" :key="index" :title="$t(item.name)" :active="index===0">
              <ul class="my-ex-ul">
                <li v-if="money.from && changeItemTo.id !== money.id"
                    :class="{'active-money': changeItemFrom.id === money.id}"
                    v-for="(money, indexM) in searchItems" :key="`${'money_'}${indexM}`"
                    @click="changeMoney(money, true)">
                  <div>
                    <img :src="require(`~/assets/images/currency-logo/${money.icon}`)" alt="">
                    <span>
                              {{ money.name }}
                            </span>
                  </div>
                  <p>
                    min: {{ $formatNumber(money.min, money.code) }} {{ money.code }}
                  </p>
                </li>

              </ul>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </b-modal>
    <b-modal content-class="modal-content-tab" ref="take-modal" :title="$t('takeM')" hide-header-close hide-footer>
      <div class="input-holder">
        <input class="pl-3" @input="search(true)" type="text" :placeholder="$t('search')" v-model="searchTake">
      </div>
      <div class="my-tabs give_tab">
        <b-card no-body>
          <b-tabs @input="selectTab" card>
            <b-tab v-for="(item, index) in getTypes" :key="index" :title="item.name" :active="index===0">
              <ul class="my-ex-ul">
                <li v-if="money.to && changeItemFrom.id !== money.id"
                    :class="{'active-money': changeItemTo.id === money.id}" v-for="(money, indexM) in searchItems"
                    :key="`${'money_'}${indexM}`" @click="changeMoney(money, false)">
                  <div>
                    <img :src="require(`~/assets/images/currency-logo/${money.icon}`)" alt="">
                    <span>
                             {{ money.name }}
                           </span>
                  </div>
                  <p>
                    res: {{ $formatNumber(money.reserve_random, money.code) }} {{ money.code }}
                  </p>
                </li>
              </ul>
            </b-tab>
          </b-tabs>
        </b-card>

      </div>
    </b-modal>
    <p>
      {{ error }}
    </p>
    <div class="form-ex_holder-mobile row justify-content-between">

      <div class="receive mb-3 col-md-6 col-sm-6 col-xs-12">
        <div class="form-title">
          <h4>
            {{ $t('give') }}
          </h4>

        </div>
        <div class="input-holder">
          <div class="position-relative">
            <input @input="direction(true, false)" v-model="amountFrom"
                   step="0.001"
                   :placeholder="changeItemFrom.id ?  `min ${$formatNumber(changeItemFrom.min, changeItemFrom.code)}` : ''"
                   type="text"
                   :class="{error: $v.amountFrom.$error}"
                   class="pl-3 input-mobile-pl"
                   inputmode="decimal">
            <img @click="showModalGive" src="../assets/images/mobile_logo.svg" alt=""
                 class="position-absolute logo-left" v-if="!changeItemFrom.id">
            <img @click="showModalGive" src="../assets/images/mobile_logo.svg" alt=""
                 class="position-absolute active-icon-money" v-if="!changeItemFrom.id">
            <img class="position-absolute active-icon-arrow"
                 src="../assets/images/drop_arrow.svg" v-if="!changeItemFrom.id">
            <span class="position-absolute active-money-code" v-if="changeItemFrom.id">
              {{ changeItemFrom.code }}
            </span>
            <img @click="showModalGive" class="position-absolute active-icon-money" v-if="changeItemFrom.id"
                 :src="require(`~/assets/images/currency-logo/${changeItemFrom.icon}`)" alt="">
            <small v-if="$v.amountFrom.$dirty && !$v.amountFrom.required" class="text-danger text-center">
              {{ $t('required') }}
            </small>
          </div>
        </div>
        <div class="show-list_holder">


        </div>


      </div>
      <div class="give mb-3 col-md-6 col-xs-12 col-sm-6">

        <div class="form-title">
          <h4>
            {{ $t('take') }}
          </h4>

        </div>
        <div class="input-holder">
          <div class="position-relative">
            <input @input="direction(false, false)" v-model="amountTo"
                   :placeholder="changeItemTo.id ? `reserve ${$formatNumber(changeItemTo.reserve_random, changeItemTo.code)}` : ''"
                   type="text"
                   :class="{error: $v.amountTo.$error}"
                   class="pl-3 input-mobile-pl"
                   inputmode="decimal"
                   >

            <img @click="showModalTake" src="../assets/images/mobile_logo.svg" alt=""
                 class="position-absolute logo-left" v-if="!changeItemTo.id">
            <img @click="showModalTake" src="../assets/images/mobile_logo.svg" alt=""
                 class="position-absolute active-icon-money" v-if="!changeItemTo.id">
            <img class="position-absolute active-icon-arrow"
                 src="../assets/images/drop_arrow.svg" v-if="!changeItemTo.id">
            <span class="position-absolute active-money-code" v-if="changeItemTo.id">
              {{ changeItemTo.code }}
            </span>
            <img @click="showModalTake" class="position-absolute active-icon-money" v-if="changeItemTo.id"
                 :src="require(`~/assets/images/currency-logo/${changeItemTo.icon}`)" alt="">
            <small v-if="$v.amountTo.$dirty && !$v.amountTo.required" class="text-danger text-center">
              {{ $t('required') }}
            </small>
          </div>
        </div>
        <!--        <div class="show-list_holder">
                  <button type="button" @click="showModalTake" class="show-list">
                    {{ $t('direction') }}
                  </button>

                </div>-->
      </div>
      <div class="dataInput mb-3">


        <div class="d-flex justify-content-between">
           <span v-if="getRate" class="desc">
           {{ $t('rate') }}: {{ $formatNumber(getRate) }}

          </span>
          <span v-if="getRate" class="desc">
               {{ $t('res') }}: {{ changeItemTo.code }} {{
              $formatNumber(changeItemTo.reserve_random, changeItemTo.code)
            }}
        </span>
        </div>

        <div v-if="getInputs.length" v-for="(item, index) in getInputs" :key="`key_${index}`">
          <div class="title mt-2">
            {{ $t(item.label) }}
          </div>
          <div class="input-holder">
            <input :placeholder="$t(item.placeholder)" :id="item.name" type="text" v-mask="getMask(item.name)"
                   v-model="payload[item.name]"
                   class="pl-3"
                   :class="{error: $v.payload[item.name].$error}">
            <small v-if="$v.payload[item.name].hasOwnProperty('minLength') &&  !$v.payload[item.name].minLength"
                   class="text-danger text-center">

              {{ $t('minLength') }}
            </small>

            <small v-if="$v.payload[item.name].$error && !$v.payload[item.name].required"
                   class="text-danger text-center">

              {{ $t('required') }}
            </small>
            <p v-if="getError">
              <small class="text-danger">
                {{ $t(getError) }}
              </small>

            </p>
          </div>
        </div>

        <div class="dataInput--label">
          <label class="container-label">
            {{ $t('agree') }}
            <nuxt-link class="my-ex-link_rules" to="/rules"> {{ $t('rules') }}</nuxt-link>
            <input v-model="checkbox" name="agree" type="checkbox">
            <span class="checkmark"></span>
          </label>

        </div>
        <div class="show-list_holder">
          <button :disabled="disabledForm || !checkbox" type="submit"
                  class="d-flex align-items-center justify-content-center btn btn-primary  btn-lg text-center mb-2">
            <b-spinner v-if="disabledForm" small class="mr-2"></b-spinner>
            <p> {{ $t(buttonText) }} <span v-if="amountTo">{{ amountTo }} {{ changeItemTo.code }}</span></p>

          </button>
        </div>


        <p v-if="$v.changeItemFrom.id.$error || $v.changeItemTo.id.$error" class="text-danger text-center">
          {{ $t('pair') }}
        </p>

      </div>
    </div>
  </form>

</template>

<script>
import swapMixin from "../mixins/swapMixin";

export default {
  mixins: [swapMixin],
  data() {
    return {
      searchTake: '',
      searchGive: '',
      searchItems: [],
      changeIndex: 0,
      text: ''
    }
  },
  methods: {
    search(flag) {
      this.searchItems = this.getTab(this.getTypes[this.changeIndex].id).filter((item) => {
        let name = item.name.toLowerCase()
        if (name.indexOf(flag ? this.searchTake.toLowerCase() : this.searchGive.toLowerCase()) > -1) {

          return item
        }
      })
    },
    selectTab(index) {
      this.changeIndex = index
      this.searchItems = this.getTab(this.getTypes[index].id)
      this.searchTake = ''

    }
  },
  computed: {
    buttonText() {
      return this.changeItemTo.id && this.changeItemFrom.id && this.amountTo > 0 ? 'receive' : 'start'
    }
  },
  mounted() {
    this.selectTab(this.changeIndex)

  }
}


</script>

<style scoped>
.error {
  border: 1px solid #813e3e;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.form-ex_holder-mobile > div {
  padding: 10px !important;
  background: #2A3042;
  border-radius: 5px;
}

.form-title h4 {
  font-size: 14px;
  line-height: 21px;
}

.show-list_holder button {
  background: #556EE6;
  border-radius: 9px;
  margin-top: 5px;
  width: 100%;
  padding: 8px 12px;
  text-align: center;
  border: #556EE6;
  color: white;
  font-size: 12px;
  height: 50px;
}


</style>
