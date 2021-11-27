<template>
	<div>
		<page-header>
			<div class="col-lg-6 d-flex flex-column align-items-center align-items-lg-start mb-3 mb-lg-0">
				<h1 class="text-white fw-bold">
					{{ appSettings.termsAndConditions.settings.page_title }}
				</h1>
			</div>
			<div class="col-lg-6 text-center text-lg-end">
				<img src="@/assets/svgs/conditions.svg" alt />
			</div>
		</page-header>

		<section class="section-padding">
			<div class="container">
				<div class="fs-5">
					<p v-html="appSettings.termsAndConditions.settings.page_content"></p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Terms and Conditions",
	computed: {
		...mapGetters({
			appSettings: ["settings/getSettings"],
		}),
	},
};
</script>