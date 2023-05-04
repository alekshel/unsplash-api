<script>
  import SearchIcon from '../components/icons/SearchIcon.vue'
  import Gallery from '../components/Gallery.vue'
  import LoadIcon from '../components/icons/LoadIcon.vue'

  export default {
    data() {
      return {
        search: "",
        timerId: null,
        photos: [],
        isLoaded: false,
        page: 1,
      }
    },

    components: {
      SearchIcon,
      Gallery,
      LoadIcon,
    },

    methods: {
      async loadNew() {
        if (this.isLoaded) {
          return false
        }

        this.isLoaded = true
        this.page += 1

        let morePhotos = this.search.length 
          ? await this.getPhotosBySearch()
          : await this.getPhotosDefault()

        this.photos = this.photos.concat(morePhotos)
        this.isLoaded = false
      },

      async searchDo() {
        if (!this.search.length) {
          this.page = 1
          this.photos = await this.getPhotosDefault()
          return false
        }

        clearTimeout(this.timerId)
        this.timerId = setTimeout(async () => {
          this.page = 1
          this.photos = await this.getPhotosBySearch()
        }, 500)
      },

      async getPhotosDefault() {
        return await fetch(`${this.$api.apiLink}/photos?client_id=${this.$api.clientId}&per_page=${this.$api.perPage}&page=${this.page}`)
          .then((response) => response.json())
      },

      async getPhotosBySearch() {
        let response = await fetch(`${this.$api.apiLink}/search/photos?client_id=${this.$api.clientId}&query=${this.search}&per_page=${this.$api.perPage}&page=${this.page}`)
          .then((response) => response.json())
        return response ? response.results : []
      }
    },

    async mounted() {
      this.photos = await this.getPhotosDefault()
    }
  }
</script>

<template>
  <main>
    <section class="search-box">
      <div class="darker-wrap"></div>
      <div id="search">
        <input 
          type="text" 
          placeholder="Поиск" 
          v-model="this.search"
          @input="this.searchDo"
        >
        <SearchIcon/>
      </div>
    </section>

    <Gallery 
      :photos="photos"
      :loadElement="this.$refs['load-more']"
      @loadNew="loadNew"
    />

    <div
      class="load-more rotate"
      ref="load-more"
    >
      <LoadIcon/>
    </div>
  </main>
</template>

<style>
  .darker-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
  }

  .search-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 253px;
    border-bottom: 16px solid var(--color-grey);
    background: url(../assets/images/home-bg.jpg) center no-repeat;
  }

  #search {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 866px;
    width: 100%;
    height: 70px;
    margin: 0 20px;
    padding-left: 39px;
    padding-right: 34px;
    background: var(--color-white);
  }

  #search input {
    width: 100%;
    padding-right: 20px;
    border: 0;

    font-size: 24px;
    line-height: 28px;
    font-weight: 300;
    outline: none;
  }

  .load-more {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 100px;
    margin-bottom: 20px;
  }

  .rotate svg {
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
    .search-box {
      height: 250px;
      border-bottom: 0;
      background: url(../assets/images/home-bg-mobile.jpg) center no-repeat;
      background-size: cover;
    }

    #search {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
</style>