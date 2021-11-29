<template>
	<div class="container wrapper">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-10">
				<div class="card rounded-0 border-0">
					<div class="card-body">
						<div class="card-title text-center border-bottom">
							<h4 class="fw-bold text-uppercase">Add A Package</h4>
						</div>
						<form @submit.prevent="createPackage()" ref="packageForm">
							<!-- Package Name -->
							<div class="mb-3">
								<label for="name" class="form-label fw-bold">Package Name</label>
								<input type="text" v-model="pkg.name" class="form-control" id="name" />

								<Error v-if="validationErrors.name" :messages="validationErrors.name"></Error>
							</div>

							<!-- Categories -->
							<div class="mb-3">
								<label class="form-label fw-bold">Categories</label>
								<select class="form-select" v-model="pkg.category" @change="getSubCategories">
									<option value="">Select Category</option>
									<option v-for="category in categories" :key="category.id" :value="category.id">
										{{ category.name }}
									</option>
								</select>
								<Error v-if="validationErrors.category" :messages="validationErrors.category"></Error>
							</div>

							<!-- SubCategories -->
							<div class="mb-3">
								<label class="form-label fw-bold">Sub Category</label>
								<select class="form-select" v-model="pkg.subCategory">
									<option value="">Select One</option>
									<option v-for="item in subCategories" :key="item.value" :value="item.value">
										{{ item.display }}
									</option>
								</select>
								<Error v-if="validationErrors.subCategory" :messages="validationErrors.subCategory"></Error>
							</div>

							<!-- Image -->
							<div class="mb-3">
								<label class="form-label fw-bold">Image</label>
								<br />
								<input type="file" accept="image/*" @change="onFileChanged" />
								<br />
								<Error v-if="validationErrors.image" :messages="validationErrors.image"></Error>
							</div>

							<!-- Description -->
							<div class="mb-3">
								<label for="description" class="form-label">Description</label>
								<textarea class="form-control" v-model="pkg.description" rows="5"></textarea>
								<Error v-if="validationErrors.description" :messages="validationErrors.description"></Error>
							</div>

							<!-- Tags -->
							<div class="mb-3">
								<label class="form-label fw-bold">Tags</label>
								<multiselect v-model="pkg.tags" tag-placeholder="Search Tags" placeholder="Search Tags" label="name" track-by="id" :options="tags" :multiple="true" :taggable="true"></multiselect>
								<Error v-if="validationErrors.tags" :messages="validationErrors.tags"></Error>
							</div>

							<!-- Price -->
							<div class="mb-3">
								<label for="price" class="form-label fw-bold">Price</label>
								<input type="number" v-model="pkg.price" class="form-control" id="price" min="0" />
								<Error v-if="validationErrors.price" :messages="validationErrors.price"></Error>
							</div>

							<!-- Delivery Within -->
							<div class="mb-3">
								<label for="delivery_within" class="form-label fw-bold">Delivery Within</label>
								<input type="number" v-model="pkg.delivery_within" class="form-control" id="delivery_within" min="0" />
								<div class="fs-7 fst-italic text-grey">In days</div>
								<Error v-if="validationErrors.deliveryWithin" :messages="validationErrors.deliveryWithin"></Error>
							</div>

							<!-- Revision -->
							<div class="mb-3">
								<label for="revision" class="form-label fw-bold">Revision</label>
								<input type="number" v-model="pkg.revision" class="form-control" id="revision" min="0" />
								<div class="fs-7 fst-italic text-grey">
									Leave blank for unlimited revisions
								</div>
								<Error v-if="validationErrors.revision" :messages="validationErrors.revision"></Error>
							</div>

							<!-- Highlights -->
							<div>
								<label for="revision" class="form-label fw-bold">Highlights</label>
								<div class="d-flex">
									<input type="text" class="form-control" placeholder="Highlight" aria-label="Highlight" v-model.trim="highlight" />
									<button class="btn btn-primary rounded-pill px-5 ms-3" @click.prevent="addHighlight">
										Add
									</button>
								</div>
								<ul class="mt-3 px-3">
									<li class="text-primary" v-for="(highlight, index) in pkg.highlights" :key="index">
										{{ highlight }}
									</li>
								</ul>
							</div>

							<!-- Requirements -->
							<div>
								<label for="revision" class="form-label fw-bold">Requirements</label>
								<div class="d-flex">
									<input type="text" class="form-control" placeholder="Requirement" aria-label="Requirement" v-model.trim="requirement" />
									<button class="btn btn-primary rounded-pill px-5 ms-3" @click.prevent="addRequirement">
										Add
									</button>
								</div>
								<ul class="mt-3 px-3">
									<li class="text-primary" v-for="(requirement, index) in pkg.requirements" :key="index">
										{{ requirement }}
									</li>
								</ul>
							</div>

							<div class="d-flex justify-content-between mt-4">
								<button class="
                    text-primary
                    border-0
                    rounded-0
                    bg-transparent
                    px-5
                    fw-bold
                  " @click.prevent="$router.push('/sellers/profile')">
									Cancel
								</button>
								<button type="submit" class="btn btn-outline-primary rounded-pill px-5">
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	middleware: ["auth", "seller"],
	data() {
		return {
			pkg: {
				seller_id: this.$auth.user.id,
				name: null,
				category: "",
				subCategory: "",
				description: null,
				tags: null,
				price: null,
				delivery_within: null,
				revision: null,
				highlights: [],
				requirements: [],
			},
			image: null,
			types: [],
			tags: [],
			categories: [],
			subCategories: [],
			highlight: "",
			requirement: "",
		};
	},

	computed: {
		...mapGetters([
			"validation/validationErrors",
			// ...
		]),
	},

	methods: {
		async createPackage() {
			// Prepare a form data object
			let formData = new FormData();
			// Append the selected file
			formData.append("image", this.image);
			try {
				// Submit the package data
				const responsePkg = await this.$axios.$post(
					"/packages",
					this.pkg
				);

				// Submit the image
				if (this.image) {
					await this.$axios.$post(
						`/packages/${responsePkg.data.id}/image`,
						formData
					);
				}

				// Show the success message
				this.$router.push({ path: "/sellers/dashboard/packages" });
				this.$toast.success("Package created successfully.");
			} catch (error) {
				this.$toast.error("Something went wrong");
				console.log(error);
			}
		},

		async getSubCategories() {
			const response = await this.$axios.$get(
				`/subcategories/${this.pkg.category}`
			);
			this.subCategories = response;
		},

		addHighlight() {
			if (this.highlight) {
				this.pkg.highlights.push(this.highlight);
				this.highlight = null;
			}
		},

		addRequirement() {
			if (this.requirement) {
				this.pkg.requirements.push(this.requirement);
				this.requirement = null;
			}
		},

		onFileChanged(event) {
			this.image = event.target.files[0];
		},
	},

	async fetch() {
		// Get the Job related data
		try {
			const response = await this.$axios.$get("/package-data");
			this.tags = response.tags;
			this.categories = response.categories;
		} catch (error) {
			console.log(errro);
		}
	},
};
</script>


<style lang="scss" scoped>
</style>
