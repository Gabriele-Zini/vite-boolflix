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
            <li><span class="fw-bold me-2">Title:</span> {{ serie.name }}</li>
            <li v-if="serie.original_name !== serie.name"><span class="fw-bold me-2">Original title:</span> {{ serie.original_name }}</li>
            <li v-if="getImage()"> <span class="fw-bold me-2">Original language:</span> <img :src="getImage()">
            </li>
            <li v-else><span class="fw-bold">Original language:</span> {{ serie.original_language }}</li>
            <li> <span class="fw-bold me-2">Rating:</span>{{ formatRating() }}</li>
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