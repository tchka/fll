<template>
  <header>
    <div class="wrapper">
      <div class="row">
        <div class="col contacts">
          <!--a href="tel:8800">8 800 2000 305</a><br>
          <span>Горячая линия FLL<br>
          Звонок бесплатный по россии</span-->
        </div>
        <div class="col">
          <a href="/" class="logo"></a>
        </div>
        <div class="col user">
          <span @click="goLogin" v-if="!auth" class="login">Вход</span>
          <span @click="goLogout" v-if="auth" class="login">Выход</span>
          <span v-if="!auth" href="/user/registration" class="register">Регистрация</span>
          <div id="authForm" class="overscreen">
            <form action="/user/authorization?action=authorization_verify" method="POST">
              <div class="fields">
                <label for="login">Логин</label>
                <input name="user_login" id="login" type="text" />
              </div>
              <div class="fields">
                <label for="password">Пароль</label>
                <input name="user_password" id="password" type="password" />
              </div>
              <input type="submit" class="submit" value="Войти" />
            </form>
            <div class="links">
              <a href="/user/registration">Регистрация</a>
              <a href="/user/remind_password">Забыли пароль?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'Header',
  computed: {
    auth() {
      return this.$store.getters.getAuthToken;
    }
  },
  methods: {
    goLogin() {
      this.$router.push({name: 'login'});
    },
    goLogout() {
      localStorage.removeItem('auth_token');
      this.$store.dispatch('setAuthToken', '');

      $.ajax({
        url: `${this.$store.getters.getBaseUrl}/auth/token/logout/`,
        type: 'POST',
        success: (response) => {
          console.log(response);
          this.$store.dispatch('setAuth', true);
          this.$router.push({name: 'home'})
        },
        error: (response) => {
          console.log(response);
        },
      })
    }
  }
}
</script>

<style scoped>

</style>
