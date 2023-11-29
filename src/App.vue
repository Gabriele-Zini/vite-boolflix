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
    this.getMovieList()
    this.getSeriesList()
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
    searchElms() {
      console.log(store.searchQuery)
      this.getMovieList()
      this.getSeriesList()
      console.log(this.store.seriesList)
      console.log(this.store.movieList)
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
</style>
