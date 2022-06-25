<template>
  <div class="screen wrapper">
	<div class="clearfix">

	  <div class="columns3 columns3-xwide columns3-last">
        <h1>Логин</h1>
        <form method="POST">
          {% csrf_token %}
          {{ form.as_p }}

          <div class="field">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
          </div>
        </form>
	  </div>
	</div>
  </div>

</template>

<script>

  export default {
    name: 'HomeView',
    data() {
      return {
        jobList: []
      }
    },
    components: {
    },
    created() {
      this.getJobList()
    },
    methods: {
      async getJobList() {
        this.jobList = await fetch(
          `${this.$store.getters.getServerUrl}/jobs/`
        ).then(response => response.json())
        console.log(this.jobList)
      }
    }
  }
</script>