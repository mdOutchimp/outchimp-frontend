<template>
	<loading-view :loading="isLoading">
		<div>
			<page-header>
				<div class="col-lg-6 d-flex flex-column align-items-center align-items-lg-start mb-3 mb-lg-0">
					<h1 class="text-white fw-bold">
						{{ appSettings.websiteSettings.settings.jobs_page_title }}
					</h1>
					<h5 class="text-white">
						{{ appSettings.websiteSettings.settings.jobs_page_subtitle }}
					</h5>
				</div>
				<div class="col-lg-6 text-center text-lg-end">
					<img src="@/assets/svgs/job-hunt.svg" alt="" />
				</div>
			</page-header>
			<search-bar v-model="search" @search="getResults" />

			<!-- Job List -->
			<section class="section-padding">
				<div class="container">
					<div class="mb-3">
						<div class="row">
							<div class="col-6">
								<span class="me-2"><i class="fas fa-list text-primary"></i></span>
								<select name="" id="" class="border-0 bg-transparent outline-none">
									<option value="">Newest First</option>
									<option value="">Lowest Budget First</option>
									<option value="">Highest Budget First</option>
									<option value="">Lowest Bids First</option>
									<option value="">Highest Bids First</option>
								</select>
							</div>
							<div class="col-6 d-flex d-lg-none justify-content-end">
								<a @click.prevent="showFilter = true" type="button" class="text-decoration-none text-black">
									<i class="fas fa-filter fa-fw text-primary"></i>
									<span class="me-2">Filters</span>
									<i class="fas fa-angle-down"></i>
								</a>
							</div>
						</div>
					</div>
					<job-filter :filter="filter" :skills="skills" :types="types" :categories="categories" v-if="showFilter" @close="showFilter = false" @save="saveFilter"></job-filter>
					<div class="row">
						<div class="col-lg-9" v-if="laravelData.data && laravelData.data.length">
							<!-- Single Job -->
							<job-card v-for="job in laravelData.data" :key="job.id" :job="job"></job-card>
						</div>
						<div class="col-lg-9 mt-5" v-else>
							<h5 class="text-center text-grey">Sorry, No Data Found</h5>
						</div>

						<div class="d-none d-lg-block col-lg-3">
							<div class="card p-3 rounded-0 border-0">
								<h5 class="fw-bold">Filter By:</h5>
								<div class="mt-3">
									<h6 class="fw-bold">Type</h6>
									<div class="mt-3">
										<checkbox value="hourly" v-model="filter.types">
											Hourly
										</Checkbox>
									</div>
									<div class="mt-3">
										<checkbox value="fixed" v-model="filter.types">
											Fixed
										</Checkbox>
									</div>
								</div>

								<div class="mt-3">
									<h6 class="fw-bold">Category</h6>
									<div class="mt-3" v-for="category in categories" :key="category.id">
										<checkbox :value="category.id" v-model="filter.categories">{{ category.name }}</Checkbox>
									</div>
								</div>

								<div class="mt-3">
									<h6 class="fw-bold">Skills</h6>
									<div class="mb-3" v-if="filter.skills.length">
										<span class="badge border border-primary text-primary rounded-pill py-1 me-1 px-2 mt-1" v-for="(skill, index) in filter.skills" :key="index" role="button" @click="removeSkill(index)">{{ skill }}
											<span class="ms-2">&#10006;</span>
										</span>
									</div>
									<multiselect-filter :options="skills" @input="filterSkill"></multiselect-filter>
								</div>
							</div>
						</div>
					</div>

					<pagination class="mt-5 d-none d-md-flex" :limit="3" :data="laravelData" @pagination-change-page="getResults"></pagination>
					<pagination class="mt-5 d-flex d-md-none" :limit="-1" :data="laravelData" @pagination-change-page="getResults"></pagination>
				</div>
			</section>
		</div>
	</loading-view>
</template>

<script>
import { mapGetters } from "vuex";
import JobFilter from "@/components/Filters/JobFilter";

export default {
	data() {
		return {
			laravelData: {},
			types: [],
			skills: [],
			categories: [],
			search: "",
			showFilter: false,
			filter: {
				types: [],
				categories: [],
				skills: [],
			},
		};
	},
	computed: {
		...mapGetters({
			appSettings: ["settings/getSettings"],
		}),
	},

	components: {
		JobFilter,
	},

	watch: {
		filter: {
			deep: true,
			handler() {
				this.getResults();
			},
		},
	},
	methods: {
		removeSkill(index) {
			this.filter.skills.splice(index, 1);
		},
		saveFilter(value) {
			this.filter = value;
			this.showFilter = false;
		},
		filterSkill(selectedOption) {
			if (selectedOption) {
				this.filter.skills.push(selectedOption.name);
			}
		},
		// Our method to GET results from a Laravel endpoint
		getResults(page = 1) {
			this.$axios
				.$get(
					"/jobs?page=" +
						page +
						"&title=" +
						this.search +
						"&types=" +
						this.filter.types +
						"&categories=" +
						this.filter.categories +
						"&skills=" +
						this.filter.skills
				)
				.then((response) => {
					this.laravelData = response;
				});
		},
	},
	mounted() {
		// Fetch initial results
		this.getResults();
		this.stopLoading();
	},

	async fetch() {
		const response = await this.$axios.$get("/job-data");
		// console.log(response);
		this.types = response.types;
		this.skills = response.skills;
		this.categories = response.categories;
	},
};
</script>

<style lang=""></style>
