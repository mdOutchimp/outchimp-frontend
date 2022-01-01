<template>
	<div>
		<page-header>
			<div class="d-flex justify-content-between align-items-center align-items-start py-3">
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
									<div v-if="$auth.user.balance > 0">
										<button
											@click="withdrawModal = true"
											class="btn btn-primary border-0 outline-none"
										>
											Withdraw
										</button>
									</div>
								</div>
								<withdraw-balance
									v-if="withdrawModal"
									@close="withdrawModal = false"
								>
								</withdraw-balance>
							</div>
						</div>

						<!-- table -->
						<div
							class="mt-3"
							v-if="laravelData"
						>
							<table class="table table-hover table-responsive m-0">
								<thead>
									<tr>
										<th
											class="px-4 table-dark"
											colspan="4"
										>Withdraw History</th>
									</tr>
								</thead>
								<tbody class="bg-white">
									<tr
										v-for="withdrawRequest in laravelData.data"
										:key="withdrawRequest.id"
									>
										<td
											class="px-4"
											colspan="2"
										>
											৳
											<span class="fw-bolder">{{ withdrawRequest.amount }} </span>
										</td>
										<td colspan="1">
											{{ withdrawRequest.createdAt | moment("LL") }}
										</td>
										<td
											colspan="1"
											class="text-primary"
										>
											{{ withdrawRequest.status | capitalize }}
										</td>
									</tr>
								</tbody>
							</table>

							<pagination
								class="mt-5 d-none d-md-flex"
								:limit="3"
								:data="laravelData"
								@pagination-change-page="getResults"
							></pagination>
							<pagination
								class="mt-5 d-flex d-md-none"
								:limit="-1"
								:data="laravelData"
								@pagination-change-page="getResults"
							></pagination>
						</div>
						<!-- table ends -->
					</div>
				</div>
			</div>
		</section>
		<!-- info section end-->
	</div>

</template>

<script>
import WithdrawBalance from "@/components/Profiles/Seller/WithdrawBalance.vue";

export default {
	name: "Withdraw",
	middleware: ["auth", "seller", "verified"],
	components: { WithdrawBalance },
	data() {
		return {
			withdrawModal: false,
			laravelData: null,
		};
	},

	methods: {
		getResults(page = 1) {
			this.$axios
				.$get(`/withdraws?page=` + page)
				.then((response) => {
					this.laravelData = response;
				});
		},
	},

	mounted() {
		this.getResults();
	},
};
</script>

<style lang="scss">
</style>
