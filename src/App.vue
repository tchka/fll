<template>
  <Header />
  <router-view/>
  <Footer />
  <div id="overlay" v-show="isOverlay"></div>
</template>

<style>
  @import "assets/css/reset.css";
  @import "assets/css/back-style.css";
  @import "assets/css/inner.css";
  @import "assets/css/style.css";
</style>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import setUserIfAuth from './mixins/setUserIfAuth.js';
  export default {

    computed: {
      isOverlay() {
        return this.$store.getters.getOverlay;
      }
    },
    mixins: [ setUserIfAuth ],
    components: {
      Header,
      Footer
    },
    created() {
      this.setUserIfAuth()
    }
  }

</script>
