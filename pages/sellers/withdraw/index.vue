<template>
	<loading-view :loading="isLoading">
		<div>
			<page-header>
				<div class="
            d-flex
            justify-content-between
            align-items-center align-items-start
            py-3
          ">
					<div>
						<h2 class="text-white fw-bold">Earnings</h2>
						<h5 class="text-white">Do more, Earn More!!</h5>
					</div>
					<p class="text-white">
						<span class="fw-semibold">Total Earnings: ৳</span>
						{{ $auth.user.totalEarning }}
					</p>
				</div>
			</page-header>

			<!-- info section -->
			<section class="section-padding my-5">
				<div class="container">
					<div class="row">
						<div class="col-lg-8 mx-auto">
							<div class="card border-0 rounded-0 p-2">
								<div class="card-body">
									<div class="d-flex align-items-center justify-content-between">
										<div class="d-flex fs-6">
											<p class="">Current Balance :</p>
											<p class="fw-bold text-primary ms-2">
												<span>৳</span> {{ $auth.user.balance }}
											</p>
										</div>
										<div>
											<button @click="withdrawModal = true" class="btn btn-primary border-0 outline-none">
												Withdraw
											</button>
										</div>
									</div>
									<withdraw-balance v-if="withdrawModal" @close="withdrawModal = false">
									</withdraw-balance>
								</div>
							</div>

							<!-- table starts -->
							<div class="mt-3">
								<nuxt-child />

								<pagination class="mt-5 d-none d-md-flex" :limit="3" :data="withdrawRequests" @pagination-change-page="getResults"></pagination>
							</div>
							<!-- table ends -->
						</div>
					</div>
				</div>
			</section>
			<!-- info section end-->
		</div>
	</loading-view>
</template>

<script>
import WithdrawBalance from "@/components/Profiles/Seller/WithdrawBalance.vue";

export default {
	name: "Withdraw",
	middleware: ["auth", "seller"],
	components: { WithdrawBalance },
	data() {
		return {
			withdrawModal: false,
			withdrawRequests: [],
			currentPage: 1,
		};
	},

	async created(page = 1) {
		// fetch withdraw requests
		const resWithdraw = await this.$axios.get(
			`/withdraws?seller_id=${this.$auth.user.id}?page=` + page
		);
		console.log(resWithdraw.data.data);
		this.withdrawRequests = resWithdraw.data.data;

		this.stopLoading();
	},

	methods: {
		async moreWithdraws() {
			this.currentPage++;
		},
	},
};
</script>

<style lang="scss">
</style>
