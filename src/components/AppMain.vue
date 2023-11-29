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
        AppCard
    }
}
</script>

<template>
    <div v-for="movie in store.movieList" :key="movie.id">
        <AppCard :movie="movie" />
    </div>
</template>

<style lang="scss" scoped></style>
