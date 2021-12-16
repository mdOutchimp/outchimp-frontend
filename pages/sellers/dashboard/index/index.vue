<template>
  <loading-tab-view :loading="isLoading">
    <!-- tab body -->
    <div class="tab-content" id="v-pills-tabContent">
      <!-- Dashboard tab -->
      <div
        class="tab-pane fade show active"
        id="v-pills-dashboard"
        role="tabpanel"
        aria-labelledby="v-pills-dashboard-tab"
      >
        <!-- dashboard start-->
        <div>
          <!-- 3 cards -->
          <div class="mt-3">
            <div class="row g-3">
              <div class="col">
                <div
                  class="py-3 px-2 border bg-white border-0 shadow-sm d-flex align-items-center justify-content-center"
                >
                  <i class="fas fa-briefcase fs-3 text-primary"></i>
                  <div class="ms-3">
                    <h6>Active orders</h6>
                    <h5 class="fs-5 fw-bold mb-0">
                      {{ $auth.user.activeOrders }}
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col">
                <div
                  class="py-3 px-2 border bg-white border-0 shadow-sm d-flex align-items-center justify-content-center"
                >
                  <i class="fas fa-envelope fs-3 text-primary"></i>
                  <div class="ms-3">
                    <h6>Pending orders</h6>
                    <h5 class="fs-5 fw-bold mb-0">
                      {{ $auth.user.pendingOrders }}
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col">
                <div
                  class="py-3 px-2 border bg-white border-0 shadow-sm d-flex align-items-center justify-content-center"
                >
                  <i class="fas fa-stream fs-3 text-primary"></i>
                  <div class="ms-3">
                    <h6>Pending Payments</h6>
                    <h5 class="fs-5 fw-bold mb-0">
                      ৳{{ $auth.user.pendingPayments }}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 3 cards end -->

          <!-- orders selector area -->
          <div class="card border-0 rounded-0 shadow-sm mt-3">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="mb-0 fw-bold">Recent Orders</h5>

                <!-- <div>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected value="1">Active orders</option>
                    <option value="2">Pending orders</option>
                    <option value="3">Waiting</option>
                  </select>
                </div> -->
              </div>
            </div>
          </div>
          <!-- orders selector area end -->

          <!-- Orders area -->

          <div
            class="card border-0 rounded-0 shadow-sm p-3 mt-2 mb-2"
            v-for="order in orders"
            :key="order.id"
          >
            <div class="row">
              <div class="col-md-9">
                <div
                  class="d-flex flex-column align-items-start flex-md-row align-items-md-center"
                >
                  <div class="me-3">
                    <img
                      :src="order.buyer.profilePicture || require('~/assets/images/profile.png')"
                      class="rounded-circle d-block"
                      style="max-width: 100px"
                    />
                  </div>
                  <div
                    class="col-md-9 d-flex flex-column justify-content-center align-items-start mt-2 mt-md-0 mt-md-0"
                  >
                    <div class="mb-2">
                      <h3 class="fw-bold mb-0 fs-6">
                        {{ order.buyer.name }}
                      </h3>
                      <h5
                        class="fs-6 mt-3 text-start mb-0"
                        v-html="
                          $options.filters.truncate(order.description, 100)
                        "
                      ></h5>
                    </div>

                    <div class="mt-md-4">
                      <span
                        class="badge border border-primary px-3 text-primary rounded-pill"
                        >{{ order.status | capitalize }}</span
                      >
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
                <NuxtLink
                  class="btn rounded-pill px-4 btn-outline-primary btn fs-7 fw-bold ms-lg-3 text-decoration-none mt-auto"
                  :to="`/orders/${order.id}`"
                  >View</NuxtLink
                >
              </div>
            </div>
          </div>

          <!-- Orders area ends -->
        </div>
        <!-- dashboard end -->
      </div>
    </div>
    <!-- tab body ends -->
  </loading-tab-view>
</template>

<script>
export default {
  name: "SellerDashboardIndex",
  data() {
    return {
      orders: [],
    };
  },
  fetch() {
    this.$axios.get(`/orders?seller_id=${this.$auth.user.id}&limit=5`).then((res) => {
      this.orders = res.data;
      this.stopLoading();
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
