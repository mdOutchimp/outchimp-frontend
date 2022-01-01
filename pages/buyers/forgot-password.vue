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
							<button
								type="submit"
								class="btn btn-primary"
								:disabled="isRequestProcessing"
							>
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
	name: "ForgotPassword",
	layout: "auth",
	data() {
		return {
			email: null,
      isRequestProcessing: false,
		};
	},
	computed: {
			...mapGetters({
			validationErrors: "validation/validationErrors",
		}),
	},

	methods: {
    async requestResetPassword() {
      this.isRequestProcessing = true
      try {
        const response = await this.$axios.$post('buyers/forgot-password', {email: this.email})
        this.email = null
        this.$toast.success(response.message);
        this.isRequestProcessing = false
      } catch (error) {
        this.$toast.error('Email could not be sent to this email')
        this.email = null
        this.isRequestProcessing = false
      }
    },
	},
};
</script>
