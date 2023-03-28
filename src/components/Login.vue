<template>
    <div class="fields">
      <div id="error">{{ errorText }}</div>
      <div class="field">
        <input type="text"
        v-model.trim="form.login"
        :class="{ 'is-invalid': v$.form.login.$errors.length }"
        placeholder="Логин"
        maxlength="150">
        <div class="error">
          <p v-if="v$.form.login.$dirty && v$.form.login.required.$invalid">
            Заполните это поле
          </p>
        </div>
      </div>
      <div class="field">
        <input type="password"
        v-model.trim="form.password"
        :class="{ 'is-invalid': v$.form.password.$errors.length }"
        placeholder="Пароль"
        maxlength="150">
        <div class="error">
          <p v-if="v$.form.password.$dirty && v$.form.password.required.$invalid">
            Заполните это поле
          </p>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button @click="checkForm" class="btn is-link">Войти</button>
        </div>
      </div>
      <div id="response"></div>
    </div>
</template>

<script>

import Api from '../api/index';
import { validationMixin } from 'vuelidate'
import { required } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useValidate() }
  },
  components: {
    Api,
  },
  name: 'Login',
  data() {
    return {
      form: {
        login: '',
        password: '',
        errorText: '',
      },
      errorText: '',
    }
  },
  validations: {
    form: {
      login: { required },
      password: { required },
    },
  },
  methods: {
    checkForm() {
      this.v$.form.$touch()
      if (!this.v$.form.$error) {
        console.log('Валидация прошла успешно');
        this.setLogin();
      }
    },
    async setLogin() {
      let res = await Api.auth.login({
        username: this.form.login,
        password: this.form.password
      });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        this.$store.dispatch('setAuthToken', res.data.auth_token);
        this.$store.dispatch('setAuthModal', false);
        this.$store.dispatch('setOverlay', false);
        localStorage.setItem('auth_token', res.data.auth_token);

        this.user = await fetch(
          `${this.$store.getters.getBaseUrl}/auth/users/me/`, {
            headers: {
              "Authorization": "token " + localStorage.getItem('auth_token'),
            }
          }
        ).then(response => response.json())
        console.log(this.user)
        if (this.user.id) {
          this.$store.dispatch('setUser', this.user );
          this.$router.push({name: 'UserProfileView', params: { id: this.user.id }});
        }
      } else if (res.status === 400 || res.status === 401) {
        this.errorText = "Введен неправильный логин/пароль"
      } else {
        this.errorText = "Произошла неизвестная ошибка. Повторите попытку позже."
      }
    }
  }
}
</script>

<style scoped>

</style>
