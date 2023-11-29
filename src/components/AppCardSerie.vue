<script>
import { store } from '../store'
export default {
    data() {
        return {
            store,


        }
    },
    props: {
        serie: Object,
    }, 
    methods: {
        formatRating() {
            let rating = Math.floor(this.serie.vote_average / 2)
            return rating
        }
    },
}
</script>

<template>
    <div>
        <ul class="list-unstyled">
            <li>title: {{ serie.name }}</li>
            <li>original title: {{ serie.original_name }}</li>
            <li>original language: {{ serie.original_language }}</li>
            <li> rating: {{ formatRating() }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped></style>