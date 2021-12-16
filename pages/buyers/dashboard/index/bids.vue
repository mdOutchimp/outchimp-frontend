<template>
	<loading-tab-view :loading="isLoading">
		<div v-for="bid in bids" :key="bid.id" class="card border-0 rounded-0 p-3 mt-2">
      <bid-card :bid="bid"></bid-card>
		</div>
	</loading-tab-view>
</template>

<script>
import BidCard from '@/components/Partials/BidCard.vue';
export default {
  components: {
    BidCard,
  },
	data() {
		return {
			bids: null,
		};
	},
	async fetch() {
		const bids = await this.$axios.$get(
			`/bids?buyer_id=${this.$auth.user.id}`
		);
		this.bids = bids.data;
		this.stopLoading();
	},
};
</script>

<style lang="scss" scoped></style>
