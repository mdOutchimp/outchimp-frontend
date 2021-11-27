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
    return Promise.reject(error);
  });

  $axios.onRequest(() => {
    store.dispatch("validation/clearErrors");
  });
}
