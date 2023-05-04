<script>
  import FavoritesIcon from './icons/FavoritesIcon.vue'
  import DownloadIcon from "./icons/DownloadIcon.vue"
  import FullImage from "./icons/FullImage.vue"
  import FavoriteBtn from "../components/FavoriteBtn.vue"

  export default {
    data() {
      return {
        url: null,
      }
    },

    props: ["id", "liked", "user", "regularPhoto", "fullPhoto", "downloadLink"],

    components: {
      FavoritesIcon,
      DownloadIcon,
      FullImage,
      FavoriteBtn,
    },

    methods: {
      download() {
        fetch(this.url.href)
          .then(response => response.blob())
          .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = this.id +'.'+ this.url.searchParams.get('fm');
            link.click();
        })
        .catch(console.error);
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
          <DownloadIcon/>
          <span>Скачать</span>
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
</style>