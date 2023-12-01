<script>
import { store } from "../store";
import AppCard from "./AppCard.vue";
import AppSelect from "./AppSelect.vue";
export default {
  data() {
    return {
      store,
    };
  },
  components: {
    AppCard,
    AppSelect,
  },
  methods: {
    handleMovieSelect() {
      console.log(this.store.backupMovieArray);
      this.store.movieList = [...this.store.backupMovieArray];
      this.store.movieList = this.store.movieList.filter((movie) => {
        const isIncluded = movie.genre_ids.includes(this.store.searchMovieGenres);
        return isIncluded;
      });
    },

    handleSerieSelect() {
      console.log(this.store.backupSerieArray);
      this.store.seriesList = [...this.store.backupSerieArray];
      this.store.seriesList = this.store.seriesList.filter((movie) => {
        const isIncluded = movie.genre_ids.includes(this.store.searchSerieGenres);
        return isIncluded;
      });
    },
  },
};
</script>

<template>
  <div>
    <div class="container mt-5">
      <!-- movies -->
      <h2 class="text-white text-uppercase text-center">movies</h2>
      <div class="d-flex justify-content-center mt-5">
        <AppSelect :isMovie="true" @select-genre="handleMovieSelect" />
      </div>
      <div
        v-if="store.movieList.length === 0"
        class="d-flex justify-content-center fw-bolt text-uppercase fs-1 mt-5 ms_not-found-container"
      >
        <p class="ms_not-found">Movie not found</p>
      </div>
      <div class="d-flex flex-wrap row justify-content-center">
        <div
          class="col-12 col-md-6 col-lg-4 col-xxl-3 justify-content-center d-flex"
          v-for="movie in store.movieList"
          :key="movie.id"
        >
          <AppCard :movie="movie" />
        </div>
      </div>
      /<!-- movie -->

      <!-- series -->
      <h2 class="text-white text-uppercase ms_title text-center">series</h2>
      <div class="d-flex justify-content-center mt-5">
        <AppSelect :isMovie="false" @select-genre="handleSerieSelect" />
      </div>
      <div
        v-if="store.seriesList.length === 0"
        class="d-flex justify-content-center fw-bolt text-uppercase fs-1 mt-5 align-items-center"
      >
        <p class="ms_not-found">Serie not found</p>
      </div>
      <div class="flex-wrap d-flex row justify-content-center ms_not-found-container">
        <div
          class="col-12 col-md-6 col-lg-4 col-xxl-3"
          v-for="movie in store.seriesList"
          :key="movie.id"
        >
          <AppCard :movie="movie" />
        </div>
      </div>
    </div>
    <!-- /series -->
  </div>
</template>

<style lang="scss" scoped>
.ms_title {
  margin-top: 60px;
}

.ms_not-found-container {
  margin-bottom: 100px;
}

.ms_not-found {
  padding: 5rem;
  background-color: rgba(0, 0, 0, 0.729);
  margin: 0 auto;
  border-radius: 20px;
  color: red;
}
</style>
