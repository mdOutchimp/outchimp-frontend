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

export default {
	name: "auth",
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
</style>

