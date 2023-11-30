<script>
import { store } from "../store";
import AppCard from "./AppCard.vue";
import AppSelect from "./AppSelect.vue";
import axios from "axios";
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
    handleMovieSelect(selectedGenreId) {
      const params = {
        api_key: this.store.apiKey,
      };
      this.store.loading = true;
      axios
        .get(
          `${this.store.apiUrl}discover/movie?include_adult=false&include_video=false&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
          { params }
        )
        .then((resp) => {
          this.store.movieList = resp.data.results;
          this.store.movieList.forEach((movie) => {
            this.getMovieCredits(movie.id);
          });
        })
        .finally(() => {
          console.log(this.localMovieList);
          selectedGenreId = parseInt(selectedGenreId.target.value);
          this.store.movieList = this.store.movieList.filter((movie) => {
            const isIncluded = movie.genre_ids.includes(selectedGenreId);
            return isIncluded;
          });
        });
      console.log(this.store.movieList);
    },
    handleSerieSelect(selectedGenreId) {
      const params = {
        api_key: this.store.apiKey,
      };
      this.store.loading = true;
      axios
        .get(
          `${this.store.apiUrl}discover/tv?include_adult=false&page=1&sort_by=vote_average.desc&vote_count.gte=200`,
          { params }
        )
        .then((resp) => {
          this.store.seriesList = resp.data.results;
          this.store.seriesList.forEach((serie) => {
            this.getSeriesCredits(serie.id);
          });
        })
        .finally(() => {
          selectedGenreId = parseInt(selectedGenreId.target.value);
          this.store.seriesList = this.store.seriesList.filter((serie) => {
            const isIncluded = serie.genre_ids.includes(selectedGenreId);
            return isIncluded;
          });
        });
    },

    getMovieCredits(movieId) {
      const creditsParams = {
        api_key: this.store.apiKey,
      };
      axios
        .get(`${this.store.apiUrl}movie/${movieId}/credits`, { params: creditsParams })
        .then((resp) => {
          const movieIndex = this.store.movieList.findIndex(
            (movie) => movie.id === movieId
          );
          if (movieIndex !== -1) {
            this.store.movieList[movieIndex].credits = resp.data.cast;
          }
        });
    },
    getSeriesCredits(serieId) {
      const creditsParams = {
        api_key: this.store.apiKey,
      };
      axios
        .get(`${this.store.apiUrl}tv/${serieId}/credits`, { params: creditsParams })
        .then((resp) => {
          const serieIndex = this.store.seriesList.findIndex(
            (serie) => serie.id === serieId
          );
          if (serieIndex !== -1) {
            this.store.seriesList[serieIndex].credits = resp.data.cast;
          }
        });
    },
  },
};
</script>

<template>
  <div>
    <div class="container mt-5">
      <h2 class="text-white text-uppercase text-center">movies</h2>
      <div class="d-flex justify-content-center mt-5">
        <AppSelect :isMovie="true" @select-genre="handleMovieSelect" />
      </div>
      <div class="d-flex flex-wrap row justify-content-center">
        <div v-show="store.movieList.length === 0">Movie not found</div>
        <div
          class="col-12 col-md-6 col-lg-4 col-xxl-3 justify-content-center d-flex"
          v-for="movie in store.movieList"
          :key="movie.id"
        >
          <AppCard :movie="movie" />
        </div>
      </div>
      <h2 class="text-white text-uppercase ms_title text-center">series</h2>
      <div class="d-flex justify-content-center mt-5">
        <AppSelect :isMovie="false" @select-genre="handleSerieSelect" />
      </div>
      <div class="flex-wrap d-flex row justify-content-center">
        <div v-show="store.seriesList.length === 0">Serie no found</div>
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
