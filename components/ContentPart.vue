<template>
    <div class="content-part">
        <div v-if="c = data.body.find(e => { return e.lang == lang })" v-html="$md.render(c.content)"></div>
        <ContentPart
            v-for="child in data.children"
            :key="child.id"
            :type="child.type"
            :lang="lang"
            :data="child"
        />
    </div>
</template>

<script>
export default {
    props: ['data', 'lang'],
    name: 'ContentPart'
}
</script>
