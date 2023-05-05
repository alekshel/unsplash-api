<script>
  import FavoritesIcon from './icons/FavoritesIcon.vue'
  export default {
    data() {
      return {
        isLiked: false
      }
    },

    props: ["id", "liked"],

    components: {
      FavoritesIcon,
    },

    methods: {
      async likedPhoto(method = "POST") {
        let response = await fetch(`${this.$api.apiLink}/photos/${this.id}/like`, {
          method: method,
          headers: {
            'Authorization': `Bearer ${this.$api.baerer}`,
          }
        }).then((response) => response.json())

        if (response && response["photo"]) { 
          this.isLiked = response["photo"].liked_by_user
        }
      },
    },

    mounted() {
      this.isLiked = this.liked
    }
  }
</script>

<template>
  <button
    :class="this.isLiked ? 'favorites-btn active' : 'favorites-btn'"
    @click="() => this.likedPhoto(
      this.isLiked ? 'DELETE' : 'POST'
    )"
  >
    <FavoritesIcon/>
  </button>
</template>

<style scoped>
  .favorites-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    margin-right: 20px;

    border: 0;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background: var(--color-white);

    cursor: pointer;
    transition: all .3s ease-out;
  }

  .favorites-btn.active {
    background: var(--color-green);
  }
</style>