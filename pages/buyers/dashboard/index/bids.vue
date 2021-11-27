<template>
  <loading-tab-view :loading="isLoading">
    <div
      v-for="bid in bids"
      :key="bid.id"
      class="card border-0 rounded-0 p-3 mt-2"
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
                <nuxt-link
                  class="text-decoration-none"
                  :to="`/sellers/${bid.seller.id}`"
                >
                  {{ `${bid.seller.name}` }}
                </nuxt-link>

                <span class="badge bg-primary rounded-pill mx-2">{{
                  bid.status | capitalize
                }}</span>
              </h5>
              <p class="mt-2 mt-md-0">
                {{ bid.description | truncate(100) }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="col-md-2 d-flex flex-column justify-content-between align-items-start align-items-md-end mt-2 mt-md-0"
        >
          <div class="d-flex">
            <span class="fw-bold fs-7">${{ bid.amount }}</span>
            <small class="ms-1">/Hr</small>
          </div>

          <nuxt-link
            :to="`/bids/${bid.id}`"
            class="btn btn-outline-primary text-decoration-none rounded-pill py-1 px-3 mt-2 mt-md-0"
          >
            View
          </nuxt-link>
        </div>
      </div>
    </div>
  </loading-tab-view>
</template>

<script>
export default {
  data() {
    return {
      bids: null,
    };
  },
  async fetch() {
    const bids = await this.$axios.$get(`/bids?buyer_id=${this.$auth.user.id}`);
    this.bids = bids.data;
    this.stopLoading();
  },
};
</script>

<style lang="scss" scoped></style>
