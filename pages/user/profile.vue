<template>
    <div id="profile" class="mb-5">
        <b-row>
            <b-col lg="7">
                <h4>{{ $t('your_details_header') }}</h4>
                <b-form id="profile_details_form" :validated="profileFormValidated" novalidate @submit="saveProfile">
                    <b-alert :show="profileSaved" dismissible variant="success" @dismissed="profileSaved = false">{{ $t('profile_saved') }}<br/>{{ profileSaveFailureError }}</b-alert>
                    <b-row class="mt-3">
                        <b-col>
                            <b-form-group>
                                <b-input id="given_name" v-model="user.given_name" required />
                                <label :class="user.given_name != '' ? 'active' : null" for="given_name">
                                    <fa v-show="user.given_name == ''" :icon="['fas', 'exclamation-triangle']" size="sm" class="text-danger mr-1" />
                                    {{ $t('given_name') }}
                                </label>
                                <b-form-invalid-feedback>{{ $t('required_field') }}</b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group>
                                <b-input id="family_name" v-model="user.family_name" required />
                                <label :class="user.family_name != '' ? 'active' : null" for="family_name">
                                    <fa v-show="user.family_name == ''" :icon="['fas', 'exclamation-triangle']" size="sm" class="text-danger mr-1" />
                                    {{ $t('family_name') }}
                                </label>
                                <b-form-invalid-feedback>{{ $t('required_field') }}</b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group>
                                <b-input id="email" v-model="user.email" disabled />
                                <label :class="user.email != '' ? 'active' : null" for="email">{{ $t('email_address') }}</label>
                                <b-form-text><p>{{ $t('email_is_login_message') }}</p></b-form-text>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col>
                            <b-form-group>
                                <b-select id="gender" v-model="user.gender" :options="genders" />
                                <label :class="user.gender != null ? 'active' : null" for="gender">{{ $t('gender') }}</label>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3 float-right">
                        <b-button variant="primary" type="submit">{{ $t('save_profile_details_btn') }}</b-button>
                    </b-row>
                </b-form>
                
                <div class="clearfix"></div><hr class="mt-5" />

                <h4>{{ $t('your_organizations') }}</h4>

                <b-list-group class="organizations mt-4">
                    <b-list-group-item v-for="organization in user.organizations" :key="organization[organization.length-1].id">
                        <span :inner-html.prop="organization | formatPath" />
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col offset="1" class="mt-5 mt-lg-0">
                <h4>{{ $t('change_your_password_header') }}</h4>
                <b-form id="change_password_form" :validated="changePasswordFormValidated" novalidate @submit="changePassword">
                    <b-alert :show="passwordChanged" dismissible variant="success" @dismissed="passwordChanged = false">{{ $t('password_changed') }}<br/>{{ profileSaveFailureError }}</b-alert>
                    <b-row class="mt-3">
                        <b-col>
                            <b-form-group>
                                <b-input id="oldPasswordInput"
                                        v-model="oldPassword"
                                        :type="showOldPassword ? 'text' : 'password'"
                                        name="old_password"
                                        autocomplete="current-password"
                                        required
                                />
                                <label :class="oldPassword != '' ? 'active' : null" for="oldPasswordInput">{{ $t('old_password') }}</label>
                                <span :class="showOldPassword ? 'eye-on' : 'eye-off'" class="btn-eye" style="left: -1.5em" @click="showOldPassword = !showOldPassword"></span>
                                <svg class="icon icon-sm icon-secondary ml-2 mr-3 mb-1 show-password" @click="showOldPassword = !showOldPassword">
                                    <use :xlink:href="bispritesvg + (showPassword ? '#it-password-invisible' : '#it-password-visible')" />
                                </svg>
                                <b-form-invalid-feedback>{{ $t('required_field') }}</b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group>
                                <b-input id="newPasswordInput"
                                        v-model="newPassword"
                                        :type="showNewPassword ? 'text' : 'password'"
                                        name="new_password"
                                        required
                                />
                                <label :class="newPassword != '' ? 'active' : null" for="newPasswordInput">{{ $t('new_password') }}</label>
                                <span :class="showNewPassword ? 'eye-on' : 'eye-off'" class="btn-eye" style="left: -1.5em" @click="showNewPassword = !showNewPassword"></span>
                                <svg class="icon icon-sm icon-secondary ml-2 mr-3 mb-1 show-password" @click="showNewPassword = !showNewPassword">
                                    <use :xlink:href="bispritesvg + (showPassword ? '#it-password-invisible' : '#it-password-visible')" />
                                </svg>
                                <b-form-invalid-feedback>{{ this.passwordsMatch ? $t('passwords_match') : $t('required_field') }}</b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3 float-right">
                        <b-button variant="outline-danger" type="submit">{{ $t('change_password_btn') }}</b-button>
                    </b-row>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>

<style lang="scss">
#profile {
    .organizations {
        .list-group-item {
            &>* {
                vertical-align: middle;
            }

            .long_name {
                font-weight: bold;
            }

            .short_name:after {
                content: " › ";
            }
        }
    }

    .show-password.icon {
        position: absolute;
        bottom: 1em;
        left: -2.5em;
    }

}
</style>


<script>
export default {
    middleware: 'authenticated_route',
    filters: {
        formatPath(path) {
            return path ? path.map((e, i, a) => (i < a.length-1 ? `<span class="short_name">${e.short_name}</span>` : `<span class="name long_name">${e.name} (${e.short_name})</span>`)).join('') : '';
        }
    },
    data() {
        return {
            genders: [
                { value: null, text: this.$t('select_gender') },
                { value: 'male', text: this.$t('male') },
                { value: 'female', text: this.$t('female') },
                { value: 'other', text: this.$t('other_gender') },
                { value: 'unspecified', text: this.$t('unspecified_gender')}
            ],
            oldPassword: '',
            showOldPassword: false,
            newPassword: '',
            showNewPassword: false,
            profileFormValidated: false,
            profileSaved: false,
            profileSaveFailureError: '',
            changePasswordFormValidated: false,
            passwordsMatch: false,
            passwordChanged: false
        };
    },
    async asyncData({ app }) {
        const whoami = await app.$axios.get('/api/users/whoami');
        const { data } = await app.$axios.get(`/api/users/${whoami.data.id}`);
        const organizations = data.organizations.map(o => o.ancestors);
        return {
            user: { ...data, organizations: organizations }
        };
    },
    methods: {
        saveProfile(e) {
            e.preventDefault();
            e.stopPropagation();

            this.profileSaveFailureError = '';

            const form = document.getElementById('profile_details_form');
            if (form.checkValidity()) {
                this.$axios.patch(`/api/users/${this.user.id}`, {
                    user: {
                        given_name: this.user.given_name,
                        family_name: this.user.family_name,
                        gender: this.user.gender
                    }
                }).then(_response => {
                    this.profileSaved = true;
                    this.profileFormValidated = false;
                }).catch(e => {
                    this.profileSaveFailureError = e.response ? e.response.data.error : `${e.code} ${e.address}:${e.port}`;
                });
            }
            this.profileFormValidated = true;
        },
        changePassword(e) {
            e.preventDefault();
            e.stopPropagation();

            this.passwordChanged = false;
            this.profileSaveFailureError = '';

            const form = document.getElementById('change_password_form');
            document.getElementById('newPasswordInput').setCustomValidity('');
            if (form.checkValidity()) {
                if (this.oldPassword === this.newPassword) {
                    this.passwordsMatch = true;
                    document.getElementById('newPasswordInput').setCustomValidity('-');
                } else {
                    this.$axios.patch(`/api/users/${this.user.id}`, {
                        user: {
                            old_password: this.oldPassword,
                            password: this.newPassword
                        }
                    }).then(_response => {
                        this.passwordChanged = true;
                        this.changePasswordFormValidated = false;
                    }).catch(e => {
                        this.profileSaveFailureError = e.response ? e.response.data.error : `${e.code} ${e.address}:${e.port}`;
                    });
                }
            }
            this.changePasswordFormValidated = true;
        }
    }
};
</script>
