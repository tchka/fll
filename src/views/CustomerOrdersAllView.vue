<template>
  <div id="orders">
    <table>
      <tr v-for="order in orders">
        <td>{{ order.name }}</td>
        <td><div class="btn">Редактировать</div></td>
      </tr>
    </table>
  </div>
</template>

<script>

import Api from '../api/index'
export default {
  name: 'CustomerOrdersAllView',
  data() {
    return {
      orders: []
    }
  },
  components: {
    Api,
  },
  created() {
    this.getCustomerOrdersAll(this.$route.params.id)
  },
  methods: {
    async getCustomerOrdersAll(customer_id) {
      let res = await Api.order.getCustomerOrdersAll(customer_id);
      this.orders = res.data;
    }
  }}
</script>

<style scoped>

  table {margin: 20px 0; width: 100%;}
  td {border: 1px solid #bdbdbd; padding: 5px;}

</style>
