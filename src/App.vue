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
        query: "Ciao",
      }
      this.store.loading = true
      console.log(this.store.loading)
      axios.get(`${this.store.apiUrl}/search/movie`, { params }).then((resp) => {
        this.store.movieList.push(resp.data.results)
        console.log(this.store.movieList)
      }).finally(() => {
        this.store.loading = false
        console.log(this.store.loading)
      })
    },
    getSeriesList() {
      const params = {
        api_key: this.store.apiKey,
        query: "Ciao",
      }
      this.store.loading = true
      console.log(this.store.loading)
      axios.get(`${this.store.apiUrl}/search/tv`, { params }).then((resp) => {
        this.store.seriesList.push(resp.data.results)
        console.log(this.store.seriesList)
      }).finally(() => {
        this.store.loading = false
        console.log(this.store.loading)
      })
    }
  }
}
</script>

<template>
  <AppHeader />
  <AppMain />
</template>

<style lang="scss">
@use './style/general.scss';
</style>
