<template>
    <aside v-if="!cookiesAccepted && showBanner" class="bg-dark text-white">
        <b-container class="p-4">
            <p v-html="$t('cookie_banner.message')" />
            <p>
                <b-btn class="mr-2" variant="info" @click="acceptCookies">{{ $t('cookie_banner.accept') }}</b-btn>
                <b-btn to="/privacy" variant="outline-info">{{ $t('cookie_banner.privacy') }}</b-btn>
            </p>
        </b-container>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            showBanner: true,
        };
    },
    computed: {
        cookiesAccepted() {
            return this.$cookies.get('accept_cookies');
        }
    },
    methods: {
        acceptCookies() {
            this.$cookies.set('accept_cookies', true);
            this.showBanner = false;
        }
    }
};
</script>
