<script>
import { store } from '../store'
export default {
    data() {
        return {
            store,
            

        }
    },
    props: {
        movie: Object
    }
}
</script>

<template>
   <div >{{ movie.title }}</div>
</template>

<style lang="scss" scoped></style>