<script>
import { store } from '../store'
import AppCard from './AppCard.vue';
export default {
    data() {
        return {
            store,

        }
    },
    components: {
        AppCard,
    }
}
</script>

<template>
    <div>
        <div class="container mt-5">
            <h2 class="text-white text-uppercase text-center">movies</h2>
            <div class="d-flex flex-wrap row">
                <div class="col-12 col-md-6 col-lg-4 col-xxl-3 justify-content-center " v-for="movie in store.movieList"
                    :key="movie.id">
                    <AppCard :movie="movie" />
                </div>
            </div>
            <h2 class="text-white text-uppercase ms_title text-center">series</h2>
            <div class="flex-wrap d-flex row justify-content-center">
                <div class=" col-12 col-md-6 col-lg-4 col-xxl-3" v-for="movie in store.seriesList" :key="movie.id">
                    <AppCard :movie="movie" />
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
