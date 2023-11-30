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
        getEmpyStar() {
            let emptyStar = 5
            let rating = Math.ceil(this.movie.vote_average / 2)
            return emptyStar - rating
        },
        getImage() {
            if (this.store.flags.includes(this.movie.original_language)) {
                return new URL(`../assets/flags/${this.movie.original_language}.png`, import.meta.url).href;
            }
        },

        removeStar() {
            if (this.movie.vote_average > 0) {
                this.movie.vote_average -= 1;
            }
        },
        addStar() {
            if (this.movie.vote_average < 10) {
                this.movie.vote_average += 1
            }
        }
    },
}

</script>

<template>
    <div class="ms_hover">
        <div v-if="movie.poster_path" class="ms_image list-unstyled"
            :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w342/${movie.poster_path}')` }">
        </div>
        <ul class="list-unstyled overflow-y-auto py-5 px-4" :class="{ 'd-block': !movie.poster_path }">
            <li><span class="fw-bold me-2"> Title:</span> {{ movie.title }}</li>
            <li v-if="movie.original_title !== movie.title"><span class="fw-bold me-2">Original title:</span>{{
                movie.original_title }}</li>
            <li v-if="getImage()"> <span class="fw-bold me-2">Original language:</span> <img :src="getImage()">
            </li>
            <li v-else><span class="fw-bold me-2">Original language:</span>{{ movie.original_language }}</li>
            <li><span class="fw-bold me-2">Overview:</span>{{ movie.overview }}</li>
            <li> <span class="fw-bold me-2">Rating:</span> <i v-for="star in formatRating()" @click="removeStar()"
                    class="fa-solid fa-star"></i><i v-for="emptyStar in getEmpyStar()" @click="addStar()"
                    class="fa-regular fa-star"></i>
            </li>
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
        height: inherit;
        width: inherit;
        background-size: contain;
        border: 2px solid transparent;



    }

    ul {
        display: none;
        height: inherit;
        width: inherit;
        background-color: black;
        color: white;
        border: 2px solid transparent;
    }

    &:hover {
        ul {
            display: block;
            border: 2px solid white;
        }

        .ms_image {
            display: none;
        }
    }

}
</style>