<template>
  <header>
    <div class="wrapper">
      <div class="row d-flex justify-space-between align-items-center">
        <!--<div class="col contacts">
          <a href="tel:8800">8 800 2000 305</a><br>
          <span>Горячая линия FLL<br>
          Звонок бесплатный по россии</span>
        </div>-->
        <div class="col">
          <a href="/" class="logo"></a>
        </div>
        <div class="col user">
          <span @click="openAuthModal" v-if="!currentUser.username" class="login">Вход</span>
          <span @click="openRegisterModal" v-if="!currentUser.username" class="register">Регистрация</span>
          <span @click="$router.push({name: 'UserOrdersView'})" v-if="currentUser.username" class="register">{{ currentUser.username }}</span>
          <span @click="goLogout" v-if="currentUser.username" class="login">Выход</span>
        </div>
      </div>
    </div>
  </header>
    <modal
      v-if="isAuthOpen"
      modalClass="modal-form login"
      @close="closeAuthModal"
    >
      <div>
        <login />
        <div class="links">
          <span @click="changeToRegister">Регистрация</span>
          <!--<a href="/user/remind_password">Забыли пароль?</a>-->
        </div>

      </div>
    </modal>

    <modal
      v-if="isRegisterOpen"
      modalClass="modal-form register"
      @close="closeRegisterModal"
    >
      <div>
        <register />
        <div class="links">
          <span @click="changeToAuth">Войти</span>
          <!--<a href="/user/remind_password">Забыли пароль?</a>-->
        </div>

      </div>
    </modal>

</template>

<script>


import Modal from './Modal'
import Login from './Login'
import Register from './Register'
import Api from '../api/index'

export default {
  components: {
    Modal,
    Login,
    Register,
    Api,
  },
  name: 'Header',
  computed: {
    currentUser() {
      this.user = this.$store.getters.getUser;
      return this.user;
    },
    isAuthOpen() {
      return this.$store.getters.getAuthModal;
    },
    isRegisterOpen() {
      return this.$store.getters.getRegisterModal;
    },
  },
  methods: {

    openAuthModal() {
      this.$store.dispatch('setAuthModal', true);
      this.$store.dispatch('setOverlay', true);
    },
    openRegisterModal() {
      this.$store.dispatch('setRegisterModal', true);
      this.$store.dispatch('setOverlay', true);
    },
    closeAuthModal() {
      this.$store.dispatch('setAuthModal', false);
      this.$store.dispatch('setOverlay', false);
    },
    closeRegisterModal() {
      this.$store.dispatch('setRegisterModal', false);
      this.$store.dispatch('setOverlay', false);
    },
    changeToRegister() {
      this.closeAuthModal()
      this.openRegisterModal()
    },
    changeToAuth() {
      this.closeRegisterModal()
      this.openAuthModal()
    },
    async goLogout() {
      let res = await Api.auth.logout();
      localStorage.removeItem('auth_token');
      this.$store.dispatch('setAuthToken', '');
      this.$store.dispatch('setUser', {} );
      this.$router.push({name: 'home'});
    },
    goLK() {

    }
  }
}
</script>

<style scoped>

</style>
