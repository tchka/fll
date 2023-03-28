export default {
  data() {
    return {
      user : {},
    }
  },
  methods: {
    async setUserIfAuth() {

      if (localStorage.getItem('auth_token')) {
        this.user = await fetch(
          `${this.$store.getters.getBaseUrl}/auth/users/me/`, {
            headers: {
              "Authorization": "token " + localStorage.getItem('auth_token'),
            }
          }
        ).then(response => response.json())
        console.log(this.user)
        if (this.user.id) {
          this.$store.dispatch('setAuthToken', localStorage.getItem('auth_token') );
          this.$store.dispatch('setUser', this.user );
        } else {
          localStorage.removeItem('auth_token');
        }
      }
    }
  }
}