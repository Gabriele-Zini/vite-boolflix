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
    getTypeMovieList() {
      this.$emit("get-type-movie-list");
    },

    getTypeSerieList() {
      this.$emit("get-type-serie-list");
    },

    handleClick() {
      this.$emit("handle-click");
    },
  },
};
</script>

<template>
  <div class="d-flex gap-4 align-items-center">
    <!-- movie select -->
    <h4 v-show="isMovie" class="text-uppercase text-danger d-none d-md-block ms_title">
      filter by genres
    </h4>
    <select
      v-show="isMovie"
      name="select"
      id="select-movie"
      @change="getGenre"
      class="form-select"
    >
      <option v-for="genre in store.movieGenres" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <h4 v-if="isMovie" class="text-uppercase text-danger d-none d-md-block">category</h4>
    <select
      name="select"
      id="list-type-mpvie"
      v-show="isMovie"
      v-model="this.store.typeMovieSearch"
      @change="getTypeMovieList()"
      class="form-select"
    >
      <option value="now_playing">Now playing</option>
      <option value="popular">Popular</option>
      <option value="top_rated">Top Rated</option>
      <option value="upcoming">Upcoming</option>
    </select>
    <button v-if="isMovie" class="btn btn-danger ms_button" @click="handleClick">
      get category
    </button>

    <!-- series select -->
    <select
      v-show="!isMovie"
      name="select"
      id="select-sereies"
      @change="getGenre"
      class="form-select"
    >
      <option v-for="genre in store.serieGenres" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
    <h4 v-if="!isMovie" class="text-uppercase d-none d-md-inline-block text-danger">
      category
    </h4>
    <select
      name="select"
      id="list-type-mpvie"
      v-show="!isMovie"
      v-model="this.store.typeSerieSearch"
      @change="getTypeSerieList()"
      class="form-select"
    >
      <option value="airing_today">Airing today</option>
      <option value="popular">Popular</option>
      <option value="top_rated">Top Rated</option>
      <option value="on_the_air">On the air</option>
    </select>
    <button v-if="!isMovie" class="btn btn-danger ms_button" @click="handleClick">
      get category
    </button>
  </div>
</template>

<style scoped lang="scss">
.ms_button {
  min-width: 150px;
}

.ms_title {
  min-width: 200px;
}
</style>
