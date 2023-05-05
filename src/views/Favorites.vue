<script>
  import Gallery from '../components/Gallery.vue'
  import LoadIcon from '../components/icons/LoadIcon.vue'

  export default {
    data() {
      return {
        photos: [],
        isLoaded: false,
        page: 1,
      }
    },

    methods: {
      async getLikedPhotos() {
        return await fetch(
            `${this.$api.apiLink}/users/alekshel/likes?per_page=${this.$api.perPage}&page=${this.page}`, {
              headers: {
                'Authorization': `Bearer ${this.$api.baerer}`,
              }
            }
          )
          .then((response) => response.json()) || []
      },

      async loadNew() {
        if (this.isLoaded) {
          return false
        }

        this.isLoaded = true
        this.page += 1

        let morePhotos = await this.getLikedPhotos()
        if (!morePhotos.length) {
          this.isLoaded = false
          return false
        }

        this.photos = this.photos.concat(morePhotos)
        this.isLoaded = false
      },
    },

    components: {
      Gallery,
      LoadIcon,
    },

    async mounted() {
      this.photos = await this.getLikedPhotos()
    }
  }
</script>

<template>
  <main>
    <h1 class="container">Избранное</h1>

    <Gallery 
      :photos="photos"
      :loadElement="this.$refs['load-more']"
      @loadNew="loadNew"
    />

    <div
      :class="this.isLoaded ? 'load-more rotate' : 'load-more'"
      ref="load-more"
    >
      <LoadIcon/>
    </div>
  </main>
</template>

<style>
  @media (max-width: 768px) {
    .container.gallery {
      margin-top: 0 !important;
    }
  }
</style>

<style scoped>
  h1 {
    margin: 100px 0;
    text-align: center;
    font-size: 72px;
    line-height: 84px;
    font-weight: 700;
    color: var(--color-black);
  }

  .load-more {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 100px;
    margin-bottom: 20px;
  }

  .rotate svg,
  svg.rotate {
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  @media (max-width: 768px) {
    h1 {
      margin: 40px 0;
      font-size: 36px;
      line-height: 42px;
    }
  }
</style>