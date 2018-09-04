<template>
    <div>
        <b-row v-if="null !== emailVerificationStatus" class="mb-3">
            <b-col cols="4" offset="4">
                <b-alert :show="emailVerificationStatus" variant="success">
                    {{ $t('email_verification_success') }}
                </b-alert>
                <b-alert :show="!emailVerificationStatus" variant="warning">
                    {{ $t('email_verification_failure') }}
                </b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4" offset="4">
                <b-input id="emailInput"
                         v-model="email"
                         :placeholder="$t('email_address')"
                         name="email"
                         type="email"
                         autocomplete="username"
                         required
                         @input="loginFailed = false; signupOutcome = null"
                />
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col cols="4" offset="4">
                <b-form-group>
                    <b-input id="passwordInput"
                             v-model="password"
                             :placeholder="$t('password')"
                             :type="showPassword ? 'text' : 'password'"
                             name="password"
                             autocomplete="current-password"
                             @input="loginFailed = false; signupOutcome = null"
                             @keyup.native.enter="doTheLogin"
                    />
                    <span :class="showPassword ? 'eye-on' : 'eye-off'" class="btn-eye" style="left: -2.5em" @click="showPassword = !showPassword"></span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4" offset="4">
                <b-alert :show="loginFailed" variant="warning" class="mt-3">
                    {{ $t('login_failure_message') }}
                </b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4" offset="4">
                <b-alert :show="signupOutcome === 'success'" variant="success" class="mt-3">
                    {{ $t('signup_success_message') }}
                </b-alert>
                <b-alert :show="signupOutcome === 'fail'" variant="warning" class="mt-3">
                    {{ $t('signup_failure_message') }}
                </b-alert>

            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4" offset="4">
                <div class="float-right mt-4">
                    <b-button variant="primary" @click="doTheLogin">{{ $t('login') }}</b-button>
                    <b-button v-show="!emailVerificationStatus" variant="secondary" class="ml-4" @click="doTheSignUp">{{ $t('sign_up') }}</b-button>
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
            showPassword: false,
            emailVerificationStatus: null,
            loginFailed: false,
            signupOutcome: null,
            validated: null,
            invalidEmail: true,
            invalidPassword: true
        }
    },
    mounted() {
        this.emailVerificationStatus = null !== (this.$route.query.email_verified || null) ? this.$route.query.email_verified === 'true' : null
    },
    methods: {
        verifyForm() {
            this.invalidEmail = this.email === ''
            this.invalidPassword = this.password === ''
            this.validated = true
            return !this.invalidEmail && !this.invalidPassword
        },
        doTheLogin() {
            this.signupOutcome = null
            this.loginFailed = false
            if (!this.verifyForm()) {
                this.loginFailed = true
                return
            }
            this.$axios.post(
                '/login',
                { email: this.email, password: this.password }
            ).then(response => {
                if (response.data.token) {
                    this.$store.commit('updateAuthToken', response.data.token);
                    this.$router.push({ path: this.$route.query.redirect || '/' })
                } else {
                    this.loginFailed = true
                    this.verifyForm()
                }
            }).catch(_error => {
                this.loginFailed = true
                this.verifyForm()
            })
        },
        doTheSignUp() {
            this.loginFailed = false
            this.signupOutcome = null
            if (!this.verifyForm()) {
                this.signupOutcome = 'fail'
                return
            }
            this.$axios.post(
                '/users',
                { user: { email: this.email, password: this.password } }
            ).then(_response => {
                this.signupOutcome = 'success'
            }).catch(_error => {
                this.signupOutcome = 'fail'
            })
        }
    }
}
</script>
