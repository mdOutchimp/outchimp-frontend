<template>
  <div>
    <!-- Seller Dashboard Section -->
    <section class="container" style="margin-top: 40px">
      <div class="row pt-5 pb-5 justify-content-center">
        <!-- left side -->
        <div class="col-lg-8">
          <div class="card border-0 rounded-0 shadow-sm">
            <div class="card-body">
              <!-- tab items -->
              <div>
                <NuxtLink to="/sellers/dashboard" class="text-decoration-none"
                  >Dashboard</NuxtLink
                >
                <span class="px-4">|</span>
                <NuxtLink
                  to="/sellers/dashboard/orders"
                  class="text-decoration-none"
                  >Orders</NuxtLink
                >
                <span class="px-4">|</span>
                <NuxtLink
                  to="/sellers/dashboard/packages"
                  class="text-decoration-none"
                  >Packages</NuxtLink
                >
                <span class="px-4">|</span>
                <NuxtLink
                  to="/sellers/dashboard/bids"
                  class="text-decoration-none"
                  >Bids</NuxtLink
                >
              </div>
              <!-- tab items end -->
            </div>
          </div>

          <nuxt-child />
        </div>

        <!-- right side -->

        <!-- profile picture -->
        <div class="col-lg-4">
          <div class="card border-0 rounded-0 shadow-sm mt-3 mt-lg-0 mb-3">
            <div
              class="p-2 px-3 d-flex align-items-center justify-content-between border-bottom"
            >
              <div class="d-flex align-items-center">
                <img
                  :src="
                    $auth.user.profilePicture.length
                      ? $auth.user.profilePicture
                      : require('@/assets/images/profile.png')
                  "
                  class="rounded-circle py-1"
                  style="width: 40px"
                  alt=""
                />
                <h6 class="mt-2 ms-3 fw-bold">{{ $auth.user.name }}</h6>
              </div>
              <NuxtLink to="/sellers/profile">
                <button
                  class="btn btn-outline-primary rounded-pill px-4 btn-sm fs-8 ms-3"
                >
                  Edit
                </button>
              </NuxtLink>
            </div>

            <!-- Profile details -->
            <div class="card-body">
              <div class="row">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-0 fw-semibold">Account Balance :</h6>
                  <h6 class="text-primary fw-bold">
                    ৳ {{ $auth.user.balance }}
                  </h6>
                </div>

                <div class="d-flex justify-content-between mt-1">
                  <h6 class="mb-0 fw-semibold">Active Orders :</h6>
                  <h6 class="text-primary fw-bold">
                    {{ $auth.user.activeOrders }}
                  </h6>
                </div>

                <div class="d-flex justify-content-between mt-1">
                  <h6 class="mb-0 fw-semibold">Completed Orders :</h6>
                  <h6 class="text-primary fw-bold">
                    {{ $auth.user.completedJobs }}
                  </h6>
                </div>

                <div class="d-flex justify-content-between mt-1">
                  <h6 class="mb-0 fw-semibold">Total Earning :</h6>
                  <h6 class="text-primary fw-bold">
                    ৳ {{ $auth.user.totalEarning }}
                  </h6>
                </div>

                <div class="d-flex justify-content-between mt-1">
                  <h6 class="mb-0 fw-semibold">Rating :</h6>
                  <div class="d-flex text-primary">
                    <i class="fas fa-star"></i>
                    <h6 class="fw-bold ms-1">
                      {{ Math.floor($auth.user.averageRating) }}
                      <span class="text-black fw-semibold">
                        ({{ $auth.user.totalReview }})
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Seller Dashboard Section -->
  </div>
</template>

<script>
export default {
  name: "SellerDashboard",
  middleware: "auth",
};
</script>

<style lang="scss">
.NuxtLink-exact-active {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
