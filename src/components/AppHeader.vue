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
    <div class="d-flex">
        <input type="text" class="form" v-model="store.searchQuery" @keyup.enter="$emit('send-query')">
        <label for="text">search</label>
    </div>
</template>

<style lang="scss" scoped></style>