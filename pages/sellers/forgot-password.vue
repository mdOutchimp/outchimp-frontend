<template>
  <div class="container">
    <div
      class="row justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card card-default">
          <h6 class="card-header bg-transparent">Buyer Reset Password</h6>
          <div class="card-body">
            <form
              autocomplete="off"
              @submit.prevent="requestResetPassword"
              method="post"
            >
              <div class="form-group mb-3">
                <label for="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="email"
                  required
                />
                <Error
                  v-if="validationErrors.email"
                  :messages="validationErrors.email"
                ></Error>
              </div>
              <button type="submit" class="btn btn-primary">
                Send Password Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "auth",
  data() {
    return {
      email: null,
      has_error: false,
    };
  },
  computed: {
    ...mapGetters([
      "validation/validationErrors",
      // ...
    ]),
  },

  methods: {
    requestResetPassword() {
      this.$axios.$post("/sellers/forgot-password", { email: this.email }).then(
        (result) => {
          this.response = result.data;
          this.$toast.success("Password reset email sent");
          this.email = null;
        },
        (error) => {
          this.$toast.error("Something went wrong");
        }
      );
    },
  },
};
</script>
