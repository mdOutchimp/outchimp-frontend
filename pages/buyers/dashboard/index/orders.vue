<template>
	<loading-tab-view :loading="isLoading">
		<div>
			<order-card v-for="order in laravelData.data" :key="order.id" :order="order">
				</OrderCard>
		</div>
	</loading-tab-view>
</template>

<script>
export default {
	data() {
		return {
			laravelData: {},
		};
	},
	methods: {
		// Our method to GET results from a Laravel endpoint
		getResults(page = 1) {
			this.$axios
				.$get(
					"/orders?buyer_id=" + this.$auth.user.id + "&page=" + page
				)
				.then((response) => {
					this.laravelData = response;
					this.stopLoading();
					// console.log(response);
				});
		},
	},
	mounted() {
		this.getResults();
	},
};
</script>

<style lang="scss" scoped></style>
