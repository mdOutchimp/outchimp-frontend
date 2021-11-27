<template>
	<ValidationObserver v-slot="{ passes }">
		<form @submit.prevent="passes(save)" autocomplete="off">
			<div class="modal">
				<div class="modal__content">
					<div class="modal__header">
						<h5 class="text-black">Add Education</h5>
					</div>

					<div class="modal__body">
						<div class="mb-3">
							<text-input rules="required" label="Institute" name="Institute" v-model="education.institute" />
						</div>
						<div class="mb-3">
							<text-input rules="required" label="Degree" name="Degree" v-model="education.degree" />
						</div>
						<div class="mb-3">
							<date-input rules="required" label="Start" name="Start" v-model="education.from" />
						</div>

						<div class="mb-3">
							<date-input label="End" name="End" v-model="education.to" />
							<span class="fs-7 font-italic text-grey">Leave blank if you currently working here</span>
						</div>

						<textarea-input rules="max:500" label="Description" name="Description" v-model="education.description" />
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
			education: {
				institute: null,
				degree: null,
				from: null,
				to: null,
				description: null,
			},
		};
	},

	methods: {
		close() {
			this.$emit("close");
		},
		async save() {
			try {
				const response = await this.$axios.post(
					"/educations",
					this.education
				);
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
