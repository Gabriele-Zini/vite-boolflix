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
        },
    },
}
</script>

<template>
    <div class="ms_hover">
        <div v-if="serie.poster_path" class="ms_image list-unstyled"
            :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w342/${serie.poster_path}')` }">
        </div>
        <ul class="list-unstyled  py-5 px-4" :class="{ 'd-block': !serie.poster_path }">
            <li>title: {{ serie.name }}</li>
            <li>original title: {{ serie.original_name }}</li>
            <li v-if="getImage()"> original language: <img :src="getImage()">
            </li>
            <li v-else>original language: {{ serie.original_language }}</li>
            <li> rating: {{ formatRating() }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.ms_hover {
    height: 400px;
    width: 300px;
    margin-top: 50px;
    margin-bottom: 50px;

    .ms_image {
        height: 400px;
        width: 300px;
        background-size: cover;
        border: 2px solid white;



    }

    ul {
        display: none;
        height: 400px;
        width: 300px;
        background-color: black;
        color: white;
        border: 2px solid white;
    }

    &:hover {
        ul {
            display: block
        }

        .ms_image {
            display: none;
        }
    }

}
</style>