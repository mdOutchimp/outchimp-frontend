<template>
  <loading-view :loading="isLoading">
    <div v-if="order" class="my-4">
      <PageHeader>
        <div class="col-md-8 d-flex flex-column">
          <div class>
            <h3 class="text-white fw-bold mt-2 d-inline-block">
              {{
                order.orderable.title
                  ? order.orderable.title
                  : order.orderable.name
              }}
              <span class="badge fs-8 badge-pill badge-primary bg-primary">{{
                order.status | capitalize
              }}</span>
            </h3>
          </div>
          <h5 class="text-white">
            <span>{{ order.orderable.category.name }}</span>
          </h5>
        </div>
      </PageHeader>

      <section class="section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="card rounded-0 border-0">
                <div class="card-body p-0">
                  <div class="ps-3 pe-5">
                    <h5 class="fw-bold mt-3">Description</h5>
                    <p class="text-justify">
                      {{ order.orderable.category.description }}
                    </p>
                  </div>

                  <div class="p-3">
                    <h5 class="fw-bold">Amount</h5>
                    <span>৳ </span> {{ order.amount }} <span>BDT</span>
                  </div>

                  <!-- Terms & condition -->
                  <div class="mt-1 px-3">
                    <h5 class="fw-bold">Terms & condition</h5>
                    <p
                      v-if="order.termsAndConditions"
                      v-html="order.termsAndConditions"
                    ></p>
                    <p v-else class="text-muted">No Terms & condition Found</p>
                  </div>
                  <!-- Attachments -->
                  <div class="mt-3 px-3">
                    <h5 class="fw-bold d-flex flex-grow-1">Attachments</h5>
                    <div v-if="order.attachments && order.attachments.length">
                      <a
                        v-for="(attachment, index) in order.attachments"
                        :key="index"
                        :href="attachment.url"
                        target="_blank"
                        class="text-decoration-none text-black d-block"
                      >
                        <i class="fas fa-file fa-fw"></i>
                        <span>{{ attachment.name }}</span>
                      </a>
                      <button
                        class="btn btn-warning btn-sm text-white py-0 ms-4 d-none"
                        @click="onRemoveAttachment(index)"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    <div class="text-grey text-center" v-else>
                      No Attachments Added
                    </div>
                  </div>

                  <!-- File Upload section -->
                  <div class="mt-4 px-3">
                    <h5 class="fw-bold">Files</h5>
                    <form
                      ref="attachments"
                      class="file-upload-wrapper mt-3 border rounded border-primary d-flex justify-content-center align-items-center w-100"
                      style="height: 150px"
                    >
                      <input
                        type="file"
                        id="input-file-now"
                        class="file-upload"
                        multiple
                        @change="onFileChanged"
                      />
                    </form>
                  </div>

                  <div
                    class="d-flex justify-content-start align-items-center px-4 mb-3"
                  >
                    <button
                      class="btn btn-outline-primary text-decoration-none rounded-pill mt-3 px-5"
                      @click="onSubmitOrder"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="col-lg-4 mt-3 mt-lg-0">
              <!-- About The Buyer -->
              <div class="card rounded-0 border-0">
                <div class="card-body">
                  <h5 class="fw-bold mb-3 text-center">About The Buyer</h5>
                  <div class="d-flex flex-column align-items-center">
                    <div>
                      <div class="me-3">
                        <img
                          :src="
                            order.buyer.profilePicture.length
                              ? order.buyer.profilePicture
                              : require('@/assets/images/profile.png')
                          "
                          class="rounded-circle d-block"
                          style="max-width: 100px"
                        />
                      </div>
                    </div>
                    <div class="mt-3 text-center">
                      <h5 class="fw-bold">
                        {{ order.buyer.firstName }} {{ order.buyer.lastName }}
                      </h5>
                    </div>
                  </div>
                  <div class="d-flex mt-3">
                    <div class>
                      <h6 class="fw-bold">From</h6>
                      <p v-if="order.buyer.address">
                        {{ order.buyer.address.city }},
                        {{ order.buyer.address.country }}
                      </p>
                      <p v-else class="text-grey">No Data Found</p>
                    </div>
                    <div class="ms-auto">
                      <h6 class="fw-bold">Member Since</h6>
                      <p class="text-right">{{ order.buyer.memberSince }}</p>
                    </div>
                  </div>
                  <button
                    class="d-block btn btn-outline-primary text-decoration-none rounded-pill mt-3 px-4 w-100"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </loading-view>
</template>

<script>
export default {
  data() {
    return {
      order: null,
      attachments: null,
    };
  },
  methods: {
    onFileChanged(e) {
      this.attachments = e.target.files;
    },
    async onSubmitOrder() {
      const formData = new FormData();
      for (const i of Object.keys(this.attachments)) {
        formData.append(`attachments-${i}`, this.attachments[i]);
      }
      try {
        const orderRes = await this.$axios.$post(
          `/orders/${this.$route.params.id}/attachments`,
          formData
        );

        // Show success message
        this.$toast.success("Attachments updloaded successfully.");
        // Clear the form
        this.$refs.attachments.reset();
        // Clear the attachments
        this.attachments = null;
        // Set the order
        this.order = orderRes.data;
      } catch (error) {
        console.log(`%c ${error}`, "color: teal");
      }
    },
    onRemoveAttachment(index) {
      this.order.attachments = this.order.attachments.filter(
        (a, i) => index != i
      );
    },
  },
  async fetch() {
    const res = await this.$axios.$get(`/orders/${this.$route.params.id}`);
    this.order = res.data;
    this.stopLoading();
  },
};
</script>

<style lang="scss" scoped>
.attachments-wrapper {
  &:hover > button.btn.d-none {
    display: block !important;
  }
}
</style>
