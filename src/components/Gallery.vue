<script>
  import { RouterLink } from "vue-router"

  export default {
    props: ["photos", "loadElement"],

    methods: {
      isInViewport(element) {
        const rect = element.getBoundingClientRect()
        // rect.left >= 0 &&
        // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        )
      }
    },

    mounted() {
      window.onscroll = () => {
        const rect = this.loadElement.getBoundingClientRect()
        console.log(rect.right)
        console.log(
            rect.top >= 0,
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
          )

        if (!this.isInViewport(this.loadElement)) {
          return
        }

        this.$emit("loadNew")
      }
    }
  }
</script>

<template>
  <section class="container gallery">
    <RouterLink 
      v-for="photo in photos"
      :key="photo.id"
      :to="'/photos/' + photo.id"
    >
      <article
        :style="{
          'background': `url(${ photo.urls.regular }) center`
        }"
      ></article>
    </RouterLink>
  </section>
</template>

<style scoped>
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;

    width: 100%;
    margin-top: 114px;
  }

  .gallery article {
    aspect-ratio: 1;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .gallery {
      grid-template-columns: 1fr;
      padding: 0 !important;
      grid-gap: 20px;
    }
  }
</style>