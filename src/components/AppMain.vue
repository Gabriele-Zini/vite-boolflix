<script>
import { store } from "../store";
import AppCard from "./AppCard.vue";
import AppSelect from "./AppSelect.vue";
export default {
  data() {
    return {
      store,
      localMovieList: [...store.movieList],
      localSeriesList: [...store.serieGenres],
    };
  },
  components: {
    AppCard,
    AppSelect,
  },
  methods: {
    handleMovieSelect(selectedGenreId) {
      selectedGenreId = parseInt(selectedGenreId.target.value);
      console.log(typeof selectedGenreId, selectedGenreId);
      console.log(this.store.movieList);
      this.store.movieList = this.store.movieList.filter((movie) => {
        const isIncluded = movie.genre_ids.includes(selectedGenreId);
        console.log(isIncluded); // Aggiunto console.log per debug
        return isIncluded;
      });
      console.log(this.store.movieList);
    },
    handleSerieSelect(selectedGenreId) {
      selectedGenreId = parseInt(selectedGenreId.target.value);
      console.log(typeof selectedGenreId, selectedGenreId);
      this.store.seriesList = this.store.seriesList.filter((serie) => {
        const isIncluded = serie.genre_ids.includes(selectedGenreId);
        console.log(isIncluded); // Aggiunto console.log per debug
        return isIncluded;
      });
      console.log(this.store.seriesList);
    },
  },
};
</script>

<template>
  <div>
    <div class="container mt-5">
      <h2 class="text-white text-uppercase text-center">movies</h2>
      <AppSelect :isMovie="true" @select-genre="handleMovieSelect" />
      <div class="d-flex flex-wrap row">
        <div
          class="col-12 col-md-6 col-lg-4 col-xxl-3 justify-content-center"
          v-for="movie in store.movieList"
          :key="movie.id"
        >
          <AppCard :movie="movie" />
        </div>
      </div>
      <h2 class="text-white text-uppercase ms_title text-center">series</h2>
      <AppSelect :isMovie="false" @select-genre="handleSerieSelect" />
      <div class="flex-wrap d-flex row justify-content-center">
        <div
          class="col-12 col-md-6 col-lg-4 col-xxl-3"
          v-for="movie in store.seriesList"
          :key="movie.id"
        >
          <AppCard :movie="movie" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ms_title {
  margin-top: 60px;
}
</style>
