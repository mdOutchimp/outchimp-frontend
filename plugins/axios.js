export default function ({
  $axios,
  store,
  redirect
}) {
  $axios.onError(error => {
    if (error.response.status === 422) {
      if (error.response.data.errors) {
        store.dispatch("validation/setErrors", error.response.data.errors);
      } else {
        store.dispatch("validation/setErrors", JSON.parse(error.response.data));
      }
    }

    // Check server error
    if (err.response.status === 500) {
      error({ statusCode: err.response.status, message: "Server error." })
    }

    store.dispatch("global/setRequestProcessing", false);
    return Promise.reject(err);
  });

  $axios.onRequest(() => {
    store.dispatch("validation/clearErrors");
    store.dispatch("global/setRequestProcessing", true);
  });

  $axios.onResponse(() => {
    store.dispatch("global/setRequestProcessing", false);
  });
}
