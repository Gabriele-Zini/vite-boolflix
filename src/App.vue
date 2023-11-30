<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import axios from 'axios';
import { store } from './store';

export default {
  components: {
    AppHeader,
    AppMain,
  },
  data() {
    return {
      store,
    }
  },
  created() {
    this.firstPageMovie()
    this.firstPageSerie()
  },
  methods: {
    getMovieList() {
      const params = {
        api_key: this.store.apiKey,
        query: this.store.searchQuery,
      }
      this.store.loading = true
      axios.get(`${this.store.apiUrl}search/movie`, { params }).then((resp) => {
        this.store.movieList = resp.data.results
      }).finally(() => {
        this.store.loading = false
      })
    },
    getSeriesList() {
      const params = {
        api_key: this.store.apiKey,
        query: this.store.searchQuery,
      }
      this.store.loading = true
      axios.get(`${this.store.apiUrl}search/tv`, { params }).then((resp) => {
        this.store.seriesList = resp.data.results

      }).finally(() => {
        this.store.loading = false
      })
    },
    firstPageMovie() {
      const params = {
        api_key: this.store.apiKey,
      }
      this.store.loading = true
      axios.get(`${this.store.apiUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`, { params }).then((resp) => {
        this.store.movieList = resp.data.results

      }).finally(() => {
        this.store.loading = false
      })
    },
    firstPageSerie() {
      const params = {
        api_key: this.store.apiKey,
      }
      this.store.loading = true
      axios.get(`${this.store.apiUrl}discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200`, { params }).then((resp) => {
        this.store.seriesList = resp.data.results

      }).finally(() => {
        this.store.loading = false
      })
    },

    searchElms() {
      console.log(store.searchQuery)
      if (this.store.searchQuery.trim() !== '') {
        this.getMovieList()
        this.getSeriesList()
      }


    }
  }
}
</script>

<template>
  <AppHeader @send-query="searchElms" />
  <AppMain />
</template>

<style lang="scss">
@use './style/general.scss';
@use "@fortawesome/fontawesome-free/css/all.css";
</style>
