<template>
	<div class="container">
		<div class="row justify-content-center align-items-center" style="min-height: 600px">
			<div class="col-lg-6 col-sm-12">
				<div class="card rounded-0 border-0">
					<div class="card-body">
						<div class="card-title text-center border-bottom">
							<h4 class="fw-bold text-uppercase">Verify Email</h4>
						</div>
						<form @submit.prevent="verify">
							<!-- Package Name -->
							<div class="mb-3">
								<label for="name" class="form-label fw-bold">Enter Code Here</label>
								<input type="text" v-model="code" class="form-control" id="name" />

								<Error v-if="validationErrors.name" :messages="validationErrors.name"></Error>
							</div>

							<button :disabled="isProcessing" type="submit" class="btn btn-primary w-100">
								Verify
							</button>
							<p class="mt-3 text-center">
								Didn't receive the verification code?
								<a href="javascript:void(0)" class="text-primary" @click="resend">Resend Email</a>
							</p>
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
	middleware({ store, redirect }) {
		if (store.$auth.loggedIn && store.$auth.user.isVerified) {
			redirect("/buyers/dashboard");
		}
	},
	data() {
		return {
			code: null,
			isProcessing: false,
		};
	},
	computed: {
		...mapGetters(["validation/validationErrors"]),
	},
	methods: {
		async verify() {
			this.isProcessing = true;
			try {
				const response = await this.$axios.$post(
					"/buyers/verify-code",
					{ code: this.code }
				);
				this.$toast.success("Verification successfull");
				this.$auth.setUser(response.data);
				this.$router.push("/buyers/dashboard");
			} catch (error) {
				this.isProcessing = false;
				this.$toast.error("Sorry, verification failed!");
			}
		},
		async resend() {
			this.isProcessing = true;
			try {
				await this.$axios.$post("/buyers/resend-verification-code");
				this.$toast.success("Verification email sent successfully");
				this.isProcessing = false;
			} catch (error) {
				this.isProcessing = false;
				this.$toast.error("Sorry, operation failed!");
			}
		},
	},
};
</script>


<style lang="scss" scoped>
</style>
