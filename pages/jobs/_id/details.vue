<template>
	<loading-view :loading="isLoading">
		<div v-if="job">
			<!-- Page Header -->
			<page-header>
				<div class="col-md-8 d-flex flex-column">
					<div class="text-white">
						<i class="fas fa-clock"></i>
						<span>Posted {{ job.postedAt }} </span>
						<span>|</span>
						<span class="me-2">{{ job.daysLeft }} days left</span>
						<span class="badge bg-primary rounded-pill">{{
              job.status.toUpperCase()
            }}</span>
					</div>
					<h3 class="text-white fw-bold mt-2">{{ job.title }}</h3>
					<h5 class="text-white">
						<span>{{ job.type | capitalize }}</span>
						<span>|</span>
						<span>Budget {{ job.budget | currency }}</span>
					</h5>
				</div>
				<div class="col-md-4 justify-content-end d-flex text-md-end" v-if="$auth.loggedIn">
					<NuxtLink class="btn btn-primary px-4 me-2 text-decoration-none" v-if="$auth.user.type == 'seller'" :to="`/bids/create?job=${job.id}`">
						<span>Bid Now</span>
					</NuxtLink>
					<button class="btn btn-primary" @click="handleStatusChange('open')" v-if="job.status == 'draft' || job.status == 'closed'">
						Open Job
					</button>
					<button class="btn btn-danger text-white" @click="handleStatusChange('closed')" v-if="job.status == 'open'">
						Close Job
					</button>
					<button v-if="$auth.loggedIn && $auth.user.type === 'seller'" class="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Save as favourite">
						<i class="fas fa-star fa-outline"></i>
					</button>
				</div>
			</page-header>
			<!-- End Page Header -->

			<section class="section-padding">
				<div class="container">
					<div class="row">
						<!-- Left Side -->
						<div class="col-md-8">
							<div class="card border-0 rounded-0">
								<div class="card-body p-4">
									<div>
										<h5 class="fw-bold d-flex flex-grow-1">Description</h5>
										<div class="description" v-html="job.description"></div>
										<edit-job-description v-if="editDesc" @close="editDesc = false"></edit-job-description>
									</div>

									<div class="mt-3">
										<h5 class="fw-bold d-flex flex-grow-1">Attachments</h5>
										<div v-if="job.attachments.length">
											<a v-for="(attachment, index) in job.attachments" :key="index" :href="attachment.url" target="_blank" class="text-decoration-none text-black d-block"><i class="fas fa-file fa-fw"></i>
												<span>{{ attachment.name }}</span></a>
										</div>
										<div class="text-grey text-center" v-else>
											No Attachments Added
										</div>

										<edit-attachment v-if="editAttachments" @close="editAttachments = false"></edit-attachment>
									</div>

									<div class="mt-3">
										<h5 class="fw-bold">Category</h5>
										<span class="mt-2 text-primary border border-primary px-5 py-2 rounded-pill d-inline-block">
											{{ job.category.name }}
										</span>
									</div>

									<div class="mt-3">
										<h5 class="fw-bold">Skills</h5>
										<span href="#" class="badge border border-primary text-primary rounded-pill px-3 me-2 mt-2" v-for="skill in job.skills" :key="skill.id">{{ skill.name }}
										</span>
									</div>

									<div class="mt-3">
										<a href="#" class="text-decoration-none text-black me-3"><i class="fas fa-share-alt fa-fw text-primary"></i>
											<span>Share this Job</span></a>
										<a href="#" class="text-decoration-none text-black"><i class="fas fa-flag fa-fw text-primary"></i>
											<span>Report this Job</span></a>
									</div>
								</div>
							</div>
							<div class="card mt-4 rounded-0 border-0">
								<div class="card-body">
									<h5>Latest Bids</h5>
								</div>
							</div>
						</div>

						<!-- Right Side -->
						<div class="col-md-4 mt-4 mt-md-0">
							<div class="card border-0 rounded-0">
								<div class="card-body p-4">
									<h5 class="fw-bold">Other Jobs From You.</h5>

									<ul class="ps-3 mt-3" v-if="relatedJobs.length">
										<li class="lh-lg" v-for="singleJob in buyerJobs" :key="singleJob.id">
											<NuxtLink class="text-decoration-none" :to="'/jobs/' + singleJob.id">{{ singleJob.title }}</NuxtLink>
										</li>
									</ul>
									<div class="text-grey" v-else>No jobs found</div>
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
import EditJobDescription from "@/components/Profiles/Buyer/EditJobDescription.vue";
import EditAttachment from "@/components/Profiles/Buyer/EditAttachment.vue";
export default {
	validate({ params }) {
		// Must be a number
		return /^\d+$/.test(params.id);
	},
	data() {
		return {
			job: null,
			relatedJobs: [],
			// Edit status
			editDesc: false,
			editAttachments: false,
		};
	},
	components: {
		EditJobDescription,
		EditAttachment,
	},
	methods: {
		async handleStatusChange(value) {
			try {
				const res = await this.$axios.$post(
					`jobs/${this.$route.params.id}/update-status`,
					{
						status: value,
					}
				);
				this.job = res.data;
				this.$toast.success("Job status updated");
			} catch (error) {
				this.$toast.error("Something went wrong");
			}
		},
	},
	computed: {
		buyerJobs() {
			return this.relatedJobs.filter((job) => job.id !== this.job.id);
		},
		jobSkills() {
			return this.job.skills.map((skill) => skill.name);
		},
	},

	async fetch() {
		// Get the job
		const response = await this.$axios.$get(
			`jobs/${this.$route.params.id}`
		);
		this.job = response.data;

		// Get the related jobs
		this.relatedJobs = await this.$axios.$get(
			`jobs/buyers/${this.job.buyer.id}?limit=5`
		);
		this.stopLoading();
	},

	async mounted() {},
};
</script>

<style lang="scss" scoped></style>
