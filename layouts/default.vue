<template>
	<div>
		<!-- Header Section -->
		<header class="header">
			<Menu />
		</header>
		<!-- End Header Section -->
		<Nuxt />

		<Footer></Footer>
	</div>
</template>


<script>
import Menu from "@/components/Layouts/Menu";
import Footer from "@/components/Layouts/Footer";

export default {
	name: "default",
	components: {
		Menu,
		Footer,
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

<style lang='scss'>
.vm--container {
	z-index: 20000 !important;
}

.vm--modal {
	/* overflow: auto !important; */
}

.header .sidebar {
	z-index: 1000 !important;
}

.close {
	position: absolute;
	right: 0;
	top: 0;
}

.wrapper {
	min-height: 100vh;
	margin-top: 60px;
	padding: 2rem 0;
}

.btn-danger-outline:hover {
	color: white !important;
}

.modal {
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 2000;
	display: flex;
	align-items: center;
	justify-content: center;
	color: black;

	&__content {
		max-width: 600px;
		width: 100%;
		background: white;
	}

	&__header {
		padding: 1rem;
		border-bottom: 1px solid #d5d5d5;
	}

	&__body {
		padding: 1rem;
		max-height: 600px;
		overflow: auto;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	&__footer {
		padding: 1rem;
		border-top: 1px solid #d5d5d5;
	}
}
</style>

