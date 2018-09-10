import Vue from 'vue';

Vue.mixin({
    computed: {
        currentLocale() {
            return this.$i18n.locales.find((e) => e.code === this.$i18n.locale);
        }
    }
});