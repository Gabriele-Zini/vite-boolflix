<script>
import './components/AppHeader.vue';
import './components/AppMain.vue'
import {store} from './store'

export default {
  components: {
    AppHeader,
    AppMain,
  },
  data() {
    return {
      store,
    }
  }
}
</script>

<template>
  <AppHeader />
  <AppMain />
</template>

<style lang="scss">
@use './style/general.scss';
</style>
