<script>
import { store } from "../store";
export default {
  data() {
    return {
      store,
    };
  },
  props: {
    isMovie: Boolean,
  },
  methods: {
    getGenre() {
      this.$emit("select-genre");
    },
  },
};
</script>

<template>
  <div class="d-flex gap-4 align-items-center">
    <h4 v-show="isMovie" class="text-uppercase text-danger d-none d-md-block ms_title">
      filter
    </h4>

    <!-- movie select -->
    <select
      v-show="isMovie"
      name="select"
      id="select-movie"
      @change="getGenre"
      class="form-select"
      v-model="store.searchMovieGenres"
    >
      <option value="" disabled></option>
      <option v-for="genre in store.movieGenres" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <!-- series select -->
    <select
      v-show="!isMovie"
      name="select"
      id="select-sereies"
      @change="getGenre"
      class="form-select"
      v-model="store.searchSerieGenres"
    >
      <option value="" disabled></option>
      <option v-for="genre in store.serieGenres" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss"></style>
