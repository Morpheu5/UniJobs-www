<template>
    <div>
        <b-row>
            <b-col cols="4" offset="4">
                <b-input id="emailInput"
                         v-model="email"
                         :placeholder="$t('email_address')"
                         name="email"
                         type="email"
                         autocomplete="username"
                         required />
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col cols="4" offset="4">
                <div class="form-group">
                    <input id="passwordInput"
                           :placeholder="$t('password')"
                           :type="showPassword ? 'text' : 'password'"
                           v-model="password"
                           name="password"
                           autocomplete="current-password"
                           class="form-control" />
                    <span :class="showPassword ? 'eye-on' : 'eye-off'" class="btn-eye" @click="showPassword = !showPassword"></span>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4" offset="4">
                <div class="float-right mt-4">
                    <b-button variant="primary" @click="doTheLogin">{{ $t('login') }}</b-button>
                    <span class="mx-3"></span>
                    <b-button variant="secondary">{{ $t('sign_up') }}</b-button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            showPassword: false
        }
    },
    methods: {
        doTheLogin() {
            this.$axios.post(
                '/login',
                { email: this.email, password: this.password }
            ).then(response => {
                if (response.data.token) {
                    this.$store.commit('updateAuthToken', response.data.token);
                    this.$router.push({ path: this.$route.query.redirect || '/' })
                } else {
                    // TODO Show error maybe?
                }
            }).catch(error => {
                console.debug(error);
            })
        }
    }
}
</script>
