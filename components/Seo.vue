<template>
  <div class="container seo">

      <div v-if="getSeoList.text">
      <div v-html="getSeoList.text">

      </div>
      </div>



  </div>
</template>
<script>
import swapMixin from "../mixins/swapMixin";

export default {
  mixins: [swapMixin],

  data() {
    return {

    }
  },

  mounted() {


  }
}
</script>


