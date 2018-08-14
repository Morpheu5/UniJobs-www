export default function ({ $axios }) {
  $axios.onRequest(request => {
    request.headers.common['Accept'] = request.headers.common['Accept'].split(',')[0];
  });
}