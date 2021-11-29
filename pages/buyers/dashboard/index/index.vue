<template>
  <loading-tab-view :loading="isLoading">
    <div>
      <!-- 3 cards -->
      <div class="row g-3">
        <div class="col">
          <div
            class="py-3 px-2 bg-white border-0 shadow-sm d-flex align-items-center justify-content-center"
          >
            <i class="fas fa-briefcase fs-3 text-primary"></i>
            <div class="ms-3">
              <h6>Active Jobs</h6>
              <h5 class="fs-5 fw-bold mb-0">{{ dashboardData.activeJobs }}</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div
            class="py-3 px-2 bg-white border-0 shadow-sm d-flex align-items-center justify-content-center"
          >
            <i class="fas fa-envelope fs-3 text-primary"></i>
            <div class="ms-3">
              <NuxtLink to="/buyers/chat" class="text-decoration-none">
                <h6>Unread messages</h6>
              </NuxtLink>
              <h5 class="fs-5 fw-bold mb-0">
                {{ dashboardData.unreadMessages }}
              </h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div
            class="py-3 px-2 bg-white border-0 shadow-sm d-flex align-items-center justify-content-center"
          >
            <i class="fas fa-paper-plane fs-3 text-primary"></i>
            <div class="ms-3">
              <h6>Job Posted</h6>
              <h5 class="fs-5 fw-bold mb-0">{{ dashboardData.jobPosted }}</h5>
            </div>
          </div>
        </div>
      </div>
      <!-- 3 cards end -->

      <!--Jobs Section -->
      <div class="card border-0 rounded-0 shadow-sm mt-3">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="mb-0 fw-bold">Active Jobs</h5>
          </div>
        </div>
      </div>
      <div
        class="card border-0 rounded-0 shadow-sm p-3 mt-2"
        v-for="job in laravelData.data"
        :key="job.id"
      >
        <div class="row">
          <div class="d-md-flex justify-content-between">
            <NuxtLink
              class="fs-7 fw-bold mt-lg-auto text-decoration-none"
              :to="'/jobs/' + job.id"
            >
              <h6 class="fw-bold fs-5 mb-0">{{ job.title }}</h6>
            </NuxtLink>

            <span
              class="d-inline-block fw-bold fs-7"
              v-if="job.type == 'fixed'"
            >
              {{ job.budget | currency }}
            </span>
            <span
              class="d-inline-block fw-bold fs-7"
              v-if="job.type == 'hourly'"
            >
              {{ job.budget | currency }} /hr
            </span>
          </div>
        </div>

        <div class="row mt-4">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <span class="d-flex align-items-center text-darkgrey">
                <i class="fas fa-calendar-alt fs-8"></i>
                <span class="fw-bold fs-8 mb-0 ms-1">{{ job.postDate }}</span>
              </span>
              <span class="d-flex align-items-center text-darkgrey ms-3">
                <i class="fas fa-calendar-alt fs-8"></i>
                <span class="fw-bold fs-8 mb-0 ms-1"
                  >Expire {{ job.expireDate }}</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Job area ends -->

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
      jobs: [],
      laravelData: {},
      dashboardData: {},
      editProfilePicture: false,
    };
  },
  methods: {
    // Our method to GET results from a Laravel endpoint
    getResults(page = 1) {
      this.$axios
        .$get(
          "/jobs/buyers/" +
            this.$auth.user.id +
            "?page=" +
            page +
            "&status=active" +
            "&perPage=5"
        )
        .then((response) => {
          this.laravelData = response;
          console.log(response);
        });
    },
  },
  mounted() {
    this.getResults();
  },
  async fetch() {
    const res = await this.$axios.$post("/buyers/dashboard");
    this.dashboardData = res;
    this.stopLoading();
  },
};
</script>

<style lang="scss" scoped>
</style>
