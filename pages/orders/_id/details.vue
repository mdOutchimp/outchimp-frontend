<template>
	<loading-view :loading="isLoading">
		<div v-if="order" class="my-4">
			<PageHeader>
				<div class="col-md-8 d-flex flex-column">
					<div class>
						<h3 class="text-white fw-bold mt-2 d-inline-block">
							{{ order.orderable.title || order.orderable.name }}
							<span class="badge fs-8 badge-pill badge-primary bg-primary">{{
                order.status | capitalize
              }}</span>
						</h3>
					</div>
					<h5 class="text-white">
						<span>{{ order.orderable.category.name }}</span>
					</h5>
				</div>
				<div class="col-md-4 text-md-end">
					<a :href="paymentUrl" v-if="order.status == 'draft'" class="btn btn-primary rounded-pill px-4 text-decoration-none">
						Confirm Order
					</a>
				</div>
			</PageHeader>

			<section class="section-padding">
				<div class="container">
					<div class="row">
						<div class="col-lg-8">
							<div class="card rounded-0 border-0">
								<div class="card-body p-0">
									<div class="ps-3 pe-5">
										<h5 class="fw-bold mt-3">Description</h5>
										<p class="text-justify">
											{{ order.orderable.category.description }}
										</p>
									</div>

									<div class="p-3">
										<h5 class="fw-bold">Amount</h5>
										<span>৳ </span> {{ order.amount }} <span>BDT</span>
									</div>

									<!-- Terms & condition -->
									<div class="mt-1 ps-3 pe-5 pb-3">
										<h5 class="fw-bold">Terms & condition</h5>
										<p v-if="order.termsAndConditions" v-html="order.termsAndConditions"></p>
										<p v-else class="text-muted">No Terms & condition Found</p>
									</div>

									<!-- review -->
									<div v-if="order.review !== null" class="mt-1 px-3 pb-3">
										<h5 class="fw-bold">Rating</h5>
										<div class="bg-light p-3 mt-3">
											<div>
												<div class="
                            d-flex
                            justify-content-between
                            align-items-start
                          ">
													<div class="d-flex align-items-center">
														<img class="rounded-circle" :src="
                                order.review.author.profilePicture
                                  ? order.review.author.profilePicture
                                  : require('@/assets/images/profile.png')
                              " style="width: 42px" alt="buyer-1" />
														<!-- name and review -->
														<div class="ms-2">
															<p class="fw-bold mb-0">
																{{ order.review.author.name }}
															</p>
															<i class="fas fa-star rating fs-7" v-for="star in order.review.rating" :key="star"></i>
														</div>
													</div>

													<p class="fs-7">{{ order.review.reviewAt }}</p>
												</div>
											</div>
											<p class="mt-3">{{ order.review.review }}</p>
										</div>
									</div>
									<!-- review ends -->
								</div>
							</div>
						</div>

						<!-- Right side -->
						<div class="col-lg-4 mt-3 mt-lg-0">
							<!-- About The Seller -->
							<div class="card rounded-0 border-0">
								<div class="card-body">
									<h5 class="fw-bold mb-3 text-center">About The Seller</h5>
									<div class="d-flex flex-column align-items-center">
										<div>
											<div>
												<img :src="
                            order.seller.profilePicture.length
                              ? order.seller.profilePicture
                              : require('@/assets/images/profile.png')
                          " class="rounded-circle d-block" style="max-width: 100px" />
											</div>
										</div>
										<div class="mt-3 text-center">
											<h5 class="fw-bold">
												{{ order.seller.firstName }} {{ order.seller.lastName }}
											</h5>
										</div>
									</div>
									<div class="d-flex mt-3">
										<div class="">
											<h6 class="fw-bold">From</h6>
											<p v-if="order.seller.address">
												{{ order.seller.address.city }},
												{{ order.seller.address.country }}
											</p>
											<p v-else class="text-grey">No Data Found</p>
										</div>
										<div class="ms-auto">
											<h6 class="fw-bold">Member Since</h6>
											<p class="text-right">{{ order.seller.memberSince }}</p>
										</div>
									</div>
									<button v-if="order.status == 'completed' && order.review == null" class="
                      d-block
                      btn btn-outline-primary
                      text-decoration-none
                      rounded-pill
                      mt-3
                      px-4
                      w-100
                    " @click="modal = true">
										Add a Review
									</button>

									<!-- Modal -->
									<AddReview :order="order" v-show="modal" @close="modal = false" @save="setOrder"></AddReview>
									<!-- Modal End -->
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
import ReviewCard from "@/components/Layouts/ReviewCard.vue";
import AddReview from "@/components/Modals/AddReview.vue";
export default {
	validate({ params }) {
		ReviewCard;
		// Must be a number
		return /^\d+$/.test(params.id);
	},
	name: "OrderDetails",
	data() {
		return {
			modal: false,
			order: null,
			// paymentUrl: process.env.API_BASE_URL,
			review: null,
			apiUrl: process.env.API_URL,
		};
	},

	components: {
		AddReview,
	},
	computed: {
		paymentUrl() {
			return `${this.apiUrl}orders/${this.order.id}/payment`;
		},
	},
	methods: {
		async changeOrderStatus() {
			const updateOrderResponse = await this.$axios.$put(
				`/orders/${this.$route.params.id}`,
				{
					...this.order,
					status: "confirmed",
				}
			);
			this.order = updateOrderResponse.data;
		},

		getJobType() {
			if (this.order.orderableType.includes("Job")) {
				return `jobId=${this.order.orderableId}`;
			} else {
				return `packageId=${this.order.orderableId}`;
			}
		},

		setOrder(res) {
			this.order = res.data;
		},
	},
	async fetch() {
		const res = await this.$axios.$get(`/orders/${this.$route.params.id}`);
		this.order = res.data;

		// const resReview = await this.$axios.$get(`/reviews?${this.getJobType()}`);
		// this.review = resReview.data;

		this.stopLoading();
	},
};
</script>

