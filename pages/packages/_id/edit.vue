<template>
	<loading-view :loading="isLoading">
		<div class="container wrapper" v-if="pkg">
			<div class="row justify-content-center">
				<div class="col-md-10 col-lg-8">
					<div class="card rounded-0 border-0">
						<div class="card-body">
							<div class="card-title text-center border-bottom">
								<h4 class="fw-bold text-uppercase">Edit Your Package</h4>
							</div>
							<form class="mt-3">
								<!-- Package Name -->
								<div class="mb-3">
									<label for="title" class="form-label fw-bold">Package Name</label>
									<input type="text" class="form-control" id="title" v-model="pkg.name" />
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

								<!-- Description -->
								<div class="mb-3">
									<label for="description" class="form-label fw-bold">Job Description</label>
									<textarea class="form-control" v-model="pkg.description" rows="5"></textarea>
									<Error v-if="validationErrors.description" :messages="validationErrors.description"></Error>
								</div>

								<!-- Image -->
								<div class="mb-3">
									<label class="form-label fw-bold">Image</label>
									<br />
									<input type="file" accept="image/*" @change="onFileChanged" />
									<br />
									<Error v-if="validationErrors.image" :messages="validationErrors.image"></Error>
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
									<input v-model="pkg.price" type="number" class="form-control" id="price" min="0" />
									<Error v-if="validationErrors.price" :messages="validationErrors.price"></Error>
								</div>

								<!-- Delivery Within -->
								<div class="mb-3">
									<label for="delivery_within" class="form-label fw-bold">Delivery Within</label>
									<input type="number" v-model="pkg.deliveryWithin" class="form-control" id="delivery_within" min="0" />
									<div class="fs-7 fst-italic text-grey">In days</div>
									<Error v-if="validationErrors.deliveryWithin" :messages="validationErrors.deliveryWithin"></Error>
								</div>

								<!-- Revision -->
								<div class="mb-3">
									<label for="revision" class="form-label fw-bold">Revision</label>
									<input type="number" class="form-control" id="revision" min="0" v-model="pkg.revision" />
									<div class="fs-7 fst-italic text-grey">
										Leave blank for unlimited revisions
									</div>
									<Error v-if="validationErrors.revision" :messages="validationErrors.revision"></Error>
								</div>

								<!-- Highlights -->
								<div>
									<label for="he" class="form-label fw-bold">Highlights</label>
									<div class="d-flex">
										<input type="text" class="form-control" placeholder="Highlight" aria-label="Highlight" v-model="highlightText" />

										<button class="btn btn-primary rounded-pill px-5 ms-3" @click.prevent="
                        addHighlight(highlightText, highlightIndex)
                      ">
											Add
										</button>
									</div>
									<ul class="mt-3 px-3" v-if="pkg.highlights">
										<li class="text-primary" v-for="(hlight, index) in pkg.highlights" :key="index" @click="
                        (highlightText = hlight), (highlightIndex = index)
                      ">
											{{ hlight }}
											<span class="mx-1" @click.stop="deleteHighlight(deleteIndex)"><i class="fas fa-times"></i></span>
										</li>
									</ul>
								</div>

								<!-- Requirements -->
								<div>
									<label for="requirements" class="form-label fw-bold">Requirements</label>
									<div class="d-flex">
										<input type="text" class="form-control" placeholder="Requirement" aria-label="Requirement" v-model="reqText" />
										<button class="btn btn-primary rounded-pill px-5 ms-3" @click.prevent="addReq(reqText, reqIndex)">
											Add
										</button>
									</div>
									<ul class="mt-3 px-3" v-if="pkg.requirements">
										<li class="text-primary" v-for="req in pkg.requirements" :key="req" @click="reqText = req">
											{{ req }}

											<span class="mx-1" @click.stop="deleteReq(deleteIndex)"><i class="fas fa-times"></i></span>
										</li>
									</ul>
								</div>

								<div class="d-flex justify-content-between mt-4">
									<button class="btn btn-primary rounded-0 px-5" @click.prevent="updatePackage">
										Update
									</button>
									<button class="
                      text-primary
                      border-0
                      rounded-0
                      bg-transparent
                      px-5
                      fw-bold
                    " @click.prevent="$router.push('/sellers/dashboard/packages')">
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</loading-view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	middleware: ["auth", "seller", "verified"],
	data() {
		return {
			pkg: null,
			highlightText: "",
			highlightIndex: null,
			reqText: "",
			reqIndex: null,
			tags: [],
			categories: [],
			subCategories: [],
		};
	},
	methods: {
		async updatePackage() {
			try {
				// Get the package related data
				await this.$axios.$put(
					`/packages/${this.$route.params.id}`,
					this.pkg
				);

				// Show the success message
				this.$toast.success("Package Update successfully.");
				// Data push to router
				this.$router.push({ path: "/sellers/dashboard/packages" });
			} catch (error) {
				this.$toast.error("Something went wrong");
				console.log(error);
			}
		},

		onFileChanged(event) {
			this.image = event.target.files[0];
		},

		async getSubCategories() {
			const response = await this.$axios.$get(
				`/subcategories/${this.pkg.category}`
			);
			this.subCategories = response;
		},

		// Highlight section

		addHighlight(newValue) {
			console.log(newValue);
			this.pkg.highlights.push(newValue);
		},

		deleteHighlight(deleteIndex) {
			this.pkg.highlights.splice(deleteIndex, 1);
		},

		editHighlight(editIndex, newValue) {
			this.pkg.highlights.splice(editIndex, 1, newValue);
		},

		addReq(newValue) {
			console.log(newValue);
			this.pkg.requirements.push(newValue);
		},

		deleteReq(deleteIndex) {
			this.pkg.requirements.splice(deleteIndex, 1);
		},

		editReq(editIndex, newValue) {
			this.pkg.requirements.splice(editIndex, 1, newValue);
		},

		// }
	},

	computed: {
		...mapGetters([
			"validation/validationErrors",
			// ...
		]),
	},

	async fetch() {
		// Get the Job related data
		try {
			// package Response
			const res = await this.$axios.get(
				`/packages/${this.$route.params.id}`
			);
			this.pkg = res.data.data;
			this.stopLoading();
			// Other data
			const response = await this.$axios.$get("/package-data");
			this.tags = response.tags;
			this.categories = response.categories;
		} catch (error) {
			console.log(error);
		}
	},
};
</script>

<style lang="scss" scoped>
</style>
