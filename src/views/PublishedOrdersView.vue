<template>
  <div class="columns3 columns3-xwide columns3-last">
    <h1>Текущие заказы</h1>
    <div id="orders" class="orders">
      <table>
        <tr v-for="order in orders">
          <td class="orders__name">{{ order.name }}</td>
          <td class="orders__control">
            <div @click="openOrderModal(order.id)" class="btn btn-icon btn-view"></div>
            <div v-if="user.role == 2" @click="orderTake(order.id)" class="btn btn-icon btn-take"></div>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <modal
    v-if="isOrderOpen"
    modalClass="modal-form modal-order"
    @close="closeOrderModal"
  >
    <div>
      <div class="form-group">
        <label>Название</label>
        <div class="form-input">{{ order.name }}</div>
      </div>
      <div class="form-group">
        <label>Категория</label>
        <div class="form-input">{{ order.category.name }}</div>
      </div>
      <div class="form-group">
        <label>Название</label>
        <div class="form-input">{{ order.description }}</div>
      </div>
      <div class="form-group">
        <label>Ключевые слова</label>
        <div class="form-input">{{ order.keyword }}</div>
      </div>
      <div class="form-group">
        <label>Длина</label>
        <div class="form-input">{{ order.length }}</div>
      </div>
      <div class="form-group">
        <label>Уровень копирайтера</label>
        <div class="form-input">{{ order.executor_level.name }}</div>
      </div>
      <div class="form-group">
        <label>Заказчик</label>
        <div class="form-input">{{ order.customer.username }}</div>
      </div>
    </div>
  </modal>

</template>

<script>

import Modal from '../components/Modal'
import Api from '../api/index'
export default {
  name: 'PublishedOrdersView',
  data() {
    return {
      isOrderOpen: false,
      orders: [],
      user: {},
    }
  },
  components: {
    Modal,
    Api,
  },
  created() {
    this.getCurrentUser();
    this.getPublishedOrders();
  },
  methods: {
    getCurrentUser() {
      this.user = this.$store.getters.getUser;
    },
    async getPublishedOrders() {
      let res = await Api.order.getPublished();
      this.orders = res.data;
    },
    async openOrderModal(id) {
      let res = await Api.order.get(id);
      this.order = res.data;
      this.isOrderOpen = true;
      this.$store.dispatch('setOverlay', true);
    },
    closeOrderModal() {
      this.isOrderOpen = false;
      this.$store.dispatch('setOverlay', false);
    },
    async orderTake(id) {
      let executor = this.user.id;
      let payload = {
        executor: executor,
      };
      let res = await Api.order.take(id, payload);
      if (res.status == 200 || res.status == 201 ) {
        this.getPublishedOrders();
        this.resultText = res.data.message;
      } else {
        this.resultText = "Произошла неизвестная ошибка. Повторите попытку позже.";
      }
      return res;
    },
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

  .order-menu {display: flex; flex-wrap: wrap;}
  .order-menu-item {position: relative;}
  .order-menu-item span {display: block; margin: 10px 15px 0 0; padding: 0 30px 0 10px; border-radius: 3px; background: #d1d1d1; line-height: 30px; color: #fff; text-decoration: none; cursor: pointer;}
  .order-menu-item span:hover, .order-menu-item span.active {background: #b1b1b1;}
  .order-menu-item b {display: block; position: absolute; right: 20px; top: 13px; background: #fff; color: #c6c6c6; border-radius: 50%; line-height: 16px; width: 16px; text-align: center; font-size: 11px; font-weight: 700;}

  table {margin: 20px 0; width: 100%;}
  td {border: 1px solid #bdbdbd; padding: 5px;}

</style>
