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
    /* handleSelect Movies */
    handleMovieSelect(selectedGenreId) {
      const params = {
        api_key: this.store.apiKey,
      };
      this.store.loading = true;
      let url = ``;
      if (this.store.typeMovieSearch === "top_rated") {
        url = `${this.store.apiUrl}movie/top_rated`;
      } else if (this.store.typeMovieSearch === "popular") {
        url = `${this.store.apiUrl}movie/popular?&page=1`;
      } else if (this.store.typeMovieSearch === "upcoming") {
        url = `${this.store.apiUrl}movie/upcoming`;
      } else if (this.store.typeMovieSearch === "now_playing") {
        url = `${this.store.apiUrl}movie/now_playing?&page=2`;
      } else {
        url = `${this.store.apiUrl}movie/popular?page=2`;
      }
      axios
        .get(url, { params })
        .then((resp) => {
          this.store.movieList = resp.data.results;
          this.store.movieList.forEach((movie) => {
            this.getMovieCredits(movie.id);
          });
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        })
        .finally(() => {
          selectedGenreId = parseInt(selectedGenreId.target.value);
          this.store.movieList = this.store.movieList.filter((movie) => {
            const isIncluded = movie.genre_ids.includes(selectedGenreId);
            return isIncluded;
          });
        });
      console.log(this.store.movieList);
    },

    /* handleSelect Series */
    handleSerieSelect(selectedGenreId) {
      const params = {
        api_key: this.store.apiKey,
      };
      this.store.loading = true;
      let url = ``;
      if (this.store.typeSerieSearch === "airing_today") {
        url = `${this.store.apiUrl}tv/airing_today?page=10`;
      } else if (this.store.typeSerieSearch === "on_the_air") {
        url = `${this.store.apiUrl}tv/on_the_air`;
      } else if (this.store.typeSerieSearch === "popular") {
        url = `${this.store.apiUrl}tv/popular`;
      } else if (this.store.typeSerieSearch === "top_rated") {
        url = `${this.store.apiUrl}tv/top_rated`;
      } else {
        url = `${this.store.apiUrl}tv/airing_today`;
      }

      axios
        .get(url, { params })
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
    handleTypeMovieList() {
      console.log(this.store.typeMovieSearch);
      return this.store.typeMovieSearch;
    },
    handleTypeSerieList() {
      console.log(this.store.typeSerieSearch);
      return this.store.typeSerieSearch;
    },

    handleClickParent() {
      this.handleMovieSelect();
      //da implementare
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
        <AppSelect
          :isMovie="true"
          @select-genre="handleMovieSelect"
          @get-type-movie-list="handleTypeMovieList"
          @handle-click="handleClickParent()"
        />
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
        <AppSelect
          :isMovie="false"
          @select-genre="handleSerieSelect"
          @get-type-serie-list="handleTypeSerieList"
        />
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
