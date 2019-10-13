<template>
    <div>
        <pre>
            API {{ api.api_environment }}
            {{ api.api_version }}
            
            WWW {{ $store.state.www_environment }}
            {{ $store.state.www_version }}
        </pre>
    </div>
</template>

<script>
export default {
    async asyncData({ app }) {
        const jobsResponse = await app.$axios.get('');
        return {
            api: jobsResponse.data,
        };
    },
};
</script>
