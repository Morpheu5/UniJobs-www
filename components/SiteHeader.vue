<template>
    <header id="site-header" class="bg-primary text-light">
        <div id="verenv" v-if="$store.state.www_environment !== 'production'" class="float-right mr-2 mt-1 text-right">
            <p class="small"><strong>{{ $store.state.www_version }} &nbsp; {{ $store.state.www_environment }}</strong></p>
        </div>
        <b-container>
            <b-row align-v="center">
                <b-col>
                    <h1 class="text-white mt-3">UniJobs.it</h1>
                    <p v-t="'headline'" class="headline text-white"></p>
                </b-col>
            </b-row>
        </b-container>
    </header>
</template>
