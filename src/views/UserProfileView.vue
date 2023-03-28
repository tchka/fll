<template>
  <div class="columns3 columns3-xwide columns3-last">
    <h1>Информация о пользователе</h1>
    <div class="form-group">
      <label>Имя</label>
      <div class="form-input">{{ currentUser.username }}</div>
    </div>
    <div class="form-group">
      <label>E-mail</label>
      <div class="form-input">{{ currentUser.email }}</div>
    </div>
    <div class="form-group">
      <label>ФИО</label>
      <div class="form-input">
        <input class="form-control" type="text" v-model="currentUser.fio">
      </div>
    </div>
    <div class="form-group">
      <label>Gender</label>
      <div class="form-input">
        <select class="form-control" v-model="currentUser.profile.gender">
          <option value="0">--------</option>
          <option value="1">Мужской</option>
          <option value="2">Женский</option>
        </select>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn btn-primary" @click="updateProfile(this.$route.params.id)">Сохранить</button>
    </div>
  </div>
</template>

<script>

import Api from '../api/index'
export default {
  name: 'UserProfileView',
  data() {
    return {
      currentUser: {
        username: '',
        email: '',
        fio: '',
        role: null,
        profile: {
          gender: 0,
        }
      }
    }
  },
  components: {
    Api,
  },
  created() {
    this.getProfile(this.$route.params.id)
  },
  methods: {
    async getProfile(id) {
      let res = await Api.auth.getProfile(id);
      console.log(res);
      this.currentUser = res.data;
      if (this.currentUser.profile == null) {
        this.currentUser.profile ={
          gender: 0,
        }
      }
    },
    async updateProfile(id) {
      console.log(this.currentUser);
      let payload = {
        fio: this.currentUser.fio,
        profile: {gender: this.currentUser.profile.gender},
      };
      console.log(payload);
      let res = await Api.auth.updateProfile(id, payload);
      console.log(res.data);
      return res.data;
    }
  }
}
</script>

<style scoped>

h1 { font-size: 18px; font-weight: normal; margin: 0px 0px 10px 0px; }
h2 { margin: 0px 0px 20px 28%; text-align: left; font-weight: normal; }

.columns3 { width: 31%; margin-right: 2%; float: left; }
.columns3-slim { width: 26%; margin-right: 2%; float: left; }
.columns3-wide { width: 67%; margin-right: 0%; float: left; }
.columns3-xwide { width: 72%; margin-right: 0%; float: left; }
.columns3-end { margin-right: 0%; }
.columns3-last { margin-right: 0%; }


</style>
