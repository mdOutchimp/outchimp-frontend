<template>
  <div class="container wrapper">
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
        <div class="card rounded-0 border-0">
          <div class="card-body">
            <div class="card-title text-center border-bottom">
              <h4 class="fw-bold text-uppercase">Post A Job</h4>
            </div>
            <form class="mt-3" @submit.prevent="createJob()">
              <!-- Job Title -->
              <div class="mb-3">
                <label for="title" class="form-label">Job Title</label>
                <input
                  type="text"
                  v-model="job.title"
                  class="form-control"
                  id="title"
                />

                <Error
                  v-if="validationErrors.title"
                  :messages="validationErrors.title"
                ></Error>
              </div>

              <!-- Description -->
              <div class="mb-3">
                <label for="description" class="form-label"
                  >Job Description</label
                >
                <textarea
                  class="form-control"
                  v-model="job.description"
                  rows="5"
                ></textarea>
                <Error
                  v-if="validationErrors.description"
                  :messages="validationErrors.description"
                ></Error>
              </div>

              <!-- Job Type -->
              <div class="mb-3">
                <label for="type" class="form-label">Job Type</label>
                <multiselect
                  placeholder="Select Job Type"
                  label="name"
                  track-by="value"
                  :options="types"
                  v-model="job.type"
                >
                </multiselect>
                <Error
                  v-if="validationErrors.type"
                  :messages="validationErrors.type"
                ></Error>
              </div>

              <!-- Categories -->
              <div class="mb-3">
                <label class="form-label">Categories</label>
                <multiselect
                  v-model="job.category"
                  tag-placeholder="Search Category"
                  placeholder="Search Category"
                  label="name"
                  track-by="id"
                  :options="categories"
                ></multiselect>
                <Error
                  v-if="validationErrors.category"
                  :messages="validationErrors.category"
                ></Error>
              </div>

              <!-- Skills -->
              <div class="mb-3">
                <label class="form-label">Skills</label>
                <multiselect
                  v-model="job.skills"
                  tag-placeholder="Search Skills"
                  placeholder="Search Skills"
                  label="name"
                  track-by="id"
                  :options="skills"
                  :multiple="true"
                  :taggable="true"
                ></multiselect>
                <Error
                  v-if="validationErrors.skills"
                  :messages="validationErrors.skills"
                ></Error>
              </div>

              <!-- Budget From -->
              <div class="mb-3" v-if="job.type">
                <label for="from" class="form-label">Budget</label>
                <input
                  type="number"
                  v-model="job.budget"
                  class="form-control"
                  id="from"
                  min="0"
                />
                <Error
                  v-if="validationErrors.budget"
                  :messages="validationErrors.budget"
                ></Error>
              </div>

              <!-- Apply Within -->
              <div class="mb-3">
                <label for="from" class="form-label">Apply Within</label>
                <client-only>
                  <date-picker
                    placeholder="MM/DD/YYYY"
                    format="MM/dd/yyyy"
                    input-class="form-control bg-white"
                    v-model="job.apply_within"
                  />
                </client-only>
                <Error
                  v-if="validationErrors.apply_within"
                  :messages="validationErrors.apply_within"
                ></Error>
              </div>

              <!-- Deadline -->
              <div class="mb-3">
                <label for="from" class="form-label">Deadline</label>
                <client-only>
                  <date-picker
                    placeholder="MM/DD/YYYY"
                    format="MM/dd/yyyy"
                    input-class="form-control bg-white"
                    v-model="job.deadline"
                  />
                </client-only>
                <Error
                  v-if="validationErrors.deadline"
                  :messages="validationErrors.deadline"
                ></Error>
              </div>

              <!-- Attachments -->
              <div class="mb-3">
                <label class="form-label fw-bold">Attachments</label>
                <br />
                <input type="file" @change="onFileChanged" multiple />
                <br />
              </div>

              <div class="d-flex justify-content-between mt-4">
                <button type="submit" class="btn btn-primary rounded-0 px-5">
                  Save
                </button>
                <nuxt-link
                  to="/buyers/dashboard"
                  class="text-primary border-0 rounded-0 bg-transparent px-5 fw-bold text-decoration-none"
                >
                  Cancel
                </nuxt-link>
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
  middleware: ["buyer"],
  data() {
    return {
      job: {
        title: null,
        category: null,
        description: null,
        type: null,
        skills: null,
        budget: 0,
        apply_within: null,
        deadline: null,
      },
      attachments: null,
      types: [],
      skills: [],
      categories: [],
    };
  },

  computed: {
    ...mapGetters([
      "validation/validationErrors",
      // ...
    ]),
  },

  methods: {
    async createJob() {
      // Prepare the attachments for sumit
      let formData = {};
      if (this.attachments) {
        formData = new FormData();
        for (const i of Object.keys(this.attachments)) {
          formData.append("attachments-" + i, this.attachments[i]);
        }
      }
      try {
        // Get the Job related data
        const response = await this.$axios.$post("/jobs", this.job);
        // Submit the attachments
        await this.$axios.$post(
          `/jobs/${response.data.id}/attachments`,
          formData
        );

        // Show success messages
        this.$toast.success("Job created succfully");
        this.$router.push({ path: "/buyers/dashboard" });
      } catch (error) {
        console.log(error);
        this.$toast.error("Something went wrong");
      }
    },

    capitalize(value) {
      value.toLowerCase().split(" ");
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    onFileChanged(event) {
      this.attachments = event.target.files;
    },
  },

  async fetch() {
    // Get the Job related data
    const response = await this.$axios.$get("/job-data");
    // console.log(response);
    this.types = response.types;
    this.skills = response.skills;
    this.categories = response.categories;
  },
};
</script>

<style>
</style>
