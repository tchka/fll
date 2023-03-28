<template>
  <div class="home">
	<div class="screen wrapper">
	  <h2>Личный кабинет</h2>
	  <div class="clearfix">
		<div class="columns3-slim">
          <div class="sidebar">
			<ul>
			  <li><a @click="$router.push({name: 'PublishedOrdersView'})">Текущие заказы</a></li>
			  <li><a @click="$router.push({name: 'UserOrdersView'})">Мои заказы</a></li>
			  <li class="spacer"></li>
			  <!--<li><a href="/user/workspace/works?action=activity">Последние действия</a></li>
			  <li><a href="/user/bill">Финансы</a></li>
			  <li><a href="/user/favourites" class="-customer-menu-1 -silk-star">Избранные пользователи</a></li>
			  <li><a href="/user/blacklist" class="-customer-menu-1 -silk-delete">Черный список</a></li>
			  <li><a href="/user/messages">Сообщения</a></li>-->
			  <li><a @click="$router.push({name: 'UserProfileView'})">Профиль</a></li>
			  <!--<li class="spacer"></li><li><a href="/blog">Объявления</a></li>
			  <li><a href="/user/ticket">Тикеты</a> </li>
			  <li><a href="/user/affiliate">Партнерская программа</a></li>-->
			</ul>
			<br>
		  </div>
		</div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

import Api from '../api/index'
export default {
  data() {
    return {
    }
  },
  components: {
  },
  created() {
  },
  methods: {
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
