<script>
  import FavoritesIcon from './icons/FavoritesIcon.vue'
  import DownloadIcon from "./icons/DownloadIcon.vue"
  import FullImage from "./icons/FullImage.vue"
  import FavoriteBtn from "../components/FavoriteBtn.vue"
  import LoadIcon from './icons/LoadIcon.vue'

  export default {
    data() {
      return {
        url: null,
        loaded: false,
        timer: null,
      }
    },

    props: ["id", "liked", "user", "regularPhoto", "fullPhoto", "downloadLink"],

    components: {
      FavoritesIcon,
      DownloadIcon,
      FullImage,
      FavoriteBtn,
      LoadIcon,
    },

    methods: {
      download() {
        fetch(this.url.href)
          .then(response => response.blob())
          .then(blob => {
            this.loaded = true

            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download = this.id +'.'+ this.url.searchParams.get('fm')
            link.click()

            this.timer = setTimeout(() => {
              clearTimeout(this.timer)
              this.loaded = false
            }, 1500)
          })
        .catch(console.error)
      }
    },

    async mounted() {
      let response = await fetch(`${this.$api.apiLink}/photos/${this.id}/download?client_id=${this.$api.clientId}`)
        .then((response) => response.json())
      this.url = new URL(response.url)
    }
  }
</script>

<template>
  <section class="container photo-item">
    <div class="flex flex-j-c-between content">
      <div class="author flex flex-a-i-center">
        <img :src="user.profile_image.medium" alt="">
        <div class="flex-column">
          <p>{{ user.name }}</p>
          <span>@{{ user.username }}</span>
        </div>
      </div>

      <div class="flex flex-a-i-center">
        <FavoriteBtn
          :id="id"
          :liked="liked"
        />

        <a 
          class="download-btn"
          v-if="this.url"
          @click.prevent="download"
        >
          <DownloadIcon v-if="!this.loaded"/>
          <LoadIcon class="rotate" v-else/>
          <span>{{ 
            !this.loaded ? "Скачать" : "Загрузка"
          }}</span>
        </a>
      </div>
    </div>

    <div class="regular-photo">
      <img :src="regularPhoto" alt="">
      <a :href="this.fullPhoto" target="_blank">
        <FullImage/>
      </a>
    </div>
  </section>
</template>

<style scoped>
  .photo-item {
    position: absolute;
    top: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .author img {
    width: 55px;
    height: 55px;
    border: 1px solid var(--color-white);
    border-radius: 8px;
  }

  .author > div {
    margin-left: 10px;
  }

  .author p {
    font-size: 30px;
    line-height: 35px;
  }

  .download-btn {
    display: flex;
    align-items: center;

    height: 50px;
    padding: 0 25px;

    border: 1px solid var(--color-yellow);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background: var(--color-yellow);

    cursor: pointer;
  }

  .download-btn span {
    margin-left: 15px;
    font-size: 20px;
    line-height: 23px;
    color: var(--color-black);
  }

  .regular-photo {
    position: relative;
    display: flex;
    margin-top: 40px;
  }

  .regular-photo a {
    position: absolute;
    right: 42px;
    bottom: 36px;
  }

  .regular-photo img {
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .author img {
      width: 48px;
      height: 48px;
    }

    .author p {
      font-size: 14px;
      line-height: 20px;
    }

    .favorites-btn {
      width: 40px;
      height: 40px;
      margin-right: 15px;
    }

    .download-btn {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 40px;
      height: 40px;
      padding: 0;
    }

    .download-btn span {
      display: none;
    }

    .regular-photo a {
      right: 10px;
      bottom: 10px;
    }
  }
</style>