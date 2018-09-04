<template>
    <div>{{ currentLocale }}</div>
</template>

<script>
export default {
    async fetch(context) {
        const { route, redirect, app } = context

        if (route.query.token) {
            // Verify that the token exists and redirect to successful login
            await Promise.all([
                app.$axios.post('/users/verify_email', { token: route.query.token })
                .then(_response => {
                    return redirect(303, '/user/login', { email_verified: 'true', redirect: '/user/profile' })
                })
                .catch(_error => {
                    return redirect(303, '/user/login', { email_verified: 'false' })
                })
            ])

        } else {
            // Redirect to login with failed verification warning
            return redirect(303, '/user/login', { email_verified: 'false' })
        }
    }
}
</script>
