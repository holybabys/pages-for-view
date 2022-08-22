<template>
  <div>

    <div class="container">
      <div class="desktop-swap">
        <div v-if="this.$i18n.locale === 'ru' && !getSeoList.header" class=" page-intro_title mt-3 mb-4">
          <h1 v-if="showIntro">

            {{ $t('intro') }}
          </h1>
          <h1 v-if="showExchangeIntro"
              class="exIntro">
            {{ $t('start') }} {{ this.changeItemFrom.name }} на {{ this.changeItemTo.name }}


          </h1>
          <h2 v-if="showIntro">
            {{ $t('service') }}

          </h2>
        </div>
        <div v-if="this.$i18n.locale === 'tr' && !getSeoList.header" class=" page-intro_title mt-3 mb-4">
          <h1 v-if="showIntro">

            {{ $t('intro') }}
          </h1>
          <h1 v-if="showExchangeIntro"
              class="exIntro">
            {{ $t('start') }} {{ this.changeItemFrom.name }} на {{ this.changeItemTo.name }}


          </h1>
          <h2 v-if="showIntro">
            {{ $t('service') }}

          </h2>
        </div>
        <div v-if="this.$i18n.locale === 'en' && !getSeoList.header" class=" page-intro_title mt-3 mb-4">
          <h1 v-if="showIntro">

            {{ $t('intro') }}
          </h1>
          <h1 v-if="showExchangeIntro"
              class="exIntro">
            {{ $t('start') }} {{ this.changeItemFrom.name }} на {{ this.changeItemTo.name }}


          </h1>
          <h2 v-if="showIntro">
            {{ $t('service') }}

          </h2>
        </div>


        <div v-if="getSeoList.header" class=" page-intro_title mt-3 mb-4">
        <h1 class="exIntro">
          {{getSeoList.header}}
        </h1>
        </div>


        <b-modal id="advice" ref="advice" body-class="warning-body"
                 centered content-class="warning-content" footer-class="popup-footer"
                 header-class="warning-header"
                 ok-only @hidden="acceptModal">
          <template #modal-title>
            {{ $t('warning') }}
          </template>
          <p class="my-4">{{ $t('adviceText') }}</p>

        </b-modal>
        <form class="ex-wrapper" novalidate @submit.prevent="onAccept">
          <div>
            <b-modal id="warning" ref="warning" body-class="warning-body" centered content-class="warning-content"
                     footer-class="popup-footer" header-class="warning-header" ok-only>
              <template #modal-title>
                {{ $t('warning') }}
              </template>
              <p class="my-4">{{ $t('serviceStop') }}</p>
            </b-modal>
            <b-modal id="work-time" ref="work-time" body-class="warning-body" centered content-class="warning-content"
                     footer-class="popup-footer" header-class="warning-header" ok-only>
              <template #modal-title>
                {{ $t('warning') }}
              </template>
              <p class="my-4">
                {{ $t('workDesc') }} ({{ get_time.from }} - {{ get_time.to }} GMT+3)
              </p>
            </b-modal>
          </div>

          <div class="form-ex_holder">
            <div class="receive">
              <div class="form-title">
                <h4>
                  {{ $t('give') }}
                </h4>
                <i class="icofont-long-arrow-up"></i>
              </div>
              <div class="input-holder">
                <div class="position-relative">
                  <input v-model="amountFrom" :class="{error: $v.amountFrom.$error}"
                         :placeholder="changeItemFrom.id ? `min ${$formatNumber(changeItemFrom.min, changeItemFrom.code)}` : ''"
                         class="pl-2"
                         inputmode="decimal" type="number"
                         @input="direction(true, false)">
                  <img v-if="changeItemFrom.id" :src="require(`~/assets/images/currency-logo/${changeItemFrom.icon}`)"
                       alt="" class="position-absolute active-icon-money">

                  <small v-if="$v.amountFrom.$dirty && !$v.amountFrom.required" class="text-danger text-center">
                    {{ $t('required') }}
                  </small>

                </div>
              </div>
              <div class="my-tabs">

                <b-card no-body>
                  <b-tabs v-model="tabFrom" card>
                    <b-tab v-for="(item, index) in getTypes" v-if="getTab(item.id).length" :key="index"
                           :title="$t(item.name)">

                      <ul class="my-ex-ul">
                        <li v-for="(money, indexM) in getTab(item.id)"
                            v-if="money.from && changeItemTo.id !== money.id"
                            :key="`${'money_'}${indexM}`" :class="{'active-money': changeItemFrom.id === money.id}"
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

            </div>
            <div class="give">

              <div class="form-title">
                <h4>
                  {{ $t('take') }}
                </h4>
                <i class="icofont-long-arrow-down"></i>
              </div>
              <div class="input-holder">
                <div class="position-relative">
                  <input v-model="amountTo" :class="{error: $v.amountTo.$error}"
                         :placeholder="changeItemTo.id ? `reserve ${$formatNumber(changeItemTo.reserve_random, changeItemTo.code)}` : ''"
                         class="pl-2"
                         inputmode="decimal"
                         type="number"
                         @input="direction(false, false)">
                  <img v-if="changeItemTo.id" :src="require(`~/assets/images/currency-logo/${changeItemTo.icon}`)"
                       alt="" class="position-absolute active-icon-money">
                  <small v-if="$v.amountTo.$dirty && !$v.amountTo.required" class="text-danger text-center">
                    {{ $t('required') }}
                  </small>
                </div>
              </div>
              <div class="my-tabs give_tab">
                <b-card no-body>
                  <b-tabs v-model="tabTo" card>
                    <b-tab v-for="(item, index) in getTypes" v-if="getTab(item.id).length" :key="index"
                           :title="$t(item.name)"
                    >

                      <ul class="my-ex-ul">
                        <li v-for="(money, indexM) in getTab(item.id)"
                            v-if="money.to && changeItemFrom.id !== money.id"
                            :key="`${'money_'}${indexM}`"
                            :class="{'active-money': changeItemTo.id === money.id}" @click="changeMoney(money, false)">
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
            </div>
            <div v-if="!get_work" class="dataInput">

              <div class="form-title">
                <h4>
                  {{ $t('details') }}
                </h4>
                <i class="icofont-long-arrow-left"></i>
              </div>
              <div class="d-flex justify-content-center align-items-center">
                <img alt="" src="../assets/images/warning.png">
              </div>
              <p>
                {{ $t('workDesc') }} ({{ get_time.from }} - {{ get_time.to }} GMT+3)
              </p>
            </div>
            <div v-if="get_work" class="dataInput">

              <div class="form-title">
                <h4>
                  {{ $t('details') }}
                </h4>
                <i class="icofont-long-arrow-left"></i>
              </div>
              <ul class="change-ul mt-2">
                <li v-if="changeItemFrom.id">
                  <div>
                    <img :src="require(`~/assets/images/currency-logo/${changeItemFrom.icon}`)" alt="">
                    <span>
                        {{ changeItemFrom.name }}
                        </span>
                  </div>
                </li>
                <li v-if="changeItemTo.id">
                  <div>
                    <img :src="require(`~/assets/images/currency-logo/${changeItemTo.icon}`)" alt="">
                    <span>
                        {{ changeItemTo.name }}
                        </span>
                  </div>
                </li>


              </ul>
              <span v-if="this.amountFrom && this.amountTo" class="desc">
           {{ $t('rate') }}: {{ getRate }}
          </span>
              <div v-for="(item, index) in getInputs" v-if="getInputs.length" :key="`key_${index}`">
                <div class="title mt-2">
                  {{ $t(item.label) }}

                </div>
                <div class="input-holder">
                  <input :id="item.name" v-model="payload[item.name]" v-mask="getMask(item.name)"
                         :class="{error: $v.payload[item.name].$error}"
                         :placeholder="$t(item.placeholder)"
                         type="text">
                  <small v-if="$v.payload[item.name].hasOwnProperty('minLength') &&  !$v.payload[item.name].minLength"
                         class="text-danger text-center">

                    {{ $t('minLength') }}
                  </small>

                  <small v-if="$v.payload[item.name].$error && !$v.payload[item.name].required"
                         class="text-danger text-center">

                    {{ $t('required') }}
                  </small>
                  <p v-if="getError === 'address'">
                    <small class="text-danger">
                      {{ $t(getError) }}
                    </small>

                  </p>
                  <p v-if="validError">
                    <small class="text-danger">
                      {{ $t(validError) }}
                    </small>

                  </p>
                </div>
              </div>

              <div class="dataInput&#45;&#45;label">
                <label class="container-label">
                  {{ $t('agree') }}
                  <nuxt-link v-if="this.$i18n.locale === 'ru'" class="my-ex-link_rules" to="/rules_ru"> {{
                      $t('rules')
                    }}
                  </nuxt-link>
                  <nuxt-link v-if="this.$i18n.locale === 'en'" class="my-ex-link_rules" to="/rules_en"> {{
                      $t('rules')
                    }}
                  </nuxt-link>
                  <nuxt-link v-if="this.$i18n.locale === 'tr'" class="my-ex-link_rules" to="/rules_tr"> {{
                      $t('rules')
                    }}
                  </nuxt-link>
                  <input v-model="checkbox" name="agree" type="checkbox">
                  <span class="checkmark"></span>
                </label>

              </div>

              <button :disabled="disabledForm || !checkbox"
                      class="d-flex align-items-center justify-content-center btn btn-primary  btn-lg text-center mb-2"
                      type="submit">
                <b-spinner v-if="disabledForm" class="mr-2" small></b-spinner>
                <p>{{ $t('start') }}</p>

              </button>


              <p v-if="$v.changeItemFrom.id.$error || $v.changeItemTo.id.$error" class="text-danger">
                {{ $t('pair') }}
              </p>

            </div>
          </div>
        </form>
      </div>
      <div class="mobile-swap">
        <b-modal id="advice" ref="advice" body-class="warning-body" centered
                 content-class="warning-content" footer-class="popup-footer"
                 header-class="warning-header" ok-only
                 @hidden="acceptModal">
          <template #modal-title>
            {{ $t('warning') }}
          </template>
          <p class="my-4">{{ $t('adviceText') }}</p>
        </b-modal>

        <form novalidate @submit.prevent="onAccept">
          <div>
            <b-modal id="warning" ref="warning" body-class="warning-body" centered
                     content-class="warning-content" footer-class="popup-footer" header-class="warning-header" ok-only>
              <template #modal-title>
                {{ $t('warning') }}
              </template>
              <p class="my-4">{{ $t('serviceStop') }}</p>
            </b-modal>
          </div>
          <b-modal ref="give-modal" :title="$t('giveM')" content-class="modal-content-tab" hide-footer hide-header-close
          >
            <div class="input-holder">
              <input v-model="searchGive" :placeholder="$t('search')" class="pl-3" type="text" @input="search(false)">
            </div>
            <div class="my-tabs">
              <b-card no-body>
                <b-tabs v-model="tabFrom" card @input="selectTab">
                  <b-tab v-for="(item, index) in getTypes" v-if="getTab(item.id).length" :key="index"
                         :title="$t(item.name)">
                    <ul class="my-ex-ul">
                      <li v-for="(money, indexM) in searchItems"
                          v-if="money.from && changeItemTo.id !== money.id"
                          :key="`${'money_'}${indexM}`" :class="{'active-money': changeItemFrom.id === money.id}"
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
          <b-modal ref="take-modal" :title="$t('takeM')" content-class="modal-content-tab" hide-footer
                   hide-header-close>
            <div class="input-holder">
              <input v-model="searchTake" :placeholder="$t('search')" class="pl-3" type="text" @input="search(true)">
            </div>
            <div class="my-tabs give_tab">
              <b-card no-body>
                <b-tabs v-model="tabTo" card @input="selectTab">
                  <b-tab v-for="(item, index) in getTypes" v-if="getTab(item.id).length" :key="index"
                         :title="$t(item.name)">
                    <ul class="my-ex-ul">
                      <li v-for="(money, indexM) in searchItems"
                          v-if="money.to && changeItemFrom.id !== money.id" :key="`${'money_'}${indexM}`"
                          :class="{'active-money': changeItemTo.id === money.id}" @click="changeMoney(money, false)">
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

            <div class="receive mb-3 col-md-6 col-sm-12">
              <div class="form-title">
                <h4>
                  {{ $t('give') }}
                </h4>

              </div>
              <div class="input-holder">
                <div class="position-relative">
                  <input v-model="amountFrom" :class="{error: $v.amountFrom.$error}"
                         :placeholder="changeItemFrom.id ?  `min ${$formatNumber(changeItemFrom.min, changeItemFrom.code)}` : ''"
                         class="pl-5"
                         inputmode="decimal"
                         step="0.001"
                         type="number"
                         @input="direction(true, false)">
                  <img v-if="!changeItemFrom.id" alt="" class="position-absolute logo-left"
                       src="../assets/images/mobile_logo.svg" @click="showModalGive">
                  <img v-if="!changeItemFrom.id" alt="" class="position-absolute active-icon-money"
                       src="../assets/images/mobile_logo.svg" @click="showModalGive">
                  <img v-if="!changeItemFrom.id"
                       class="position-absolute active-icon-arrow" src="../assets/images/drop_arrow.svg">
                  <span v-if="changeItemFrom.id" class="position-absolute active-money-code">
              {{ changeItemFrom.code }}
            </span>
                  <img v-if="changeItemFrom.id" :src="require(`~/assets/images/currency-logo/${changeItemFrom.icon}`)"
                       alt=""
                       class="position-absolute active-icon-money left" @click="showModalGive">
                  <img v-if="changeItemFrom.id" :src="require(`~/assets/images/currency-logo/${changeItemFrom.icon}`)"
                       alt=""
                       class="position-absolute active-icon-money" @click="showModalGive">
                  <small v-if="$v.amountFrom.$dirty && !$v.amountFrom.required" class="text-danger text-center">
                    {{ $t('required') }}
                  </small>
                </div>
              </div>
              <div class="show-list_holder">


              </div>


            </div>
            <div class="give mb-3 col-md-6 col-sm-12">

              <div class="form-title">
                <h4>
                  {{ $t('take') }}
                </h4>

              </div>
              <div class="input-holder">
                <div class="position-relative">
                  <input v-model="amountTo" :class="{error: $v.amountTo.$error}"
                         :placeholder="changeItemTo.id ? `reserve ${$formatNumber(changeItemTo.reserve_random, changeItemTo.code)}` : ''"
                         class="pl-5"
                         inputmode="decimal"
                         type="text"
                         @input="direction(false, false)"
                  >

                  <img v-if="!changeItemTo.id" alt="" class="position-absolute logo-left"
                       src="../assets/images/mobile_logo.svg" @click="showModalTake">
                  <img v-if="!changeItemTo.id" alt="" class="position-absolute active-icon-money"
                       src="../assets/images/mobile_logo.svg" @click="showModalTake">
                  <img v-if="!changeItemTo.id"
                       class="position-absolute active-icon-arrow" src="../assets/images/drop_arrow.svg">
                  <span v-if="changeItemTo.id" class="position-absolute active-money-code">
              {{ changeItemTo.code }}
            </span>
                  <img v-if="changeItemTo.id" :src="require(`~/assets/images/currency-logo/${changeItemTo.icon}`)"
                       alt=""
                       class="position-absolute active-icon-money left" @click="showModalGive">
                  <img v-if="changeItemTo.id" :src="require(`~/assets/images/currency-logo/${changeItemTo.icon}`)"
                       alt=""
                       class="position-absolute active-icon-money" @click="showModalTake">
                  <small v-if="$v.amountTo.$dirty && !$v.amountTo.required" class="text-danger text-center">
                    {{ $t('required') }}
                  </small>
                </div>
              </div>
              <!--                    <div class="show-list_holder">
                                      <button type="button" @click="showModalTake" class="show-list">
                                        {{ $t('direction') }}
                                      </button>

                                    </div>-->
            </div>
            <div class="dataInput mb-3">


              <div class="d-flex justify-content-between">
           <span v-if="this.amountTo && this.amountFrom" class="desc">
           {{ $t('rate') }}: {{ getRate }}

          </span>
                <span v-if="getRate" class="desc">
               {{ $t('res') }}: {{ changeItemTo.code }} {{
                    $formatNumber(changeItemTo.reserve_random, changeItemTo.code)
                  }}
        </span>
              </div>

              <div v-for="(item, index) in getInputs" v-if="getInputs.length" :key="`key_${index}`">
                <div class="title mt-2">
                  {{ $t(item.label) }}
                </div>
                <div class="input-holder">
                  <input :id="item.name" v-model="payload[item.name]" v-mask="getMask(item.name)"
                         :class="{error: $v.payload[item.name].$error}"
                         :placeholder="$t(item.placeholder)"
                         class="pl-3"
                         type="text">
                  <small v-if="$v.payload[item.name].hasOwnProperty('minLength') &&  !$v.payload[item.name].minLength"
                         class="text-danger text-center">

                    {{ $t('minLength') }}
                  </small>

                  <small v-if="$v.payload[item.name].$error && !$v.payload[item.name].required"
                         class="text-danger text-center">

                    {{ $t('required') }}
                  </small>

                </div>
              </div>
              <p v-if="validError">
                <small class="text-danger">
                  {{ $t(validError) }}
                </small>

              </p>
              <div class="dataInput&#45;&#45;label">
                <label class="container-label">
                  {{ $t('agree') }}
                  <nuxt-link v-if="this.$i18n.locale === 'ru'" class="my-ex-link_rules" to="/rules_ru"> {{
                      $t('rules')
                    }}
                  </nuxt-link>
                  <nuxt-link v-if="this.$i18n.locale === 'en'" class="my-ex-link_rules" to="/rules_en"> {{
                      $t('rules')
                    }}
                  </nuxt-link>
                  <nuxt-link v-if="this.$i18n.locale === 'tr'" class="my-ex-link_rules" to="/rules_en"> {{
                      $t('rules')
                    }}
                  </nuxt-link>
                  <input v-model="checkbox" name="agree" type="checkbox">
                  <span class="checkmark"></span>
                </label>

              </div>
              <div class="show-list_holder">
                <button :disabled="disabledForm || !checkbox"
                        class="d-flex align-items-center justify-content-center btn btn-primary  btn-lg text-center mb-2"
                        type="submit">
                  <b-spinner v-if="disabledForm" class="mr-2" small></b-spinner>
                  <p> {{ $t(buttonText) }} <span v-if="amountTo">{{ amountTo }} {{ changeItemTo.code }}</span></p>

                </button>
              </div>


              <p v-if="$v.changeItemFrom.id.$error || $v.changeItemTo.id.$error" class="text-danger text-center">
                {{ $t('pair') }}
              </p>

            </div>
          </div>
        </form>
      </div>
    </div>


  </div>


</template>

<script>
import swapMixin from "../mixins/swapMixin";
import {mapActions, mapGetters} from "vuex";

export default {
  mixins: [swapMixin],

  data() {
    return {
      searchTake: '',
      searchGive: '',
      searchItems: [],
      changeIndex: 0,
      text: '',
      showBanner: '',
      itemTo: [],
      tabFrom: null,
      tabTo: null,
      showIntro: true,
      showExchangeIntro: false,

    }
  },
  head() {
/*    return {
      title: this.getSeo.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }*/
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

    },

  },
  computed: {

    buttonText() {
      return this.changeItemTo.id && this.changeItemFrom.id && this.amountTo > 0 ? 'receive' : 'start'
    }
  },
  async mounted() {
    this.selectTab(this.changeIndex)


  },


}
</script>
<style>
.warning-header {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background: #32394E;
}

.popup-footer {
  background: #2A3042;
  border-top: none;
  justify-content: center
}


.popup-footer button {
  width: 150px;
  text-align: center;
}

.warning-body {
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

.exIntro {
  height: 79px;
  padding-top: 25px;
}

.cookie_banner {
  background-color: black;
  position: sticky;
  bottom: 0;
  width: 100%;
  padding-bottom: 45px;
  padding-top: 45px;
  z-index: 4;
}

.cookie_banner-btn {
  padding: 5px 15px;
}

.close {
  color: white;
}

.close:hover {
  color: white;
}

@media only screen and (max-width: 768px) {
  .popup-footer button {
    width: 100%;
  }
}

</style>
<style>


</style>
