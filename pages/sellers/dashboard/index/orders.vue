<template>
	<loading-tab-view :loading="isLoading">
		<div>
			<order-card v-for="order in laravelData.data" :key="order.id" :order="order">
			</order-card>

			<pagination :data="laravelData" @pagination-change-page="getResults" class="mt-3"></pagination>
		</div>
	</loading-tab-view>
</template>

<script>
export default {
	name: "SellerOrders",
	data() {
		return {
			laravelData: {},
		};
	},
	methods: {
		getResults(page = 1) {
			this.$axios
				.get(
					"/orders?page=" +
						page +
						"&seller_id=" +
						this.$auth.user.id +
						"&notStatus=draft"
				)
				.then((response) => {
					this.laravelData = response.data;
					this.stopLoading();
				});
		},
	},
	mounted() {
		// Fetch initial results
		this.getResults();
	},
};
</script>

<style lang="scss" scoped></style>
