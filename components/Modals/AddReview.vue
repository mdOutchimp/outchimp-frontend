<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h5 class="text-black text-center fw-bolder">Rating and Feedback</h5>
      </div>
      <div class="modal__body text-center">
        <div class="mt-2">
          <img
            data-v-be386ea0
            src="/_nuxt/assets/images/profile.png"
            class="rounded-circle"
            style="max-width: 80px"
          />
        </div>
        <h6 class="mt-4 fw-bold">{{ $auth.user.name }}</h6>
        <h6 class="mb-2">Rate the seller</h6>
        <!-- Ratings -->
        <Ratings :value="ratings" @setRating="setRatings"></Ratings>

        <!-- Message Box -->
        <textarea
          type="text"
          class="form-control mt-3"
          placeholder="Additional Comments"
          rows="4"
          v-model="reviewMessages"
        >
        </textarea>
      </div>

      <div
        class="modal__footer d-flex align-items-center justify-content-end mt-2"
        style="border: none"
      >
        <button type="button" class="btn" @click="close">Cancel</button>
        <button
          type="button"
          class="btn btn-outline-primary px-4"
          @click="save"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderReview",
  props: ["order"],
  data() {
    return {
      value: this.$auth.user.about,
      user: this.$auth.user,
      reviewMessages: "",
      ratings: 0,
    };
  },

  created() {
    // console.log(this.order);
  },

  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      const getJobType = () => {
        if (this.order.orderableType.includes("Job")) {
          return { jobId: this.order.orderableId };
        } else {
          return { packageId: this.order.orderableId };
        }
      };
      const newReview = {
        review: this.reviewMessages,
        rating: this.ratings,
        orderId: this.order.id,
        ...getJobType(),
      };

      try {
        const res = await this.$axios.$post("/reviews", newReview);
        this.$emit("close");
        this.$emit("save", res);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    },
    setRatings(star) {
      this.ratings = star;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__content {
    max-width: 400px;
    width: 50%;
    height: 500px;
    background: white;
  }
}
</style>
