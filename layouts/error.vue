<template>
    <div class="container">
        <h1>{{ $t(`errors.e${error.statusCode}_headline`) }}</h1>
        <p>{{ $t(`errors.e${error.statusCode}_message`) }}</p>
        <p>{{ $t(`errors.server_says`) }}:</p>
        <pre>{{ error.message }}</pre>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'default' // you can set a custom layout for the error page
};
</script>