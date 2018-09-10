export default function (context) {
    const { route, redirect, store } = context;
    const { path, query } = route;

    if (!store.state.unijobs_magic_token) {
        return redirect(307, '/user/login', { ...query, redirect: path });
    }
}