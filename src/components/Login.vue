<template>
  <div class="screen wrapper">
	<div class="clearfix">

      <div class="columns3 columns3-xwide columns3-last">
        <h1>Логин</h1>
        <div class="fields">
          <div class="field">
            <label>Имя пользователя:</label>
            <input type="text" v-model="login" maxlength="150">
          </div>
          <div class="field">
            <label>Пароль:</label>
            <input type="password" v-model="password" maxlength="150">
          </div>
          <div class="field">
            <div class="control">
              <button @click="setLogin" class="button is-link">Submit</button>
            </div>
          </div>
          <div id="response"></div>
	    </div>
	  </div>
	</div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    setLogin() {
      $.ajax({
        url: `${this.$store.getters.getBaseUrl}/auth/token/login/`,
        type: 'POST',
        data: {
          username: this.login,
          password: this.password
        },
        success: (response) => {
          console.log(response);
          this.$store.dispatch('setAuthToken', response.auth_token);
          this.$router.push({name: 'UserView'})
        },
        error: (response) => {
          console.log(response);
          if (response.status === 400) $('#response').html('Логин или пароль не верны');
        },
      })
    }
  }
}
</script>

<style scoped>

</style>
