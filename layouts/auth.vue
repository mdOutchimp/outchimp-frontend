<template>
	<div>
		<!-- Header Section -->
		<header class="header">
			<Menu />
		</header>
		<!-- End Header Section -->
		<Nuxt />
	</div>
</template>


<script>
import Menu from "@/components/Layouts/Menu";
import Footer from "@/components/Layouts/Footer";

export default {
	name: "auth",
	middleware: "guest",
	components: {
		Menu,
	},
	async fetch() {
		try {
			await this.$store.dispatch("global/setGlobalState", {
				url: "/config",
			});
		} catch (error) {
			console.error(error);
		}
	},
};
</script>

<style>
.vm--container {
	z-index: 20000 !important;
}

.vm--modal {
	/* overflow: auto !important; */
}

.close {
	position: absolute;
	right: 0;
	top: 0;
}
</style>

