<template>
  <div class="card rounded-0 border-0 mb-4">
    <div class="card-body bg-light">
      <div class="rating mb-1">
        <slot name="rating" ></slot>
      </div>
      <p class="fs-8 fst-italic">
        {{ review.review }}
      </p>
      <div class="d-flex mt-3">
        <div class="me-2">
          <img
            class="rounded-circle"
            :src="
                review.profilePicture
                  ? review.profilePicture
                  : require('@/assets/images/profile.png')
              "
            style="width: 35px"
            alt="buyer-1"
          />
        </div>
        <div class="pb-0">
          <p class="mb-0 fw-bold fs-7">{{ review.authorName }}</p>
          <p class="fs-8 mb-0">{{ review.reviewAt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    review: {
        type: Object,
      required: true,
    },
  },
};
</script>

<style lang='scss'>
</style>
