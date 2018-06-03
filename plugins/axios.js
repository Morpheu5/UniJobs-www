export default function ({ $axios, redirect }) {
  $axios.onRequest(request => {
    request.headers.common['Accept'] = request.headers.common['Accept'].split(',')[0]
  })
  $axios.onError(error => {
    // if(error.code === 500) {
    //   redirect('/sorry')
    // }
  })
}