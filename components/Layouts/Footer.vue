<template>
	<!-- Footer Section -->
	<footer class="footer">
		<div class="container">
			<div class="row pt-5">
				<div class="col-6 col-md-3 mb-3 mb-md-0">
					<h5 class="fw-bold text-white">Categories</h5>
					<ul class="footer-widget">
						<template v-for="category in categories">
							<li :key="category.id" class="" v-if="category.showOnMenu == 1">
								<NuxtLink :to="`/categories/${category.id}`" class="text-grey text-decoration-none">{{category.name}}</NuxtLink>
							</li>
						</template>
					</ul>
				</div>
				<div class="col-6 col-md-3 mb-3 mb-md-0">
					<h5 class="fw-bold text-white">About</h5>
					<ul class="footer-widget">
						<li>
							<NuxtLink to="/about/privacy-policy" class="text-grey text-decoration-none">Privacy Policy</NuxtLink>
						</li>

						<li>
							<NuxtLink to="/about/terms-and-conditions" class="text-grey text-decoration-none">Terms & Conditions</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/about/payment-policy" class="text-grey text-decoration-none">Payment Policy</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/about/refund-policy" class="text-grey text-decoration-none">Refund Policy</NuxtLink>
						</li>
					</ul>
				</div>

				<div class="col-6 col-md-3 mb-3 mb-md-0">
					<h5 class="fw-bold text-white">Community</h5>
					<ul class="footer-widget">
						<li>
							<a href="#" class="text-grey text-decoration-none">Forum</a>
						</li>
						<li>
							<a href="#" class="text-grey text-decoration-none">Invite a Friend</a>
						</li>
						<li>
							<a href="#" class="text-grey text-decoration-none">Become a Seller</a>
						</li>
					</ul>
				</div>
				<div class="col-6 col-md-3 mb-3 mb-md-0">
					<h5 class="fw-bold text-white">Support</h5>
					<ul class="footer-widget">
						<li>
							<nuxt-link to="/support/help-and-support" class="text-grey text-decoration-none">Help & Support</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/support/selling-guide" class="text-grey text-decoration-none">Selling Guide</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/support/buying-guide" class="text-grey text-decoration-none">Buying Guide</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/support/trust-and-safety" class="text-grey text-decoration-none">Trust & Safety</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="row border-top p-3">
				<div class="col-sm-6 footer__copyright" v-if="mySettings">
					<h4 class="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
						<NuxtLink to="/" class="text-decoration-none text-grey">
							{{ mySettings.websiteSettings.settings.footer }}
						</NuxtLink>
					</h4>
				</div>
				<div class="col-sm-6 footer__social">
					<h4 class="d-flex justify-content-center justify-content-md-end">
						<a class="text-decoration-none text-grey" href="#"><i class="fab fa-facebook"></i></a>
						<a class="text-decoration-none text-grey" href="#"><i class="fab fa-twitter"></i></a>
						<a class="text-decoration-none text-grey" href="#"><i class="fab fa-linkedin"></i></a>
						<a class="text-decoration-none text-grey" href="#"><i class="fab fa-instagram"></i></a>
					</h4>
				</div>
			</div>
		</div>
	</footer>
	<!-- End Footer Section -->
</template>
<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters({
			mySettings: ["settings/getSettings"],
			categories: "global/getMenuCategories",
		}),
	},
};
</script>
<style lang="scss">
.footer {
	min-height: auto;
}
</style>
