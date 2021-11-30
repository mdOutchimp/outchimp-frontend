<template>
	<div>
		<nav class="menu fixed-top">
			<div class="menu__container">
				<div class="brand flex-grow-1" v-if="appSettings">
					<NuxtLink to="/">
						<img :src="appSettings.applicationSettings.logo" alt="" style="height: 35px" />
					</NuxtLink>
				</div>
				<ul class="menu__items d-none d-lg-flex">
					<li class="menu__item px-2">
						<NuxtLink to="/jobs">Browse Jobs</NuxtLink>
					</li>
					<template v-for="category in categories">
						<li :key="category.id" class="menu__item px-2" v-if="category.showOnMenu == 1">
							<NuxtLink :to="`/categories/${category.id}`">{{
                category.name
              }}</NuxtLink>
						</li>
					</template>
					<!-- <li class="menu__item px-2">
            <NuxtLink to="/packages?category=videography">Videography</NuxtLink>
          </li> -->
					<li class="menu__item px-2">
						<NuxtLink to="/sellers">Sellers</NuxtLink>
					</li>
					<!-- <li class="menu__item px-2"><NuxtLink to="/blogs">Blog</NuxtLink></li> -->

					<li class="menu__item px-2" v-if="!$auth.loggedIn">
						<a href="javascript:void(0)">Sign In <i class="fas fa-caret-down ms-2"></i>
						</a>
						<ul class="menu-dropdown">
							<li class="menu-dropdown__item">
								<NuxtLink to="/buyers/signin">As a Buyer</NuxtLink>
							</li>
							<li class="menu-dropdown__item">
								<NuxtLink to="/sellers/signin">As a Seller</NuxtLink>
							</li>
						</ul>
					</li>
				</ul>
				<NuxtLink v-if="!$auth.loggedIn" to="/signup" tag="button" class="btn btn-outline-primary px-3 d-none d-lg-block text-decoration-none">
					Join
				</NuxtLink>

				<profile-dropdown v-if="$auth.loggedIn" class="d-none d-lg-flex">
					<img :src="
              $auth.user.profilePicture.length
                ? $auth.user.profilePicture
                : require('@/assets/images/profile.png')
            " alt />
				</profile-dropdown>

				<div class="menu-bar d-block d-lg-none" @click="toggleSidebar">
					<div class="bar1"></div>
					<div class="bar2"></div>
					<div class="bar3"></div>
				</div>
			</div>
		</nav>

		<!-- Sidebar start -->
		<div :class="[sidebar ? 'sidebar d-lg-none show' : 'sidebar d-lg-none']" @click.self="toggleSidebar">
			<div class="sidebar__container">
				<div class="sidebar__profile mt-4 border-bottom" v-if="$auth.loggedIn">
					<div class="sidebar__photo">
						<img :src="
                $auth.user.profilePicture.length
                  ? $auth.user.profilePicture
                  : require('@/assets/images/profile.png')
              " alt />
					</div>
					<ul class="sidebar__links">
						<li class="sidebar__item px-2" v-if="$auth.user.type == 'seller'">
							<NuxtLink to="/sellers/profile">Profile</NuxtLink>
						</li>

						<li class="sidebar__item px-2">
							<NuxtLink to="/sellers/dashboard" v-if="$auth.user.type == 'seller'">Dashboard</NuxtLink>
							<NuxtLink to="/buyers/dashboard" v-if="$auth.user.type == 'buyer'">Dashboard</NuxtLink>
						</li>
						<li class="sidebar__item px-2">
							<NuxtLink to="/sellers/chat" v-if="$auth.user.type == 'seller'">Messages</NuxtLink>
							<NuxtLink to="/buyers/chat" v-if="$auth.user.type == 'buyer'">Messages</NuxtLink>
						</li>
						<li class="sidebar__item px-2">
							<NuxtLink to="/jobs/create" v-if="$auth.user.type == 'buyer'">Post A Job</NuxtLink>
							<NuxtLink to="/packages/create" v-if="$auth.user.type == 'seller'">Create Package</NuxtLink>
						</li>

						<li class="sidebar__item px-2" v-if="$auth.user.type == 'seller'">
							<NuxtLink to="/sellers/withdraw">Withdraw</NuxtLink>
						</li>

						<li class="sidebar__item px-2">
							<a href="javascript:void(0)" @click.prevent="sellerLogout()" v-if="$auth.user.type == 'seller'">Logout</a>
							<a href="javascript:void(0)" @click.prevent="buyerLogout()" v-if="$auth.user.type == 'buyer'">Logout</a>
						</li>
					</ul>
				</div>
				<ul class="sidebar__links">
					<li class="sidebar__item px-2">
						<NuxtLink to="/jobs">Browse Jobs</NuxtLink>
					</li>

					<template v-for="category in categories">
						<li :key="category.id" class="sidebar__item px-2" v-if="category.showOnMenu">
							<NuxtLink :to="`/categories/${category.id}`">{{
                category.name
              }}</NuxtLink>
						</li>
					</template>

					<!-- <li class="sidebar__item px-2">
            <NuxtLink to="/packages?category=videography">Videography</NuxtLink>
          </li> -->
					<li class="sidebar__item px-2">
						<NuxtLink to="/sellers">Sellers</NuxtLink>
					</li>

					<li class="sidebar__item px-2" v-if="!$auth.loggedIn" role="button" @click.self="toggleDropdown($event)">
						<a href="javascript:void(0)" style="pointer-events: none">Sign In <i class="fas fa-caret-down ms-auto"></i></a>

						<ul class="sidebar-dropdown">
							<li class="sidebar-dropdown__item">
								<NuxtLink to="/buyers/signin">As a Buyer</NuxtLink>
							</li>
							<li class="sidebar-dropdown__item">
								<NuxtLink to="/sellers/signin">As a Seller</NuxtLink>
							</li>
						</ul>
					</li>
				</ul>

				<div class="px-3 py-2 mb-3">
					<NuxtLink tag="button" v-if="!$auth.loggedIn" to="/signup" class="btn btn-primary w-100 rounded-pill text-white">
						Join
					</NuxtLink>
				</div>
			</div>
		</div>
		<!-- Sidebar end -->
	</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			sidebar: false,
			categories: [],
		};
	},

	computed: {
		...mapGetters({
			appSettings: ["settings/getSettings"],
		}),
	},

	methods: {
		toggleSidebar() {
			this.sidebar = !this.sidebar;
		},
		toggleDropdown({ target }) {
			const dropdown = target.querySelector(".sidebar-dropdown");
			dropdown.classList.toggle("show");
			if (dropdown.classList.contains("show")) {
				dropdown.style.height = `${dropdown.scrollHeight}px`;
			} else {
				dropdown.style.height = "0px";
			}
		},

		buyerLogout() {
			this.$auth.logout("local2");
		},
		sellerLogout() {
			this.$auth.logout("local");
		},
	},
	// fetching categories
	async fetch() {
		const rescategories = await this.$axios.$get("/categories");
		this.categories = rescategories.data;
	},
};
</script>
<style lang="scss">
a.NuxtLink-exact-active {
	color: #1dbf73 !important;
}

.sidebar {
	&__profile {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__photo {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}
</style>
