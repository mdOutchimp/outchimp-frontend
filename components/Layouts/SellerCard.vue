<template>
	<!-- Single Freelancer -->
	<div class="card border-0 rounded-0 p-4 job-card">
		<div class="row">
			<div class="col-md-9">
				<div class="d-flex flex-column align-items-start flex-md-row align-items-md-center">
					<div class="me-3">
						<img :src="img" class="rounded-circle d-block" style="max-width: 150px" />
					</div>
					<div class="mt-2 mt-md-0">
						<h5 class="d-inline-block job-card__title fw-bold">
							<NuxtLink :to="`/sellers/${id}`" class="text-black text-decoration-none">{{ name }}
							</NuxtLink>
						</h5>
						<p class="text-justify fw-light mb-1">{{ jobTitle }}</p>
						<p class="text-justify mt-2 fw-4">
							<i class="fas fa-map-marked text-primary fs-5 fa-fw"></i>
							{{ location }}
						</p>
						<div>
							<span class="badge border border-primary text-primary rounded-pill me-2 mt-2" v-for="(skill, index) in skills" :key="index">{{ skill.name }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3 d-flex flex-column justify-content-center align-items-start align-items-md-end mt-3 mt-md-0">
				<div class="mb-2">
					<h5 class="d-inline-block fw-bold">৳{{ perHour }}</h5>
					<small>/Hour</small>
				</div>
				<div class>
					<i class="fas fa-star text-primary fs-5 fa-fw"></i>
					<h5 class="d-inline-block fw-bold">{{ rating }}</h5>
					<small>({{ reviews }})</small>
				</div>
				<div class="mt-2">
					<NuxtLink :to="`/sellers/${id}`" class="btn btn-outline-primary text-decoration-none rounded-pill px-4 mt-2">
						View
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		id: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},

		img: {
			type: String,
			required: true,
		},

		jobTitle: {
			title: String,
			required: true,
		},

		location: {
			type: String,
			required: true,
		},

		skills: {
			type: Array,
			required: true,
		},

		perHour: {
			type: Number,
			required: true,
		},

		rating: {
			type: [Number, String],
		},

		reviews: {
			type: [Number, String],
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
