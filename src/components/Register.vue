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
            <p v-if="v$.form.login.$dirty && v$.form.login.minLength.$invalid">
              Минимальная длина поля 3 символа
            </p>
          </div>
      </div>
      <div class="field">
        <input type="email"
          v-model.trim="form.email"
          :class="{ 'is-invalid': v$.form.email.$errors.length }"
          placeholder="E-mail"
          maxlength="150">
          <div class="error">
            <p v-if="v$.form.email.$dirty && v$.form.email.required.$invalid">
              Заполните это поле
            </p>
            <p v-if="v$.form.email.$dirty && v$.form.email.email.$invalid">
              Введите корректный электронный адрес
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
          <p v-if="v$.form.password.$dirty && v$.form.password.minLength.$invalid">
            Минимальная длина поля 8 символов
          </p>
          <p v-if="v$.form.password.$dirty && v$.form.password.alphabet.$invalid">
            Пароль не может состоять только из цифр
          </p>
        </div>
      </div>
      <div class="field">
        <input type="password"
        v-model.trim="form.confirmpassword"
        :class="{ 'is-invalid': v$.form.confirmpassword.$errors.length }"
        placeholder="Повторите пароль"
        maxlength="150">
        <div class="error">
          <p v-if="v$.form.confirmpassword.$dirty && v$.form.confirmpassword.required.$invalid">
            Заполните это поле
          </p>
          <p v-if="v$.form.confirmpassword.$dirty && v$.form.confirmpassword.sameAsPassword.$invalid">
            Введенные пароли не совпадают
          </p>
        </div>
      </div>
      <div class="field w-full">
        <input type="text" v-model.trim="form.fio" placeholder="ФИО" maxlength="150">
      </div>
      <div class="field w-full field--radio">
        <div class="field--radio--input-wrap">
          <input type="radio" v-model="form.role" value="1" id="customer" checked>
          <label for="customer">Заказчик</label>
        </div>
        <div class="field--radio--input-wrap">
          <input type="radio" v-model="form.role" value="2" id="executive">
          <label for="executive">Исполнитель</label>
        </div>
      </div>
      <div class="field w-full">
        <div class="control">
          <button @click="checkForm" class="btn is-link">Зарегистрироваться</button>
        </div>
      </div>
      <div id="response"></div>
    </div>
</template>

<script>

import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import Api from '../api/index';

export default {
  setup () {
    return { v$: useValidate() }
  },
  components: {
    Api,
  },
  name: 'Register',
  data() {
    return {
      form: {
        login: '',
        email: '',
        password: '',
        confirmpassword: '',
        fio: '',
        role: '1',
      },
      errorText: '',
    }
  },
  validations: {
    form: {
      login: { required, minLength: minLength(3) },
      email: { required, email },
      password: {
        required,
        minLength: minLength(8),
        alphabet: function(value) {
          const digitsOnly = /^\d+$/.test(value)
          return !digitsOnly
        }
      },
      confirmpassword: {
        required,
        sameAsPassword: function() {
          return this.form.password === this.form.confirmpassword
        }
      },
    },
  },
  methods: {
     checkForm() {
      this.v$.form.$touch()
      if (!this.v$.form.$error) {
        console.log('Валидация прошла успешно');
        this.setRegister();
      }
    },
    async setRegister() {
      let res = await Api.auth.register({
        username: this.form.login,
        email: this.form.email,
        password: this.form.password,
        fio: this.form.fio,
        role: this.form.role,
      });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        this.$store.dispatch('setRegisterModal', false);
        this.$store.dispatch('setOverlay', false);
      } else if (res.status === 400 || res.status === 401) {
        if (res.data.username[0] == "A user with that username already exists.") {
          this.errorText = "Пользователь с таким логином уже зарегистрирован"
         } else {
          this.errorText = "Введен неправильный логин / пароль"
         }
      } else {
        this.errorText = "Произошла неизвестная ошибка. Повторите попытку позже."
      }
    }
  }
}
</script>

<style scoped>

</style>
