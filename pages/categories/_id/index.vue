<template>
	<loading-view :loading="isLoading">
		<page-header>
			<div class="col-lg-6 d-flex flex-column align-items-center align-items-lg-start mb-3 mb-lg-0" v-if="category">
				<h1 class="text-white fw-bold">{{ category.name }}</h1>
				<h5 class="text-white">{{ category.description }}</h5>
			</div>
			<div class="col-lg-6 text-center text-lg-end">
				<img src="@/assets/svgs/Visual data-rafiki.svg" alt />
			</div>
		</page-header>
		<section class="section-padding container">
			<!-- Sub Category Buttons Slider -->
			<div class="row mb-4" v-if="allSubCategories.length">
				<splide :options="subCategoryOptions">
					<splide-slide v-for="subCategory in allSubCategories" :key="subCategory.value">
						<div class="py-2">
							<nuxt-link :to="`/packages?subCategory=${subCategory.value}`" class="subCategoryButton shadow-sm fs-7 text-grey">
								{{ subCategory.display }}
							</nuxt-link>
						</div>
					</splide-slide>
				</splide>
			</div>
			<!-- Sub Category Buttons Slider end-->

			<client-only v-for="subCategory in subCategories" :key="subCategory.id">
				<div class="row" v-if="subCategory.packages.length">
					<div class="d-flex mb-3 align-items-center justify-content-between border-bottom pb-2">
						<p class="fw-bold fs-5 mb-0" :id="subCategory.name">
							{{ subCategory.name }}
						</p>

						<nuxt-link :to="`/packages?subCategory=${subCategory.id}`" class="mt-2 fw-bold text-primary text-decoration-none">
							See More <i class="fas fa-angle-right"></i>
						</nuxt-link>
					</div>

					<!-- Packages loop -->
					<splide :options="options">
						<splide-slide v-for="pkg in subCategory.packages" :key="pkg.id">
							<div>
								<package-card :id="pkg.id" :src="
                    pkg.mediaUrl.length
                      ? pkg.mediaUrl
                      : require('@/assets/images/placeholder.jpg')
                  " :title="pkg.name" :author="pkg.sellerName" :price="pkg.price"></package-card>
							</div>
						</splide-slide>
					</splide>
				</div>
			</client-only>

			<div class="text-center mt-1">
				<a class="text-primary fs-6 fw-bold" href="javascript:void(0)" @click.prevent="seeMore">
					See More
					<i class="fas fa-angle-down ms-1"></i>
				</a>
			</div>
		</section>
	</loading-view>
</template>

<script>
export default {
	name: "category-details",

	data() {
		return {
			options: {
				rewind: true,
				perPage: 4,
				gap: "1rem",
				pagination: false,
				perMove: 1,
				// type: "loop",
				interval: 2000,
				breakpoints: {
					992: {
						perPage: 3,
					},

					768: {
						perPage: 2,
					},

					576: {
						perPage: 1,
					},
				},
			},
			subCategoryOptions: {
				rewind: true,
				perPage: 6,
				gap: "1rem",
				pagination: false,
				perMove: 1,
				// type: "loop",
				interval: 2000,
				breakpoints: {
					992: {
						perPage: 5,
					},

					768: {
						perPage: 4,
					},

					576: {
						perPage: 3,
					},
				},
			},
			subCategories: [],
			allSubCategories: [],
			category: "",
			page: 1,
		};
	},
	methods: {
		async getSubcategories() {
			const newSubCategories = await this.$axios.$get(
				`/categories/${this.$route.params.id}/packages?page=${this.page}`
			);
			this.subCategories.push(...newSubCategories.data);
		},

		async seeMore() {
			this.page++;
			await this.getSubcategories();
		},
	},

	// fetching category data
	async created() {
		const response = await this.$axios.$get(
			`/categories/${this.$route.params.id}/packages`
		);
		this.category = response.category;
		this.subCategories = response.data;

		// fetching subcategories for top buttons area
		const resSubCat = await this.$axios.$get(
			`/subcategories/${this.$route.params.id}`
		);
		this.allSubCategories = resSubCat;

		// Stop the loader
		this.stopLoading();
	},
};
</script>

<style scoped>
.subCategoryButton {
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 2px;
	padding: 15px 4px;
	margin-bottom: 0;
	text-decoration: none;
	font-weight: bold;
}
</style>
