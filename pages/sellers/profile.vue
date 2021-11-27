<template>
	<loading-view :loading="isLoading">
		<div>
			<page-header>
				<div class="col-md-8">
					<div class="d-flex flex-column flex-sm-row align-items-center">
						<div class="me-2 profile-photo">
							<img :src="
                  $auth.user.profilePicture.length
                    ? $auth.user.profilePicture
                    : require('@/assets/images/profile.png')
                " alt />
							<div class="profile-photo__overlay" v-if="$auth.loggedIn" @click="editProfilePicture = true">
								<i class="fas fa-camera fs-2"></i>
							</div>
						</div>
						<edit-seller-profile-picture v-if="editProfilePicture" @close="editProfilePicture = false"></edit-seller-profile-picture>
						<div class="ms-sm-2 mt-3 mt-sm-0 d-flex flex-column align-items-center align-items-sm-start">
							<div class="d-flex">
								<h3 class="text-white fw-bold me-1">{{ $auth.user.name }}</h3>
								<!-- <span class="badge bg-primary align-self-start rounded-pill"
                >Verified</span
                            >-->
							</div>
							<h5 class="text-white">
								<span v-if="$auth.user.jobTitle">{{
                  $auth.user.jobTitle
                }}</span>
								<span v-else>Add your job title</span>
								<span role="button" @click="editTitle = true">
									<i class="fas fa-edit text-primary"></i>
								</span>
								<edit-seller-title v-if="editTitle" @close="editTitle = false"></edit-seller-title>
								<!-- <span>|</span>
                            <span>100% Sucess Rate</span>-->
							</h5>
						</div>
					</div>
				</div>
				<div class="col-md-4 text-md-end">
					<button class="btn btn-outline-primary px-4 rounded-pill mt-2 mt-md-0" v-if="$auth.user.type == 'buyer'">
						<span>Contact Me</span>
					</button>
				</div>
			</page-header>

			<!-- info section -->
			<section class="section-padding">
				<div class="container">
					<div class="row">
						<div class="col-lg-8">
							<div class="card border-0 rounded-0 p-2">
								<div class="card-body">
									<!-- About Section -->
									<div class="mb-4">
										<div class="d-flex">
											<i class="fas h5 fa-user-circle text-primary me-2"></i>
											<h5 class="fw-bold d-flex flex-grow-1">
												About Me
												<i class="fas fa-edit text-primary ms-auto" role="button" v-if="$auth.user.type == 'seller'" @click="editAbout = true"></i>
											</h5>
										</div>
										<div class>
											<p class="text-justify" v-html="$auth.user.about" v-if="$auth.user.about"></p>
											<p class="text-grey text-center" v-else>No Data Found</p>
										</div>
										<edit-seller-about v-if="editAbout" @close="editAbout = false"></edit-seller-about>
									</div>

									<!-- Experience -->
									<div class="mb-4">
										<h5 class="d-flex">
											<i class="fas h5 fa-briefcase text-primary me-2"></i>
											<span class="fw-bold">Experience</span>
											<i class="fas fa-edit text-primary ms-auto" role="button" @click="addExperience = true"></i>
										</h5>
										<add-seller-experience v-if="addExperience" @close="addExperience = false"></add-seller-experience>
										<div v-if="$auth.user.experiences.length">
											<div v-for="experience in $auth.user.experiences" :key="experience.id">
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
										<h5 class="d-flex">
											<i class="fas h5 fa-user-graduate text-primary me-2"></i>
											<span class="fw-bold">Education</span>
											<span class="ms-auto text-primary" @click="addEducation = true" role="button" v-if="$auth.user.type == 'seller'">
												<i class="fas fa-edit"></i>
											</span>
										</h5>
										<add-seller-education v-if="addEducation" @close="addEducation = false"></add-seller-education>
										<div v-if="$auth.user.educations.length">
											<div v-for="education in $auth.user.educations" :key="education.id">
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
											<span class="ms-auto text-primary" role="button" v-if="$auth.user.type == 'seller'" @click="editDevice = true">
												<i class="fas fa-edit"></i>
											</span>
										</h5>
										<div class="mt-2" v-if="$auth.loggedIn && $auth.user.devices.length">
											<span href="javascript:void(0)" class="badge border border-primary text-primary rounded-pill py-2 me-2 px-3" v-for="(device, index) in $auth.user.devices" :key="index">{{ device }}</span>
										</div>
										<div class="text-grey text-center" v-else>
											Nothing to show
										</div>
									</div>
									<edit-device v-if="editDevice" @close="editDevice = false"></edit-device>

									<!-- Skills -->
									<div class="mb-4">
										<h5 class="d-flex">
											<i class="fas h5 fa-globe-asia text-primary me-2"></i>
											<span class="fw-bold">Skills</span>
											<span class="ms-auto text-primary" role="button" v-if="$auth.user.type == 'seller'" @click="editSkill = true">
												<i class="fas fa-edit"></i>
											</span>
										</h5>
										<div class="mt-2" v-if="$auth.loggedIn && $auth.user.skills.length">
											<span href="javascript:void(0)" class="badge border border-primary text-primary rounded-pill py-2 me-2 px-3" v-for="skill in $auth.user.skills" :key="skill.id">{{ skill.name }}</span>
										</div>
										<div class="text-grey text-center" v-else>
											Nothing to show
										</div>
									</div>
									<edit-skill v-if="editSkill" @close="editSkill = false"></edit-skill>

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

						<!-- Overview  -->
						<div class="col-lg-4 mt-4 mt-lg-0">
							<div class="card border-0 rounded-0 p-2">
								<div class="card-body">
									<div>
										<div class="d-flex align-items-center">
											<div class="d-flex">
												<i class="fas fa-chart-bar text-primary h5 me-2"></i>
												<h5 class="fw-bold">Overview</h5>
											</div>
											<span class="ms-auto" role="button">
												<i class="fas fa-edit text-primary h5" @click="editOverview = true"></i>
											</span>
										</div>
										<edit-overview v-if="editOverview" @close="editOverview = false"></edit-overview>

										<div class="d-flex">
											<div>Per Hour</div>
											<div class="fw-semibold ms-auto">
												৳ {{ $auth.user.perHour }}
											</div>
										</div>

										<div class="d-flex">
											<div>From</div>
											<div class="fw-semibold ms-auto" v-if="$auth.user.address">
												{{ $auth.user.address.city }},
												{{ $auth.user.address.country }}
											</div>
											<div v-else>No data</div>
										</div>

										<div class="d-flex">
											<div>Completed Jobs</div>
											<div class="fw-semibold ms-auto">
												{{ $auth.user.completedJobs }}
											</div>
										</div>

										<div class="d-flex">
											<div>Member Since</div>
											<div class="fw-semibold ms-auto">
												{{ $auth.user.memberSince }}
											</div>
										</div>
									</div>

									<!-- Review Stats -->
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

					<div class="package-section" v-if="packages.length">
						<div class="row">
							<div class="col-lg-3 col-md-4 col-sm-6" v-for="pkg in packages" :key="pkg.id">
								<PackageCard :id="pkg.id" :src="
                    pkg.mediaUrl.length
                      ? pkg.mediaUrl
                      : require('@/assets/images/placeholder.jpg')
                  " :title="pkg.name" :author="pkg.sellerName" :price="pkg.price" class="shadow-sm"></PackageCard>
							</div>
						</div>
					</div>

					<div v-else class="text-center">
						<nuxt-link to="/packages/create" class="btn btn-outline-primary text-decoration-none">Add A Package</nuxt-link>
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

						<div class="package-section">
							<div class="row">
								<!-- Loop over all Review -->
								<div v-for="review in reviews" :key="review.id" class="col-lg-3 col-md-3 col-sm-6">
									<div class="card rounded-0 border-0 mb-4">
										<div class="card-body bg-light">
											<div class="rating mb-1">
												<i v-for="r in review.rating" :key="r" class="fas fa-star"></i>
											</div>
											<p class="fs-8 fst-italic">
												{{ review.review }}
											</p>
											<div class="d-flex mt-3">
												<div class="me-2">
													<img class="rounded-circle" :src="
                              review.profilePicture ||
                              require('@/assets/images/profile.png')
                            " style="width: 35px" alt="buyer-1" />
												</div>
												<div class="pb-0">
													<p class="mb-0 fw-bold fs-7">
														{{ review.authorName }}
													</p>
													<p class="fs-8 mb-0">{{ review.created_at }}</p>
												</div>
											</div>
										</div>
									</div>
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
import EditSellerProfilePicture from "@/components/Profiles/Seller/EditSellerProfilePicture.vue";
import EditSellerTitle from "@/components/Profiles/Seller/EditSellerTitle.vue";
import EditSellerAbout from "@/components/Profiles/Seller/EditSellerAbout.vue";
import AddSellerExperience from "@/components/Profiles/Seller/AddSellerExperience.vue";
import AddSellerEducation from "@/components/Profiles/Seller/AddSellerEducation.vue";
import EditSkill from "@/components/Profiles/Seller/EditSkill.vue";
import EditOverview from "@/components/Profiles/Seller/EditOverview.vue";
import EditDevice from "@/components/Profiles/Seller/EditDevice.vue";

export default {
	name: "SellerProfile",
	middleware: ["auth", "seller"],
	data() {
		return {
			editProfilePicture: false,
			editTitle: false,
			editAbout: false,
			addExperience: false,
			addEducation: false,
			editSkill: false,
			editOverview: false,
			editDevice: false,
			seller: null,
			packages: [],
			reviews: null,
			page: 1,
			reviewStatistics: null,
			histories: [],
			historyPage: 1,
		};
	},
	components: {
		EditSellerProfilePicture,
		EditSellerTitle,
		EditSellerAbout,
		AddSellerExperience,
		AddSellerEducation,
		EditSkill,
		EditOverview,
		EditDevice,
	},
	methods: {
		// Get Reviews
		async getReviews() {
			const newReviews = await this.$axios.$get(
				`/reviews?sellerId=${this.$auth.user.id}&page=${this.page}`
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
		await this.$auth.fetchUser();

		//Get the statistics
		const resStats = await this.$axios.$get(
			`sellers/${this.$auth.user.id}/review-statistics`
		);
		this.reviewStatistics = resStats.data;

		// Get the packages
		const resPackages = await this.$axios.$get(
			"/packages?seller_id=" + this.$auth.user.id
		);
		this.packages = resPackages.data;

		// Get all Reviews and set to state
		const resReview = await this.$axios.$get(
			`/reviews?sellerId=${this.$auth.user.id}`
		);

		this.reviews = resReview.data;
		await this.getHistory();
		this.stopLoading();
	},
};
</script>

<style lang="scss">
textarea {
	border: 1px solid #1dbf73;
	outline: none;

	&:focus {
		border: 1px solid #1dbf73;
		outline: none;
	}
}

#skill-modal {
	.multiselect__content-wrapper {
		position: relative !important;
	}
}

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
