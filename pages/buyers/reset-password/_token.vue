<template>
  <div class="container">
    <div
      class="row align-items-center justify-content-center"
      style="height: calc(100vh - 60px)"
    >
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card card-default">
          <h6 class="card-header bg-transparent">Buyer Reset Password</h6>
          <div class="card-body">
            <form
              autocomplete="off"
              @submit.prevent="resetPassword"
              method="post"
            >
              <div class="form-group mb-2">
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
              <div class="form-group mb-2">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder=""
                  v-model="password"
                  required
                />
                <Error
                  v-if="validationErrors.password"
                  :messages="validationErrors.password"
                ></Error>
              </div>
              <div class="form-group">
                <label for="password_confirmation">Confirm Password</label>
                <input
                  type="password"
                  id="password_confirmation"
                  class="form-control"
                  placeholder=""
                  v-model="password_confirmation"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary mt-3">Update</button>
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
      token: null,
      email: null,
      password: null,
      password_confirmation: null,
    };
  },
  computed: {
    ...mapGetters([
      "validation/validationErrors",
    ]),
  },

  methods: {
    resetPassword() {
      this.$axios
        .$post("/buyers/reset-password", {
          token: this.$route.params.token,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(
          (result) => {
            this.$toast.success("Password reset successfully");
            this.$router.push("/buyers/login");
          },
          (error) => {
            this.$toast.error("Something went wrong");
            console.error(error);
          }
        );
    },
  },
};
</script>
