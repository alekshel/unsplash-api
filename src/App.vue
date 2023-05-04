<script>
  import { RouterView } from "vue-router"
  import HeaderHome from "./components/layouts/HeaderHome.vue"
  import Header from "./components/layouts/Header.vue"

  export default {
    components: {
      HeaderHome,
      Header
    }
  }
</script>

<template>  
  <HeaderHome v-if="this.$route.name == 'home'"/>
  <Header v-else/>
  
  <RouterView />
</template>

<style scoped>
</style>