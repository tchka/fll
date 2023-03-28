<template>
  <div v-if="user.role == 1" class="columns3 columns3-xwide columns3-last">
    <h1>Мои проекты</h1>
    <div>
      <a class="btn"  @click="openOrderCreateModal" >Новый заказ</a>
    </div>
    <div class="order-menu">
      <div class="order-menu-item">
        <span @click="showTab = 0" v-bind:class="{'active': showTab == 0}">Все</span>
        <b>{{ orderTotal }}</b>
      </div>
      <div class="order-menu-item" v-for="orderStatus in orderStatuses">
        <span @click="showTab = orderStatus.id" v-bind:class="{'active': showTab == orderStatus.id}">{{ orderStatus.button }}</span>
        <b>{{ orderStatus.orders.length }}</b>
      </div>
    </div>
    <div id="orders">
      <table v-if="showTab == 0" class="orders">
        <template v-for="orderStatus in orderStatuses">
          <tr v-for="order in orderStatus.orders">
            <td class="orders__name">{{ order.name }}</td>
            <td>
              <div class="orders__control">
                <div v-if="orderStatus.id != 1" @click="openOrderViewModal(order.id)" class="btn btn-icon btn-view" title="Посмотреть"></div>
                <div v-if="orderStatus.id == 1" @click="openOrderEditModal(orderStatus.id, order.id)" class="btn btn-icon btn-edit" title="Редактировать"></div>
                <div v-if="orderStatus.id == 1" @click="orderPublish(order.id)" class="btn btn-icon btn-publish" title="Опубликовать"></div>
                <div v-if="orderStatus.id == 2" @click="orderUnpublish(order.id)" class="btn btn-icon btn-unpublish" title="Снять с публикации"></div>
                <div v-if="[1, 2,].includes(orderStatus.id)" @click="orderCancel(order.id)" class="btn btn-icon btn-cancel" title="Отменить"></div>
                <div v-if="orderStatus.id == 4" @click="orderApprove(order.id)" class="btn btn-icon btn-approve" title="Принять"></div>
                <div v-if="orderStatus.id == 4" @click="orderDisapprove(order.id)" class="btn btn-icon btn-disapprove" title="На доработку"></div>
                <div v-if="orderStatus.id == 7" @click="orderRestore(order.id)" class="btn btn-icon btn-restore" title="Восстановить"></div>
              </div>
            </td>
          </tr>
        </template>
      </table>
      <template v-for="orderStatus in orderStatuses">
        <table v-if="showTab == orderStatus.id" class="orders">
          <tr v-for="order in orderStatus.orders">
            <td class="orders__name">{{ order.name }}</td>
            <td class="orders__control">
                <div v-if="orderStatus.id != 1" @click="openOrderViewModal(order.id)" class="btn btn-icon btn-view" title="Посмотреть"></div>
                <div v-if="orderStatus.id == 1" @click="openOrderEditModal(orderStatus.id, order.id)" class="btn btn-icon btn-edit" title="Редактировать"></div>
                <div v-if="orderStatus.id == 1" @click="orderPublish(order.id)" class="btn btn-icon btn-publish" title="Опубликовать"></div>
                <div v-if="orderStatus.id == 2" @click="orderUnpublish(order.id)" class="btn btn-icon btn-unpublish" title="Снять с публикации"></div>
                <div v-if="[1, 2,].includes(orderStatus.id)" @click="orderCancel(order.id)" class="btn btn-icon btn-cancel" title="Отменить"></div>
                <div v-if="orderStatus.id == 4" @click="orderApprove(order.id)" class="btn btn-icon btn-approve" title="Принять"></div>
                <div v-if="orderStatus.id == 4" @click="orderDisapprove(order.id)" class="btn btn-icon btn-disapprove" title="На доработку"></div>
                <div v-if="orderStatus.id == 7" @click="orderRestore(order.id)" class="btn btn-icon btn-restore" title="Восстановить"></div>
            </td>
          </tr>
        </table>
      </template>
    </div>
  </div>

  <div v-if="user.role == 2" class="columns3 columns3-xwide columns3-last">
    <h1>Мои проекты</h1>
    <div class="order-menu">
      <div class="order-menu-item">
        <span @click="showTab = 0" v-bind:class="{'active': showTab == 0}">Все</span>
        <b>{{ orderTotalExecutor }}</b>
      </div>
      <div class="order-menu-item" v-for="orderStatus in orderStatuses">
        <span v-if="[3, 4, 5, 6].includes(orderStatus.id)" @click="showTab = orderStatus.id" v-bind:class="{'active': showTab == orderStatus.id}">{{ orderStatus.button }}</span>
        <b>{{ orderStatus.orders.length }}</b>
      </div>
    </div>
    <div id="orders">
      <table v-if="showTab == 0" class="orders">
        <template v-for="orderStatus in orderStatuses">
          <tr v-for="order in orderStatus.orders">
            <td class="orders__name">{{ order.name }}</td>
            <td>
              <div class="orders__control">
                <div v-if="orderStatus.id != 1" @click="openOrderViewModal(order.id)" class="btn btn-icon btn-view" title="Посмотреть"></div>
                <div v-if="orderStatus.id == 3 || orderStatus.id == 5" @click="openOrderWorkoutModal(orderStatus.id, order.id)" class="btn btn-icon btn-edit" title="Редактировать"></div>
              </div>
            </td>
          </tr>
        </template>
      </table>
      <template v-for="orderStatus in orderStatuses">
        <table v-if="showTab == orderStatus.id" class="orders">
          <tr v-for="order in orderStatus.orders">
            <td class="orders__name">{{ order.name }}</td>
            <td class="orders__control">
              <div v-if="orderStatus.id != 1" @click="openOrderViewModal(order.id)" class="btn btn-icon btn-view" title="Посмотреть"></div>
              <div v-if="orderStatus.id == 3 || orderStatus.id == 5" @click="openOrderWorkoutModal(orderStatus.id, order.id)" class="btn btn-icon btn-edit" title="Редактировать"></div>
            </td>
          </tr>
        </table>
      </template>
    </div>
  </div>

  <modal
    v-if="isOrderEditOpen"
    modalClass="modal-form modal-order"
    @close="closeOrderEditModal"
  >
    <div>
      <div class="form-group">
        <label>Заголовок</label>
        <div class="form-input">
          <input name="name" class="form-control" type="text" v-model="order.name">
        </div>
      </div>
      <div class="form-group">
        <label>Категория</label>
        <div class="form-input">
          <select class="form-control"  v-model="order.category">
            <option v-for="category in categories">{{ category.name }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Описание</label>
        <div class="form-input">
          <textarea name="description" class="form-control" v-model="order.description"></textarea>
        </div>
      </div>
      <div class="form-group">
        <label>Ключевые слова</label>
        <div class="form-input">
          <input name="keyword" class="form-control" type="text" v-model="order.keyword">
        </div>
      </div>
      <div class="form-group">
        <label>Длина статьи</label>
        <div class="form-input">
          <input name="length" class="form-control" type="number" v-model="order.length">
        </div>
      </div>
      <div class="form-group">
        <label>Цена</label>
        <div class="form-input">
          <input class="form-control" type="text" v-model="order.price">
        </div>
      </div>
      <div class="form-group">
        <label>Время выполнения</label>
        <div class="form-input">
          <input class="form-control" type="text" v-model="order.execution_time">
        </div>
      </div>
      <div class="form-group ">
        <label>Уровень исполнителя</label>
        <div class="form-input">
          <select class="form-control"  v-model="order.executor_level">
            <option v-for="executorLevel in executorLevels">{{ executorLevel.name }}</option>
          </select>
        </div>
      </div>
      <div class="control">
        <button @click="closeOrderEditModal" class="btn" id="calcel">{{ cancelText}} </button>
        <button @click="orderUpdate(order.id)" class="btn">Сохранить</button>
      </div>
      <div class="result" v-html="resultText"></div>
    </div>
  </modal>

  <modal
    v-if="isOrderWorkoutOpen"
    modalClass="modal-form modal-order"
    @close="closeOrderWorkoutModal"
  >
    <div>
      <div class="form-group">
        <label>Заголовок</label>
        <div class="form-input">{{ order.name }}</div>
      </div>
      <div class="form-group">
        <label>Категория</label>
        <div class="form-input">{{ order.category }}</div>
      </div>
      <div class="form-group">
        <label>Описание</label>
        <div class="form-input">{{ order.description }}</div>
      </div>
      <div class="form-group">
        <label>Ключевые слова</label>
        <div class="form-input">{{ order.keyword }}</div>
      </div>
      <div class="form-group">
        <label>Длина статьи</label>
        <div class="form-input">{{ order.length }}</div>
      </div>
      <div class="form-group">
        <label>Цена</label>
        <div class="form-input">{{ order.price }}</div>
      </div>
      <div class="form-group">
        <label>Время выполнения</label>
        <div class="form-input">{{ order.execution_time }}</div>
      </div>
      <div class="form-group ">
        <label>Уровень исполнителя</label>
        <div class="form-input">{{ order.executor_level }}</div>
      </div>
      <div class="form-group">
        <label>Текст статьи</label>
        <div class="form-input">
          <textarea name="description" class="form-control" v-model="order.article"></textarea>
        </div>
      </div>
      <div class="control">
        <button @click="closeOrderWorkoutModal" class="btn" id="calcel">{{ cancelText}} </button>
        <button @click="orderWorkoutToCheck(order.id)" class="btn">Отправить</button>
      </div>
      <div class="result" v-html="resultText"></div>
    </div>
  </modal>

  <modal
    v-if="isOrderViewOpen"
    modalClass="modal-order-view modal-order"
    @close="closeOrderViewModal"
  >
    <div>
      <div class="form-group">
        <label>Заголовок</label>
        <div class="form-input">{{ order.name }}</div>
      </div>
      <div class="form-group">
        <label>Категория</label>
        <div class="form-input">{{ order.category }}</div>
      </div>
      <div class="form-group">
        <label>Описание</label>
        <div class="form-input">{{ order.description }}</div>
      </div>
      <div class="form-group">
        <label>Ключевые слова</label>
        <div class="form-input">{{ order.keyword }}</div>
      </div>
      <div class="form-group">
        <label>Длина статьи</label>
        <div class="form-input">{{ order.length }}</div>
      </div>
      <div class="form-group">
        <label>Цена</label>
        <div class="form-input">{{ order.price }}</div>
      </div>
      <div class="form-group">
        <label>Время выполнения</label>
        <div class="form-input">{{ order.execution_time }}</div>
      </div>
      <div class="form-group">
        <label>Уровень исполнителя</label>
        <div class="form-input">{{ order.executor_level }}</div>
      </div>
      <div v-if="order.article" class="form-group">
        <label>Текст статьи</label>
        <div class="form-input">{{ order.article }}</div>
      </div>
      <div class="control">
        <button @click="closeOrderViewModal" class="btn" id="calcel">Закрыть</button>
        <button v-if="order.status == 'На проверке'" @click="orderApprove(order.id)" class="btn">Принять</button>
        <button v-if="order.status == 'На проверке'" @click="orderDisapprove(order.id)" class="btn">На доработку</button>
      </div>
    </div>
  </modal>

  <modal
    v-if="isOrderCreateOpen"
    modalClass="modal-form modal-order"
    @close="closeOrderCreateModal"
  >
    <div>
      <div class="form-group">
        <label>Заголовок</label>
        <div class="form-input">
          <input class="form-control" type="text" v-model="orderNew.name">
        </div>
      </div>
      <div class="form-group">
        <label>Категория</label>
        <div class="form-input">
          <select class="form-control"  v-model="orderNew.category">
            <option v-for="category in categories">{{ category.name }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Описание</label>
        <div class="form-input">
          <textarea name="description" class="form-control" v-model="orderNew.description"></textarea>
        </div>
      </div>
      <div class="form-group">
        <label>Ключевые слова</label>
        <div class="form-input">
          <input name="keyword" class="form-control" type="text" v-model="orderNew.keyword">
        </div>
      </div>
      <div class="form-group">
        <label>Длина статьи</label>
        <div class="form-input">
          <input name="length" class="form-control" type="number" v-model="orderNew.length">
        </div>
      </div>
      <div class="form-group">
        <label>Цена</label>
        <div class="form-input">
          <input class="form-control" type="text" v-model="orderNew.price">
        </div>
      </div>
      <div class="form-group">
        <label>Время выполнения</label>
        <div class="form-input">
          <input class="form-control" type="text" v-model="orderNew.execution_time">
        </div>
      </div>
      <div class="form-group ">
        <label>Уровень исполнителя</label>
        <div class="form-input">
          <select class="form-control"  v-model="orderNew.executor_level">
            <option v-for="executorLevel in executorLevels">{{ executorLevel.name }}</option>
          </select>
        </div>
      </div>
      <div class="control">
        <button @click="closeOrderCreateModal" class="btn" id="cancel">Отменить</button>
        <button @click="orderCreate()" class="btn">Создать</button>
      </div>
      <div class="result" v-html="resultText"></div>
    </div>
  </modal>

</template>

<script>

import Modal from '../components/Modal'
import Api from '../api/index'
export default {
  name: 'UserOrdersView',
  data() {
    return {
      showTab: 0,
      orderStatuses: [],
      orderTotal: 0,
      orderTotalExecutor: 0,
      categories: [],
      executorLevels: [],
      isOrderEditOpen: false,
      isOrderViewOpen: false,
      isOrderCreateOpen: false,
      isOrderWorkoutOpen: false,
      cancelText: 'Отменить',
      resultText: '',
      orderNew: {
        name: '',
        category: '',
        description: '',
        keyword: '',
        length: '',
        price: '',
        execution_time: '',
        executor_level: '',
      },
      user: {},
    }
  },
  components: {
    Modal,
    Api,
  },
  created() {
    this.getCurrentUser();
    if (this.user.role == 1) {
      this.getOrderByStatus(this.$route.params.id);
    } else {
      this.getOrderWorkByStatus(this.$route.params.id);
    }
    this.getExecutorLevels();
    this.getCategories();
  },
  computed: {
  },
  methods: {
    getCurrentUser() {
      this.user = this.$store.getters.getUser;
    },
    async getOrderByStatus(customer_id) {
      if (!this.user) {
        this.user = this.$store.getters.getUser;
      }
      let res = await Api.order.getOrderStatusAll();
      this.orderStatuses = res.data;
      this.orderTotal = 0;
      for (var i = 0; i < this.orderStatuses.length; i++) {
        let res = await Api.order.getCustomerOrdersByStatus(customer_id, this.orderStatuses[i].id);
        if (res) {
          this.orderStatuses[i].orders = res.data;
          this.orderStatuses[i].orderNumber = this.orderStatuses[i].orders.length;
          this.orderTotal += this.orderStatuses[i].orders.length;
        };
      }
    },
    async getOrderWorkByStatus(executor_id) {
      if (!this.user) {
        this.user = this.$store.getters.getUser;
      }
      let res = await Api.order.getOrderStatusAll();
      this.orderStatuses = res.data;
      this.orderTotalExecutor = 0;
      for (var i = 0; i < this.orderStatuses.length; i++) {
        let res = await Api.order.getExecutorOrdersByStatus(executor_id, this.orderStatuses[i].id);
        if (res) {
          this.orderStatuses[i].orders = res.data;
          this.orderStatuses[i].orderNumber = this.orderStatuses[i].orders.length;
          this.orderTotalExecutor += this.orderStatuses[i].orders.length;
        };
      }
    },
    async getCategories() {
      let res = await Api.order.getCategoryAll();
      this.categories = res.data;
    },
    async getExecutorLevels() {
      let res = await Api.order.getExecutorLevelsAll();
      this.executorLevels = res.data;
    },
    async openOrderEditModal(status_id, id) {
      console.log(status_id);
      if (status_id == 1) {
        let res = await Api.order.edit(id);
        this.order = res.data;
        this.isOrderEditOpen = true;
        this.$store.dispatch('setOverlay', true);
      }
    },
    async openOrderWorkoutModal(status_id, id) {
      console.log(status_id);
      if (status_id == 3 || status_id == 5) {
        let res = await Api.order.workoutGet(id);
        this.order = res.data;
        this.isOrderWorkoutOpen = true;
        this.$store.dispatch('setOverlay', true);
      }
    },
    async openOrderViewModal(id) {
      let res = await Api.order.get(id);
      this.order = res.data;
      this.isOrderViewOpen = true;
      this.$store.dispatch('setOverlay', true);
    },
    openOrderCreateModal() {
      this.isOrderCreateOpen = true;
      this.$store.dispatch('setOverlay', true);
    },
    closeOrderEditModal() {
      this.isOrderEditOpen = false;
      this.$store.dispatch('setOverlay', false);
    },
    closeOrderWorkoutModal() {
      this.isOrderWorkoutOpen = false;
      this.$store.dispatch('setOverlay', false);
    },
    closeOrderViewModal() {
      this.isOrderViewOpen = false;
      this.$store.dispatch('setOverlay', false);
    },
    closeOrderCreateModal() {
      this.isOrderCreateOpen = false;
      this.$store.dispatch('setOverlay', false);
    },
    async orderUpdate(id) {
      let payload = {
        id: this.order.id,
        name: this.order.name,
        category: this.order.category,
        description: this.order.description,
        keyword: this.order.keyword,
        length: this.order.length,
        price: this.order.price,
        execution_time: this.order.execution_time,
        executor_level: this.order.executor_level,
      };
      let res = await Api.order.edit(id, payload);
      if (res.status == 200 || res.status == 201 ) {
        this.getOrderByStatus(this.$route.params.id);
        this.resultText = res.data.message;
        this.cancelText = 'Закрыть';
      } else {
        this.resultText = "Произошла неизвестная ошибка. Повторите попытку позже.";
      }
      return res.data;
    },

    async orderWorkoutToCheck(id) {
      let payload = {
        id: this.order.id,
        article: this.order.article,
      };
      let res = await Api.order.workoutToCheck(id, payload);
      if (res.status == 200 || res.status == 201 ) {
        this.getOrderByStatus(this.$route.params.id);
        this.resultText = res.data.message;
      } else {
        this.resultText = "Произошла неизвестная ошибка. Повторите попытку позже.";
      }
      return res.data;
    },
    async orderCreate() {
      let customer = this.user.id;
      let payload = {
        name: this.orderNew.name,
        category: this.orderNew.category,
        description: this.orderNew.description,
        keyword: this.orderNew.keyword,
        length: this.orderNew.length,
        price: this.orderNew.price,
        execution_time: this.orderNew.execution_time,
        executor_level: this.orderNew.executor_level,
        customer: customer,
        status: 1,
      };
      let res = await Api.order.create(payload);
      if (res.status == 200 || res.status == 201 ) {
        this.getOrderByStatus(this.$route.params.id);
        this.resultText = res.data.message;
        this.cancelText = 'Закрыть';
      } else {
        this.resultText = "Произошла неизвестная ошибка. Повторите попытку позже.";
      }
      return res.data;
    },
    async orderPublish(id) {
      let res = await Api.order.publish(id);
      if (res.status == 200 || res.status == 201 ) {
        this.getOrderByStatus(this.$route.params.id);
        this.resultText = res.data.message;
        this.cancelText = 'Закрыть';
      } else {
        this.resultText = "Произошла неизвестная ошибка. Повторите попытку позже.";
      }
      return res;
    },
    async orderUnpublish(id) {
      let res = await Api.order.unpublish(id);
      if (res.status == 200 || res.status == 201 ) {
        this.getOrderByStatus(this.$route.params.id);
        this.resultText = res.data.message;
        this.cancelText = 'Закрыть';
      } else {
        this.resultText = "Произошла неизвестная ошибка. Повторите попытку позже.";
      }
      return res;
    },
    async orderCancel(id) {
      let res = await Api.order.cancel(id);
      if (res.status == 200 || res.status == 201 ) {
        this.getOrderByStatus(this.$route.params.id);
        this.resultText = res.data.message;
        this.cancelText = 'Закрыть';
      } else {
        this.resultText = "Произошла неизвестная ошибка. Повторите попытку позже.";
      }
      return res;
    },
    async orderRestore(id) {
      let res = await Api.order.restore(id);
      if (res.status == 200 || res.status == 201 ) {
        this.getOrderByStatus(this.$route.params.id);
        this.resultText = res.data.message;
        this.cancelText = 'Закрыть';
      } else {
        this.resultText = "Произошла неизвестная ошибка. Повторите попытку позже.";
      }
      return res;
    },
    async orderApprove(id) {
      let res = await Api.order.approve(id);
      if (res.status == 200 || res.status == 201 ) {
        this.getOrderByStatus(this.$route.params.id);
        this.resultText = res.data.message;
        this.cancelText = 'Закрыть';
      } else {
        this.resultText = "Произошла неизвестная ошибка. Повторите попытку позже.";
      }
      return res;
    },
    async orderDisapprove(id) {
      let res = await Api.order.disapprove(id);
      if (res.status == 200 || res.status == 201 ) {
        this.getOrderByStatus(this.$route.params.id);
        this.resultText = res.data.message;
        this.cancelText = 'Закрыть';
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
