<script>
  import { RouterLink } from "vue-router"
  import FavoritesIcon from "../icons/FavoritesIcon.vue"
  import SearchIcon from "../icons/SearchIcon.vue"

  export default {
    components: {
      FavoritesIcon,
      SearchIcon
    }
  }
</script>

<template>
  <header>
    <div class="container flex flex-j-c-between flex-a-i-center">
      <RouterLink to="/">
        <img src="../../assets/images/logo.svg" alt="">
      </RouterLink>

      <div class="flex flex-a-i-center">
        <RouterLink to="/" class="flex flex-a-i-center search-icon">
          <SearchIcon/>
          <span>Поиск</span>
        </RouterLink>

        <RouterLink to="/favorites" class="flex flex-a-i-center">
          <FavoritesIcon/>
          <span>Избранное</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
  header {
    padding: 20px 0;
  }

  header img {
    height: 44px;
  }

  header span {
    margin-left: 10px;
    font-size: 18px;
    line-height: 21px;
  }

  .search-icon {
    margin-right: 40px;
  }

  /* @media (max-width: 768px) {
    header {
      padding: 17px 0;
    }

    header span {
      display: none;
    }
  } */
</style>