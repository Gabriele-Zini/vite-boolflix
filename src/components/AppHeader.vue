<script>
import { store } from '../store'
export default {
    data() {
        return {
            store,

        }
    },
}
</script>

<template>
    <header>
        <div class="d-flex align-items-center h-100 justify-content-between container">
            <div class="d-flex align-items-center gap-4 h-100">
                <img class="d-lg-none ms_logo-sm" src="../assets/img/netflix-logo.png" alt="logo">
                <img class="d-s-none d-none d-lg-block ms_logo-lg" src="../assets/img/netflix-logo-lg.png" alt="logo">
                <ul class="text-white list-unstyled gap-3 m-0 d-none d-lg-flex">
                    <li>Home</li>
                    <li>TV shows</li>
                    <li>Movies</li>
                    <li>Popular</li>
                    <li>News</li>
                    <li>My list</li>
                </ul>
            </div>
            <div class="d-flex">
                <input type="text" placeholder="search" class="form" v-model="store.searchQuery"
                    @keyup.enter="$emit('send-query')">
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    background-color: black;
    height: 80px;

    .ms_logo-sm {
        width: 50px;
    }

    .ms_logo-lg {
        width: 150px;
    }

    li:hover {
        color: red;
        cursor: pointer;
    }
}
</style>