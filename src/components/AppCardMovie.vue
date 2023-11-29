<script>
import { store } from '../store'

export default {
    data() {
        return {
            store,
           
        }
    },

    props: {
        movie: Object,
    },
    methods: {
        formatRating() {
            let rating = Math.ceil(this.movie.vote_average / 2)
            return rating
        },
        getImage() {
            if (this.store.flags.includes(this.movie.original_language)) {
                return new URL(`../assets/flags/${this.movie.original_language}.png`, import.meta.url).href;
            }
        }


    },
}

</script>

<template>
    <div>
        <ul class="list-unstyled">
            <li>title: {{ movie.title }}</li>
            <li>original title: {{ movie.original_title }}</li>
            <li v-if="getImage()"> original language: <img :src="getImage()">
            </li>
            <li v-else>original language: {{ movie.original_language }}</li>
            <li>rating: {{ formatRating() }}</li>
            <li> <img :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`" alt=""></li>
        </ul>
    </div>
</template>

<style lang="scss" scoped></style>