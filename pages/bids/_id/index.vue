<template>
	<loading-view :loading="isLoading">
		<div v-if="bid">
			<page-header>
				<div class="col-md-8 d-flex flex-column">
					<div class>
						<h3 class="text-white fw-bold mt-2 d-inline-block">
							{{ bid.job.title }}
						</h3>
						<span class="badge bg-primary text-capitalize mx-2 rounded-pill">{{
              bid.job.status
            }}</span>
					</div>
					<h5 class="text-white">
						<span>{{ bid.job.category.name }}</span>
					</h5>
				</div>
			</page-header>
			<section class="section-padding">
				<div class="container">
					<div class="row">
						<div class="col-lg-8">
							<div class="card rounded-0 border-0">
								<div class="card-body">
									<div>
										<h5 class="fw-bold mt-3">Description</h5>
										<p class="text-justify">{{ bid.description }}</p>
									</div>
									<div>
										<h5 class="fw-bold mt-3">Attachments</h5>
										<div class="text-grey text-center">
											No Attachments Added
										</div>
									</div>
									<div>
										<h5 class="fw-bold mt-3">Amount</h5>
										<p class="">৳ {{ bid.amount }}</p>
									</div>
									<div>
										<h5 class="fw-bold mt-3">Require Days</h5>
										<p class="">{{ bid.requiredDays }} Days</p>
									</div>
									<div>
										<h5 class="fw-bold mt-3">Require Hour</h5>
										<p class="">{{ bid.requiredHours }} Hour</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Right side -->
						<div class="col-lg-4 mt-3 mt-lg-0">
							<!-- About The Freelancer -->
							<div class="card rounded-0 border-0">
								<div class="card-body">
									<h5 class="fw-bold mb-3 text-center">About The Seller</h5>
									<div class="d-flex flex-column align-items-center">
										<div>
											<img :src="
                          bid.seller.profilePicture.length
                            ? bid.seller.profilePicture
                            : require('@/assets/images/profile.png')
                        " class="rounded-circle" style="height: 120px; border-radius: 50%" alt />
										</div>
										<div class="mt-3 text-center" v-if="bid">
											<NuxtLink :to="`/sellers/${bid.sellerId}`" class="text-black text-decoration-none">
												<h5 class="fw-bold">{{ bid.seller.name }}</h5>
											</NuxtLink>
											<p class="fw-semibold">
												<i class="fas fa-star text-primary fa-fw"></i>
												<span class="ps-1">
													{{ bid.seller.averageRating }}
												</span>
												<span>({{ bid.seller.totalReview }})</span>
											</p>
										</div>
									</div>
									<div class="d-flex mt-3">
										<div class>
											<h6 class="fw-bold">From</h6>

											<p v-if="bid.seller.address">
												{{ bid.seller.address.city }},
												{{ bid.seller.address.country }}
											</p>
											<p v-else class="text-grey">No Data Found</p>
										</div>
										<div class="ms-auto">
											<h6 class="fw-bold">Member Since</h6>
											<p class="text-right">{{ bid.seller.memberSince }}</p>
										</div>
									</div>

									<NuxtLink :to="`/orders/create?type=job&id=${bid.jobId}`" v-if="$auth.loggedIn & ($auth.user.type == 'buyer')" class="btn btn-outline-primary text-decoration-none rounded-pill mt-3 px-4 w-100">Accept</NuxtLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</loading-view>
</template>

<script>
export default {
	name: "bidIndex",
	data() {
		return {
			bid: null,
		};
	},
	async fetch() {
		try {
			const bid = await this.$axios.$get(
				`/bids/${this.$route.params.id}`
			);
			this.bid = bid.data;
			this.stopLoading();
		} catch (error) {
			console.log("Error: Fetch for single Bid!", error);
		}
	},
};
</script>

<style lang="scss" scoped></style>
