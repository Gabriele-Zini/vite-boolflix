<script>
import Flag from 'vue-flagpack';

export default {
    props: {
        languageCode: String,
    },
    components: {
        Flag
    },
    computed: {
        formattedLanguageCode() {
            return this.languageCode.toUpperCase();
        },
    },
}
</script>

<template>
    <div>
        <Flag :code="formattedLanguageCode" />
    </div>
</template>