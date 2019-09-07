export default async function(context) {
    const { app, store } = context;

    const whoami = await app.$axios.get('/api/users/whoami');
    store.commit('updateUserRole', whoami.data.role);
}