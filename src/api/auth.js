export default function(instance) {
  return {
    login(payload) {
      return instance.post('auth/token/login', payload)
    },
    register(payload) {
      return instance.post('auth/users/', payload)
    },
    logout() {
      return instance.post('auth/token/logout')
    },
    getProfile(id, payload) {
      return instance.get(`api/account/update/${id}`, payload)
    },
    updateProfile(id, payload) {
      return instance.put(`api/account/update/${id}`, payload)
    },
  }
}
