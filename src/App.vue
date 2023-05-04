<script>
  import { RouterLink, RouterView } from "vue-router"
  import HeaderHome from "./components/layouts/HeaderHome.vue"

  export default {
    components: {
      HeaderHome
    }
  }
</script>

<template>  
  <HeaderHome v-if="this.$route.name == 'home'"/>
  <RouterView />
</template>

<style scoped>
</style>