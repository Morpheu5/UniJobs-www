<template>
    <div>
        <b-row v-if="null !== emailVerificationStatus" class="mb-3">
            <b-col lg="4" offset-lg="4">
                <b-alert :show="emailVerificationStatus" variant="success">
                    {{ $t('email_verification_success') }}
                </b-alert>
                <b-alert :show="!emailVerificationStatus" variant="warning">
                    {{ $t('email_verification_failure') }}
                </b-alert>
            </b-col>
        </b-row>
        <b-form id="loginForm" :validated="validated" novalidate @submit="submitForm('login', $event)">
            <b-row>
                <b-col lg="4" offset="2" offset-lg="4">
                    <b-form-group>
                        <b-input id="email"
                                 v-model="email"
                                 type="email"
                                 name="email"
                                 autocomplete="email"
                                 required
                        />
                        <label :class="email !== '' ? 'active' : null" name="email" for="email">
                            {{ $t('email_address') }}
                        </label>
                        <b-form-invalid-feedback>{{ $t(emailValidationFeedback) }}</b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="4" offset="2" offset-lg="4">
                    <b-form-group>
                        <b-input id="password"
                                 v-model="password"
                                 :type="showPassword ? 'text' : 'password'"
                                 name="password"
                                 autocomplete="current-password"
                                 required
                        />
                        <svg class="icon icon-sm icon-secondary ml-2 mr-3 mb-1 show-password" @click="showPassword = !showPassword">
                            <use :xlink:href="bispritesvg + (showPassword ? '#it-password-invisible' : '#it-password-visible')" />
                        </svg>
                        <label :class="password !== '' ? 'active' : null" name="password" for="password">
                            {{ $t('password') }}
                        </label>
                        <b-form-invalid-feedback>{{ $t('required_field') }}</b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="4" offset-lg="4">
                    <b-alert :show="loginFailed" variant="warning" class="mt-3">
                        {{ $t('login_failure_message') }}<br/>{{ loginFailureError }}
                    </b-alert>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="4" offset-lg="4">
                    <b-alert :show="signupOutcome === 'success'" variant="success" class="mt-3">
                        {{ $t('signup_success_message') }}
                    </b-alert>
                    <b-alert :show="signupOutcome === 'fail'" variant="warning" class="mt-3">
                        {{ $t('signup_failure_message') }}<br/>{{ signupFailureError }}
                    </b-alert>

                </b-col>
            </b-row>
            <b-row>
                <b-col lg="4" offset-lg="4">
                    <div class="float-right mt-4">
                        <b-button variant="primary" type="submit">{{ $t('login') }}</b-button>
                        <b-button v-show="!emailVerificationStatus" variant="secondary" class="ml-4" @click="submitForm('signup')">{{ $t('sign_up') }}</b-button>
                        <b-input v-model="full_name" class="checker" placeholder="Full name (no)" />
                    </div>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<style lang="scss">
.checker {
    visibility: hidden;
}

.show-password.icon {
    position: absolute;
    bottom: 1em;
    left: -2.5em;
}
</style>


<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            full_name: '',
            showPassword: false,
            emailVerificationStatus: null,
            loginFailed: false,
            loginFailureError: '',
            signupOutcome: null,
            signupFailureError: '',
            validated: null,
            emailValidationFeedback: ''
        };
    },
    mounted() {
        this.emailVerificationStatus = null !== (this.$route.query.email_verified || null) ? this.$route.query.email_verified === 'true' : null;
    },
    methods: {
        submitForm(action, e = null) {
            if (null !== e) {
                e.preventDefault();
                e.stopPropagation();
            }

            if (this.full_name !== '') {
                return;
            }

            this.emailValidationFeedback = '';

            this.signupOutcome = null;
            this.loginFailed = false;

            const form = document.getElementById('loginForm');
            const emailInput = document.getElementById('email');

            if (form.checkValidity()) {
                if (action === 'login') {
                    this.$axios.post(
                        '/login',
                        { email: this.email, password: this.password }
                    )
                    .then(response => {
                        if (response.data.token) {
                            this.$store.commit('updateAuthToken', response.data.token);
                            this.$router.push({ path: this.$route.query.redirect || '/' });
                        } else {
                            this.loginFailed = true;
                        }
                    })
                    .catch(e => {
                        this.loginFailed = true;
                        this.loginFailureError = e.response ? e.response.data.error : `${e.code} ${e.address}:${e.port}`;
                    });
                } else if (action === 'signup') {
                    this.$axios.post(
                        `/users?locale=${this.currentLocale.code}`,
                        { user: { email: this.email, password: this.password } }
                    ).then(_response => {
                        this.signupOutcome = 'success';
                    }).catch(e => {
                        this.signupOutcome = 'fail';
                        this.signupFailureError = e.response ? e.response.data.error : `${e.code} ${e.address}:${e.port}`;
                    });
                }
            } else {
                if (emailInput.validity.typeMismatch) {
                    this.emailValidationFeedback = 'invalid_email';
                } else {
                    this.emailValidationFeedback = 'required_field';
                }
                this.loginFailed = true;
            }
            this.validated = true;
        }
    }
};
</script>
