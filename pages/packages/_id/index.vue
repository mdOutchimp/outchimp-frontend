<template>
	<div v-if="pkg || seller">
		<page-header>
			<div class="col-md-8 d-flex flex-column">
				<div class>
					<h3 class="text-white fw-bold mt-2 d-inline-block">{{ pkg.name }}</h3>
					<!-- <span class="badge bg-primary rounded-pill d-inline-block">Featured</span> -->
				</div>
				<h5 class="text-white">
					<span>{{ pkg.category.name }}</span>
					<span>|</span>
					<span class="fw-bold">
						<i class="fas fa-star text-primary"></i> {{ pkg.averageRating }}
					</span>
					<span class>({{ pkg.totalReview }})</span>
				</h5>
			</div>
			<div class="col-md-4 text-md-end">
				<button class="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Save as favourite">
					<i class="fas fa-star fa-outline"></i>
				</button>

				<button class="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Save as favourite">
					<i class="fas fa-share-alt"></i>
				</button>
			</div>
		</page-header>

		<section class="section-padding">
			<div class="container">
				<div class="row">
					<div class="col-lg-8">
						<div class="card rounded-0 border-0 py-3">
							<div class="card-body p-0">
								<div class="ps-3 pe-5">
									<h5 class="fw-bold">Description</h5>
									<p class="text-justify" v-html="pkg.description"></p>
								</div>
								<!-- Project Requirements -->
								<div class="mt-4 ps-3 pe-5">
									<h5 class="fw-bold">Requierments</h5>
									<p class="pt-2" v-for="(requirement, index) in pkg.requirements" :key="index">
										{{ index + 1 }}. {{ requirement }}
									</p>
								</div>

								<!-- Project Highlights -->
								<div class="mt-4 ps-3 pe-5">
									<h5 class="fw-bold">Highlights</h5>
									<p class="pt-2" v-for="(highligth, index) in pkg.highlights" :key="index">
										{{ index + 1 }}. {{ highligth }}
									</p>
								</div>
							</div>

							<!-- Project Reviews -->
							<div class="mt-3 px-3" v-if="reviews">
								<h5 class="fw-bold mb-3">Project Reviews</h5>

								<!-- Review -->
								<div class="mt-3" v-for="review in reviews" :key="review.id">
									<div class="d-sm-flex align-item-center justify-content-between">
										<div class="d-sm-flex align-items-center">
											<div v-if="review">
												<img :src="
                            review.author.profilePicture.length
                              ? review.author.profilePicture
                              : require('@/assets/images/profile.png')
                          " class="rounded-circle" style="height: 52px; border-radius: 50%" alt="" />
											</div>
											<div class="ms-sm-3 d-flex mt-2 mt-sm-0">
												<div>
													<h6 class="fw-bold">{{ review.author.name }}</h6>
													<div>
														<i class="fas fa-star text-primary fa-fw"></i><span class="px-1">{{ review.rating }}</span>
													</div>
												</div>
											</div>
										</div>
										<span class="fs-7">{{ review.reviewAt }}</span>
									</div>
									<div>
										<p class="mt-2 text-justify">
											{{ review.review }}
										</p>
									</div>
								</div>

								<!-- See more -->
								<div class="mt-3" v-if="reviews.length >= 4">
									<a href="#" class="text-decoration-none text-primary fw-bold">
										See More +
									</a>
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
									<div v-if="seller">
										<img :src="
                        seller.profilePicture.length
                          ? seller.profilePicture
                          : require('@/assets/images/profile.png')
                      " class="rounded-circle" style="height: 120px; border-radius: 50%" alt="" />
									</div>
									<div class="mt-3 text-center" v-if="seller">
										<h5 class="fw-bold">
											<NuxtLink :to="`/sellers/${seller.id}`" class="text-black text-decoration-none">{{ seller.name }}
											</NuxtLink>
										</h5>

										<p class="fw-semibold">
											<i class="fas fa-star text-primary fa-fw"></i><span class="ps-1"> {{ seller.averageRating }} </span>
											<span>( {{ seller.totalReview }} reviews)</span>
										</p>
									</div>
								</div>
								<div class="d-flex mt-3" v-if="seller">
									<div class="">
										<h6 class="fw-bold">From</h6>

										<p v-if="seller.address">
											{{ seller.address.city }},
											{{ seller.address.country }}
										</p>
										<p v-else class="text-grey">No Data Found</p>
									</div>
									<div class="ms-auto">
										<h6 class="fw-bold">Member Since</h6>
										<p class="text-right">{{ seller.memberSince }}</p>
									</div>
								</div>

								<NuxtLink v-if="$auth.loggedIn && $auth.user.type !== 'seller'" :to="`/orders/create?type=package&id=${pkg.id}`" class="btn btn-outline-primary text-decoration-none rounded-pill mt-3 px-4 w-100">
									Order Now
								</NuxtLink>
								<NuxtLink v-else :to="`/signup`" class="btn btn-outline-primary text-decoration-none rounded-pill mt-3 px-4 w-100">
									Become a Buyer
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: "PackageIndex",
	data() {
		return {
			pkg: null,
			seller: null,
			reviews: null,
			page: 1,
		};
	},
	async fetch() {
		// Get Package details
		const res = await this.$axios.$get(
			"/packages/" + this.$route.params.id
		);
		this.pkg = res.data;

		// Get Seller details
		const resSeller = await this.$axios.$get(
			`/sellers/${this.pkg.sellerId}`
		);
		this.seller = resSeller.data;

		// Get all Reviews
		const resReview = await this.$axios.$get(
			`/reviews?packageId=${this.$route.params.id}`
		);
		this.reviews = resReview.data;
	},
};
</script>

<style>
.tabs-component-tabs {
	display: flex;
	list-style: none;
	justify-content: space-between;
}

.tabs-component-tabs .tabs-component-tab {
	flex-grow: 1;
	text-align: center;
	padding: 0.8rem;
}

.tabs-component-tab.is-active {
	border-bottom: 2px solid #1dbf73;
}

.tabs-component-tab a {
	text-decoration: none;
	font-weight: 600;
}

.tabs-component-panels {
	padding: 0 1rem;
}
</style>
