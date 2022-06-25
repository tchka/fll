<template>
  <div class="row works">
    10
    <div class="col item" data-id="128589">
      <div class="name">Имя</div>
      <div class="desc">Кратко</div>
      <div class="info">
        <span>N знаков</span>
        <span>Срок time часов</span>
        <span>Дата </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobList',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>
