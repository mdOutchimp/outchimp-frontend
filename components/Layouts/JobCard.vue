<template>
	<div class="card border-0 rounded-0 p-4 job-card">
		<div class="row">
			<div class="col-md-8 d-flex flex-column">
				<div class="mb-2">
					<h5 class="d-inline-block job-card__title fw-bold">
						<NuxtLink :to="`jobs/${job.id}`" class="text-black text-decoration-none">{{ job.title }}
						</NuxtLink>
					</h5>

					<small class="mx-2" v-if="job.daysLeft > 0">{{ job.daysLeft }} days left</small>
					<!-- <span class="badge rounded-pill bg-primary">Featured</span> -->
				</div>
				<client-only>
					<p class="text-justify" v-html="$options.filters.truncate(job.description, 150)"></p>
				</client-only>
				<div class="mt-auto">
					<span class="badge border border-primary text-primary rounded-pill me-1 mt-1" v-for="skill in job.skills" :key="skill.id">{{ skill.name }}</span>
					<!-- <a href="#">Logo Design</a> -->
				</div>
			</div>
			<div class="col-md-4 d-flex flex-column align-items-start align-items-md-end mt-3 mt-md-0">
				<div class="mb-2">
					<h6 class="d-inline-block fw-bold" v-if="job.type == 'fixed'">
						{{ job.budget | currency }}
					</h6>
					<h6 class="d-inline-block fw-bold" v-if="job.type == 'hourly'">
						{{ job.budget | currency }} - {{ job.budget | currency }}
					</h6>
					<small>{{ job.type | capitalize }}</small>
				</div>
				<div class="">
					<h6 class="d-inline-block fw-bold">{{ job.totalBids }}</h6>
					<small>Bids</small>
				</div>
				<div class="mt-2">
					<NuxtLink :to="`jobs/${job.id}`" class="btn btn-outline-primary rounded-pill py-2 px-3 text-decoration-none">
						View Details
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		job: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
