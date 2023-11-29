import { reactive } from "vue";

export const store = reactive({
  loading: false,
  movieList: [],
  seriesList: [],
  apiUrl: "https://api.themoviedb.org/3",
  apiKey: "7c99d77d8acb8db9c5ee5504f2096b13",
});
