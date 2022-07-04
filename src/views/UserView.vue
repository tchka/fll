<template>
  <div class="home">

	<div class="screen wrapper">
	  <h2>Личный кабинет</h2>

    </div>
  </div>
</template>

<script>

export default {
  name: 'UserView',
  data() {
      return {
          userId : null
      }
  },
  components: {
  },
  created() {
      this.getUserId()
  },
  methods: {
      async getUserId() {
          this.userId = await fetch(
             `${this.$store.getters.getBaseUrl}/auth/users/me/`
          ).then(response => response.json())
          console.log(this.userId)
      }
  }
}
</script>
