<template>
    <div>
        <b-row>
            <b-col cols="4" offset="4">
                <b-form-input id="emailInput"
                    type="email"
                    v-model="email"
                    required
                    placeholder="Email address">
                </b-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col cols="4" offset="4">
                <b-form-input id="passwordInput"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    required
                    placeholder="Password">
                </b-form-input>
            </b-col>
            <b-col class="form-check" cols="2">
                <b-checkbox v-model="showPassword" id="showPassword">Show password</b-checkbox>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4" offset="4">
                <div class="float-right mt-4">
                    <b-button variant="primary" @click="doTheLogin">Login</b-button>
                    <span class="mx-3"></span>
                    <b-button variant="secondary">Sign Up</b-button>
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
