<template>
    <div class="content-block">
        <div v-if="c = data.body[locale.code]">
            <h3 v-if="c.title" v-html="c.title"></h3>
            <div v-html="$md.render(c.content)"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data', 'locale']
};
</script>
