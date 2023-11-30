<script>
import { store } from '../store'
import AppCardSerie from './AppCardSerie.vue';
import AppCardMovie from './AppCardMovie.vue';
export default {
    data() {
        return {
            store,

        }
    },
    components: {
        AppCardMovie,
        AppCardSerie
    }
}
</script>

<template>
    <div>
        <div class="container mt-5">
            <h2 class="text-white text-uppercase text-center">movies</h2>
            <div class="d-flex flex-wrap row">
                <div class="  col-12 col-md-6 col-lg-4 col-xxl-3 " v-for="movie in store.movieList" :key="movie.id">
                    <AppCardMovie :movie="movie" />
                </div>
            </div>
            <h2 class="text-white text-uppercase ms_title text-center">series</h2>
            <div class="flex-wrap d-flex row">
                <div class=" col-12 col-md-6 col-lg-4 col-xxl-3" v-for="serie in store.seriesList" :key="serie.id">
                    <AppCardSerie :serie="serie" />
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
