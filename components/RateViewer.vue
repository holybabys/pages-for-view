<template>
  <div class="mt-3">
    <div id="rates" class="marquee">
      <div class="marquee__inner">
        <div class="d-flex">
          <div class="rate_item" v-for="rate in getCurrencyRate" :key="`${rate.currency1}-${rate.currency2}`">
            <p class="pair_desc">
              {{ rate.currency1 }}/{{ rate.currency2 }}

            </p>
            <p class="rate">
              {{ $formatNumber(rate.rate) }}
            </p>
          </div>

        </div>

      </div>
    </div>
<!--    <div class="marquee">
      <div>
        <div class="rate_item col-md-2" v-for="rate in getCurrencyRate" :key="`${rate.currency1}-${rate.currency2}`">
          <p class="pair_desc">
            {{ rate.currency1 }}/{{ rate.currency2 }}

          </p>
          <p class="rate">
            {{ $formatNumber(rate.rate) }}
          </p>
        </div>

      </div>


    </div>-->
  </div>
</template>

<script>
import swapMixin from "../mixins/swapMixin";

export default {
  mixins: [swapMixin],
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
  computed: {

  },
  mounted() {
    function animateMarquee(el, duration) {
      const innerEl = el.querySelector('.marquee__inner');
      const innerWidth = innerEl.offsetWidth;
      const cloneEl = innerEl.cloneNode(true);
      el.appendChild(cloneEl);

      let start = performance.now();
      let progress;
      let translateX;

      requestAnimationFrame(function step(now) {
        progress = (now - start) / duration;

        if (progress > 1) {
          progress %= 1;
          start = now;
        }

        translateX = innerWidth * progress;

        innerEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
        cloneEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
        requestAnimationFrame(step);
      });
    }
    const rates = document.querySelector('#rates');


    animateMarquee(rates, 17000);

  }
}
</script>
<style scoped>
.rate_item {
  margin-right: 30px;
  margin-left: 30px;
}

.pair_desc {
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
}

.rate {
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
}

.carousel-item {
  margin-top: 90px;
}
</style>
