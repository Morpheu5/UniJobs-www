export default function (context) {
  const { $axios, store } = context;
  $axios.onRequest(request => {
    request.headers.common['Accept'] = [
      ...request.headers.common['Accept'].split(',')[0],
      'application/vnd.unijobs.it.api.v1'
    ];
    if (store.state.unijobs_magic_token) {
      request.headers.common['Authorization'] = `Bearer ${store.state.unijobs_magic_token}`;
    }
  });
}