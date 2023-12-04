<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import axios from "axios";
import { store } from "./store";

export default {
  components: {
    AppHeader,
    AppMain,
  },
  data() {
    return {
      store,
    };
  },
  created() {
    this.firstPageMovie();
    this.firstPageSerie();
    this.getMovieGenres();
    this.getSerieGenres();
  },
  methods: {
    getMovieList() {
      const params = {
        api_key: this.store.apiKey,
        query: this.store.searchQuery,
      };
      this.store.loading = true;
      axios
        .get(`${this.store.apiUrl}search/movie`, { params })
        .then((resp) => {
          this.store.movieList = resp.data.results;
          this.store.backupMovieArray = resp.data.results;
          this.store.movieList.forEach((movie) => {
            this.getMovieCredits(movie.id);
          });
        })
        .finally(() => {
          this.store.loading = false;
        });
    },
    getSeriesList() {
      const params = {
        api_key: this.store.apiKey,
        query: this.store.searchQuery,
      };
      this.store.loading = true;
      axios
        .get(`${this.store.apiUrl}search/tv`, { params })
        .then((resp) => {
          this.store.seriesList = resp.data.results;
          this.store.backupSerieArray = resp.data.results;
          this.store.seriesList.forEach((serie) => {
            this.getSeriesCredits(serie.id);
          });
        })
        .finally(() => {
          this.store.loading = false;
        });
    },
    firstPageMovie() {
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
          this.store.backupMovieArray = resp.data.results;
          this.store.movieList.forEach((movie) => {
            this.getMovieCredits(movie.id);
          });
        })
        .finally(() => {
          this.store.loading = false;
        });
    },
    firstPageSerie() {
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
          this.store.backupSerieArray = resp.data.results;
          this.store.seriesList.forEach((serie) => {
            this.getSeriesCredits(serie.id);
          });
        })
        .finally(() => {
          this.store.loading = false;
        });
    },

    searchElms() {
      if (this.store.searchQuery.trim() !== "") {
        this.getMovieList();
        this.getSeriesList();
      }
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
    getMovieGenres() {
      const params = {
        api_key: this.store.apiKey,
      };
      axios
        .get(`${this.store.apiUrl}genre/movie/list`, { params: params })
        .then((resp) => {
          this.store.movieGenres = resp.data.genres;
        });
    },
    getSerieGenres() {
      const params = {
        api_key: this.store.apiKey,
      };
      axios.get(`${this.store.apiUrl}genre/tv/list`, { params: params }).then((resp) => {
        this.store.serieGenres = resp.data.genres;
      });
    },
  },
};
</script>

<template>
  <AppHeader @send-query="searchElms" />
  <AppMain />
</template>

<style lang="scss">
@use './style/general.scss';
@use "@fortawesome/fontawesome-free/css/all.css";
</style>
