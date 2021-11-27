<template>
  <loading-tab-view :loading="isLoading">
    <div class="">
      <!--Jobs Section -->
      <div class="card border-0 rounded-0 shadow-sm mt-3">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="mb-0 fw-bold">All Jobs</h5>
          </div>
        </div>
      </div>
      <div
        class="card border-0 rounded-0 shadow-sm p-3 mt-2"
        v-for="job in laravelData.data"
        :key="job.id"
      >
        <div class="row">
          <div class="d-sm-flex justify-content-between">
            <nuxt-link class="text-decoration-none" :to="`/jobs/${job.id}`">
              <h6 class="fw-bold fs-5 mb-0">
                {{ job.title }}
              </h6>
            </nuxt-link>
            <span
              class="d-inline-block fw-bold fs-7 mt-1 mt-sm-0"
              v-if="job.type == 'fixed'"
            >
              {{ job.budget | currency }}
            </span>
            <span
              class="d-inline-block fw-bold fs-7 mt-1 mt-sm-0"
              v-if="job.type == 'hourly'"
            >
              {{ job.budget | currency }} -
            </span>
          </div>
        </div>

        <div class="row mt-3">
          <div class="d-sm-flex align-items-center justify-content-between">
            <div class="d-sm-flex align-items-center">
              <span class="d-flex align-items-center text-darkgrey">
                <i class="fas fa-calendar-alt fs-8"></i>
                <span class="fw-bold fs-8 mb-0 ms-1">{{ job.postDate }}</span>
              </span>

              <span
                class="d-flex align-items-center text-darkgrey ms-0 ms-sm-3 mt-1 mt-sm-0"
              >
                <i class="fas fa-calendar-alt fs-8"></i>
                <span class="fw-bold fs-8 mb-0 ms-1"
                  >Expire {{ job.expireDate }}</span
                >
              </span>

              <span
                class="d-flex align-items-center text-darkgrey ms-0 ms-sm-3 mt-1 mt-sm-0 text-primary"
              >
                <i class="fas fa-business-time fs-8"></i>
                <span class="fw-bold fs-8 mb-0 ms-1">{{
                  job.status.toUpperCase()
                }}</span>
              </span>
            </div>

            <div>
              <nuxt-link
                class="fs-7 text-end fw-bold mt-2 mt-sm-0 mt-lg-auto text-decoration-none btn btn-sm btn-outline-primary rounded-pill px-4"
                :to="`/jobs/${job.id}/details`"
                >View</nuxt-link
              >
              <nuxt-link
                class="fs-7 text-end fw-bold mt-2 mt-sm-0 mt-lg-auto text-decoration-none btn btn-sm btn-outline-secondary rounded-pill px-4"
                :to="`/jobs/${job.id}/edit`"
                v-if="job.status.toUpperCase() === 'DRAFT'"
                >Edit</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Job Section ends -->

      <pagination
        class="mt-5 d-none d-md-flex"
        :limit="3"
        :data="laravelData"
        @pagination-change-page="getResults"
      ></pagination>
      <pagination
        class="mt-5 d-flex d-md-none"
        :limit="-1"
        :data="laravelData"
        @pagination-change-page="getResults"
      ></pagination>
    </div>
  </loading-tab-view>
</template>

<script>
export default {
  data() {
    return {
      laravelData: {},
    };
  },
  methods: {
    // Our method to GET results from a Laravel endpoint
    getResults(page = 1) {
      this.$axios
        .$get("/jobs/buyers/" + this.$auth.user.id + "?page=" + page)
        .then((response) => {
          this.laravelData = response;
          console.log(response);
          this.stopLoading();
        });
    },
  },
  mounted() {
    this.getResults();
  },
};
</script>

<style lang="scss" scoped></style>
