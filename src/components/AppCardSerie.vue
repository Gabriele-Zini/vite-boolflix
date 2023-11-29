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
            let rating = Math.ceil(this.serie.vote_average / 2)
            return rating
        },
        getImage() {
            if (this.store.flags.includes(this.serie.original_language)) {
                return new URL(`../assets/flags/${this.serie.original_language}.png`, import.meta.url).href;
            }
        }

    },
}
</script>

<template>
    <div>
        <ul class="list-unstyled">
            <li>title: {{ serie.name }}</li>
            <li>original title: {{ serie.original_name }}</li>
            <li v-if="getImage()"> original language: <img :src="getImage()">
            </li>
            <li v-else>original language: {{ serie.original_language }}</li>
            <li> rating: {{ formatRating() }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped></style>