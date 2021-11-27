<template>
  <div class="card border-0 rounded-0 shadow-sm p-3 mt-2">
    <div class="row">
      <div class="col-md-9">
        <div
          class="d-flex flex-column align-items-start flex-md-row align-items-md-center"
        >
          <div class="me-3">
            <img
              :src="getProfileImage"
              class="rounded-circle d-block"
              style="max-width: 100px"
            />
          </div>
          <div
            class="col-md-9 d-flex flex-column justify-content-center align-items-start mt-2 mt-md-0 mt-md-0"
          >
            <div class="mb-2">
              <h3 class="fw-bold mb-0 fs-6">
                {{
                  $auth.user.type === "seller"
                    ? order.buyer.name
                    : order.seller.name
                }}
              </h3>
              <h5
                class="fs-6 mt-3 text-start mb-0"
                v-html="$options.filters.truncate(order.description, 100)"
              ></h5>
            </div>

            <div>
              <div class="mt-lg-0">
                <span
                  class="badge border border-primary px-3 text-primary rounded-pill"
                  >{{ order.status | capitalize }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-md-3 d-flex flex-column align-items-start align-items-md-end mt-lg-0 mt-md-0"
      >
        <div class="mb-2">
          <h5 class="fs-6 text-end fw-bold mb-0 mt-3 mt-md-0">
            <span>৳-</span> {{ order.amount }}
          </h5>
        </div>
        <nuxt-link
          class="mt-auto btn rounded-pill px-4 btn-outline-primary btn fs-7 fw-bold ms-lg-3 text-decoration-none"
          :to="
            $auth.user.type === 'seller'
              ? `/orders/${order.id}`
              : `/orders/${order.id}/details`
          "
          >View</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import placeHolderProfile from "@/assets/images/profile.png";
export default {
  name: "OrderCard",
  props: ["order"],
  computed: {
    getProfileImage() {
      if (this.$auth.user.type === "seller") {
        if (this.order.buyer.profilePicture)
          return this.order.buyer.profilePicture;
        else return placeHolderProfile;
      }
      if (this.$auth.user.type === "buyer") {
        if (this.order.seller.profilePicture)
          return this.order.seller.profilePicture;
        else return placeHolderProfile;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
