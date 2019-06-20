<template lang="html">
    <b-navbar class="main-navbar" toggleable="sm" type="dark" variant="secondary">
        <b-container>
            <b-navbar-toggle target="nav_collapse" class="ml-0 pl-0"></b-navbar-toggle>

            <b-collapse id="nav_collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :href="localePath('index')">{{ $t('main_menu.jobs') }}</b-nav-item>
                    <b-nav-item :href="localePath({ name: 'slug', params: { slug: 'about'} })">{{ $t('main_menu.about_us') }}</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item :href="switchLocalePath(otherLocale.code)" class="d-none d-sm-block">{{ otherLocale.name }}</b-nav-item>

                    <b-nav-item-dropdown v-if="loggedIn" :title="$t('user')" class="profile-menu" no-caret right>
                        <template slot="text"><fa :icon="['fas', 'smile']" size="lg" /></template>
                        <b-dropdown-item :href="localePath({ name: 'user-profile' })" variant="light">{{ $t('profile') }}</b-dropdown-item>
                        <b-dropdown-item @click="doTheLogout" variant="light">{{ $t('logout') }}</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item v-else :href="localePath('user-login')" class="login-item" right>{{ $t('login') }}</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
export default {
    computed: {
        localeName() {
            return 'ahha';
        },
        loggedIn() {
            return null !== this.$store.state.unijobs_magic_token;
        },
        otherLocale() {
            return this.$i18n.locales.filter(l => l.code !== this.currentLocale.code)[0];
        }
    },
    methods: {
        doTheLogout() {
            this.$axios
                .post('/api/logout',
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
};
</script>
