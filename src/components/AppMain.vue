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
            <h2>movies</h2>
            <div class="d-flex flex-wrap row">
                <div class="card col-4" v-for="movie in store.movieList" :key="movie.id">
                    <AppCardMovie :movie="movie" />
                </div>
            </div>
            <h2>series</h2>
            <div class="flex-wrap d-flex row">
                <div class="card col-4" v-for="serie in store.seriesList" :key="serie.id">
                    <AppCardSerie :serie="serie" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
