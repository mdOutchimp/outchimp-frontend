<template>
  <loading-tab-view :loading="isLoading">
    <div class="mt-3">
      <div
        class="card border-0 rounded-0 p-3 mt-2"
        v-for="bid in laravelData.data"
        :key="bid.id"
      >
        <div class="row">
          <div class="col-md-10">
            <div class="d-flex flex-column flex-md-row">
              <div class="me-3">
                <img
                  src="@/assets/images/profile.png"
                  class="rounded-circle d-block"
                  style="max-width: 80px"
                />
              </div>
              <div
                class="mt-2 mt-md-0 d-flex flex-column justify-content-between"
              >
                <h5 class="d-inline-block job-card__title fw-bold mb-0">
                  <NuxtLink
                    :to="`/seller/${bid.seller.id}`"
                    class="text-black text-decoration-none"
                    >{{ `${bid.seller.name}` }}</NuxtLink
                  >
                  <span class="badge bg-primary rounded-pill mx-2">{{
                    bid.status | capitalize
                  }}</span>
                </h5>
                <p
                  class="mt-2 mt-md-0"
                  v-html="$options.filters.truncate(bid.description, 100)"
                ></p>
              </div>
            </div>
          </div>
          <div
            class="col-md-2 d-flex flex-column justify-content-between align-items-start align-items-md-end mt-2 mt-md-0"
          >
            <div class="d-flex">
              <span class="fs-7 fw-bold">৳ {{ bid.amount }}</span>
              <small class="ms-1">/hr</small>
            </div>

            <NuxtLink
              :to="`/bids/${bid.id}`"
              class="btn btn-outline-primary text-decoration-none rounded-pill py-1 px-3 mt-2 mt-md-0"
            >
              View
            </NuxtLink>
          </div>
        </div>
      </div>
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
      bids: null,
      laravelData: {},
    };
  },

  methods: {
    getResults(page = 1) {
      this.$axios
        .get("/bids?page=" + page + "&seller_id=" + this.$auth.user.id)
        .then((response) => {
          this.laravelData = response.data;
          this.stopLoading();
        });
    },
  },

  mounted() {
    // Fetch initial results
    this.getResults();
  },
};
</script>

<style lang="scss" scoped>
</style>
