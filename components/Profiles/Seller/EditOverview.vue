<template>
	<ValidationObserver v-slot="{ passes }">
		<form @submit.prevent="passes(save)" autocomplete="off">
			<div class="modal">
				<div class="modal__content">
					<div class="modal__header">
						<h5 class="text-black">Edit Overview</h5>
					</div>

					<div class="modal__body">
						<div class="mb-3">
							<text-input rules="required" label="Per Hour" name="Per Hour" v-model="perHour" />
						</div>
						<div class="mb-3">
							<text-input rules="required" label="Street" name="Street" v-model="address.street" />
						</div>

						<div class="mb-3">
							<country-input rules="required" label="Country" name="Country" v-model="address.country"></country-input>
						</div>

						<div class="mb-3">
							<text-input rules="required" label="City" name="City" v-model="address.city" />
						</div>

						<div class="mb-3">
							<text-input rules="required" label="Zipcode" name="Zipcode" v-model="address.zipcode" />
						</div>
					</div>
					<div class="modal__footer d-flex align-items-center justify-content-end">
						<button type="button" class="btn" @click="close">Cancel</button>
						<button type="submit" class="btn btn-outline-primary px-4">
							Save
						</button>
					</div>
				</div>
			</div>
		</form>
	</ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate/dist/vee-validate.full.esm";

export default {
	props: {},
	components: {
		ValidationObserver,
	},
	data() {
		return {
			perHour: this.$auth.user.perHour,
			address: {
				street: this.$auth.user.address
					? this.$auth.user.address.street
					: null,
				city: this.$auth.user.address
					? this.$auth.user.address.city
					: null,
				state: this.$auth.user.address
					? this.$auth.user.address.state
					: null,
				zipcode: this.$auth.user.address
					? this.$auth.user.address.zipcode
					: null,
				country: this.$auth.user.address
					? this.$auth.user.address.country
					: null,
			},
		};
	},

	methods: {
		close() {
			this.$emit("close");
		},
		async save() {
			try {
				const response = await this.$axios.post("/sellers/overview", {
					perHour: this.perHour,
					address: this.address,
				});
				await this.$auth.fetchUser();
				this.$emit("close");
				this.$toast.success("Successfully updated");
			} catch (error) {
				this.$toast.error("Some thing went wrong");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.modal {
	&__content {
		max-width: 800px;
		width: 100%;
		background: white;
	}
}
</style>
