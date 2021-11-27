<template>
	<div>
		<page-header>
			<div class="col-lg-6 d-flex flex-column align-items-center align-items-lg-start mb-3 mb-lg-0">
				<h1 class="text-white fw-bold">
					{{ appSettings.refundPolicy.settings.page_title }}
				</h1>
			</div>
			<div class="col-lg-6 text-center text-lg-end">
				<img src="/svgs/refund-policy.svg" alt />
			</div>
		</page-header>

		<section class="section-padding">
			<div class="container">
				<div class="fs-5">
					<p v-html="appSettings.refundPolicy.settings.page_content"></p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "refund-policy",
	computed: {
		...mapGetters({
			appSettings: ["settings/getSettings"],
		}),
	},
};
</script>