<template>
  <Header />
  <router-view/>
  <Footer />
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
  import $ from 'jquery';
  export default {
    components: {Header,Footer},
    created() {
      if(localStorage.getItem('auth_token')) {
        $.ajaxSetup({
          headers: {"Authorization": "token " + localStorage.getItem('auth_token')}
        });
      }
    }
  }

</script>
