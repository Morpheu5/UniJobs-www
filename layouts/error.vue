<template>
    <div class="container">
        <h1>{{ $t(`e${error.statusCode}_headline`) }}</h1>
        <p>{{ $t(`e${error.statusCode}_message`) }}</p>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'default' // you can set a custom layout for the error page
};
</script>