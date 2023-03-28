<template>
  <div class="screen wrapper">
	<div class="clearfix">

      <div class="columns3 columns3-xwide columns3-last">
        <h1>Логин</h1>
        <Login />
	  </div>
	</div>
  </div>
</template>

<script>
import $ from 'jquery';
import Login from '@/components/Login';
export default {
  components: {
    Login,
  },
  name: 'LoginView',
  methods: {
  }
}
</script>

<style scoped>

</style>
