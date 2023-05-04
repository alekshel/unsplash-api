<script>
  import { RouterLink } from "vue-router"
  import FavoritesIcon from "../icons/FavoritesIcon.vue"

  export default {
    components: {
      FavoritesIcon
    }
  }
</script>

<template>
  <header>
    <div class="container flex flex-j-c-between flex-a-i-center">
      <RouterLink to="/">
        <img src="../../assets/images/logo.svg" alt="">
      </RouterLink>

      <RouterLink to="/favorites" class="flex flex-a-i-center">
        <FavoritesIcon/>
        <span>Избранное</span>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
  header {
    padding: 38px 0;
  }

  header span {
    margin-left: 10px;
    font-size: 18px;
    line-height: 21px;
  }

  @media (max-width: 768px) {
    header img {
      height: 33px;
    }

    header {
      padding: 17px 0;
    }

    header span {
      display: none;
    }
  }
</style>