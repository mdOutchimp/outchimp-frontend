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

				<div class="mb-3">
					<input type="text" class="form-control py-2" placeholder="First Name" v-model="formData.first_name" />
					<Error v-if="validationErrors.first_name" :messages="validationErrors.first_name"></Error>
				</div>

				<div class="mb-3">
					<input type="text" class="form-control py-2" placeholder="Last Name" v-model="formData.last_name" />
					<Error v-if="validationErrors.last_name" :messages="validationErrors.last_name"></Error>
				</div>

				<!-- Step one -->
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

				<button :disabled="isRequestProcessing" class="btn btn-primary rounded-0 mb-3 w-100 py-2" @click="register()">
					<p class="d-inline">Sign Up</p>
				</button>

				<p class="text-center">
					<span> Already a Member? </span>
					<span>
						<NuxtLink class="text-primary" to="buyers/signin">Sign In</NuxtLink>
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
		...mapGetters({
			validationErrors: "validation/validationErrors",
			isRequestProcessing: "global/isRequestProcessing",
		}),
	},

	methods: {
		async register() {
			// Make the url
			let url = "/sellers/register";

			if (this.formData.type == "buyer") {
				url = "/buyers/register";
			}

			// Send the register request
			try {
				const response = await this.$axios.$post(url, this.formData);
				this.user = response.data;
				// Toast Notification

				// log in after register
				if (this.user) {
					if (this.user.type == "buyer") {
						const res = await this.$auth.loginWith("local2", {
							data: {
								email: this.formData.email,
								password: this.formData.password,
							},
						});
						this.$router.push({ path: "/buyers/dashboard" });
					} else {
						const res = await this.$auth.loginWith("local", {
							data: {
								email: this.formData.email,
								password: this.formData.password,
							},
						});
						this.$router.push({ path: "/sellers/profile" });
					}
				}
			} catch (error) {
				// Toast Notification
				this.$toast.error("Please check you inputs.");
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
