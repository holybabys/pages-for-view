<template>
  <div class="container benefits">
    <div class="benefits-title">
      <h2>
        {{ $t('benefits.discount') }}
      </h2>
      <h3>
        {{ $t('benefits.discountDesc') }}
      </h3>
    </div>
    <div class="benefits-slider">
      <p class="price-text">
        {{ $t('benefits.give') }}
      </p>
      <div class="benefits-bar">

        <div class="d-flex scale justify-content-around">

          <div class="scale-item w-10 position-relative">
            <p class="price-one position-absolute one">
              100$
            </p>
            <p class="price-line line-one position-absolute">

            </p>

          </div>
          <div class="scale-item w-20 position-relative">
            <p class="price-one two position-absolute">
              500$
            </p>
            <p class="price-line line-two position-absolute">

            </p>

          </div>
          <div class="scale-item w-20 position-relative">
            <p class="price-one position-absolute three">
              1 000$
            </p>
            <p class="price-line line-three position-absolute">

            </p>

          </div>
          <div class="scale-item w-20 position-relative">
            <p class="price-one position-absolute four">
              10 000$
            </p>
            <p class="price-line position-absolute">

            </p>

          </div>
          <div class="scale-item w-20 position-relative">
            <p class="price-one position-absolute five">
              100 000$
            </p>
            <p class="price-line position-absolute ">

            </p>

          </div>
          <div class="scale-item w-10 position-relative">
            <p class="price-one position-absolute">

            </p>


          </div>


        </div>

        <div class="range-wrap">
          <input v-model="value" class="range" max="18000" type="range" value="0" @input="slider">
          <output class="bubble-top">
            {{ this.price }}
          </output>
          <output class="bubble-bot">
            {{ this.percent }}
          </output>
        </div>

        <div class="d-flex scale justify-content-around">

          <div class="scale-item w-10 position-relative">
            <p class="percent-line line-two position-absolute">

            </p>
            <p class="percent position-absolute percent-mob-one percent-one">
              10%
            </p>
          </div>
          <div class="scale-item w-20 position-relative">
            <p class="percent-line line-two position-absolute">

            </p>
            <p class="percent percent-two percent-mob-two position-absolute">
              5%
            </p>
          </div>
          <div class="scale-item w-20 position-relative">
            <p class="percent-line line-three position-absolute">

            </p>
            <p class="percent percent-two position-absolute">
              3%
            </p>
          </div>
          <div class="scale-item w-20 position-relative">
            <p class="percent-line position-absolute">

            </p>
            <p class="percent position-absolute percent-one">
              1.5%
            </p>
          </div>
          <div class="scale-item w-20 position-relative">
            <p class="percent-line position-absolute">

            </p>
            <p class="percent position-absolute percent-five">
              1%
            </p>
          </div>
          <div class="scale-item w-10 position-relative">


          </div>

        </div>
      </div>


      <p class="percent-text">
        {{ $t('benefits.сommission') }}
      </p>
    </div>
    <div class="benefits-desc">
      <div class="benefits-title">
        <h2>
          {{ $t('benefits.protection') }}
        </h2>
        <h3>
          {{ $t('benefits.protectionDesc') }}
        </h3>
      </div>
    </div>
    <div class="d-flex justify-content-around">
      <div class="benefit position-relative col-md-4 col-sm-4">
        <img alt="" class="benefit-img" src="../assets/images/order.svg">
        <p>
          {{ $t('benefits.application') }}
        </p>
        <img alt="" class="position-absolute circle-one" src="../assets/images/circle-one.png">
      </div>
      <div class="benefit position-relative  col-md-4 col-sm-4">
        <img alt="" class="benefit-img" src="../assets/images/deal.svg">
        <p>
          {{ $t('benefits.exchange') }}
        </p>
        <img alt="" class="position-absolute circle-one" src="../assets/images/circle-two.png">

      </div>
      <div class="benefit position-relative  col-md-4 col-sm-4">
        <img alt="" class="benefit-img" src="../assets/images/shield.svg">
        <p>
          {{ $t('benefits.data') }}
        </p>
        <img alt="" class="position-absolute circle-one" src="../assets/images/circle-three.png">

      </div>


    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0,
      price: '',
      percent: ''
    }
  },
  methods: {
    slider() {
      if (this.value < 100) {
        this.price = '1$'
        this.percent = '10%'
      }
      if (this.value > 101 && this.value <= 1600) {
        this.price = `${(this.value / 16).toFixed(0)}$`
        this.percent = "10%"
      }
      if (this.value > 1601 && this.value < 5300) {
        this.price = `${(this.value / 10.3).toFixed(0) - 12}$`
        this.percent = "5%"
      }
      if (this.value > 5301 && this.value < 9000) {
        this.price = `${(this.value / 8.8).toFixed(0) - 21}$`

        this.percent = "3%"
      }
      if (this.value > 9001 && this.value < 9700) {
        this.price = `${(this.value / 6).toFixed(0)}$`
        this.percent = "1.5%"
      }
      if (this.value > 9700 && this.value < 12681) {
        this.price = `${(this.value / 0.9).toFixed(0) - 4073}$`

        this.percent = "1.5%"
      }
      if (this.value > 12682 && this.value < 14520) {
        this.price = `${(this.value * 2).toFixed(0) - 1072}$`
        this.percent = "1%"
      }
      if (this.value > 14521 && this.value < 15520) {
        this.price = `${(this.value * 3).toFixed(0) - 1072}$`
        this.percent = "1%"
      }
      if (this.value > 15521 && this.value < 16394) {
        this.price = `${this.value * 6 + 1726}$`
        this.percent = "1%"
      }
      if (this.value > 16395) {
        this.price = `${this.value * 7 + 1000}$`

        this.percent = "1%"
      }

      const allRanges = document.querySelectorAll(".range-wrap");
      allRanges.forEach(wrap => {
        const range = wrap.querySelector(".range");
        const bubbleTop = wrap.querySelector(".bubble-top");
        const bubbleBot = wrap.querySelector(".bubble-bot");

        range.addEventListener("input", () => {
          setBubble(range, bubbleTop, bubbleBot);
        });
        setBubble(range, bubbleTop, bubbleBot);
      });

      function setBubble(range, bubbleTop, bubbleBot) {
        const val = range.value;
        const min = range.min ? range.min : 0;
        const max = range.max ? range.max : 100;
        const newVal = Number(((val - min) * 100) / (max - min));

        bubbleTop.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
        bubbleBot.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
      }
    }
  },
  mounted() {

  }
}
</script>

<style>
.benefits {
  margin-bottom: 50px;
}

.benefits-title {
  text-align: center;
  margin-bottom: 50px;
}

.benefits-title h2 {
  font-size: 36px;
  line-height: 42px;
  color: white;
  font-weight: 400;
  margin-bottom: 8px;
}

.benefits-title h3 {
  font-size: 20px;
  line-height: 25px;
  color: white;
  font-weight: 400;
}

.benefits-bar {
  margin-top: 15px;
  margin-bottom: 15px;
}

.price {
  font-size: 20px;
  line-height: 18px;
}

.price-one {
  top: -25px;
}

.benefits-desc {
  margin-top: 90px;
  margin-bottom: 56px;
}

.benefit {
  text-align: center;
  font-size: 20px;
  line-height: 18px;
}

.benefit-img {
  margin-bottom: 10px;
  height: 105px;
}

.circle-one {
  top: -13px;
  right: 100px;
}

.price-text span {
  font-size: 16px;
}

.percent span {
  font-size: 16px;
}

.scale-item {
  text-align: right;
}

input[type='range'] {
  -webkit-appearance: none;
  background: #556EE6;
  height: 20px;
  border-radius: 16px;
  z-index: 3;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  background: white;
  height: 30px;
  width: 30px;
  border-radius: 22px;
  border-color: white;
}

input[type='range']::-webkit-slider-thumb:hover {
  background: white;
}

.scale {
  margin-bottom: 15px;
}


/*.scale-item {
  width: 20%;
}*/

.price-line {
  width: 1px;
  height: 15px;
  background: #A6AAB4;
  bottom: -15px;
  right: 0px;
}

.price-line-test {
  width: 1px;
  height: 15px;
  background: red;
  bottom: -15px;
  right: 0px;
}

.percent-line {
  width: 1px;
  height: 18px;
  background: #A6AAB4;
  bottom: 41px;
  right: 0px;
}


.two {
  right: -18px;
}

.three {
  right: -19px;
}

.four {
  right: -24px;
}

.five {
  right: -30px;
}

.line-five {
  right: 117px;
}

.first-elem {
  right: -24px !important;
}


.price {
  top: -17px;
}

.w-10 {
  width: 10%;
}

.w-20 {
  width: 20%;
}

.w-30 {
  width: 30%;
}

.one {
  right: -15px;
}

.percent {
  color: #556EE6;
  bottom: 16px;
}

.percent-one {
  right: -13px;
}

.percent-two {
  right: -10px;
}

.percent-five {
  right: -10px;
}

.price-text {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 49px;
}

.percent-text {
  font-size: 20px;
  font-weight: 600;
  margin-top: -10px;
}

.percent-text span {
  font-size: 16px;
}

.range-wrap {
  position: relative;
  margin: 0 auto 3rem;
}

.range {
  width: 100%;
}

.bubble-top {
  color: white;
  position: absolute;
  top: -68px;
  font-weight: 500;
  font-size: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.bubble-bot {
  color: white;
  position: absolute;
  font-weight: 500;
  font-size: 20px;
  bottom: -59px;
  left: 50%;
  transform: translateX(-50%);
}

@media screen and (max-width: 1024px) {
  .price-text {
    font-size: 16px;
  }

  .price {
    font-size: 12px;
  }

  .benefits-bar {
    margin-top: 30px;
  }
  .line-five {
    right: 97px;
  }
.five {
  right: -30px;
}
.percent-five {
  right: -9px;
}
  input[type='range']::-webkit-slider-thumb {
    width: 27px;
    height: 27px;
  }


}

@media screen and (max-width: 1200px) {
  .circle-one {
    right: 60px;
  }
}

@media screen and (max-width: 980px) {
  .circle-one {
    right: 20px;
  }
}
@media screen and (max-width: 768px) {
.line-five {
  right: 61px;
}
  .five {
    right: -25px;
  }
  .percent-five {
    right: -5px;
  }
}

@media screen and (max-width: 720px) {
  .circle-one {
    right: 10px;
  }
}

@media screen and (max-width: 425px) {
  .line-five {
    right: 39px;
  }

  .five {
    right: -26px;
  }
  .percent-five {
    right: -7px;
  }

  .benefits {
    margin-top: 50px;
  }

  .benefit-img {
    width: 65px;
    height: 55px;
  }

  .benefits-title h2 {
    font-size: 25px;
    line-height: 30px;
  }

  .benefit p {
    font-size: 12px;
  }

  .circle-one {
    width: 25px;
  }

  .benefits-title h3 {
    font-size: 17px;
    line-height: 18px;
  }
}

@media screen and (max-width: 320px) {
  .line-five {
    right: 35px;
  }

  .five {
    right: -26px;
  }

  .percent-five {
    right: -7px;
  }

  .percent-line {
    bottom: 44px;
  }

  .price-line {
    bottom: -24px;
  }

  .price-one {
    top: -14px;
  }

  .benefits-title h2 {
    font-size: 20px;
    line-height: 30px;
  }

  .benefits-title h3 {
    font-size: 12px;
    line-height: 18px;
  }

  .benefit p {
    font-size: 10px;
  }


  .circle-one {
    width: 20px;
  }

  .price {
    font-size: 8px;
  }

  input[type='range'] {
    height: 12px;
  }


  .price-text {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 34px;
  }

  .bubble-top {
    top: -56px;
  }

  .percent-text {
    font-size: 14px;
    font-weight: 600;
  }

  .price-text span {
    font-size: 14px;
    font-weight: 500;
  }


}
</style>
