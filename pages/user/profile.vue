<template>
    <div>
        <b-row class="mb-5">
            <b-col>
                <h3>{{ $t('your_profile') }}</h3>
            </b-col>
        </b-row>
        <b-row class="mb-5">
            <b-col cols="3">
                <b-form-group>
                    <b-input
                        id="given_name"
                        v-model="user.given_name"
                    />
                    <label
                        :class="user.given_name != '' ? 'active' : null"
                        for="given_name"
                    >{{ $t('given_name') }} *</label>
                </b-form-group>
            </b-col>
            <b-col cols="3">
                <b-form-group>
                    <b-input
                        id="family_name"
                        v-model="user.family_name"
                    />
                    <label
                        :class="user.family_name != '' ? 'active' : null"
                        for="family_name"
                    >{{ $t('family_name') }} *</label>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <b-input
                        id="email"
                        v-model="user.email"
                    />
                    <label
                        :class="user.email != '' ? 'active' : null"
                        for="email"
                    >{{ $t('email') }} *</label>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    middleware: 'authenticated_route',
    async asyncData({ app }) {
        const { data } = await app.$axios.get('/users/whoami')
        console.log(data)
        return {
            user: data
        }
    }
}
</script>
