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
           let rating = Math.floor(this.movie.vote_average / 2)
            return rating
        }
    },
    mounted() {
        // Metti il console.log qui
        console.log(this.store.seriesList.original_language);
    }
}

</script>

<template>
    <div>
        <ul class="list-unstyled">
            <li>title: {{ movie.title }}</li>
            <li>original title: {{ movie.original_title }}</li>
            <li>original language: {{ movie.original_language }}</li>
            <li>rating: {{ formatRating() }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped></style>