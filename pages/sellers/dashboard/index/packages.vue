<template>
  <loading-tab-view :loading="isLoading">
    <div>
      <!-- Packages start -->
      <div class="card border-0 rounded-0 shadow-sm p-3 mt-2">
        <div class="d-flex justify-content-between">
          <div>
            <!-- <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm selectPackage"
            >
              <option selected value="1">Active</option>
              <option value="2">Pending</option>
              <option value="3">Waiting</option>
            </select> -->
            <span class="fw-bold">Your Packages</span>
          </div>

          <div>
            <NuxtLink :to="`/packages/create`">
              <button class="btn btn-primary btn-sm fs-7">
                <i class="fas fa-plus"></i>
                <span class="fs-7 ms-1">New Package</span>
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Packages card -->
      <div
        class="card border-0 rounded-0 shadow-sm p-3 mt-2"
        v-for="(pkg, index) in laravelData.data"
        :key="pkg.id">
        <div class="row">
          <div class="col-md-9">
            <div
              class="
                d-flex
                flex-column
                align-items-start
                flex-md-row
                align-items-md-center
              "
            >
              <div class="me-3">
                <img
                  :src="
                    pkg.mediaUrl.trim()
                      ? pkg.mediaUrl
                      : require('@/assets/images/placeholder.jpg')
                  "
                  class="d-block"
                  style="max-width: 120px"
                />
              </div>
              <div
                class="
                  col-md-9
                  d-flex
                  flex-column
                  justify-content-center
                  align-items-start
                  mt-2 mt-md-0 mt-md-0
                "
              >
                <div class="mb-2 d-flex" >
                  <NuxtLink :to="`/packages/${pkg.id}/details`"  class="fs-6 h-5 text-start fw-bold mb-0 me-2">{{ pkg.name }}</NuxtLink>
                  <span class="text-uppercase fs-8 badge bg-primary">{{pkg.status}}</span>
                </div>

                <div class="mt-md-4 d-flex">
                  <h6 class="fw-semibold mb-0 fs-7">
                    <span>৳</span>
                    {{ pkg.price }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div
            class="
              col-md-3
              d-flex
              flex-column
              justify-content-center
              align-items-start align-items-md-end
              mt-lg-0 mt-md-0
            "
          >
            <div class="mt-2 mt-md-0">
              <p class="fs-6 text-end">
                <span>
                  <i class="fas fa-star text-primary me-1 fw-bold"></i>
                </span>
                <span class="fw-bold">4.9</span>
                <span>(2)</span>
              </p>
            </div>

            <div class="mt-md-4 mt-lg-auto">
              <NuxtLink
                class="
                  fs-7
                  fw-bold
                  text-primary text-decoration-none
                "
                :to="`/packages/${pkg.id}/edit`"
              >
                <span>
                  <i class="fas fa-edit fs-7"></i>
                </span>
                Edit
              </NuxtLink>
              <button class="ms-4 btn btn-outline-danger btn-sm" @click="destroy(pkg.id, index)">
                <i class="fas fa-trash me-2"></i>Archive
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Packages card ends -->
      <pagination
        :data="laravelData"
        @pagination-change-page="getResults"
        class="mt-3"
      ></pagination>
    </div>
  </loading-tab-view>
</template>

<script>
export default {
  data() {
    return {
      // packages: []
      laravelData: {},
    };
  },

  methods: {
    getResults(page = 1) {
      this.$axios
        .get("/packages?page=" + page + "&seller_id=" + this.$auth.user.id)
        .then((response) => {
          this.laravelData = response.data;
        });
    },

    async destroy(id, index){
      await this.$axios.delete(`/packages/${id}`)
      this.laravelData.data.splice(index, 1);
      this.$toast.success('Package archived successfully');
    }
  },

  mounted() {
    // Fetch initial results
    this.getResults();
  },
  async fetch() {
    const packageResponse = await this.$axios.get("/packages");
    this.packages = packageResponse.data.data;
    this.stopLoading();
  },
};
</script>

<style lang="scss">
.btn-outline-danger:hover{
  color: white !important;
}
</style>
