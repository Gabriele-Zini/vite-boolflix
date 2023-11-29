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
    }
}
</script>

<template>
    <div>
        <ul class="list-unstyled">
            <li>{{ serie.name }}</li>
            <li>{{ serie.original_name }}</li>
            <li>{{ serie.original_language }}</li>
            <li>{{ serie.vote_average}}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped></style>