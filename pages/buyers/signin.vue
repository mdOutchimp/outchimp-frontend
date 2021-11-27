<template>
  <!-- form section -->
  <div class="sign-up">
    <div class="card border-0 rounded-0 py-3">
      <div class="card-body p-4">
        <div class="text-center">
          <img src="@/assets/svgs/logo.svg" alt="facebook icon" />
        </div>
        <p class="h6 fs-5 py-2 text-center">Sign In</p>
        <button class="fb-btn rounded-0 border-0 w-100 py-2">
          <i class="fab fa-facebook"></i>
          <p class="d-inline">Continue with facebook</p>
        </button>
        <button class="google-btn rounded-0 border w-100 py-2">
          <img
            class="image-fluid"
            src="@/assets/svgs/google.svg"
            alt="google icon"
          />
          <p class="d-inline">Continue with Google</p>
        </button>

        <p class="lead fw-normal m-2 text-center">Or</p>

        <div class="mb-3">
          <input
            id="email"
            type="email"
            class="form-control py-2 mb-0"
            placeholder="Email"
            v-model="formData.email"
          />
          <Error
            v-if="validationErrors.email"
            :messages="validationErrors.email"
          ></Error>
        </div>
        <div class="mb-3">
          <input
            id="password"
            type="password"
            class="form-control py-2"
            placeholder="Password"
            v-model="formData.password"
          />
          <Error
            v-if="validationErrors.password"
            :messages="validationErrors.password"
          ></Error>
        </div>

        <div class="mb-3 fs-7 d-flex align-items-center">
          <div class="pretty p-svg me-0 mt-0">
            <input type="checkbox" />
            <div class="state p-primary">
              <svg class="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white; fill: white"
                ></path>
              </svg>
              <label for="fixed">Remember me</label>
            </div>
          </div>

          <nuxt-link to="/buyers/forgot-password" class="text-primary ms-auto">Forgot password?</nuxt-link>
        </div>

        <button
          class="btn btn-primary rounded-0 mb-3 w-100 py-2"
          @click="login()"
        >
          <p class="d-inline">Sign In</p>
        </button>

        <p class="text-center">
          Not a member yet?
          <span>
            <nuxt-link class="text-primary text-decoration-none" to="/signup"
              >Join Now</nuxt-link
            ></span
          >
        </p>
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
      errMsg: [],
      formData: {
        email: null,
        password: null,
      },
    };
  },

  computed: {
    ...mapGetters([
      "validation/validationErrors",
      // ...
    ]),
  },

  methods: {
    async login() {
      this.errMsg = [];
      try {
        const res = await this.$auth.loginWith("local2", {
          data: this.formData,
        });
        this.$router.push({ path: "/buyers/dashboard" });
      } catch (error) {
        if (error.response && error.response.status == 401) {
          this.$toast.error("Email or password doesn't match", {
            timeout: 2000,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.form-select:focus {
  outline: none;
  /* border: none; */
  box-shadow: none;
}
</style>
