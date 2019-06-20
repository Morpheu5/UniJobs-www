<template>
    <header id="site-header" class="bg-primary text-light">
        <div id="verenv" v-if="$store.state.www_environment !== 'production'" class="float-right mr-2 mt-1 text-right">
            <p class="small"><strong>{{ $store.state.www_version }} &nbsp; {{ $store.state.www_environment }}</strong></p>
        </div>
        <b-container>
            <b-row align-v="center">
                <b-col>
                    <h1 class="mt-3">UniJobs.it</h1>
                    <p v-t="'headline'" class="headline"></p>
                    <div id="beta-banner">beta</div>
                </b-col>
            </b-row>
        </b-container>
    </header>
</template>

<style lang="scss">
#site-header {
    h1 {
        color: white;
    }

    .headline {
        color: white;
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
    50% { transform: rotate(-20deg); }
    }

    &:hover {
    animation: swing 1s infinite ease-in-out;
    }
}
</style>
