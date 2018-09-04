<template lang="html">
    <b-navbar class="main-navbar" toggleable="sm" type="dark" variant="secondary">
        <b-container>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse id="nav_collapse" is-nav>

                <b-navbar-nav>
                    <b-nav-item :href="localePath('index')">Home</b-nav-item>
                    <b-nav-item :href="localePath({ name: 'slug', params: { slug: 'about'} })">{{ $t('main_menu.about_us') }}</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown :text="currentLocale.name" right>
                        <b-dropdown-item v-for="locale in $i18n.locales" :key="locale.code" :href="switchLocalePath(locale.code)" :active="locale.code === currentLocale.code">{{ locale.name }}</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown v-if="loggedIn" :title="$t('user')" no-caret right>
                        <template slot="text"><fa :icon="['fas', 'user-circle']" size="lg" /></template>
                        <b-dropdown-item :href="localePath({ name: 'user-profile' })">{{ $t('profile') }}</b-dropdown-item>
                        <b-dropdown-item @click="doTheLogout">{{ $t('logout') }}</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item v-else :href="localePath('user-login')" right>{{ $t('login') }}</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<style lang="scss" scoped>

</style>


<script>
export default {
    computed: {
        localeName() {
            return 'ahha';
        },
        loggedIn() {
            return null !== this.$store.state.unijobs_magic_token;
        }
    },
    methods: {
        doTheLogout() {
            this.$axios
                .post('/logout',
                    null,
                    {
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.unijobs_magic_token}`
                        }
                    }
                )
                .then(_response => {
                    this.$store.commit('updateAuthToken', null);
                    this.$router.push({ path: '/' });
                })
                .catch(error => {
                    console.log('LOGOUT Error', error);
                });
        }
    }
}
</script>
