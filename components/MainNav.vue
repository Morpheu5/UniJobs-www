<template lang="html">
    <b-navbar class="main-navbar" toggleable="sm" type="dark" variant="secondary">
        <b-container>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item :href="localePath('index')">Home</b-nav-item>
                    <b-nav-item :href="localePath({ name: 'slug', params: { slug: 'about'} })">About Us</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown :text="currentLocale.name" right>
                        <b-dropdown-item v-for="locale in $i18n.locales" :key="locale.code" :href="switchLocalePath(locale.code)">{{ locale.name }}</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown v-if="loggedIn" text="User" right>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item @click="doTheLogout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item v-else :href="localePath('user-login')" right>Login</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<style lang="scss" scoped>

</style>


<script>
export default {
    methods: {
        doTheLogout() {
            console.log(this.$store);
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
    },
    computed: {
        localeName() {
            return 'ahha';
        },
        loggedIn() {
            return null !== this.$store.state.unijobs_magic_token;
        }
    }
}
</script>
