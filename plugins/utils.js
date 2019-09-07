import Vue from 'vue';

Vue.mixin({
    computed: {
        currentLocale() {
            return this.$i18n.locales.find((e) => e.code === this.$i18n.locale);
        },
        bispritesvg() {
            return require('../node_modules/bootstrap-italia/dist/svg/sprite.svg');
        },
        loggedIn() {
            return null !== this.$store.state.unijobs_magic_token;
        },
        userRole() {
            return this.$store.state.user_role;
        }
    }
});