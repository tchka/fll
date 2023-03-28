export default function(instance) {
  return {
    get(id) {
      return instance.get(`api/order/${id}`)
    },
    getAll() {
      return instance.get('api/order/all')
    },
    getPublished() {
      return instance.get('api/order/published')
    },
    getCustomerOrdersAll(customer_id) {
      return instance.get(`api/order/all?customer=${customer_id}`)
    },
    getCustomerOrdersByStatus(customer_id, status_id) {
      return instance.get(`api/order/all?customer=${customer_id}&status=${status_id}`)
    },
    getExecutorOrdersByStatus(executor_id, status_id) {
      return instance.get(`api/order/all?executor=${executor_id}&status=${status_id}`)
    },
    getCategoryAll() {
      return instance.get('api/category/all')
    },
    getOrderStatusAll() {
      return instance.get('api/order-status/all')
    },
    getExecutorLevelsAll() {
      return instance.get('api/executor-level/all')
    },
    edit(id, payload) {
      return instance.patch(`api/order/update/${id}`, payload)
    },
    workoutGet(id) {
      return instance.get(`api/order/workout/${id}`)
    },
    workoutToCheck(id, payload) {
      return instance.patch(`api/order/workout/${id}`, payload)
    },
    create(payload) {
      return instance.post(`api/order/new`, payload)
    },
    publish(id) {
      return instance.patch(`api/order/publish/${id}`)
    },
    unpublish(id) {
      return instance.patch(`api/order/unpublish/${id}`)
    },
    cancel(id) {
      return instance.patch(`api/order/cancel/${id}`)
    },
    restore(id) {
      return instance.patch(`api/order/restore/${id}`)
    },
    take(id, payload) {
      return instance.patch(`api/order/take/${id}`, payload)
    },
    approve(id) {
      return instance.patch(`api/order/approve/${id}`)
    },
    disapprove(id) {
      return instance.patch(`api/order/disapprove/${id}`)
    },
  }
}
