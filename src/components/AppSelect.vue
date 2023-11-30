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
    getGenre(selectedGenreId) {
      this.$emit("select-genre", selectedGenreId);
    },
  },
};
</script>

<template>
  <div>
    <select
      v-show="isMovie"
      name="select"
      id="select-movie"
      @change="getGenre"
      class="form-select"
    >
      <option v-for="genre in store.movieGenres" :value="genre.id">
        {{ genre.name }} {{ genre.id }}
      </option>
    </select>
    <select
      v-show="!isMovie"
      name="select"
      id="select-sereies"
      @change="getGenre"
      class="form-select"
    >
      <option v-for="genre in store.serieGenres" :value="genre.id">
        {{ genre.name }} {{ genre.id }}
      </option>
    </select>
  </div>
</template>

<style></style>
