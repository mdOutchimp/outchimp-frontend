<template>
  <div class="container wrapper">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <div class="card rounded-0 border-0">
          <div class="card-body">
            <div class="card-title text-center border-bottom">
              <h4 class="fw-bold text-uppercase">Submit Your Proposal</h4>
            </div>
            <form class="mt-3" @submit.prevent="save">
              <!-- Bid Amount -->
              <div class="mb-3">
                <label for="from" class="form-label">Bid Amount</label>
                <input
                  type="number"
                  v-model.trim="bid.amount"
                  class="form-control"
                  id="from"
                  min="0"
                />
                <Error
                  v-if="validationErrors.amount"
                  :messages="validationErrors.amount"
                ></Error>
              </div>
              <!-- Required Days -->
              <div class="mb-3">
                <label for="from" class="form-label">Required Days</label>
                <input
                  type="number"
                  v-model.trim="bid.required_days"
                  class="form-control"
                  id="from"
                  min="0"
                />
                <Error
                  v-if="validationErrors.required_days"
                  :messages="validationErrors.required_days"
                ></Error>
              </div>

              <!-- Description -->
              <div class="mb-3">
                <label for="description" class="form-label"
                  >Bid Description</label
                >
                <textarea
                  class="form-control"
                  v-model.trim="bid.description"
                  rows="5"
                ></textarea>
                <Error
                  v-if="validationErrors.description"
                  :messages="validationErrors.description"
                ></Error>
              </div>

              <!-- Attachments -->
              <div class="mb-3">
                <label class="form-label fw-bold">Attachments</label>
                <br />
                <input type="file" @change="onFileChanged" multiple />
                <br />
                <div></div>
                <Error
                  v-if="validationErrors.attachments"
                  :messages="validationErrors.attachments"
                ></Error>
              </div>

              <div class="d-flex justify-content-between mt-4">
                <NuxtLink
                  :to="`/jobs/${this.$route.query.job}`"
                  class="text-primary border-0 rounded-0 bg-transparent px-5 fw-bold text-decoration-none"
                >
                  Cancel
                </NuxtLink>

                <button type="submit" class="btn btn-primary rounded-0 px-5">
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
  middleware: ["seller"],

  data() {
    return {
      job: null,
      bid: {
        job_id: null,
        seller_id: this.$auth.user.id,
        required_days: "",
        description: "",
      },
      attachments: {},
    };
  },

  computed: {
    ...mapGetters([
      "validation/validationErrors",
      // ...
    ]),
  },

  methods: {
    onFileChanged(event) {
      this.attachments = event.target.files;
    },

    async save() {
      // Prepare the attachments for submit
      const formData = new FormData();
      for (const i of Object.keys(this.attachments)) {
        formData.append(`attachments[${i}]`, this.attachments[i]);
      }

      // Prepare the data for submit
      for (const i of Object.keys(this.bid)) {
        formData.append(i, this.bid[i]);
      }
      try {
        // Get the Job related data
        const response = await this.$axios.$post("/bids", formData);
        // Show success messages
        this.$toast.success("Bid created successfully");
        this.$router.push({ path: "/sellers/dashboard" });
      } catch (error) {
        console.log(error);
        this.$toast.error("Something went wrong");
      }
    },
  },

  validate({ query }) {
    // Must be a number
    return query && /^\d+$/.test(query.job);
  },

  async fetch() {
    const res = await this.$axios.$get("/jobs/" + this.$route.query.job);
    this.job = res.data;
    this.bid.job_id = this.job.id;
  },
};
</script>

<style lang="scss" scoped>
</style>
