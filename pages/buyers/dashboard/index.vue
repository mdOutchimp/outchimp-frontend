<template>
	<!-- Buyer Dashboard Section -->
	<section class="container" style="margin-top: 60px">
		<div class="row pt-5 pb-5 justify-content-center">
			<!-- left side -->
			<div class="col-lg-8">
				<div class="card border-0 rounded-0 mb-3">
					<div class="card-body">
						<NuxtLink to="/buyers/dashboard" class="text-decoration-none">Dashboard</NuxtLink>
						<span class="px-4">|</span>
						<NuxtLink to="/buyers/dashboard/jobs" class="text-decoration-none">Jobs</NuxtLink>
						<span class="px-4">|</span>
						<NuxtLink to="/buyers/dashboard/orders" class="text-decoration-none">Orders</NuxtLink>
						<span class="px-4">|</span>
						<NuxtLink to="/buyers/dashboard/bids" class="text-decoration-none">Bids</NuxtLink>
					</div>
				</div>

				<!-- dashboard start-->
				<loading-tab-view :loading="isLoading">
					<nuxt-child></nuxt-child>
				</loading-tab-view>
				<!-- dashboard end -->
			</div>

			<!-- right side -->
			<div class="col-lg-4">
				<!-- profile summery -->
				<div class="card border-0 rounded-0 shadow-sm mt-3 mt-lg-0 mb-3">
					<div class="p-2 px-3 d-flex flex-column align-items-center border-bottom">
						<div class="me-2 mt-2 profile-photo">
							<img :src="
                  $auth.user.profilePicture.length
                    ? $auth.user.profilePicture
                    : require('@/assets/images/profile.png')
                " alt />
							<div class="profile-photo__overlay" v-if="$auth.loggedIn" @click="editProfilePicture = true">
								<i class="fas fa-camera fs-2"></i>
							</div>
						</div>
						<edit-buyer-profile-picture v-if="editProfilePicture" @close="editProfilePicture = false"></edit-buyer-profile-picture>
						<h5 class="mt-2 ms-lg-3 fw-bold">{{ $auth.user.name }}</h5>
					</div>

					<div class="card-body">
						<div class="row justify-content-center">
							<div class="col-6">
								<NuxtLink to="/buyers/dashboard/jobs" class="btn btn-grey-light form-control border-0 rounded-0 fw-bold fs-7 text-decoration-none">
									ALL JOBS
								</NuxtLink>
							</div>
							<div class="col-6">
								<button class="btn btn-primary form-control border-0 rounded-0 fw-bold fs-7" @click.prevent="$router.push({ path: '/jobs/create' })">
									POST A JOB
								</button>
							</div>
						</div>
					</div>
				</div>

				<!-- Recent Bids -->
				<div class="card border-0 rounded-0 shadow-sm mt-3 mt-lg-0">
					<div class="py-2 px-3 d-flex align-items-center border-bottom">
						<h6 class="fs-7 fw-bold mb-0 py-2">Recent Bids</h6>
					</div>

					<loading-tab-view :loading="isLoading">
						<div class="card-body pb-0" v-for="bid in bids" :key="bid.id">
							<div>
								<div class="row">
									<div class="d-flex align-items-center border-bottom pb-3">
										<img src="@/assets/images/users/user-2.png" class="rounded-circle" style="width: 45px" alt="" />
										<div class="ms-2 flex-grow-1">
											<div class="d-flex justify-content-between">
												<h6 class="fw-bold mb-0">
													<NuxtLink class="text-decoration-none" :to="`/sellers/${bid.seller.id}`">
														{{ `${bid.seller.name}` }}
													</NuxtLink>
												</h6>
												<p class="fs-8">{{ bid.postedAt }}</p>
											</div>
											<p class="fs-7 mt-1">
												{{ bid.description | truncate(50) }}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</loading-tab-view>
				</div>
			</div>
		</div>
	</section>
	<!-- End Buyer Dashboard Section -->
</template>

<script>
import EditBuyerProfilePicture from "@/components/Profiles/Buyer/EditBuyerProfilePicture.vue";
export default {
	components: { EditBuyerProfilePicture },
	middleware: ["auth", "buyer", "verified"],
	data() {
		return {
			editProfilePicture: false,
			bids: null,
		};
	},
	async fetch() {
		const bids = await this.$axios.$get(
			`/bids?buyer_id=${this.$auth.user.id}&limit=3`
		);
		this.bids = bids;
		this.stopLoading();
	},
};
</script>

<style lang="scss" scoped>
.profile-photo {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	overflow: hidden;
	position: relative;

	img {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
	&:hover .profile-photo__overlay {
		opacity: 1;
	}

	&__overlay {
		position: absolute;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: white;
		opacity: 0;
		transition: all 0.3s;
		cursor: pointer;
	}
}
</style>
