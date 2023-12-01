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
    computed: {
        title() {
            return this.movie.title ? this.movie.title : this.movie.name
        },
        originalTitle() { return this.movie.original_title ? this.movie.origina_title : this.movie.original_name },
        getCast() {
            let castNames = "";
            if (this.movie.credits && this.movie.credits.length > 0) {

                for (let index in this.movie.credits) {
                    if (index < 5) {
                        castNames += index < 4 ? this.movie.credits[index].name + ", " : this.movie.credits[index].name + '.'
                    }
                }
                return castNames
            }
        }
    }
}

</script>

<template>
    <div class="ms_hover">
        <div v-if="movie.poster_path" class="ms_image list-unstyled"
            :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w342/${movie.poster_path}')` }">
        </div>
        <ul class="list-unstyled overflow-y-auto py-5 px-4" :class="{ 'd-block': !movie.poster_path }">
            <li><span class="fw-bold me-2"> Title:</span> {{ title }}</li>
            <li v-if="originalTitle !== title"><span class="fw-bold me-2">Original title:</span>{{
                movie.original_title }}</li>
            <li v-if="getImage()"> <span class="fw-bold me-2">Original language:</span> <img :src="getImage()">
            </li>
            <li v-else><span class="fw-bold me-2">Original language:</span>{{ movie.original_language }}</li>
            <li><span class="fw-bold me-2">Overview:</span>{{ movie.overview }}</li>
            <li> <span class="fw-bold me-2">Rating:</span> <i v-for="star in formatRating()" @click="removeStar()"
                    class="fa-solid fa-star"></i><i v-for="emptyStar in getEmpyStar()" @click="addStar()"
                    class="fa-regular fa-star"></i>
            <li><span class="fw-bold me-2">Cast: </span> <span>{{ getCast }} </span>
            </li>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.ms_hover {
    height: 400px;
    width: 300px;
    margin: 50px auto;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.200);


    .ms_image {
        height: inherit;
        width: inherit;
        background-size: cover;
        background-position: center;
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