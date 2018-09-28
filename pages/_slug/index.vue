<template>
    <b-row>
        <b-col lg="8" offset-lg="2">
            <div>
                <h2 class="mb-5">{{ content.title[currentLocale.code] }}</h2>
                <section class="content-description">
                    <ContentBlock
                        v-for="block in content.content_blocks"
                        :key="`${content.id}-${block.id}`"
                        :type="block.block_type"
                        :locale="currentLocale"
                        :data="block"
                    />
                </section>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import ContentBlock from '~/components/ContentBlock';

export default {
    components: {
        ContentBlock
    },
    async asyncData({ app, error, params }) {
        const response = await app.$axios.get(`/api/contents/slug/${params.slug}`)
                                         .catch(({response}) => error({
                                             statusCode: response.status,
                                             params: params,
                                         }));
        return { content: response.data };
    }
};
</script>
