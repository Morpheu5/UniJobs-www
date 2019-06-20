<template>
    <header id="site-header" class="bg-primary text-light">
        <!-- <div id="verenv" v-if="$store.state.www_environment !== 'production'" class="float-right mr-2 mt-1 text-right">
            <p class="small"><strong>{{ $store.state.www_version }} &nbsp; {{ $store.state.www_environment }}</strong></p>
        </div> -->
        <b-container>
            <b-row align-v="center">
                <b-col>
                    <h1 class="mt-3"><a href="/">UniJobs.it</a></h1>
                    <p class="headline">
                        <span><strong>{{ $t('headline') }}</strong></span>
                        <span id="header-language" class="d-block d-sm-none pr-3 text-right"><a :href="switchLocalePath(otherLocale.code)" ><strong>{{ otherLocale.name }}</strong></a></span>
                    </p>
                    <div id="beta-banner">beta</div>
                </b-col>
            </b-row>
        </b-container>
    </header>
</template>

<style lang="scss">
#site-header {
    position: relative;

    h1 {
        color: white;

        a {
            color: white;
            text-decoration: none;
        }
    }

    .headline {
        color: white;
    }

    #header-language {
        float: right;

        a {
            color: white;
        }
    }
}
#beta-banner {
    position: absolute;
    top: 0.5rem;
    left: -0.5rem;
    transform: rotate(-25deg);
    background: #db3c61;
    color: white;
    font-weight: normal;
    font-size: 0.8rem;
    padding: 0 0.25rem;
    border-radius: 4px;
    border: 1px solid #ffc9d6;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

    @keyframes swing {
        0%, 100% { transform: rotate(-25deg); }
        50% { transform: rotate(-15deg); }
    }

    &:hover {
        animation: swing 0.5s 3 ease-in-out;
    }
}
</style>

<script>
export default {
    computed: {
        otherLocale() {
            return this.$i18n.locales.filter(l => l.code !== this.currentLocale.code)[0];
        }
    }
};
</script>