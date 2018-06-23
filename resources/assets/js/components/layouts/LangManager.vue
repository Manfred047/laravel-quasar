<template>
    <div>
        <q-select v-model="language" :options="list"></q-select>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        name: "LangManager",
        computed: {
            ...mapGetters('lang', ['list', 'lang']),
            language: {
                get() {
                    return this.lang;
                },
                set(value) {
                    this.setLanguage(value);
                }
            }
        },
        methods: {
            ...mapActions('lang', ['setLanguage'])
        }
    }
</script>

<style scoped>

</style>