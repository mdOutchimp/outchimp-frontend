<template>
	<div class="sign-up">
		<div class="card border-0 rounded-0 py-3">
			<div class="card-body p-4">
				<div class="text-center">
					<img src="@/assets/svgs/logo.svg" alt="facebook icon" />
				</div>
				<p class="h6 fs-5 py-2 text-center">
					<span>Sign up</span>
				</p>
				<p v-if="errMsg.length">
					<b class="text-danger">Please correct the following error(s):</b>
				<ul class="ps-3">
					<li class="text-danger" v-for="(error, index) in errMsg" :key="index">{{ error }}</li>
				</ul>
				</p>
				<button class="fb-btn rounded-0 border-0 w-100 py-2">
					<i class="fab fa-facebook"></i>
					<p class="d-inline">
						<span>Sign up</span>
						with facebook
					</p>
				</button>
				<button class="google-btn rounded-0 border w-100 py-2">
					<img class="image-fluid" src="@/assets/svgs/google.svg" alt="google icon" />
					<p class="d-inline">
						<span>Sign up</span>
						with Google
					</p>
				</button>

				<p class="lead fw-normal m-2 text-center" v-if="step==1">Or</p>
				<a class="d-block fw-normal m-2 text-center text-primary" role="button" v-if="step==2" @click="step=1">Go Back</a>

				<!-- Step one -->
				<div class="" v-if="step == 1">
					<div class="mb-3">
						<input id="email" type="email" class="form-control py-2" placeholder="Email" v-model="formData.email" />
						<Error v-if="validationErrors.email" :messages="validationErrors.email"></Error>
					</div>

					<div class="mb-3">
						<input id="password" type="password" class="form-control py-2" placeholder="Password" v-model="formData.password" />
						<Error v-if="validationErrors.password" :messages="validationErrors.password"></Error>
					</div>

					<div class="mb-3">
						<input id="password_confirmation" type="password" class="form-control py-2" placeholder="Confirm Password" v-model="formData.password_confirmation" />
					</div>

				</div>

				<!-- Step two -->
				<div class="" v-if="step == 2">
					<input type="text" class="form-control mb-3 py-2" placeholder="First Name" v-model="formData.first_name" />
					<input type="text" class="form-control mb-3 py-2" placeholder="Last Name" v-model="formData.last_name" />

					<select name="" id="" class="form-select rounded-0 mb-3" v-model="formData.type">
						<option value="buyer">I want to be a buyer</option>
						<option value="seller">I want to be a seller</option>
					</select>

					<div class="mb-3 fs-7 d-flex align-items-center">
						<checkbox v-model="formData.agree">
							I understand the
							<a href="#" class="text-primary mt-2 ms-auto">Terms and Conditions.</a>
						</Checkbox>
					</div>
				</div>

				<!-- Buttons -->
				<button class="btn btn-primary rounded-0 mb-3 w-100 py-2" @click="next()" v-if="step == 1">
					<p class="d-inline">
						<span>Continue</span>
					</p>
				</button>

				<button class="btn btn-primary rounded-0 mb-3 w-100 py-2" @click="register()" v-if="step == 2">
					<p class="d-inline">Sign Up</p>
				</button>

				<p class="text-center">
					<span> Already a Member? </span>
					<span>
						<nuxt-link class="text-primary" to="buyers/signin">Sign In</nuxt-link>
					</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Checkbox from "~/components/Forms/Checkbox.vue";

export default {
	components: {
		Checkbox,
	},
	data() {
		return {
			step: 1,
			errMsg: [],
			user: {},
			formData: {
				email: null,
				password: null,
				password_confirmation: null,
				first_name: null,
				last_name: null,
				type: "buyer",
				agree: false,
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
		next() {
			if (this.validate()) {
				this.step = 2;
			}
		},
		async register() {
			if (this.validate()) {
				// Make the url
				let url = "/sellers/register";

				if (this.formData.type == "buyer") {
					url = "/buyers/register";
				}

				// Send the register request
				try {
					const response = await this.$axios.$post(
						url,
						this.formData
					);
					this.user = response.data;
					// Toast Notification

					// log in after register
					if (this.user) {
						if (this.user.type == "buyer") {
							this.$router.push({ path: "/buyers/signin" });
						} else {
							this.$router.push({ path: "/sellers/signin" });
						}
					}
				} catch (error) {
					// Toast Notification
					this.$toast.error("Please check you inputs.");
				}
			}
		},
		// Validate the forms
		validate() {
			let errMsg = [];
			if (this.formData.email == null || this.formData.email == "") {
				errMsg.push("Email is required");
			}
			if (
				this.formData.password == null ||
				this.formData.password == ""
			) {
				errMsg.push("Password is required");
			}

			if (
				this.formData.password_confirmation == null ||
				this.formData.password_confirmation == ""
			) {
				errMsg.push("Password Confirmation is required");
			}

			if (
				this.formData.password !== this.formData.password_confirmation
			) {
				errMsg.push("Confirm password doesn't match");
			}

			if (this.step == 2) {
				if (
					this.formData.first_name == null ||
					this.formData.first_name == ""
				) {
					errMsg.push("First name is required");
				}
				if (
					this.formData.last_name == null ||
					this.formData.last_name == ""
				) {
					errMsg.push("Last is required");
				}
				if (this.formData.agree == null || this.formData.agree == "") {
					errMsg.push("You need to agree with us.");
				}
			}

			this.errMsg = errMsg;
			if (errMsg.length) {
				return false;
			}
			return true;
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
