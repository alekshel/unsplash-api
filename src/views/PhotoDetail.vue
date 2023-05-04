<script>
  import PhotoItem from "../components/PhotoItem.vue"
  export default {
    data() {
      return {
        photo: null,
      }
    },

    components: {
      PhotoItem,
    },

    async mounted() {
      let id = this.$route.params.id
      this.photo = await fetch(`${this.$api.apiLink}/photos/${id}?client_id=${this.$api.clientId}`)
        .then((response) => response.json())
    }
  }
</script>

<template>
  <section 
    class="photo-box"
    v-if="photo"
    :style="{
      'background': `url(${ photo.urls.regular }) center`,
      'background-size': 'cover'
    }"
  >
    <div class="darker-wrap"></div>
    <PhotoItem 
      :id="photo.id"
      :user="photo.user"
      :regularPhoto="photo.urls.regular"
      :fullPhoto="photo.urls.full"
      :downloadLink="photo.links.download"
      :liked="photo.liked_by_user"
    />
  </section>
</template>

<style scoped>
  .photo-box {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 774px;
  }

  .darker-wrap {
    backdrop-filter: blur(4px);
  }
</style>