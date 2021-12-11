<template>
	<loading-view :loading="isLoading">
		<div v-if="seller">
			<page-header>
				<div class="col-md-8">
					<div class="d-flex flex-column flex-sm-row align-items-center">
						<div id="profile-photo" class="me-0 me-sm-2">
							<img :src="
                  seller.profilePicture.length
                    ? seller.profilePicture
                    : require('@/assets/images/profile.png')
                " alt />
						</div>
						<div class="ms-sm-2 mt-3 mt-sm-0 d-flex flex-column align-items-center align-items-sm-start">
							<div class="d-flex">
								<h3 class="text-white fw-bold me-1">{{ seller.name }}</h3>
							</div>
							<h5 class="text-white">
								<span>{{ seller.jobTitle }}</span>
							</h5>
						</div>
					</div>
				</div>
				<div class="col-md-4 text-center text-sm-start text-md-end mt-2 mt-md-0">
					<NuxtLink :to="`/buyers/chat?sellerId=${seller.id}`" class="btn btn-outline-primary px-4 rounded-pill mt-1 mt-md-0 text-decoration-none">
						<span>Contact Me</span>
					</NuxtLink>
				</div>
			</page-header>

			<!-- info section -->
			<section class="section-padding">
				<div class="container">
					<div class="row">
						<div class="col-lg-8">
							<div class="card border-0 rounded-0 p-2">
								<div class="card-body">
									<div class="mb-4">
										<div class="d-flex">
											<i class="fas h5 fa-user-circle text-primary me-2"></i>
											<h5 class="fw-bold">About Me</h5>
										</div>
										<div class="">
											<p class="text-justify" v-html="seller.about"></p>
										</div>
									</div>

									<!-- Experience -->
									<div class="mb-4">
										<div class="d-flex">
											<i class="fas h5 fa-briefcase text-primary me-2"></i>
											<h5 class="fw-bold">Experience</h5>
										</div>
										<div class="" v-if="seller.experiences.length">
											<div v-for="experience in seller.experiences" :key="experience.id">
												<small>
													{{ experience.joinedAt }} -
													{{ experience.resignedAt }}
												</small>
												<p class="mb-2">
													<span class="fw-bold">
														{{ experience.designation }}
													</span>
													<span>|</span>
													<span>{{ experience.company }}</span>
												</p>
											</div>
										</div>
										<div class="text-grey text-center" v-else>
											Nothing to show
										</div>
									</div>

									<!-- Education -->
									<div class="mb-4">
										<div class="d-flex">
											<i class="fas h5 fa-user-graduate text-primary me-2"></i>
											<h5 class="fw-bold">Education</h5>
										</div>
										<div v-if="seller.educations.length">
											<div v-for="education in seller.educations" :key="education.id">
												<p class="fs-7">
													{{ education.startedAt }} - {{ education.passedAt }}
												</p>
												<p class="mb-2">
													<span class="fw-bold">{{ education.degree }}</span>
													<span>|</span>
													<span>{{ education.institute }}</span>
												</p>
											</div>
										</div>
										<div class="text-grey text-center" v-else>
											Nothing to show
										</div>
									</div>

									<!-- Devices -->
									<div class="mb-4">
										<h5 class="d-flex">
											<i class="fas h5 fa-globe-asia text-primary me-2"></i>
											<span class="fw-bold">Devices</span>
										</h5>
										<div class="mt-2" v-if="seller.devices.length">
											<span href="javascript:void(0)" class="badge border border-primary text-primary rounded-pill py-2 me-2 px-3" v-for="(device, index) in seller.devices" :key="index">{{ device }}</span>
										</div>
										<div class="text-grey text-center" v-else>
											Nothing to show
										</div>
									</div>

									<!-- Skills -->
									<div class="mb-4">
										<div class="d-flex">
											<i class="fas h5 fa-globe-asia text-primary me-2"></i>
											<h5 class="fw-bold">Skills</h5>
										</div>
										<div class="mt-2" v-if="seller.skills.length">
											<span href="javascript:void(0)" class="badge border border-primary text-primary rounded-pill me-2" v-for="skill in seller.skills" :key="skill.id">{{ skill.name }}</span>
										</div>
										<div class="text-grey text-center" v-else>
											Nothing to show
										</div>
									</div>

									<!-- Work history -->
									<div class="mb-4">
										<div class="d-flex">
											<i class="fas h5 fas fa-history text-primary me-2"></i>
											<h5 class="fw-bold">Work History</h5>
										</div>
										<!-- v-if="histories.length" -->
										<div v-if="histories.length">
											<!-- Single history -->
											<div class="mt-3" v-for="order in histories" :key="order.id">
												<h6 class="fw-bold">
													{{ order.orderable.title }}
												</h6>
												<div class="d-sm-flex align-items-center">
													<div class="rating me-2">
														<i class="fas fa-star" v-for="star in Math.floor(
                                order.orderable.averageRating
                              )" :key="star"></i>
													</div>
													<span class="fw-bold">
														{{ order.orderable.averageRating }}
													</span>
													<span class="mx-2">-</span>
													<span>{{ order.orderable.postDate }} -
														{{ order.orderable.expireDate }}</span>
												</div>
												<p class="text-justify mt-2 mt-sm-0">
													{{ order.orderable.description }}
												</p>
												<div class="row mt-2">
													<div class="col-12 col-sm-4 mt-1 mt-sm-0 fw-bold">
														$ {{ order.amount }}
													</div>
													<div class="col-12 col-sm-4 mt-1 mt-sm-0">
														{{ order.orderable.type | capitalize }}
													</div>
												</div>
											</div>
											<a class="text-primary text-decoration-none d-block mt-3 fw-bold" href="javascript:void(0)" @click.prevent="moreHistory">See more +</a>
										</div>
										<!-- v-else -->
										<div v-else class="text-grey text-center">
											Nothing to show
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-lg-4 mt-4 mt-lg-0">
							<div class="card border-0 rounded-0 p-2">
								<div class="card-body">
									<!-- Overview-->
									<div>
										<div class="d-flex align-items-center">
											<i class="fas fa-chart-bar text-primary h5 me-2"></i>
											<h5 class="fw-bold">Overview</h5>
										</div>
										<div class="d-flex">
											<div>From</div>
											<div class="fw-semibold ms-auto" v-if="seller.address">
												{{ seller.address.city }},
												{{ seller.address.country }}
											</div>
											<div class="ms-auto" v-else>No Data</div>
										</div>

										<div class="d-flex">
											<div>Completed Jobs</div>
											<div class="fw-semibold ms-auto">
												{{ seller.completedJobs }}
											</div>
										</div>

										<div class="d-flex">
											<div>Per Hour</div>
											<div class="fw-semibold ms-auto">
												৳ {{ seller.perHour }}
											</div>
										</div>

										<div class="d-flex">
											<div>Member Since</div>
											<div class="fw-semibold ms-auto">
												{{ seller.memberSince }}
											</div>
										</div>
									</div>

									<!-- Review -->
									<div class="mt-4" v-if="reviewStatistics">
										<div class="d-flex align-items-center">
											<i class="fas fa-star text-primary h5 me-2"></i>
											<h5 class="fw-bold">Ratings</h5>
										</div>
										<div class="d-flex mt-2 align-items-center">
											<div>5 Stars</div>
											<div class="flex-grow-1 px-3">
												<div class="progress" style="height: 10px">
													<div class="progress-bar" role="progressbar" :style="{
                              width: `${reviewStatistics['5Star'].percent}%`,
                            }" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div>({{ reviewStatistics["5Star"].value }})</div>
										</div>

										<div class="d-flex mt-2 align-items-center">
											<div>4 Stars</div>
											<div class="flex-grow-1 px-3">
												<div class="progress" style="height: 10px">
													<div class="progress-bar" role="progressbar" :style="{
                              width: `${reviewStatistics['4Star'].percent}%`,
                            }" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div>({{ reviewStatistics["4Star"].value }})</div>
										</div>

										<div class="d-flex mt-2 align-items-center">
											<div>3 Stars</div>
											<div class="flex-grow-1 px-3">
												<div class="progress" style="height: 10px">
													<div class="progress-bar" role="progressbar" :style="{
                              width: `${reviewStatistics['3Star'].percent}%`,
                            }" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div>({{ reviewStatistics["3Star"].value }})</div>
										</div>

										<div class="d-flex mt-2 align-items-center">
											<div>2 Stars</div>
											<div class="flex-grow-1 px-3">
												<div class="progress" style="height: 10px">
													<div class="progress-bar" role="progressbar" :style="{
                              width: `${reviewStatistics['2Star'].percent}%`,
                            }" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div>({{ reviewStatistics["2Star"].value }})</div>
										</div>

										<div class="d-flex mt-2 align-items-center">
											<div>1 Stars</div>
											<div class="flex-grow-1 px-3">
												<div class="progress" style="height: 10px">
													<div class="progress-bar" role="progressbar" :style="{
                              width: `${reviewStatistics['1Star'].percent}%`,
                            }" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div>({{ reviewStatistics["1Star"].value }})</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- info section end-->

			<!-- Package section -->
			<section class="section-padding bg-white">
				<div class="container">
					<div class="section-header mb-5">
						<div class="section-header__title text-center">
							<p class="h2 fw-bold">Packages</p>
							<span class="section-header__line" style="width: 120px"></span>
						</div>
					</div>

					<div class="package-section" v-if="packages.length > 0">
						<div class="row">
							<div class="col-lg-3 col-md-4 col-sm-6" v-for="pkg in packages" :key="pkg.id">
								<package-card :id="pkg.id" :src="
                    pkg.mediaUrl.length
                      ? pkg.mediaUrl
                      : require('@/assets/images/placeholder.jpg')
                  " :title="pkg.name" :author="pkg.sellerName" :price="pkg.price" class="shadow-sm"></package-card>
							</div>
						</div>
					</div>

					<div v-else class="text-center">
						<span class="border border-primary rounded px-4 py-2">Nothing To Show</span>
					</div>
				</div>
			</section>
			<!-- Package section end -->

			<!-- Review section -->
			<section class="section-padding">
				<div class="review-section">
					<div class="container">
						<div class="section-header mb-5">
							<div class="section-header__title text-center">
								<p class="h2 fw-bold">Reviews</p>
								<span class="section-header__line" style="width: 100px"></span>
							</div>
						</div>

						<div class="review-section">
							<div class="row">
								<div class="col-lg-3 col-md-3 col-sm-6" v-for="review in reviews" :key="review.id">
									<ReviewCard :review="review">
										<template v-slot:rating>
											<i class="fas fa-star" v-for="star in review.rating" :key="star"></i>
										</template>
									</ReviewCard>
								</div>
							</div>

							<div class="text-center mt-1">
								<a class="text-primary fs-6 fw-bold" href="javascript:void(0)" @click.prevent="seeMore">
									See More
									<i class="fas fa-angle-down ms-1"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- Review section end -->
		</div>
	</loading-view>
</template>

<script>
import ReviewCard from "@/components/Layouts/ReviewCard.vue";
export default {
	name: "sellerIndex",
	validate({ params }) {
		ReviewCard;
		// Must be a number
		return /^\d+$/.test(params.id);
	},
	data() {
		return {
			seller: null,
			packages: [],
			reviews: [],
			page: 1,
			histories: [],
			historyPage: 1,
			reviewStatistics: null,
		};
	},
	methods: {
		// Get Reviews
		async getReviews() {
			const newReviews = await this.$axios.$get(
				`/reviews?sellerId=${this.$route.params.id}&page=${this.page}`
			);
			this.reviews.push(...newReviews.data);
		},

		async seeMore() {
			this.page++;
			await this.getReviews();
		},

		// Get history
		async getHistory() {
			const newHistory = await this.$axios.$get(
				`/orders?sellerId=${this.$auth.user.id}&status=completed&orderableType=job&page=${this.historyPage}&perPage=2`
			);
			this.histories.push(...newHistory.data);
		},

		async moreHistory() {
			this.historyPage++;
			await this.getHistory();
		},
	},
	async fetch() {
		const resOne = await this.$axios.$get(
			"sellers/" + this.$route.params.id
		);
		this.seller = resOne.data;
		//Get the statistics
		const resStats = await this.$axios.$get(
			`sellers/${this.$route.params.id}/review-statistics`
		);
		this.reviewStatistics = resStats.data;

		// Get the packages
		const resPackages = await this.$axios.$get(
			"/packages?seller_id=" + this.seller.id
		);
		this.packages = resPackages.data;

		// Get all Reviews and set to state
		const resReview = await this.$axios.$get(
			`/reviews?sellerId=${this.$route.params.id}`
		);

		this.reviews = resReview.data;
		await this.getHistory();
		this.stopLoading();
	},
};
</script>

<style>
.profile-photo {
	height: 150px;
	width: 150px;
}

.profile-photo img {
	object-fit: contain;
}
</style>
